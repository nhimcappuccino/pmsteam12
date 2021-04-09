USE master
GO
DROP DATABASE ProjectMangementSystem
GO
CREATE DATABASE ProjectMangementSystem;
GO
USE ProjectMangementSystem;
GO
--there seems to be inconsistant uses of varchar and nvarchar
--varchar , is basicly ascii only, so varchar(n) is max n characters
--nvarchar, is basiclly UTF-8, so nvarchar(n) is max n/2 or so characters
--i think we should use nvarchar for names(people, places, companies)
--and varchar for evetything else

-- also think we should increase the max on all these strings, 255 for most, 510 for ncharchar

CREATE TABLE roles
(
	Role_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Role_Name varchar(30) NOT NULL,
	Last_Changed_By varchar(30),
	Last_Updated_At datetime,
);
CREATE TABLE departments
(
	Department_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Department_Name varchar(30) NOT NULL,
);

CREATE TABLE employees
(
	Employee_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	First_Name nvarchar(60) NOT NULL,
	Last_Name nvarchar(60) NOT NULL,
	Middle_Name nvarchar(60),
	Date_of_Birth date NOT NULL,
	Gender varchar(30) DEFAULT 'NOT DISCLOSED',
	Contry_Code char(1) DEFAULT '1',
	Phone_Number char(10) NOT NULL,
	Email varchar(60) NOT NULL,
	House_Number int NOT NULL,
	Street_Name nvarchar(30) NOT NULL,
	City nvarchar(30) NOT NULL,
	_State nvarchar(30) NOT NULL,
	Zipcode int NOT NULL,
	Employee_Photo nvarchar(100), -- ?? is this a link to a photo? we can store photo data in SQL i think. should discuss
	Employee_Status varchar(12) DEFAULT 'EMPLOYED' CHECK( Employee_Status IN ('EMPLOYED', 'NOT EMPLOYED')) NOT NULL, 
	UserID varchar(100),
	UserPassword varchar(100), -- password in plaintext?? if we change this we ecould get brownie points from proff
	Role_ID int FOREIGN KEY REFERENCES roles(Role_ID) NOT NULL,
	Payrate_per_hr DECIMAL(10,2) ,
	Created_At datetime DEFAULT GETDATE() NOT NULL,
	Last_Changed_By varchar(30),
	Last_Updated_At datetime,
);

CREATE TABLE customers
(
	Customer_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Title varchar(4) CHECK( Title IN ('Mr.', 'Ms.','Mrs.','Miss','Dr.')),
	First_Name nvarchar(60) NOT NULL,
	Last_Name nvarchar(60) NOT NULL,
	Middle_Name nvarchar(60),
	Date_of_Birth date NOT NULL,
	Contry_Code char(1) DEFAULT '1',
	Phone_Number char(10) NOT NULL,
	Gender varchar(30) DEFAULT 'NOT DISCLOSED' NOT NULL,
	Email varchar(60) NOT NULL,
	Customer_Address nvarchar(60) NOT NULL,
	Note varchar(500),
	Created_At datetime DEFAULT GETDATE(),
	Last_Changed_By varchar(30),
	Last_Updated_At datetime,
);



CREATE TABLE task_status
(
	Task_Status_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Task_Status_Description varchar(1000) NOT NULL,
);

CREATE TABLE project_status
(
	Project_Status_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Project_Status_Description nvarchar(500),
);


CREATE TABLE department_managers
(
	Department_ID int FOREIGN KEY REFERENCES departments(Department_ID),
	Employee_ID int UNIQUE FOREIGN KEY REFERENCES employees(Employee_ID), -- this could be the primary key
	Manager_Start_Date date DEFAULT GETDATE(),
	Manager_End_Date date DEFAULT NULL,
);
CREATE TABLE department_employees
(
	Employee_ID int FOREIGN KEY REFERENCES employees(Employee_ID),
	Department_ID int FOREIGN KEY REFERENCES departments(Department_ID),
	Employee_Start_Date date DEFAULT GETDATE(),
	Employee_End_Date datetime DEFAULT NULL,
);
CREATE TABLE projects
(
	Project_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Project_Name varchar(30) NOT NULL,
	Project_Description varchar(500) NOT NULL,
	Project_Manager_ID int FOREIGN KEY REFERENCES employees(Employee_ID) NOT NULL,
	Project_Status_ID int FOREIGN KEY REFERENCES project_status(Project_Status_ID) NOT NULL,
	Project_Active_Status char(8) DEFAULT 'ACTIVE' CHECK( Project_Active_Status IN ('ACTIVE', 'INACTIVE')) NOT NULL,
	Customer_ID int FOREIGN KEY REFERENCES customers(Customer_ID) NOT NULL,
	Budget DECIMAL(20,2)  NOT NULL,
	Money_spent DECIMAL(20,2) DEFAULT 0.0,
	Total_Minutes int DEFAULT 0,
	Planned_Start_Date date NOT NULL,
	Actual_Start_Date date,
	Actual_End_Date date,
	Created_At datetime DEFAULT GETDATE(),
	Created_By int FOREIGN KEY REFERENCES employees(Employee_ID),
	Last_Changed_By varchar(30),
	Last_Updated_At datetime,
);

CREATE TABLE tasks
(
	Task_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Task_Name varchar(30),
	Task_Description varchar(255),
	Expiration_Date datetime NOT NULL,
	Total_Minutes int DEFAULT 0,
	Project_ID int FOREIGN KEY REFERENCES projects(Project_ID),
	Priority int,
	Task_Status_ID int FOREIGN KEY REFERENCES task_status(Task_Status_ID),
	Employee_ID int FOREIGN KEY REFERENCES employees(Employee_ID),
	Created_At datetime DEFAULT GETDATE(),
	Last_Changed_By varchar(30),
	Last_Updated_At datetime,
);

CREATE TABLE expenses
(
	Expense_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Expense_Name varchar(30),
	Expense_Description varchar(255),
	Cost DECIMAL(20,2) NOT NULL,
	Project_ID int FOREIGN KEY REFERENCES projects(Project_ID),
	Created_At datetime DEFAULT GETDATE(),
	Last_Changed_By varchar(30),
	Last_Updated_At datetime,
);

CREATE TABLE teams
(
	Team_ID int PRIMARY KEY,
	Team_Name nvarchar(130),
);

CREATE TABLE team_member
(
	ID int PRIMARY KEY,
	Team_ID int FOREIGN KEY REFERENCES teams(Team_ID),
	Employee_ID int FOREIGN KEY REFERENCES employees(Employee_ID),
	Role_ID int FOREIGN KEY REFERENCES roles(Role_ID),
);

CREATE TABLE time_sheet
(
	ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
    Clock_in datetime NOT NULL,
    Clock_out datetime NOT NULL,
    Minuits_elapsed AS DATEDIFF(minute, Clock_in, Clock_out),
	Work_Done varchar(500),
	Task_ID int FOREIGN KEY REFERENCES tasks(Task_ID),
	Project_ID int FOREIGN KEY REFERENCES projects(Project_ID),
	Employee_ID int FOREIGN KEY REFERENCES employees(Employee_ID),
);

CREATE TABLE milestones_status
(
	Milestone_Status_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Milestones_Status_Description varchar(500) NOT NULL,
);
CREATE TABLE milestones
(
	ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Project_ID int FOREIGN KEY REFERENCES projects(Project_ID),
	Milestones_Name varchar(30) NOT NULL,
	Milestones_Expiration_Date datetime NOT NULL,
	Milestone_Status_ID int FOREIGN KEY REFERENCES milestones_status(Milestone_Status_ID),
	Total_Minutes int DEFAULT 0,
);
GO
CREATE TRIGGER elapsed_time_in_timesheet
	ON time_sheet
    AFTER INSERT
    AS
	BEGIN
    --UPDATE time_sheet SET Minuits_elapsed = DATEDIFF(minute, inserted.Clock_in, inserted.Clock_out) FROM inserted WHERE inserted.ID = time_sheet.ID
	UPDATE projects SET projects.Total_Minutes = projects.Total_Minutes + (SELECT SUM(inserted.Minuits_elapsed) FROM inserted WHERE inserted.Project_ID = projects.Project_ID) WHERE projects.Project_ID IN (SELECT Project_ID FROM inserted)
	UPDATE projects SET projects.Money_spent = projects.Money_spent + (SELECT SUM(inserted.Minuits_elapsed *  (employees.Payrate_per_hr / 60)) FROM inserted, employees WHERE inserted.Employee_ID = employees.Employee_ID AND inserted.Project_ID = projects.Project_ID) WHERE projects.Project_ID IN (SELECT Project_ID FROM inserted) 
	UPDATE tasks SET tasks.Total_Minutes = tasks.Total_Minutes + (SELECT SUM(inserted.Minuits_elapsed) FROM inserted WHERE inserted.Task_ID = tasks.Task_ID) WHERE tasks.Task_ID IN (SELECT Task_ID FROM inserted)
	END
GO

CREATE TRIGGER add_expenses_to_cost_of_Projects
	ON expenses
	AFTER INSERT
	AS 
	BEGIN
	UPDATE projects SET projects.Money_spent = projects.Money_spent + (SELECT SUM(inserted.Cost) FROM inserted WHERE inserted.Project_ID = projects.Project_ID) WHERE projects.Project_ID IN (SELECT Project_ID FROM inserted)
	END
GO

INSERT INTO dbo.roles
	(Role_Name)
	VALUES
	('Department Manager'),
	('Project Manager'),
	('Team Leader'),
	('Team Member')

SELECT * FROM roles

INSERT INTO dbo.customers
	(Title,First_Name,Last_Name,Middle_Name,Date_of_Birth,Contry_Code,Phone_Number,Gender,Email,Customer_Address)
	VALUES
	('Mr.','Mario', 'Carlson','P','01/30/1990','1',192000277,'male','mariocarlson@yahoo.com','9871 North Gainsway Ave, Rowlett, TX 75088'),
	('Mr.','Kurt', 'Harper','T','05/10/1995','2',2192248123,'male','kurtharper@gmail.com','9970 Linden Drive, Newport News, VA 23601'),
	('Ms.','Susan', 'Young','F','02/15/1980','7',6127493856,'non-binary','youngsusan@hotmail.com','72 Sulphur Springs Ave, Lenoir, NC 28645')
SELECT * FROM customers

INSERT INTO dbo.employees
	(First_Name,Last_Name,Middle_Name,Date_of_Birth,Gender,Contry_Code, Phone_Number,Email,House_Number,Street_Name,City,_State,Zipcode,Role_ID, UserID,UserPassword, Payrate_per_hr)
	VALUES
	('Tony','Hoang','T','08/21/1992','male',1, 7133672444,'tt.hoang2108@gmail.com','11111','Beechnut Street','Houston','TX','77077', 1,'tonyhoang92',123456789,200.50),	
	('Emily','Diaz','L','04/12/1980','female',1, 7133452998,'emily.diaz@gmail.com','12580','Boone Road','Sugar Land', 'TX','77089',1,'emilydiaz80',12345678,150.15),
	('Vincenzo','Mcleod','C','12/12/1990','male',1, 7137463578,'vincenzo.mcleod@hotmail.com','10 ','Peg Shop Dr','Logansport', 'IN','46947',1,'vincenzomcleod90',12345678,100.5),
	('Dagda','Roxana','R','12/12/1995','female',2, 7137263668,'dagda.roxana@gmail.com','25792 ','Gates St','Bedford', 'OH','44146',1,'dagdaroxana95',12345678,12.5),
	('Ethan','Horace','V','03/2/1982','male',2, 7131263578,'ethan.horace@gmail.com','1588 ','Bear Hill Rd','Chichester', 'NH','03258',2,'ethanhorace82',12345678,100.5),
	('Garrett','Ginnie','W','05/1/1999','female',1, 7131263999,'garrett.ginnie@gmail.com','130','Stillwater Ave #8','Orono', 'ME','04473',2,'garrettginnie99',12345678,105.5),
	('Thomas','Renita','Z','10/11/1993','male',7, 4179673422,'thomas.renita@gmail.com','8520','SE 158th St','Summerfield', 'FL','34491',2,'thomasrenita93',12345678,11.5),
	('Indie','Kayley','N','09/11/1988','female',1, 6302139063,'indie.kayley@gmail.com','4031','Lakeside Dr','Hanover Park', 'IL','60133',3,'indiekayley88',12345678,12.5)

SELECT * FROM employees
SELECT First_Name,Last_Name ,Middle_Name,Gender, Role_Name FROM employees INNER JOIN roles ON employees.Role_ID = roles.Role_ID

INSERT INTO dbo.departments
	(Department_Name)
	VALUES
	('Information Technology'),
	('Human Resource Management'),
	('Accounting'),
	('Marketing')
SELECT * FROM departments

INSERT INTO dbo.department_managers
	(Department_ID,Employee_ID)
	VALUES
	(1,1)
INSERT INTO dbo.department_employees
	(Department_ID,Employee_ID)
	VALUES
	(1,2)

SELECT * FROM department_managers
SELECT * FROM department_employees
SELECT * FROM departments

INSERT INTO dbo.task_status
	(Task_Status_Description)
	VALUES
	('Started'),
	('Processing'),
	('Delay'),
	('Need Support'),
	('Completed')

SELECT * FROM dbo.task_status

INSERT INTO dbo.tasks
	(Task_Name, Task_Description, Expiration_Date, Total_Minutes, Task_Status_ID, Employee_ID)
	VALUES
	('DEBUG CODE', 'Stare at screen and work', DATEADD(day, 30, GETDATE()), 0, 1, 1),
	('Clean Office', 'Clean the office', DATEADD(day, 5, GETDATE()), 0, 3, 2),
	('Design Meeting with Susan', 'Design Meeting with Susan', DATEADD(day, 2, GETDATE()), 0, 5, 3)

INSERT INTO dbo.project_status
	(Project_Status_Description)
	VALUES
	('Received'),
	('Processing'),
	('Completed')
SELECT * FROM dbo.project_status

INSERT INTO dbo.projects
	(Project_Name, Project_Description, Project_Manager_ID,  Project_Status_ID, Customer_ID,Planned_Start_Date, Budget, Created_By)
	VALUES
	('KURTBOOK', 'Build app for Kurt', 1, 2, 2, GETDATE(), 200, 1),
	('All the single Ladies', 'Build dating website spacificly for lesbians', 1, 1, 3, GETDATE(), 1000, 2)

INSERT INTO dbo.expenses
	(Expense_Name, Expense_Description, Cost, Project_ID)
	VALUES
	('Donuts', 'for the office', 12.50, 1),
	('AWS Servers', 'To host KURTBOOK for development and testing', 100.00, 1),
	('AWS Servers', 'To host All the single Ladies for development and testing', 100.00, 2)


SELECT * FROM projects

SELECT Employee_ID, UserID, UserPassword FROM employees WHERE UserID='tonyhoang92' AND UserPassword='123456789'
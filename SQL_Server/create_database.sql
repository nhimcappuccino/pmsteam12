USE master
GO
DROP DATABASE ProjectManagementSystem
GO
CREATE DATABASE ProjectManagementSystem;
GO
USE ProjectManagementSystem;
GO

CREATE TABLE roles
(
	Role_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Role_Name nvarchar(30) UNIQUE NOT NULL,

);
CREATE TABLE departments
(
	Department_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Department_Name nvarchar(50) UNIQUE NOT NULL,
);

CREATE TABLE employees
(
	Employee_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	First_Name nvarchar(30) NOT NULL,
	Last_Name nvarchar(30) NOT NULL,
	Middle_Name nvarchar(30),
	Date_of_Birth date NOT NULL,
	Gender bit NOT NULL ,
	Phone_Number nvarchar(15) NOT NULL,
	Email nvarchar(50) NOT NULL,
	House_Number int NOT NULL,
	Street_Name nvarchar(50) NOT NULL,
	City nvarchar(30) NOT NULL,
	_State nvarchar(15) NOT NULL,
	Zipcode int NOT NULL,
	Employee_Status varchar(12) DEFAULT 'EMPLOYED' CHECK( Employee_Status IN ('EMPLOYED', 'NOTEMPLOYED')) NOT NULL, 
	UserID nvarchar(100) UNIQUE,
	UserPassword nvarchar(100),
	Role_ID int FOREIGN KEY REFERENCES roles(Role_ID) NOT NULL,
	Department_ID int FOREIGN KEY REFERENCES departments(Department_ID) NOT NULL,
	Payrate DECIMAL(10,2),
	Employee_Photo nvarchar(100) DEFAULT('user_profile'),
	Created_At date DEFAULT GETDATE() NOT NULL,
	Last_Changed_By nvarchar(100),
	Last_Updated_At datetime,
);

CREATE TABLE customers
(
	Customer_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Title nvarchar(8) CHECK( Title IN ('Mr.', 'Ms.','Mrs.','Miss','Dr.')),
	First_Name nvarchar(30) NOT NULL,
	Last_Name nvarchar(30) NOT NULL,
	Middle_Name nvarchar(30),
	Date_of_Birth date NOT NULL,
	Phone_Number nvarchar(10) UNIQUE NOT NULL,
	Gender bit NOT NULL,
	Email nvarchar(50) NOT NULL,
	Customer_Address nvarchar(100) NOT NULL,
	Note nvarchar(100),
	Created_At datetime DEFAULT GETDATE(),
	Last_Changed_By nvarchar(100),
	Last_Updated_At datetime,
);



CREATE TABLE project_status
(
	Project_Status_ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Project_Status_Description nvarchar(50) UNIQUE,
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
CREATE TABLE project_manager
(
	ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Project_ID int FOREIGN KEY REFERENCES projects(Project_ID),
	Employee_ID int FOREIGN KEY REFERENCES employees(Employee_ID),
);

CREATE TABLE on_project
(
	On_project_ID int PRIMARY KEY IDENTITY(1,1),
	Project_ID int FOREIGN KEY REFERENCES projects(Project_ID),
	Date_Start date NOT NULL,
	Date_End date DEFAULT NULL,
	Customer_ID int FOREIGN KEY REFERENCES customers(Customer_ID),
);



CREATE TABLE department_managers
(
	Department_ID int UNIQUE FOREIGN KEY REFERENCES departments(Department_ID),
	Employee_ID int UNIQUE FOREIGN KEY REFERENCES employees(Employee_ID),
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

CREATE TABLE milestones -- tasks can have a milestone ID, when all tasks related to a milestone are complete, milestone is accomplished
(
	ID int PRIMARY KEY NOT NULL IDENTITY(1,1),
	Project_ID int FOREIGN KEY REFERENCES projects(Project_ID),
	Milestones_Name varchar(60) NOT NULL,
	Milestones_Expiration_Date datetime NOT NULL,
	Milestones_Status varchar(17) DEFAULT 'No Assigned Tasks' CHECK(Milestones_Status IN ('No Assigned Tasks', 'In Progress', 'Completed')) NOT NULL,
	Total_Minutes int DEFAULT 0,
);

CREATE TABLE tasks
(
	Task_ID int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	Task_Name varchar(30),
	Task_Description varchar(255),
	Total_Minutes int DEFAULT 0,
	Project_ID int FOREIGN KEY REFERENCES projects(Project_ID),
	Priority int,
	Task_Status varchar(12) CHECK( Task_Status IN ('Started', 'Processing', 'Delay', 'Need Support', 'Completed')),
	Employee_ID int FOREIGN KEY REFERENCES employees(Employee_ID),
	Milestone_ID int FOREIGN KEY REFERENCES milestones(ID),
	Task_Planned_Start_Date date,
	Task_Planned_End_Date date,
	Planned_Budget decimal(10,2),
	Actual_Start_Date date DEFAULT NULL,
	Actual_End_Date date DEFAULT NULL,
	Actual_Budget decimal(10,2) DEFAULT NULL,
	Created_At datetime DEFAULT GETDATE(),
	Last_Changed_By varchar(30),
	Last_Updated_At datetime,
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





CREATE TABLE preceding_task
(
	ID int PRIMARY KEY,
	Task_ID int FOREIGN KEY REFERENCES tasks(Task_ID),
	Preceding_Task_ID int FOREIGN KEY REFERENCES tasks(Task_ID),
	
);


CREATE TABLE activity
(
	Activity_ID int PRIMARY KEY IDENTITY(1,1),
	Activity_Name nvarchar(255),
	Task_ID int FOREIGN KEY REFERENCES tasks(Task_ID),
	Priority int,
	Activity_Description int,
	Task_Planned_Start_Date date,
	Task_Planned_End_Date date,
	Planned_Budget decimal(10,2),
	Actual_Start_Date date DEFAULT NULL,
	Actual_End_Date date DEFAULT NULL,
	Actual_Budget decimal(10,2) DEFAULT NULL,
);

CREATE TABLE preceding_activity
(
	ID int PRIMARY KEY,
	Activity_ID int FOREIGN KEY REFERENCES activity(Activity_ID),
	Preceding_Activity_ID int FOREIGN KEY REFERENCES activity(Activity_ID),	
);

CREATE TABLE assigned
(
	Assign_ID int PRIMARY KEY IDENTITY(1,1),
	Activity_ID int FOREIGN KEY REFERENCES activity(Activity_ID),
	Employee_ID int FOREIGN KEY REFERENCES employees(Employee_ID),
);
GO
CREATE TRIGGER elapsed_time_in_timesheet
	ON time_sheet
    AFTER INSERT
    AS
	BEGIN
	-- add upddates for milestones
    UPDATE projects SET projects.Total_Minutes = projects.Total_Minutes + (SELECT SUM(inserted.Minuits_elapsed) FROM inserted WHERE inserted.Project_ID = projects.Project_ID) WHERE projects.Project_ID IN (SELECT Project_ID FROM inserted)
	UPDATE projects SET projects.Money_spent = projects.Money_spent + (SELECT SUM(inserted.Minuits_elapsed *  (employees.Payrate / 60)) FROM inserted, employees WHERE inserted.Employee_ID = employees.Employee_ID AND inserted.Project_ID = projects.Project_ID) WHERE projects.Project_ID IN (SELECT Project_ID FROM inserted) 
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

-- add trigger to update milestone status based on inserts/updates on tasks table


INSERT INTO dbo.roles
	(Role_Name)
	VALUES
	('Department Manager'),
	('Project Manager'),
	('Team Leader'),
	('Team Member')



INSERT INTO dbo.customers
	(Title,First_Name,Last_Name,Middle_Name,Date_of_Birth,Phone_Number,Gender,Email,Customer_Address)
	VALUES
	('Mr.','Mario', 'Carlson','P','01/30/1990',2192000277,1,'mariocarlson@yahoo.com','9871 North Gainsway Ave, Rowlett, TX 75088'),
	('Mr.','Kurt', 'Harper','T','05/10/1995',2192248123,1,'kurtharper@gmail.com','9970 Linden Drive, Newport News, VA 23601'),
	('Ms.','Susan', 'Young','F','02/15/1980',6127493856,0,'youngsusan@hotmail.com','72 Sulphur Springs Ave, Lenoir, NC 28645')
INSERT INTO dbo.departments
	(Department_Name)
	VALUES
	('Information Technology'),
	('Human Resource Management'),
	('Accounting'),
	('Marketing')

INSERT INTO dbo.employees
	(First_Name,Last_Name,Middle_Name,Date_of_Birth,Gender,Phone_Number,Email,House_Number,Street_Name,City,_State,Zipcode,Role_ID,Department_ID, UserID,UserPassword, Payrate,Employee_Photo)
	VALUES
	('Tony','Hoang','T','08/21/1992',1,7133672444,'tt.hoang2108@gmail.com','11111','Beechnut Street','Houston','TX','77077', 1,1,'tonyhoang92',123456789,200.50,'tonyhoang92'),	
	('Emily','Diaz','L','04/12/1980',0,7133452998,'emily.diaz@gmail.com','12580','Boone Road','Sugar Land', 'TX','77089',1,2,'emilydiaz80',12345678,150.15,'emilydiaz80'),
	('Vincenzo','Mcleod','C','12/12/1990',1,7137463578,'vincenzo.mcleod@hotmail.com','10 ','Peg Shop Dr','Logansport', 'IN','46947',1,3,'vincenzomcleod90',12345678,100.5,'vincenzomcleod90'),
	('Dagda','Roxana','R','12/12/1995',1,7137263668,'dagda.roxana@gmail.com','25792 ','Gates St','Bedford', 'OH','44146',1,4,'dagdaroxana95',12345678,12.5,'dagdaroxana95'),
	('Ethan','Horace','V','03/2/1982',1,7131263578,'ethan.horace@gmail.com','1588 ','Bear Hill Rd','Chichester', 'NH','03258',2,2,'ethanhorace82',12345678,100.5,'ethanhorace82'),
	('Garrett','Ginnie','W','05/1/1999',0,7131263999,'garrett.ginnie@gmail.com','130','Stillwater Ave #8','Orono', 'ME','04473',4,3,'garrettginnie99',12345678,105.5,'garrettginnie99'),
	('Thomas','Renita','Z','10/11/1993',1,4179673422,'thomas.renita@gmail.com','8520','SE 158th St','Summerfield', 'FL','34491',4,4,'thomasrenita93',12345678,11.5,'thomasrenita93'),
	('Indie','Kayley','N','09/11/1988',0,6302139063,'indie.kayley@gmail.com','4031','Lakeside Dr','Hanover Park', 'IL','60133',3,4,'indiekayley88',12345678,12.5,'indiekayley88'),
	('Daliborka','Emma','A','04/3/1991',0,9395397217,'daliborka.emma@hotmail.com','868','W. Lafayette St.','Royersford', 'PA','19468',4,4,'daliborkaemma91',12345678,13.5,'daliborkaemma91'),
	('Aemiliana','Lucanus','K','07/3/1990',1,5086994447,'aemiliana.lucanus@yahoo.com','33','Sunset Ave.','Wilkes Barre', 'PA','18702',4,1,'aemilianalucanus90',12345678,16.5,'aemilianalucanus90')

INSERT INTO dbo.department_managers
(Employee_ID,Department_ID)
	VALUES
	(1,1),
	(2,2),
	(3,3),
	(4,4)
INSERT INTO dbo.department_employees
	(Employee_ID,Department_ID)
	VALUES
	(5,1),
	(6,2),
	(7,3),
	(8,4)
INSERT INTO dbo.project_status
	(Project_Status_Description)
	VALUES
	('Proposed'),
	('Active'),
	('On Hold'),
	('Completed'),
	('Canceled')
INSERT INTO dbo.projects
	(Project_Name, Project_Description, Project_Manager_ID,Project_Status_ID,Project_Active_Status,Customer_ID,Budget,Planned_Start_Date,Actual_Start_Date,Created_By)
	VALUES
	('Web Application Design', 'UI/UX Design', 1,2,'ACTIVE',1,10000,'01/30/2021','02/15/2021',1),
	('Online Advertise', 'Advertise New Products', 4,2,'ACTIVE',2,20000,'02/20/2021','02/25/2021',4)

INSERT INTO dbo.milestones
	(Project_ID, Milestones_Name, Milestones_Expiration_Date)
	VALUES
	(1, 'Conceptual Design meetings with Customer', DATEADD(day, 45, GETDATE())),
	(2, 'Conceptual Design meetings with Customer', DATEADD(day, 45, GETDATE())),
	(2, 'Create Prototype',  DATEADD(day, 21, GETDATE()))

INSERT INTO dbo.tasks -- task with no associated project
	(Task_Name, Task_Description, Task_Planned_End_Date, Total_Minutes, Task_Status)
	VALUES
	('Clean Office', 'Clean the office', DATEADD(day, 5, GETDATE()), 0, 'Delay')

INSERT INTO dbo.tasks -- tasks with associated projects & milestones
	(Task_Name, Task_Description, Task_Planned_End_Date, Total_Minutes, Task_Status, Employee_ID, Project_ID, Milestone_ID)
	VALUES
	('DEBUG CODE', 'Stare at screen and work', DATEADD(day, 30, GETDATE()), 0, 'Started', 1, 2,  3),
	('Design Meeting with Susan', 'Design Meeting with Susan', DATEADD(day, 2, GETDATE()), 0, 'Completed', 3, 2, 2)

INSERT INTO dbo.expenses
	(Expense_Name, Expense_Description, Cost, Project_ID)
	VALUES
	('Donuts', 'for the office', 12.50, 1),
	('AWS Servers', 'To host KURTBOOK for development and testing', 100.00, 1),
	('AWS Servers', 'To host All the single Ladies for development and testing', 100.00, 2)

-- Test queries 
SELECT * FROM employees
SELECT * FROM employees LEFT JOIN roles ON employees.Role_ID=roles.Role_ID LEFT JOIN departments ON employees.Department_ID=departments.Department_ID LEFT JOIN (SELECT Employee_ID as Manager_ID, Department_ID FROM department_managers) AS Manager ON Manager.Department_ID=employees.Department_ID WHERE employees.Employee_ID=6
SELECT * FROM employees LEFT JOIN department_managers    ON employees.Employee_ID= department_managers.Employee_ID WHERE employees.Department_ID =3 AND employees.Role_ID=1

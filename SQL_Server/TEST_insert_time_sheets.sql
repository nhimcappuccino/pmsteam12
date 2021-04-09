USE master
GO
USE ProjectMangementSystem;
GO

INSERT INTO dbo.time_sheet
	(Clock_in, Clock_out, Work_Done, Task_ID, Project_ID, Employee_ID)
	VALUES
	(GETDATE(), DATEADD(hour, 8, GETDATE()), 'I stared at my screen for 8 hours', 1, 1, 1),
	(GETDATE(), DATEADD(hour, 4, GETDATE()), 'Design meetting with Susan', 3, 2, 3)

Select * FROM dbo.time_sheet
Select * from dbo.projects
Select * from dbo.tasks
USE [master]
GO
/****** Object:  Database [ProjectMangementSystem]    Script Date: 3/22/2021 5:53:27 PM ******/
CREATE DATABASE [ProjectMangementSystem]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProjectMangementSystem', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ProjectMangementSystem.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProjectMangementSystem_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ProjectMangementSystem_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [ProjectMangementSystem] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProjectMangementSystem].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ProjectMangementSystem] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET ARITHABORT OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [ProjectMangementSystem] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ProjectMangementSystem] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ProjectMangementSystem] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ProjectMangementSystem] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ProjectMangementSystem] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ProjectMangementSystem] SET  MULTI_USER 
GO
ALTER DATABASE [ProjectMangementSystem] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ProjectMangementSystem] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ProjectMangementSystem] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ProjectMangementSystem] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ProjectMangementSystem] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ProjectMangementSystem] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ProjectMangementSystem] SET QUERY_STORE = OFF
GO
USE [ProjectMangementSystem]
GO
/****** Object:  Table [dbo].[customers]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers](
	[Customer_ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](8) NULL,
	[First_Name] [nvarchar](30) NOT NULL,
	[Last_Name] [nvarchar](30) NOT NULL,
	[Middle_Name] [nvarchar](30) NULL,
	[Date_of_Birth] [date] NOT NULL,
	[Phone_Number] [nvarchar](15) NOT NULL,
	[Gender] [bit] NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Customer_Address] [nvarchar](100) NOT NULL,
	[Note] [varchar](100) NULL,
	[Created_At] [datetime] NULL,
	[Last_Changed_By] [varchar](1) NULL,
	[Last_Updated_At] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Customer_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone_Number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[department_employees]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[department_employees](
	[Employee_ID] [int] NULL,
	[Department_ID] [int] NULL,
	[Employee_Start_Date] [date] NULL,
	[Employee_End_Date] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[department_managers]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[department_managers](
	[Department_ID] [int] NULL,
	[Employee_ID] [int] NULL,
	[Manager_Start_Date] [date] NULL,
	[Manager_End_Date] [date] NULL,
UNIQUE NONCLUSTERED 
(
	[Employee_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[departments]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[departments](
	[Department_ID] [int] IDENTITY(1,1) NOT NULL,
	[Department_Name] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Department_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[employees]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employees](
	[Employee_ID] [int] IDENTITY(1,1) NOT NULL,
	[First_Name] [nvarchar](30) NOT NULL,
	[Last_Name] [nvarchar](30) NOT NULL,
	[Middle_Name] [nvarchar](30) NULL,
	[Date_of_Birth] [date] NOT NULL,
	[Gender] [bit] NOT NULL,
	[Phone_Number] [nvarchar](15) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[House_Number] [int] NOT NULL,
	[Street_Name] [varchar](50) NOT NULL,
	[City] [varchar](30) NOT NULL,
	[_State] [varchar](15) NOT NULL,
	[Zipcode] [int] NOT NULL,
	[Employee_Photo] [image] NULL,
	[Employee_Status] [bit] NOT NULL,
	[UserID] [varchar](100) NULL,
	[UserPassword] [varchar](100) NULL,
	[Role_ID] [int] NOT NULL,
	[Created_At] [datetime] NOT NULL,
	[Last_Changed_By] [varchar](1) NULL,
	[Last_Updated_At] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Employee_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Role_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[financial]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[financial](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[_Name] [nvarchar](100) NULL,
	[Financial_Description] [nvarchar](100) NULL,
	[Project_ID] [int] NULL,
	[Milestone_ID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[milestones]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[milestones](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Project_ID] [int] NULL,
	[Milestones_Name] [varchar](1) NOT NULL,
	[Milestones_Expiration_Date] [datetime] NOT NULL,
	[Milestone_Status_ID] [int] NULL,
	[Total_Hours] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[milestones_status]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[milestones_status](
	[Milestone_Status_ID] [int] IDENTITY(1,1) NOT NULL,
	[Milestones_Status_Description] [varchar](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Milestone_Status_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[project_status]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[project_status](
	[Project_Status_ID] [int] IDENTITY(1,1) NOT NULL,
	[Project_Status_Description] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Project_Status_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[projects]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[projects](
	[Project_ID] [int] IDENTITY(1,1) NOT NULL,
	[Project_Name] [varchar](1) NOT NULL,
	[Project_Description] [nvarchar](1) NOT NULL,
	[Project_Manager_ID] [int] NOT NULL,
	[Project_Status_ID] [int] NOT NULL,
	[Rate_Per_Hour] [int] NOT NULL,
	[Project_Active_Status] [bit] NOT NULL,
	[Customer_ID] [int] NOT NULL,
	[Budget] [int] NOT NULL,
	[Total_Hour] [int] NOT NULL,
	[Created_At] [datetime] NULL,
	[Created_By] [int] NULL,
	[Last_Changed_By] [varchar](1) NULL,
	[Last_Updated_At] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Project_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Project_Manager_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[Role_ID] [int] IDENTITY(1,1) NOT NULL,
	[Role_Name] [nvarchar](30) NOT NULL,
	[Last_Changed_By] [varchar](1) NULL,
	[Last_Updated_At] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Role_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[task_status]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[task_status](
	[Task_Status_ID] [int] IDENTITY(1,1) NOT NULL,
	[Task_Status_Description] [varchar](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Task_Status_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tasks]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tasks](
	[Task_ID] [int] IDENTITY(1,1) NOT NULL,
	[Task_Name] [varchar](1) NULL,
	[Instructions] [varchar](1) NULL,
	[Expiration_Date] [datetime] NOT NULL,
	[Total_Hours] [int] NULL,
	[Task_Status_ID] [int] NULL,
	[Employee_ID] [int] NULL,
	[Created_At] [datetime] NULL,
	[Last_Changed_By] [varchar](1) NULL,
	[Last_Updated_At] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Task_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[time_sheet]    Script Date: 3/22/2021 5:53:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[time_sheet](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Time_Sheet_Date] [date] NOT NULL,
	[Time_Sheet_Time] [time](7) NOT NULL,
	[Work_Done] [varchar](100) NULL,
	[Task_ID] [int] NULL,
	[Project_ID] [int] NULL,
	[Employee_ID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[customers] ADD  DEFAULT (getdate()) FOR [Created_At]
GO
ALTER TABLE [dbo].[department_employees] ADD  DEFAULT (NULL) FOR [Employee_End_Date]
GO
ALTER TABLE [dbo].[department_managers] ADD  DEFAULT (NULL) FOR [Manager_End_Date]
GO
ALTER TABLE [dbo].[employees] ADD  DEFAULT ((1)) FOR [Employee_Status]
GO
ALTER TABLE [dbo].[employees] ADD  DEFAULT (getdate()) FOR [Created_At]
GO
ALTER TABLE [dbo].[projects] ADD  DEFAULT ((0)) FOR [Rate_Per_Hour]
GO
ALTER TABLE [dbo].[projects] ADD  DEFAULT ((1)) FOR [Project_Active_Status]
GO
ALTER TABLE [dbo].[projects] ADD  DEFAULT (getdate()) FOR [Created_At]
GO
ALTER TABLE [dbo].[tasks] ADD  DEFAULT (getdate()) FOR [Created_At]
GO
ALTER TABLE [dbo].[department_employees]  WITH CHECK ADD FOREIGN KEY([Department_ID])
REFERENCES [dbo].[departments] ([Department_ID])
GO
ALTER TABLE [dbo].[department_employees]  WITH CHECK ADD FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[employees] ([Employee_ID])
GO
ALTER TABLE [dbo].[department_managers]  WITH CHECK ADD FOREIGN KEY([Department_ID])
REFERENCES [dbo].[departments] ([Department_ID])
GO
ALTER TABLE [dbo].[department_managers]  WITH CHECK ADD FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[employees] ([Employee_ID])
GO
ALTER TABLE [dbo].[employees]  WITH CHECK ADD FOREIGN KEY([Role_ID])
REFERENCES [dbo].[roles] ([Role_ID])
GO
ALTER TABLE [dbo].[financial]  WITH CHECK ADD FOREIGN KEY([Milestone_ID])
REFERENCES [dbo].[milestones] ([ID])
GO
ALTER TABLE [dbo].[financial]  WITH CHECK ADD FOREIGN KEY([Project_ID])
REFERENCES [dbo].[projects] ([Project_ID])
GO
ALTER TABLE [dbo].[milestones]  WITH CHECK ADD FOREIGN KEY([Milestone_Status_ID])
REFERENCES [dbo].[milestones_status] ([Milestone_Status_ID])
GO
ALTER TABLE [dbo].[milestones]  WITH CHECK ADD FOREIGN KEY([Project_ID])
REFERENCES [dbo].[projects] ([Project_ID])
GO
ALTER TABLE [dbo].[projects]  WITH CHECK ADD FOREIGN KEY([Created_By])
REFERENCES [dbo].[employees] ([Employee_ID])
GO
ALTER TABLE [dbo].[projects]  WITH CHECK ADD FOREIGN KEY([Customer_ID])
REFERENCES [dbo].[customers] ([Customer_ID])
GO
ALTER TABLE [dbo].[projects]  WITH CHECK ADD FOREIGN KEY([Project_Manager_ID])
REFERENCES [dbo].[employees] ([Employee_ID])
GO
ALTER TABLE [dbo].[projects]  WITH CHECK ADD FOREIGN KEY([Project_Status_ID])
REFERENCES [dbo].[project_status] ([Project_Status_ID])
GO
ALTER TABLE [dbo].[tasks]  WITH CHECK ADD FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[employees] ([Employee_ID])
GO
ALTER TABLE [dbo].[tasks]  WITH CHECK ADD FOREIGN KEY([Task_Status_ID])
REFERENCES [dbo].[task_status] ([Task_Status_ID])
GO
ALTER TABLE [dbo].[time_sheet]  WITH CHECK ADD FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[employees] ([Employee_ID])
GO
ALTER TABLE [dbo].[time_sheet]  WITH CHECK ADD FOREIGN KEY([Project_ID])
REFERENCES [dbo].[projects] ([Project_ID])
GO
ALTER TABLE [dbo].[time_sheet]  WITH CHECK ADD FOREIGN KEY([Task_ID])
REFERENCES [dbo].[tasks] ([Task_ID])
GO
ALTER TABLE [dbo].[customers]  WITH CHECK ADD CHECK  (([Title]='Dr.' OR [Title]='Miss' OR [Title]='Mrs.' OR [Title]='Ms.' OR [Title]='Mr.'))
GO
USE [master]
GO
ALTER DATABASE [ProjectMangementSystem] SET  READ_WRITE 
GO

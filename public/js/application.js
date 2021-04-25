const burgerBtn = document.getElementById('burger');
const navbar = document.getElementById('navbar__list')
const burgerBtnAnimation = document.getElementById('burger__button');
const dateSelection = document.querySelectorAll(".datepickers");
const periodSelection = document.getElementById('period');
const filterCriteria = document.getElementById('filterCriteria');
const employeeDetailList = document.getElementById('employeeDetailList');
const generateReportBtn = document.getElementById('generateReportBtn');
const reportPeriod = document.getElementById('period');
const searchKeywords = document.getElementById('searchKeywords');
const departmentNumber = document.getElementById('departmentNumber');
const newEmployeeInfoSubmitBtn = document.getElementById('newEmployeeInfoSubmitBtn');
// Dropdown menu
const dropdownMenuBtn = document.getElementById('user__dropdown__menu');
const dropdownMenu = document.getElementById('header__dropdown');
//variables to update photo buttons
const updateEmployeePhotoAccessBtn = document.getElementById('updateEmployeePhotoAccessBtn');
const updateEmployeePhotoBtn = document.getElementById('updateEmployeePhotoBtn');
const updateEmployeePhotoForm = document.getElementById('updateEmployeePhotoForm');
let imageFile = document.getElementById('imageFile');
const updatePhotoFormCancel = document.getElementById('updatePhotoFormCancel');

const editEmployeeContactData = document.getElementById('editEmployeeContactData');
const editEmployeePersonalData = document.getElementById('editEmployeePersonalData');
const editEmployeeWorkData = document.getElementById('editEmployeeWorkData');

const contactDataInputBox = document.querySelectorAll('.ContactDataInputBox');
const personalDataInputBox = document.querySelectorAll('.personalDataInputBox');
const WorkDataInputBox = document.querySelectorAll('.WorkDataInputBox');

const saveNewEmployeeWorkData = document.getElementById('saveNewEmployeeWorkData');
const saveNewEmployeeContactData = document.getElementById('saveNewEmployeeContactData');
const saveNewEmployeePersonalData = document.getElementById('saveNewEmployeePersonalData');

const personalDataCard = document.getElementById('detailInformationGroup__personalData');
const contactDataCard = document.getElementById('detailInformationGroup__contact');
const workDataCard = document.getElementById('detailInformationGroup__workData');

const personalContactBtn = document.getElementById('detailInformationGroup__control--personal');
const workBtn = document.getElementById('detailInformationGroup__control--work');


//Form variables and validation 
const Password = document.getElementById('newEmployeePassword');
const PasswordConfirm = document.getElementById('newEmployeePasswordConfirm');
const createNewEmployeeNotification = document.getElementById('createNewEmployeeNotification');
const tickMarks = document.querySelectorAll('.isAMatchPair');

//UPDATE EMPLOYEE INFORMATION
const updateEmployeeInformationNotification = document.getElementById('updateEmployeeInformationNotification');


//CREATE NEW PROJECT RESTRICTION FOR DATETIMEPICKER
const createNewProjectFormBtn = document.getElementById('createNewProjectFormBtn');
const addNewProjectForm = document.getElementById('addNewProjectForm');
const createNewProjectBtnSubmit = document.getElementById('createNewProjectBtn--submit');
const createNewProjectBtnCancel = document.getElementById('createNewProjectBtn--cancel');
const addNewProjectGroup = document.querySelectorAll('.addNewProjectGroup');

const projectsPage = document.getElementById('projects');
//Show all type of projects
const activeProjectsBtn = document.getElementById('activeProjectsBtn');
const completedProjectsBtn = document.getElementById('completedProjectsBtn');
const otherProjectsBtn = document.getElementById('otherProjectsBtn');
const projectListDisplay = document.getElementById('projectList');


//NEW PROJECT CREATION FORM
const newProjectPlannedStartDate = document.getElementById('newProjectPlannedStartDate');
const newProjectPlannedEndDate = document.getElementById('newProjectPlannedEndDate');
const newProjectName = document.getElementById('newProjectName');
const newProjectSummary = document.getElementById('newProjectSummary');
const newProjectManager = document.getElementById('newProjectManager');
const newProjectCustomer = document.getElementById('newProjectCustomer');
const newProjectBudget = document.getElementById('newProjectBudget');
const projectPageNotification = document.getElementById('projectPageNotification');


//PROJECT DETAIL PAGE 

const milesstonesGroup__NoassignedTasks = document.getElementById('milesstonesGroup__NoassignedTasks');
const milesstonesGroup__inprogress = document.getElementById('milesstonesGroup__inprogress');
const milesstonesGroup__completed = document.getElementById('milesstonesGroup__completed');
const milestonesDetailList = document.getElementById('milestonesDetailList');
const projectMembersList = document.getElementById('projectDetailsBody__members--list');
const milestonesListTable = document.getElementById('milestonesListTable');
const seeAllTasksBtn = document.querySelectorAll('.seeAllTasksBtn');
const tasksDetailList = document.getElementById('tasksDetailList');

//ADD MILESTONE, ADD TASKS
const addNewMileStoneBtn = document.getElementById('addNewMileStoneBtn');
const addNewTaskBtn = document.getElementById('addNewTaskBtn');
const addNewMileStoneForm = document.getElementById('addNewMileStoneForm');
const addNewTaskForm = document.getElementById('addNewTaskForm');
const confirmationForm = document.getElementById('confirmationForm');
const cancelMileStoneCreation = document.getElementById('cancelMileStoneCreation');
const cancelNewTaskBtn = document.getElementById('cancelNewTaskBtn');
const cancelationOfDeletion = document.getElementById('cancelationOfDeletion');
const confirmationOfDeletion = document.getElementById('confirmationOfDeletion');
const confirmMileStoneCreation = document.getElementById('confirmMileStoneCreation');
let removeMilestoneBtn = document.querySelectorAll('.removeMilestoneBtn');
const confirmationCreateTaskBtn = document.getElementById('confirmationCreateTaskBtn');

const deactivateProjectBtn = document.querySelector('.deactivateProjectBtn');
// ADD EXPENSE FOR THE PROJECT 
const addNewExpenseBtn = document.getElementById('addNewExpenseBtn');
const confirmationCreateExpenseBtn = document.getElementById('confirmationCreateExpenseBtn');
const cancelNewExpenseBtn = document.getElementById('cancelNewExpenseBtn');
const addNewExpenseForm = document.getElementById('addNewExpenseForm');
let newExpenseName = document.getElementById('newExpenseName');
let newExpenseDescription = document.getElementById('newExpenseDescription');
let newExpenseCost = document.getElementById('newExpenseCost');
let newExpenseForProject = document.getElementById('newExpenseForProject');

//Remove all previous dates 
if (newProjectPlannedStartDate || newProjectPlannedEndDate) {
    newProjectPlannedStartDate.min = new Date().toISOString().split('T')[0];
    newProjectPlannedEndDate.min = new Date().toISOString().split('T')[0];
}

// Navbar Button function
if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
        navbar.classList.toggle('navbar__expand');
        burgerBtnAnimation.classList.toggle('burger__clicked')
    });
}


//Enable period selection
if (periodSelection) {
    periodSelection.addEventListener('change', () => {
        dateSelection.forEach(option => {
            option.disabled = true;
        })
        const value = periodSelection.value;
        if (value === 'specificdate') {
            dateSelection[0].disabled = false;

        } else if (value === 'days') {
            dateSelection[1].disabled = false;
            dateSelection[2].disabled = false;
        } else if (value == 'month') {
            dateSelection[3].disabled = false;

        }
    });

};
//SUPPORT FUNCTIONS
function displayNotification(notificationBox, className, message, status) {
    window.setTimeout(() => {
        notificationBox.innerHTML = message;
        notificationBox.classList.add(`${className}`, `notification_shown_${status}`);

    }, 50);
    window.setTimeout(() => {
        notificationBox.classList.remove(`${className}`);
        notificationBox.classList.remove(`notification_shown_${status}`);
    }, 2000);
};
function formatDate(date) {
    let getDate = date.split('-')[2];
    let getMonth = new Date(date.split('-')[1]).toLocaleString('en-US', { month: 'long' });
    let getYear = date.split('-')[0];
    let dateString = `${getMonth} ${getDate}, ${getYear}`;
    return dateString;
}

function convertDateFormat(date) {
    let day;
    let month;
    let year;
    day = date.slice(8, 10);
    month = date.slice(5, 7);
    year = date.slice(0, 4);
    return month + day + year;
};
function convertMonthYearFormat(input, date) {
    let month = input.slice(5, 7);
    let year = input.slice(0, 4);
    return month + date + year;
}
function getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return today = mm + dd + yyyy;
};

function getDaysInMonth(input) {
    let month = input.slice(5, 7) - 1;
    let year = input.slice(0, 4);
    let isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

function convertTextDateToDate(input) {
    let month = input.split(' ')[0];
    let date = input.split(' ')[1].replace(',', '');
    let year = input.split(' ')[2];
    let convertMonth;
    switch (month) {
        case 'January':
            convertMonth = 01;
            break;
        case 'February':
            convertMonth = 02;
            break;
        case 'March':
            convertMonth = 03;
            break;
        case 'April':
            convertMonth = 04;
            break;
        case 'May':
            convertMonth = 05;
            break;
        case 'June':
            convertMonth = 06;
            break;
        case 'July':
            convertMonth = 07;
            break;
        case 'August':
            convertMonth = 08;
            break;
        case 'September':
            convertMonth = 09;
            break;
        case 'October':
            convertMonth = 10;
            break;
        case 'November':
            convertMonth = 11;
            break;
        case 'December':
            convertMonth = 12;
            break;
    }
    const fullDate = `${year}-${convertMonth.toString()}-${date}`;
    return fullDate;
}

function replaceEmptySpace(string) {
    return string.split(' ').join('&');
};


//DROPDOWN MENU FUNCTION
if (dropdownMenuBtn) {
    dropdownMenuBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('showDropdownmenu');
    });
};

//DASHBOARD FUNCTION BUTTONS

// Create our number formatter.
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const generalReport = async () => {
    let reportPeriodValue = reportPeriod.value;
    let today = getToday();


    let specificdate = convertDateFormat(document.getElementById('datetimepickerdate').value);
    let fromDate;
    let toDate;
    let reportMonth = document.getElementById('datetimepickermonth').value;
    let totalDaysInMonth = getDaysInMonth(reportMonth);


    let fetchRequest;
    switch (reportPeriodValue) {
        case 'today':
            fetchRequest = `/api/v1/report/generalReport/today/ /${today}`;

            break;
        case 'specificdate':
            fetchRequest = `/api/v1/report/generalReport/specificdate/ /${specificdate}`;
            break;
        case 'days':
            fromDate = convertDateFormat(document.getElementById('datetimepickerdaysFromDate').value);
            toDate = convertDateFormat(document.getElementById('datetimepickerdaysToDate').value);
            fetchRequest = `/api/v1/report/generalReport/specificdate/days/${fromDate}/${toDate}`;
            break;
        case 'month':
            fromDate = convertMonthYearFormat(reportMonth, 01);
            toDate = convertMonthYearFormat(reportMonth, totalDaysInMonth);
            fetchRequest = `/api/v1/report/generalReport/specificdate/month/${fromDate}/${toDate}`;
            break;
    }
    try {
        const result = await fetch(`${fetchRequest}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await result.json();
        let response = data.todayReport;
        let totalNumberOfProjects = document.getElementById('totalNumberOfProjects');
        let totalNumberOfActiveEmployees = document.getElementById('totalNumberOfActiveEmployees');
        let totalNumberOfTasksInProgress = document.getElementById('totalNumberOfTasksInProgress');
        let totalNumberOfCosts = document.getElementById('totalNumberOfCosts');
        totalNumberOfProjects.innerHTML = Object.values(response.totalProject[0]);
        totalNumberOfActiveEmployees.innerHTML = Object.values(response.activeEmployees[0]);
        totalNumberOfTasksInProgress.innerHTML = Object.values(response.tasksInprogress[0]);
        totalNumberOfCosts.innerHTML = formatter.format(Object.values(response.totalCost[0]));
    } catch (err) { console.log(err) };
};

if (generateReportBtn) {
    generateReportBtn.addEventListener('click', () => {
        generalReport();
    });
};

// FETCH EMPLOYEES FROM SERVER
const renderEmployees = (employeesList) => {
    employeesList.forEach(emp => {
        let markup = `
            <tr>
                <td>${emp.Employee_ID}</td>
                <td>
                    <div class="centerImg"><img src="/img/${emp.Employee_Photo}.jpg" alt="employee__photo"
                            class="employee__photo">
                    </div>
                </td>
                <td>${emp.First_Name} ${emp.Last_Name} </td>
                <td>${emp.Department_Name}</td>
                <td>${emp.Role_Name}</td>
                <td><button class="moreInfoBtn">
                <a href="/api/v1/employee/getEmployeeDetail/${emp.Employee_ID}">
                Details
                </a>
                </button>
                </td>
            </tr>`;
        employeeDetailList.insertAdjacentHTML('beforeend', markup);
    });
};
const renderErrorMessage = (message) => {
    let errorMessage =
        `
        <tr>
            <td colspan=6>
            ${message}
            </td>
        </tr>
    `
    employeeDetailList.insertAdjacentHTML('beforeend', errorMessage);
};

const getAllEmployees = async () => {
    try {
        const result = await fetch('/api/v1/employee/getAllEmployees', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await result.json();
        let employees = [...data.data.recordset];

        renderEmployees(employees);

    } catch (err) { console.log(err) };
};


const getEmployeesBy = async (keyword, department) => {
    try {
        const result = await fetch(`/api/v1/employee/getEmployeesBy/${keyword}/${department}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await result.json();
        employees = [...data.data.recordset]
        if (data.status === 'Not Found') {
            renderErrorMessage(data.message);

        } else {
            let employees = [...data.data.recordset];
            renderEmployees(employees)
        }

    } catch (err) { console.log(err) };
};


if (filterCriteria) {
    filterCriteria.addEventListener('click', e => {
        e.preventDefault();
        while (employeeDetailList.hasChildNodes()) {
            employeeDetailList.removeChild(employeeDetailList.firstChild);
        };

        // CRITERIA CONDITIONS 
        if (searchKeywords.value === "" && departmentNumber.value === "all") {
            getAllEmployees();
        } else if (searchKeywords.value.trim() === "" && departmentNumber.value !== "all") {
            getEmployeesBy("ISNOTNULL", departmentNumber.value);
        } else if (searchKeywords.value.trim() !== "" && departmentNumber.value === "all") {
            getEmployeesBy(searchKeywords.value.trim(), "ISNOTNULL");
        } else if (searchKeywords.value.trim() !== "" && departmentNumber.value !== "all") {
            getEmployeesBy(searchKeywords.value.trim(), departmentNumber.value);
        };
    });
};


//Check Password and Password Confirm are match
if (PasswordConfirm) {
    PasswordConfirm.addEventListener('change', () => {
        if (Password.value !== PasswordConfirm.value) {
            PasswordConfirm.value = '';
            Password.value = '';
        } else {

            tickMarks.forEach(tick => {
                tick.classList.add('isAMatchPairChecked');
            });
        };
    });

};

//CREATE NEW EMPLOYEE FUNCTION CALLED IF CLICK
const createNewEmployee = async (bodyData) => {
    try {
        const result = await fetch(`/api/v1/employee/createNewEmployee`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData),
            });
        const response = await result.json();
        if (response.status === 'Success') {
            displayNotification(createNewEmployeeNotification, 'createNewEmployeeNotification_shown', response.message, 'success');
            setTimeout(() => {
                location.assign('/employees')
            }, 4000);
        } else if (response.status === 'Bad Resquest') {
            displayNotification(createNewEmployeeNotification, 'createNewEmployeeNotification_shown', response.message, 'failed');
        };
    } catch (err) {
        console.log(err);
    };

};

if (newEmployeeInfoSubmitBtn) {
    newEmployeeInfoSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let bodyData = new Object();
        bodyData.First_Name = document.getElementById('newEmployeeFirstName').value;
        bodyData.Last_Name = document.getElementById('newEmployeeLastName').value;
        bodyData.Middle_Name = document.getElementById('newEmployeeMiddleName').value;
        bodyData.Date_of_Birth = document.getElementById('newEmployeeDateofBirth').value;
        bodyData.Gender = parseInt(document.getElementById('newEmployeeGender').value);
        bodyData.Phone_Number = parseInt(document.getElementById('newEmployeePhoneNumber').value);
        bodyData.Email = document.getElementById('newEmployeeEmail').value;
        bodyData.House_Number = parseInt(document.getElementById('newEmployeeHouseNumber').value);
        bodyData.StreetName = document.getElementById('newEmployeeStreetName').value;
        bodyData.City = document.getElementById('newEmployeeCity').value;
        bodyData.States = document.getElementById('newEmployeeState').value;
        bodyData.Zipcode = parseInt(document.getElementById('newEmployeeZipcode').value);
        bodyData.UserID = document.getElementById('newEmployeeUserID').value;
        bodyData.Password = document.getElementById('newEmployeePassword').value;
        bodyData.RoleID = parseInt(document.getElementById('newEmployeeRoleID').value);
        bodyData.Department = parseInt(document.getElementById('newEmployeeDepartment').value);
        bodyData.PayRate = parseFloat(document.getElementById('newEmployeePayRate').value);

        createNewEmployee(bodyData);

    });

};

//Edit personal, contact, or work data information functions
if (editEmployeeContactData || editEmployeePersonalData) {
    editEmployeeContactData.addEventListener('click', () => {
        contactDataInputBox.forEach(inputBox => {
            inputBox.disabled = false;

        });
        editEmployeeContactData.classList.add('removePencilBtn');
        saveNewEmployeeContactData.classList.add('saveInformationButton');
    });
    editEmployeePersonalData.addEventListener('click', () => {
        personalDataInputBox.forEach(inputBox => {
            inputBox.disabled = false;
        });
        editEmployeePersonalData.classList.add('removePencilBtn');
        saveNewEmployeePersonalData.classList.add('saveInformationButton');
    });

};

if (editEmployeeWorkData) {
    editEmployeeWorkData.addEventListener('click', () => {
        WorkDataInputBox.forEach(inputBox => {
            inputBox.disabled = false;
        });
        editEmployeeWorkData.classList.add('removePencilBtn');
        saveNewEmployeeWorkData.classList.add('saveInformationButton');
    });

};


//BUTTON TO DISPLAY BOXES
if (personalContactBtn || workBtn) {
    personalContactBtn.addEventListener('click', () => {
        if (workDataCard.classList.contains('showDetailTab')) {
            workDataCard.classList.add('removeDetailTab');
            setTimeout(function () {
                workDataCard.classList.remove('removeDetailTab');
                workDataCard.classList.remove('showDetailTab');
            }, 500);

            setTimeout(() => {
                personalDataCard.classList.add('showDetailTab');
                setTimeout(function () {
                    contactDataCard.classList.add('showDetailTab');

                }, 100);
            }, 500);



        } else {
            personalDataCard.classList.add('showDetailTab');
            setTimeout(function () {
                contactDataCard.classList.add('showDetailTab');

            }, 100);

        };


    });
    workBtn.addEventListener('click', () => {
        if (personalDataCard.classList.contains('showDetailTab') || contactDataCard.classList.contains('showDetailTab')) {
            personalDataCard.classList.add('removeDetailTab');
            setTimeout(() => {
                contactDataCard.classList.add('removeDetailTab');

            }, 250);

            setTimeout(() => {
                personalDataCard.classList.remove('showDetailTab');
                contactDataCard.classList.remove('showDetailTab');
                personalDataCard.classList.remove('removeDetailTab');
                contactDataCard.classList.remove('removeDetailTab');
                workDataCard.classList.add('showDetailTab');
            }, 500);

        } else {
            workDataCard.classList.add('showDetailTab');

        };
    });
};
// SAVE INFORMATION BUTTON => FETCH PATCH REQUEST
const updateEmployeeNewInformation = async (bodyData) => {
    try {
        const result = await fetch(`/api/v1/employee/updateEmployeeInformation/${bodyData.getEmployeeID}`,
            {
                method: `PATCH`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData),
            });

        displayNotification(updateEmployeeInformationNotification, 'updateEmployeeInformationBox_shown', 'Processing your update request', 'success');
        const data = await result.json();
        const response = data;
        if (response.status === 'Success') {
            setTimeout(() => {
                displayNotification(updateEmployeeInformationNotification, 'updateEmployeeInformationBox_shown', response.message, response.status.toLowerCase());
            }, 3000);
            setTimeout(() => {
                location.assign(`/api/v1/employee/getEmployeeDetail/${bodyData.getEmployeeID}`);
            }, 5000);

        } else if (response.status === 'Failed') {
            displayNotification(updateEmployeeInformationNotification, 'updateEmployeeInformationBox_shown', response.message, response.status.toLowerCase());
        };
    } catch (err) {
        console.log(err);
    };

};


if (saveNewEmployeeContactData || saveNewEmployeePersonalData || saveNewEmployeeWorkData) {
    let bodyData = new Object();
    bodyData.getEmployeeID = parseInt(document.getElementById('employeeGeneralInfo__group--id').innerHTML);
    const First_Name = document.getElementById('employeeDetailInfo--FirstName');
    const Last_Name = document.getElementById('employeeDetailInfo--LastName');
    const Middle_Name = document.getElementById('employeeDetailInfo--MiddleName');
    const Date_of_Birth = document.getElementById('employeeDetailInfo--Birthdate');
    const Gender = document.getElementById('employeeDetailInfo--Gender');
    const Phone_Number = document.getElementById('employeeDetailInfo--PhoneNumber');
    const Email = document.getElementById('employeeDetailInfo--Email');
    const House_Number = document.getElementById('employeeDetailInfo--HouseNumber');
    const StreetName = document.getElementById('employeeDetailInfo--StreetName');
    const City = document.getElementById('employeeDetailInfo--City');
    const States = document.getElementById('employeeDetailInfo--State');
    const Zipcode = document.getElementById('employeeDetailInfo--Zipcode');
    const UserID = document.getElementById('employeeDetailInfo--UserID');
    const Password = document.getElementById('employeeDetailInfo--Password');
    const RoleID = document.getElementById('employeeDetailInfo--RoleID');
    const Department = document.getElementById('employeeDetailInfo--DepartmentID');
    const PayRate = document.getElementById('employeeDetailInfo--Payrate');
    const EmployeeStatus = document.getElementById('employeeDetailInfo--EmployeeStatus');
    bodyData.First_Name = First_Name.value;
    bodyData.Last_Name = Last_Name.value;
    bodyData.Middle_Name = Middle_Name.value;
    bodyData.Date_of_Birth = convertTextDateToDate(Date_of_Birth.value);
    bodyData.Gender = Gender.value === "Female" ? 0 : 1;
    bodyData.Phone_Number = parseInt(Phone_Number.value.replace(/[^\d]/g, ''));
    bodyData.Email = Email.value;
    bodyData.House_Number = parseInt(House_Number.value);
    bodyData.StreetName = StreetName.value;
    bodyData.City = City.value;
    bodyData.States = States.value;
    bodyData.Zipcode = parseInt(Zipcode.value);
    bodyData.UserID = UserID.value;
    bodyData.Password = Password.value;
    bodyData.RoleID = parseInt(RoleID.value);
    bodyData.Department = parseInt(Department.value);
    bodyData.PayRate = parseFloat(PayRate.value.replace('$', ''));
    bodyData.EmployeeStatus = EmployeeStatus.value;
    First_Name.addEventListener('input', (e) => {
        bodyData.First_Name = e.target.value;
    });
    Last_Name.addEventListener('input', (e) => {

        bodyData.Last_Name = e.target.value;

    });
    Date_of_Birth.addEventListener('input', (e) => {
        bodyData.Date_of_Birth = convertTextDateToDate(e.target.value)
    });
    Gender.addEventListener('onchange', (e) => {
        bodyData.Gender = e.target.value === "Female" ? 0 : 1;
    });
    Phone_Number.addEventListener('input', (e) => {
        bodyData.Phone_Number = parseInt(e.target.value.replace(/[^\d]/g, ''));
    });
    Email.addEventListener('input', e => {
        bodyData.Email = e.target.value;
    });
    House_Number.addEventListener('input', e => {
        bodyData.House_Number = parseInt(e.target.value);
    });
    StreetName.addEventListener('click', e => {
        bodyData.StreetName = e.target.value;
    });
    City.addEventListener('input', e => {
        bodyData.City = e.target.value;
    })
    States.addEventListener('input', e => {
        bodyData.States = e.target.value;
    });
    Zipcode.addEventListener('input', e => {
        bodyData.Zipcode = parseInt(e.target.value);
    });
    UserID.addEventListener('input', e => {
        bodyData.UserID = e.target.value;
    });
    Password.addEventListener('input', e => {
        bodyData.Password = e.target.value;
    });
    RoleID.addEventListener('input', e => {
        bodyData.RoleID = parseInt(e.target.value);
    });
    Department.addEventListener('input', e => {
        bodyData.Department = parseInt(e.target.value);
    });
    PayRate.addEventListener('input', e => {
        bodyData.PayRate = parseFloat(e.target.value.replace('$', ''));
    })
    EmployeeStatus.addEventListener('input', e => {
        bodyData.EmployeeStatus = e.target.value;
    });


    const updateButtons = [saveNewEmployeeContactData, saveNewEmployeePersonalData, saveNewEmployeeWorkData];
    updateButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            updateEmployeeNewInformation(bodyData);

        });
    });

};




// UPDATE PHOTO FORM FUNCTION 
if (updatePhotoFormCancel) {
    updatePhotoFormCancel.addEventListener('click', () => {
        updateEmployeePhotoForm.classList.add('removeUpdatePhotoForm');
        setTimeout(() => {
            updateEmployeePhotoForm.classList.remove('removeUpdatePhotoForm');
            updateEmployeePhotoForm.classList.remove('showUpdatePhotoForm');
        }, 300);
    });
};
if (updateEmployeePhotoAccessBtn) {
    updateEmployeePhotoAccessBtn.addEventListener('click', () => {
        if (updateEmployeePhotoForm.classList.contains('showUpdatePhotoForm')) {
            updateEmployeePhotoForm.classList.add('removeUpdatePhotoForm');
            setTimeout(() => {
                updateEmployeePhotoForm.classList.remove('removeUpdatePhotoForm');
                updateEmployeePhotoForm.classList.remove('showUpdatePhotoForm');
            }, 300);
        } else {

            updateEmployeePhotoForm.classList.add('showUpdatePhotoForm');
        };
    });
};
if (imageFile) {
    let loadFile = function (event) {
        let image = document.getElementById('imageOutput');
        image.src = URL.createObjectURL(event.target.files[0]);

    };
    imageFile.addEventListener('change', loadFile);
};

const uploadEmployeePhoto = async (getEmployeeID, photo) => {

    const result = await fetch(`/api/v1/employee/updateEmployeePhotoName/${getEmployeeID}`,
        {
            method: `PATCH`,
            body: photo,
        });
    displayNotification(updateEmployeeInformationNotification, 'updateEmployeeInformationBox_shown', 'uploading photo...', 'success');
    const data = await result.json();
    const response = data;
    if (response.status === "Success") {
        setTimeout(() => {
            displayNotification(updateEmployeeInformationNotification, 'updateEmployeeInformationBox_shown', response.message, response.status.toLowerCase());
        }, 3000);
        setTimeout(() => {
            location.assign(`/api/v1/employee/getEmployeeDetail/${getEmployeeID}`);
        }, 5000);

    } else if (response.status === 'Failed') {
        displayNotification(updateEmployeeInformationNotification, 'updateEmployeeInformationBox_shown', response.message, response.status.toLowerCase());
    };
};

if (updateEmployeePhotoBtn) {
    updateEmployeePhotoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const photoFile = document.getElementById('imageFile').files[0];
        // const photoName = imageFile.value.replace(/^.*[\\\/]/, ''); //get file name
        const formData = new FormData();
        const getEmployeeID = parseInt(document.getElementById('employeeGeneralInfo__group--id').innerHTML);
        formData.append('photo', photoFile);
        formData.append('Employee_ID', getEmployeeID);
        console.log(getEmployeeID);
        if (photoFile === undefined) {
            displayNotification(updateEmployeeInformationNotification, 'updateEmployeeInformationBox_shown', 'Please provide a photo', 'failed');
        } else {

            uploadEmployeePhoto(getEmployeeID, formData);
        }

    });
};



//Projects form handler 
const showCreateNewProjectFormFunction = () => {


    addNewProjectForm.classList.add('showCreateNewProjectForm');
    projectsPage.classList.add('backgroundBlur');
    addNewProjectGroup.forEach(inputBox => {
        inputBox.classList.add('showCreateNewProjectGroup');

    });
    getCustomerList();
    getManagerList();



};
const removeCreateNewProjectFormFunction = () => {

    addNewProjectForm.classList.remove('showCreateNewProjectForm');
    projectsPage.classList.remove('backgroundBlur');

    addNewProjectGroup.forEach(inputBox => {
        inputBox.classList.remove('showCreateNewProjectGroup');
    });

};

if (createNewProjectFormBtn) {
    createNewProjectFormBtn.addEventListener('click', (e) => {
        showCreateNewProjectFormFunction();

    });
};
if (createNewProjectBtnCancel) {
    createNewProjectBtnCancel.addEventListener('click', (e) => {
        removeCreateNewProjectFormFunction();
    });
};




if (createNewProjectBtnSubmit || createNewProjectBtnCancel) {
    createNewProjectBtnSubmit.addEventListener('click', e => {
        e.preventDefault();

    });
};
// FETCH project data from database
const renderProjects = (project) => {
    let today = new Date();
    let date_Planned;
    let date_Current = new Date(today);
    if (project.Actual_End_Date === null) {
        date_Planned = new Date(project.Planned_End_Date);
    } else if (project.Actual_End_Date !== null) {
        date_Planned = new Date(project.Actual_End_Date);
    };
    let timeLeft = Math.abs(date_Planned - date_Current);
    let daysLeft = (Math.ceil(timeLeft / (1000 * 60 * 60 * 24))) / 7;
    let weeksLeft = Math.trunc(daysLeft);
    let totalDaysLeft = Math.ceil((Number((daysLeft - weeksLeft).toFixed(2))) * 7);
    let timeLeftString;
    if (weeksLeft > 0) {
        timeLeftString = `${weeksLeft} Weeks and ${totalDaysLeft} Days Left`;
    } else if (weeksLeft <= 0) {
        timeLeftString = `${totalDaysLeft} Days Left`
    }
    let convertTime = project.Created_At
    convertTime = new Date().toISOString().replace(/T.*/, '').split('-').join('-');
    const projectProgressCompletedWork = document.getElementById('projectProgressCompletedWork');
    const projectProgressPercentage = document.getElementById('projectProgressPercentage');
    let projectMarkup = ``;
    if (project.Project_Status_ID === 5) {
        projectMarkup = `
        <div class="projectCard">
                <div style="display:flex"  class="projectCard__Inactive">

                </div>
                <div class="projectCard__Group projectCard__Group--1">
                    <div class="projectCard__Group--header">
                        <p>${formatDate(convertTime)}</p>
                    </div>
                    <div class="projectCard__Group--headerBtn">
                        <a href="/api/v1/project/getProjectDetail/${project.Project_ID}">
                            <i class="fas fa-info"></i>
                        </a>
                    </div>
                </div>
                <div class="projectCard__Group projectCard__Group--2">
                    <div class="projectCard__SubGroup">
                        <h2>${project.Project_Name}</h2>
                        <p>${project.Project_Description}</p>
                    </div>
                </div>
                <div class="projectCard__Group projectCard__Group--3">
                    <div class="projectCard__SubGroup">
                        <p>Progress</p>
                        <div class="projectCard__Group--progressBar">
                            <div class="projectProgressBar" id="projectProgressBar">
                                <div class="projectProgressCompletedWork" id="projectProgressCompletedWork" style="width:${project.Percentage_Completion * 100}%"></div>
                            </div>
                            <p id="projectProgressPercentage">${project.Percentage_Completion * 100}%</p>
                        </div>
                    </div>
                </div>
                <div class="projectCard__Group projectCard__Group--4">
                    <div class="projectCard__Group--team">
                        <div class="projectManagerPhoto">
                            <img src="/img/${project.Employee_Photo}.jpg" alt="project manager photo" id="projectManagerPhoto">
                        </div>

                    </div>

                    <div class="projectCard__Group--timeleft">
                        <p id="totalTimeLeft">
                            ${timeLeftString}
                        </p>
                    </div>
                </div>
            </div>`;

    } else {
        projectMarkup = `
                            <div class="projectCard">
                                    <div class="projectCard__Inactive">
    
                                    </div>
                                    <div class="projectCard__Group projectCard__Group--1">
                                        <div class="projectCard__Group--header">
                                            <p>${formatDate(convertTime)}</p>
                                        </div>
                                        <div class="projectCard__Group--headerBtn">
                                            <a href="/api/v1/project/getProjectDetail/${project.Project_ID}">
                                                <i class="fas fa-info"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="projectCard__Group projectCard__Group--2">
                                        <div class="projectCard__SubGroup">
                                            <h2>${project.Project_Name}</h2>
                                            <p>${project.Project_Description}</p>
                                        </div>
                                    </div>
                                    <div class="projectCard__Group projectCard__Group--3">
                                        <div class="projectCard__SubGroup">
                                            <p>Progress</p>
                                            <div class="projectCard__Group--progressBar">
                                                <div class="projectProgressBar" id="projectProgressBar">
                                                    <div class="projectProgressCompletedWork" id="projectProgressCompletedWork" style="width:${project.Percentage_Completion * 100}%"></div>
                                                </div>
                                                <p id="projectProgressPercentage">${project.Percentage_Completion * 100}%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="projectCard__Group projectCard__Group--4">
                                        <div class="projectCard__Group--team">
                                            <div class="projectManagerPhoto">
                                                <img src="/img/${project.Employee_Photo}.jpg" alt="project manager photo" id="projectManagerPhoto">
                                            </div>
    
                                        </div>
    
                                        <div class="projectCard__Group--timeleft">
                                            <p id="totalTimeLeft">
                                                ${timeLeftString}
                                            </p>
                                        </div>
                                    </div>
                                </div>`;

    }

    projectListDisplay.insertAdjacentHTML('beforeend', projectMarkup);


};

const renderNotFoundProject = (message) => {
    const errorMarkup = `<div class="NotFoundProject">
                            <p>
                                ${message}
                            </p>
                        </div>`
    projectListDisplay.insertAdjacentHTML('beforeend', errorMarkup)


};

const cleanProjectListArea = () => {
    while (projectListDisplay.hasChildNodes()) {
        projectListDisplay.removeChild(projectListDisplay.firstChild);

    };
};
const getAllActiveProjects = async () => {
    try {
        const result = await fetch(`/api/v1/project/getALLActiveProjects`,
            {
                method: `GET`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

        const data = await result.json();
        if (data.status === 'Success') {
            const projects = data.projectData.recordset;
            cleanProjectListArea();
            projects.forEach(project => {
                renderProjects(project);
            });

            const projectCards = document.querySelectorAll('.projectCard');
            if (projectCards) {
                projectCards.forEach(projectCard => {
                    projectCard.classList.add('projectCard__shown');
                });
            };
        } else if (data.status === 'Not Found') {
            cleanProjectListArea();
            renderNotFoundProject(data.message);
        } else if (data.status === 'Failed') {
            cleanProjectListArea();
            renderNotFoundProject(data.message);
        }

    } catch (err) {
        console.log(err);
    };

};

const getAllCompletedProjects = async () => {
    try {
        const result = await fetch(`/api/v1/project/getALLCompletedProjects`,
            {
                method: `GET`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

        const data = await result.json();
        if (data.status === 'Not Found') {
            cleanProjectListArea();
            renderNotFoundProject(data.message);
        } else if (data.status === 'Success') {
            const projects = data.projectData.recordset;
            cleanProjectListArea();
            projects.forEach(project => {
                renderProjects(project);
            });

            const projectCards = document.querySelectorAll('.projectCard');
            if (projectCards) {
                projectCards.forEach(projectCard => {
                    projectCard.classList.add('projectCard__shown');
                });
            };
        };
    } catch (err) {
        console.log(err);
    };

};

const getAllOtherProjects = async () => {
    try {
        const result = await fetch(`/api/v1/project/getAllOtherProjects`,
            {
                method: `GET`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

        const data = await result.json();
        if (data.status === 'Not Found') {
            cleanProjectListArea();
            renderNotFoundProject(data.message);
        } else if (data.status === 'Success') {
            const projects = data.projectData.recordset;
            cleanProjectListArea();
            projects.forEach(project => {
                renderProjects(project);
            });

            const projectCards = document.querySelectorAll('.projectCard');
            if (projectCards) {
                projectCards.forEach(projectCard => {
                    projectCard.classList.add('projectCard__shown');
                });
            };
        };
    } catch (err) {
        console.log(err);
    };

};

if (activeProjectsBtn || completedProjectsBtn || otherProjectsBtn) {
    activeProjectsBtn.addEventListener('click', e => {
        e.preventDefault();
        getAllActiveProjects();
    });
    completedProjectsBtn.addEventListener('click', e => {
        e.preventDefault();
        getAllCompletedProjects();
    });
    otherProjectsBtn.addEventListener('click', e => {
        e.preventDefault();
        getAllOtherProjects();
    })
};

const renderCustomerList = (customer) => {
    let customerMarkup;
    if (!customer) {
        customerMarkup = `<option value="#">No available customers to choose</option>`
    } else {
        customerMarkup = `<option value="${customer.Customer_ID}">${customer.Title} ${customer.First_Name} ${customer.Last_Name}</option>`
    };

    newProjectCustomer.insertAdjacentHTML('beforeend', customerMarkup);
};

const renderManagerList = (Manager) => {
    let managerMarkup;

    if (!Manager) {
        managerMarkup = `<option value="#">No available Managers to choose</option>`
    } else {

        Manager.forEach(manager => {
            managerMarkup = `<option value="${manager.Employee_ID}">${manager.First_Name} ${manager.Last_Name}</option>`
            newProjectManager.insertAdjacentHTML('beforeend', managerMarkup);

        });
    };
};


const getCustomerList = async () => {
    try {
        const result = await fetch(`/api/v1/customer/getAllCustomers`,
            {
                method: `GET`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
        const data = await result.json();
        if (data) {
            while (newProjectCustomer.hasChildNodes()) {
                newProjectCustomer.removeChild(newProjectCustomer.firstChild);

            };
            let customers = data.customers;
            customers.forEach(customer => {
                renderCustomerList(customer);
            });
        } else {
            renderCustomerList();
        }


    } catch (err) {
        console.log(err);
    }
}
const getManagerList = async () => {
    try {
        const result = await fetch(`/api/v1/employee/getAllManagers`,
            {
                method: `GET`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
        const data = await result.json();
        if (data) {
            while (newProjectManager.hasChildNodes()) {
                newProjectManager.removeChild(newProjectManager.firstChild);

            };
            let managers = data.managers;

            renderManagerList(managers);

        } else {
            renderManagerList();
        }


    } catch (err) {
        console.log(err);
    }
}



//CREATE NEW PROJECT FUNCTION 
const createNewProject = async (newProject) => {
    try {
        const result = await fetch(`/api/v1/project/createNewProject`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProject),
            });
        const response = await result.json();
        if (response) {
            removeCreateNewProjectFormFunction();
            displayNotification(projectPageNotification, 'createNewEmployeeNotification_shown', 'Successfully created a new Project', 'success');
            window.reload(true);
        };

    } catch (err) {
        console.log(err);
    };
};

if (createNewProjectBtnSubmit) {
    createNewProjectBtnSubmit.addEventListener('click', e => {
        e.preventDefault();
        let newProject = new Object();
        let currentLoggedInUser = document.getElementById('currentLoggedInUser');
        let errorFlag = false;
        newProject.Project_Name = newProjectName.value;
        newProject.Project_Description = newProjectSummary.value;
        newProject.Planned_Start_Date = new Date(newProjectPlannedStartDate.value);
        newProject.Planned_End_Date = new Date(newProjectPlannedEndDate.value);
        newProject.Project_Manager_ID = parseInt(newProjectManager.value);
        newProject.Customer_ID = parseInt(newProjectCustomer.value);
        newProject.Budget = parseFloat(newProjectBudget.value);
        newProject.Created_By = parseInt(currentLoggedInUser.getAttribute('href').split('/')[5]);

        for (let key in newProject) {
            if (newProject[key] === '' || newProject[key] === NaN) {
                displayNotification(projectPageNotification, 'createNewEmployeeNotification_shown', 'Please provide all the inputs to continue', 'failed');
                errorFlag = true;
            };
        };
        if (errorFlag === false) {
            createNewProject(newProject);
        } else {
            displayNotification(projectPageNotification, 'createNewEmployeeNotification_shown', 'Input is invalid! Please fix your input and try again', 'failed');

        };
    });
};

const formatDateTime = (input) => {
    let output;
    return output = `${input.getMonth()}/${input.getDate()}/${input.getFullYear()}`;

};
//PROJECT DETAIL PAGE BUTTONS HANDLER 
const renderTaskList = (task) => {

    let plannedStartDate = task.Task_Planned_Start_Date === null ? 'Not Yet Updated' : formatDateTime(new Date(task.Task_Planned_Start_Date));
    let plannedEndDate = task.Task_Planned_End_Date === null ? 'Not Yet Updated' : formatDateTime(new Date(task.Task_Planned_End_Date));
    let actualStartDate = task.Actual_Start_Date === null ? 'Not Yet Updated' : formatDateTime(new Date(task.Actual_Start_Date));
    let actualEndDate = task.Actual_End_Date === null ? 'Not Yet Updated' : formatDateTime(new Date(task.Actual_End_Date));
    let createdAt = task.Created_At === null ? 'Not Yet Updated' : formatDateTime(new Date(task.Created_At));
    let lastUpdatedAt = task.Last_Updated_At === null ? 'Not Yet Updated' : formatDateTime(new Date(task.Last_Updated_At));
    let options;
    switch (task.Task_Status) {
        case 'Started':
            options = `
            <option value="Started-${task.Milestone_ID}-${task.Task_ID}" selected disabled>Started</option>
            <option value="Processing-${task.Milestone_ID}-${task.Task_ID}">Processing</option>
            `
            break;
        case 'Processing':
            options = `
            <option value="Processing-${task.Milestone_ID}-${task.Task_ID}" selected disabled>Processing</option>
            <option value="Delay-${task.Milestone_ID}-${task.Task_ID}">Delay</option>
            <option value="NeedSupport-${task.Milestone_ID}-${task.Task_ID}">Need Support</option>
            <option value="Completed-${task.Milestone_ID}-${task.Task_ID}">Completed</option>
            <option value="remove-${task.Milestone_ID}-${task.Task_ID}">Remove Task</option>
            `
            break;
        case 'Delay':
            options = `
            <option value="Delay-${task.Milestone_ID}-${task.Task_ID}" selected disabled>Delay</option>
            <option value="NeedSupport-${task.Milestone_ID}-${task.Task_ID}">Need Support</option>
            <option value="Completed-${task.Milestone_ID}-${task.Task_ID}">Completed</option>
            <option value="remove-${task.Milestone_ID}-${task.Task_ID}">Remove Task</option>
            `
            break;
        case 'NeedSupport':
            options = `
            <option value="NeedSupport-${task.Milestone_ID}-${task.Task_ID}" selected disabled>Need Support</option>
            <option value="Completed-${task.Milestone_ID}-${task.Task_ID}">Completed</option>
            <option value="remove-${task.Milestone_ID}-${task.Task_ID}">Remove Task</option>
            `
            break;
        case 'Completed':
            options = `
            <option value="Completed-${task.Milestone_ID}-${task.Task_ID}" selected disabled>Completed</option>
            <option value="remove-${task.Milestone_ID}-${task.Task_ID}">Remove Task</option>
            `
            break;
        case 'remove':
            break;
    }


    let taskMarkup = `
        <tr >
        <td>${task.Task_ID}</td>
        <td>${task.Task_Name}</td>
        <td>${task.Task_Description}</td>
        <td>${task.Priority}</td>
        <td>${task.Employee_ID}</td>
        <td>${plannedStartDate}</td>
        <td>${plannedEndDate}</td>
        <td>${actualStartDate}</td>
        <td>${actualEndDate}</td>
        <td>${createdAt}</td>
        <td>${lastUpdatedAt}</td>
        <td>${task.Total_Minutes[0]}</td>
        <td>
            <select  class="updateTaskStatus">
            ${options};
            </select>
        </td>
    </tr> `;

    tasksDetailList.insertAdjacentHTML('beforeend', taskMarkup);

};

const getAllRelatedTasks = async (command) => {
    try {
        const result = await fetch(command, {
            method: `GET`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const data = await result.json();
        let tasks = data.tasks;
        while (tasksDetailList.hasChildNodes()) {
            tasksDetailList.removeChild(tasksDetailList.firstChild);

        };
        if (!tasks) {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', 'There is no tasks for this milestone to display! Please add Task first.', 'failed');
        } else {
            tasks.forEach(task => {
                renderTaskList(task);
            });

        };

    } catch (err) {
        console.log(err);
    }
};

if (seeAllTasksBtn) {
    seeAllTasksBtn.forEach(seeTaskBtn => {
        seeTaskBtn.addEventListener('click', e => {
            e.preventDefault();
            let getAllTasks = e.target.getAttribute('href');
            getAllRelatedTasks(getAllTasks);
        });
    });
};

const showAddNewTaskForm = () => {
    addNewTaskForm.classList.add('showFormProjectDetailPage');
    getAllEmployeesOption();

};
const removeAddNewTaskForm = () => {
    addNewTaskForm.classList.remove('showFormProjectDetailPage');
};
if (addNewMileStoneBtn || addNewTaskBtn) {
    addNewMileStoneBtn.addEventListener('click', () => {
        addNewMileStoneForm.classList.toggle('showFormProjectDetailPage');
    });
    addNewTaskBtn.addEventListener('click', () => {
        showAddNewTaskForm();

    });
    cancelMileStoneCreation.addEventListener('click', () => {
        addNewMileStoneForm.classList.remove('showFormProjectDetailPage')
    });
    cancelNewTaskBtn.addEventListener('click', () => {
        removeAddNewTaskForm();
    });
};


const newMilestoneCreation = async (input) => {
    try {
        const result = await fetch(`/api/v1/project/createNewMilestone`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input),
            });
        const response = await result.json();
        let data = response;
        if (data.status === 'Success') {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', data.message, 'success');
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else if (data.status === 'Bad Request') {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', data.message, 'failed');
        }

    } catch (err) {
        console.log(err);
    };
};

if (confirmMileStoneCreation) {
    confirmMileStoneCreation.addEventListener('click', (e) => {
        let errorFlag = false;

        e.preventDefault();
        let newMilestone = new Object();
        newMilestone.Project_ID = parseInt(document.getElementById('newMileStoneForProjectID').value);
        newMilestone.Milestones_Name = document.getElementById('newMileStoneName').value;
        newMilestone.Milestones_Expiration_Date = new Date(document.getElementById('newMileStoneExpirationDate').value);

        for (let key in newMilestone) {
            if (newMilestone[key] === '' || newMilestone[key] === NaN) {
                errorFlag = true;
            };
        };
        if (errorFlag === false) {
            let projectDetailNotification = document.getElementById('projectDetailNotification');
            newMilestoneCreation(newMilestone);

        } else {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', 'Input error! Please check your input then try again', 'failed');

        }

    });
};

const deleteMilestone = async (fetchRequest) => {
    try {
        const result = await fetch(`${fetchRequest} `,
            {
                method: `DELETE`,
            });
        const response = await result;
        let data = response;
        console.log(data.status, response);

        if (data.status === 400 || data.status === 404) {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', 'Failed to delete the milestone! Milestone does NOT exist or NOT FOUND!', 'failed');
        } else if (data.status === 204) {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', 'Successfully deleted the milestone', 'success');

            setTimeout(() => {
                location.reload();

            }, 2000);
        }
    } catch (err) {
        console.log(err);
    };

};
const deactivateProjectRequest = async (fetchRequest) => {
    try {
        const result = await fetch(`${fetchRequest}`,
            {
                method: `DELETE`,
            });
        const response = await result;
        let data = response;
        console.log(data.status, response);

        if (data.status === 400 || data.status === 404) {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', 'Failed to deactivate the project!', 'failed');
        } else if (data.status === 204) {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', 'Successfully Deactivate this project', 'success');

            setTimeout(() => {
                location.assign('/projects');

            }, 2000);
        }
    } catch (err) {
        console.log(err);
    };
}
if (deactivateProjectBtn) {
    deactivateProjectBtn.addEventListener('click', e => {
        e.preventDefault();
        let fetchRequest = e.target.getAttribute('href');
        confirmationOfDeletionMessage.innerHTML = `Are You Sure you Want to Deactivate This Project: Project ID ${e.target.getAttribute('href').split('/')[5]} `;
        confirmationForm.classList.add('showFormProjectDetailPage');
        if (confirmationOfDeletion) {
            confirmationOfDeletion.addEventListener('click', event => {
                deactivateProjectRequest(fetchRequest);
            });
            cancelationOfDeletion.addEventListener('click', event => {
                confirmationForm.classList.remove('showFormProjectDetailPage');

            });
        }
    });
};


if (removeMilestoneBtn) {
    removeMilestoneBtn.forEach(removeMilestone => {
        removeMilestone.addEventListener('click', (e) => {
            e.preventDefault();
            let fetchRequest = e.target.getAttribute('href');
            let confirmationOfDeletionMessage = document.getElementById('confirmationOfDeletionMessage');
            confirmationOfDeletionMessage.innerHTML = `Are You Sure you Want to Delete Milestone ID: ${fetchRequest.split('/')[5]} `;
            confirmationForm.classList.add('showFormProjectDetailPage');
            if (confirmationOfDeletion) {
                confirmationOfDeletion.addEventListener('click', event => {
                    event.preventDefault();
                    deleteMilestone(fetchRequest);
                });
                cancelationOfDeletion.addEventListener('click', event => {
                    event.preventDefault();

                    confirmationForm.classList.remove('showFormProjectDetailPage');

                })
            }

        });
    });
};

const createNewExpense = async (expense) => {

    try {
        const result = await fetch(`/api/v1/project/createNewExpense`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expense),
            });
        const response = await result.json();
        let data = response;
        if (data.status === 'Success') {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', data.message, 'success');
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else if (data.status === 'Bad Request') {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', data.message, 'failed');
        }

    } catch (err) {
        console.log(err);
    };

};

if (addNewExpenseBtn) {
    addNewExpenseBtn.addEventListener('click', e => {
        addNewExpenseForm.classList.toggle('showFormProjectDetailPage');
        let newExpense = new Object();
        let currentLoggedInUser = document.getElementById('currentLoggedInUser');


        if (confirmationCreateExpenseBtn) {
            confirmationCreateExpenseBtn.addEventListener('click', event => {
                event.preventDefault();
                newExpense.Expense_Name = newExpenseName.value;
                newExpense.Expense_Description = newExpenseDescription.value;
                newExpense.Cost = parseFloat(newExpenseCost.value);
                newExpense.Project_ID = parseInt(newExpenseForProject.value);
                newExpense.Created_By = parseInt(currentLoggedInUser.getAttribute('href').split('/')[5]);

                createNewExpense(newExpense);
            });
            cancelNewExpenseBtn.addEventListener('click', event => {
                event.preventDefault();
                addNewExpenseForm.classList.remove('showFormProjectDetailPage');
            });
        };
    });
};



const renderEmployeesListOption = (employees) => {
    let employeeMarkup;

    if (!employees) {
        employeeMarkup = `<option value = "#" > No available Employees to choose</option> `
    } else {

        employees.forEach(employee => {
            employeeMarkup = `<option option value = "${employee.Employee_ID}" > ${employee.First_Name} ${employee.Last_Name}</option> `
            newTaskToAnEmployee.insertAdjacentHTML('beforeend', employeeMarkup);

        });
    };
};

const getAllEmployeesOption = async () => {
    try {
        const result = await fetch('/api/v1/employee/getAllEmployees', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await result.json();
        let employees = [...data.data.recordset];
        renderEmployeesListOption(employees);

    } catch (err) { console.log(err) };
};

const createNewTask = async (task) => {
    try {
        const result = await fetch('/api/v1/project/createNewTask', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        });
        const data = await result.json();
        if (data.status === 'Success') {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', data.message, 'success');

            setTimeout(() => {
                location.reload();
            }, 2000);


        } else {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', data.message, 'failed');
        };


    } catch (err) { console.log(err) };
};




if (confirmationCreateTaskBtn) {
    confirmationCreateTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let errorFlag = false;
        let newTask = new Object();
        newTask.Task_Name = document.getElementById('newTaskName').value;
        newTask.Task_Description = document.getElementById('newTaskDescription').value;
        newTask.Priority = parseInt(document.getElementById('newPriority').value);
        newTask.Employee_ID = parseInt(document.getElementById('newTaskToAnEmployee').value);
        newTask.Task_Planned_Start_Date = new Date(document.getElementById('newTaskPlannedStartDate').value);
        newTask.Task_Planned_End_Date = new Date(document.getElementById('newTaskPlannedEndDate').value);
        newTask.Project_ID = parseInt(document.getElementById('newTaskForProject').value);
        newTask.Milestone_ID = parseInt(document.getElementById('newTaskForMilestone').value);
        for (let key in newTask) {
            if (newTask[key] === '' || newTask[key] === NaN || newTask[key] === undefined) {
                errorFlag = true;
            };
        };
        if (errorFlag === false) {
            createNewTask(newTask);
        }

    });
};

const updateNewTaskData = async (taskData) => {
    try {
        const result = await fetch(`/api/v1/project/updateTasksInfomation/${taskData.Task_ID}/${taskData.Task_Status}`,
            {
                method: `PATCH`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData),
            });

        displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', 'Processing your update request', 'success');
        const data = await result.json();
        const response = data;
        if (response.status === 'Success') {
            setTimeout(() => {
                displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', response.message, response.status.toLowerCase());
            }, 2000);
            setTimeout(() => {
                location.reload();
            }, 4000);

        } else if (response.status === 'Failed') {
            displayNotification(projectDetailNotification, 'createNewEmployeeNotification_shown', response.message, response.status.toLowerCase());
        };
    } catch (err) {
        console.log(err);
    };
}

if (tasksDetailList) {
    tasksDetailList.addEventListener('click', e => {

        const updateTaskStatusSelectBox = document.querySelectorAll('.updateTaskStatus');
        updateTaskStatusSelectBox.forEach(selectBox => {
            selectBox.addEventListener('change', () => {
                if (selectBox.value.split('-')[0] === 'remove') {

                } else {
                    let taskUpdate = new Object();
                    let currentLoggedInUser = document.getElementById('currentLoggedInUser');
                    taskUpdate.Milestone_ID = parseInt(selectBox.value.split('-')[1]);
                    taskUpdate.Task_Status = selectBox.value.split('-')[0];
                    taskUpdate.Last_Changed_By = parseInt(currentLoggedInUser.getAttribute('href').split('/')[5]);
                    taskUpdate.Task_ID = parseInt(selectBox.value.split('-')[2]);
                    console.log(taskUpdate);
                    updateNewTaskData(taskUpdate);
                };

            })
        }
        );
    });
};
// REPORT PAGE FUNCTIONS
const reportTypeProject = document.getElementById('reportTypeProject');
const reportTypeEmployee = document.getElementById('reportTypeEmployee');
const reportTypeExpense = document.getElementById('reportTypeExpense');
const reportTypeTab = document.querySelectorAll('.reportTypeTab');

const gerateStatisticsReportBtn = document.getElementById('reportConstruction--create');
const resetStatisticsReportBtn = document.getElementById('reportConstruction--reset');
const statisticsPageNotification = document.getElementById('statisticsPageNotification');
const reportTimeframes = document.getElementById('reportTimeframes');
let reportKeywords = document.getElementById('reportKeywords');
let reportConstructionFormSpecificDate = document.getElementById('reportConstruction__form--specificDate');
let reportConstructionFormFromDate = document.getElementById('reportConstruction__form--FromDate');
let reportConstructionFormToDate = document.getElementById('reportConstruction__form--ToDate');

// REPORT AREA 

const reportByProjectDetails = document.getElementById('reportByProjectDetails');
const reportDisplayArea__headerProject = document.getElementById('reportDisplayArea__headerProject');
const reportDetailsByProjectTable = document.getElementById('reportDetailsByProjectTable');

const reportByEmployeeDetails = document.getElementById('reportByEmployeeDetails');
const reportDisplayArea__headerEmployee = document.getElementById('reportDisplayArea__headerEmployee');
const reportDetailsByEmployeeTable = document.getElementById('reportDetailsByEmployeeTable');

const reportByExpenseDetails = document.getElementById('reportByExpenseDetails');
const reportDisplayArea__headerExpense = document.getElementById('reportDisplayArea__headerExpense');
const reportDetailsByExpenseTable = document.getElementById('reportDetailsByExpenseTable');




let selectedReportType = '';
const removeSelectedTab = function () {
    reportTypeTab.forEach(tab => {
        tab.classList.remove('selectedReportTab');
    });
};

const resetForm = function () {
    reportConstructionFormSpecificDate.disabled = true;
    reportConstructionFormToDate.disabled = true;
    reportConstructionFormFromDate.disabled = true;
};
const resetReportArea = () => {
    reportByEmployeeDetails.style.display = 'none';
    reportByProjectDetails.style.display = 'none';
}

if (reportTypeExpense) {
    reportTypeExpense.addEventListener('change', e => {
        if (e.target.checked === true) {
            removeSelectedTab();
            reportTypeProject.checked = false;
            reportTypeEmployee.checked = false;
            const selectTab = document.querySelector('.reportTypeTab--3');
            selectTab.classList.add('selectedReportTab');
            selectedReportType = 'Expense';
        };
    });
}
if (reportTypeEmployee) {
    reportTypeEmployee.addEventListener('change', e => {
        if (e.target.checked === true) {
            removeSelectedTab();
            reportTypeProject.checked = false;
            reportTypeExpense.checked = false;
            const selectTab = document.querySelector('.reportTypeTab--2');
            selectTab.classList.add('selectedReportTab');
            selectedReportType = 'Employee';
        };

    });
}
if (reportTypeProject) {
    reportTypeProject.addEventListener('change', e => {
        if (e.target.checked === true) {
            removeSelectedTab();
            reportTypeEmployee.checked = false;
            reportTypeExpense.checked = false;
            const selectTab = document.querySelector('.reportTypeTab--1');
            selectTab.classList.add('selectedReportTab');
            selectedReportType = 'Project';
        };

    });
}
if (reportTimeframes) {
    reportTimeframes.addEventListener('change', e => {
        console.log(reportTimeframes.value);
        if (reportTimeframes.value === 'dateRange') {
            reportConstructionFormSpecificDate.disabled = true;
            reportConstructionFormToDate.disabled = false;
            reportConstructionFormFromDate.disabled = false;
        } else if (reportTimeframes.value === 'specificDate') {
            reportConstructionFormSpecificDate.disabled = false;
            reportConstructionFormToDate.disabled = true;
            reportConstructionFormFromDate.disabled = true;
        } else {
            resetForm();
        };
    });
};



// GENERATE REPORT FUNCTIONS FOR PROJECT REPORT 
const renderReportTaskList = (task) => {

    let taskMarkup;
    if (!task) {
        taskMarkup = `<tr><td colspan="7">No Task Found</td></tr>`
    } else {
        taskMarkup = `
                        <tr>
                            <td>${task.Task_ID}</td>
                            <td>${task.Task_Name}</td>
                            <td>${task.Task_Description}</td>
                            <td>${task.Task_Status}</td>
                            <td>${task.Employee_ID}</td>
                            <td>${task.Milestone_ID}</td>
                            <td>${new Date(task.Task_Planned_End_Date).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</td>
                        </tr>`;
    };
    reportDetailsByProjectTable.insertAdjacentHTML('beforeend', taskMarkup);
};

const renderProjectSummary = (requestReportData, summaryData, requestReportPerson) => {


    let reportPeriod = ``;
    let today = new Date();
    while (reportDisplayArea__headerProject.hasChildNodes()) {
        reportDisplayArea__headerProject.removeChild(reportDisplayArea__headerProject.firstChild);
    };

    if (requestReportData.Specific_Date === undefined && requestReportData.From_Date === undefined && requestReportData.Specific_Date === undefined) {
        reportPeriod = `Not Specified`
    } else {
        requestReportData.Specific_Date === undefined ? reportPeriod = `${requestReportData.From_Date} - ${requestReportData.To_Date}` : reportPeriod = `${requestReportData.Specific_Date}`;

    };
    let projectSummaryMarkup = `
                <div class="reportDisplayArea__summary">
                    <div class="reportSummaryGroup">
                        <h4>Reporting Period:</h4>
                        <p>${reportPeriod}</p>
                    </div>
                    <div class="reportSummaryGroup">
                        <h4>Date of Report:</h4>
                        <p>${today.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div class="reportSummaryGroup">
                        <h4>Report Person:</h4>
                        <p>${requestReportPerson}</p>
                    </div>
                </div>
                <div class="reportDisplayArea__summary">
                    <div class="reportSummaryGroup">
                        <h4>Project Name:</h4>
                        <p>${summaryData[0].Project_Name}</p>
                    </div>
                    <div class="reportSummaryGroup">
                        <h4>Project Manager ID:</h4>
                        <p>${summaryData[0].Project_Manager_ID}</p>
                    </div>
                    <div class="reportSummaryGroup">
                        <h4>Customer ID:</h4>
                        <p>${summaryData[0].Customer_ID}</p>
                    </div>
                </div>`;


    reportDisplayArea__headerProject.insertAdjacentHTML('beforeend', projectSummaryMarkup);

};
const getReportByProject = async (requestReportData) => {
    resetReportArea();
    try {
        const result = await fetch(`/api/v1/report/getReportByProject`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestReportData)
        });
        const data = await result.json();
        let summaryData = data.reportData;
        let reportPerson = data.requestReportPerson;
        while (reportDetailsByProjectTable.hasChildNodes()) {
            reportDetailsByProjectTable.removeChild(reportDetailsByProjectTable.firstChild);
        };
        if (data.status === 'Success') {
            reportByProjectDetails.style.display = 'flex';
            renderProjectSummary(requestReportData, summaryData, reportPerson);

            summaryData.forEach(task => {
                renderReportTaskList(task);
            });
        };

    } catch (err) {
        console.log(err);
    };
};
// GENERATE REPORT FUNCTIONS FOR PROJECT REPORT -------------END

/// GENERATE REPORT FUNCTIONS FOR EMPLOYEE REPORT 

const convertDatetimeFormat = (input) => {
    let getDate = input.split('-')[2].substring(2, '');
    let getMonth = input.split('-')[1];
    let getYear = input.split('-')[0];
    let getTime = input.split('T')[1].replace('Z', '').replace('.000', '');
    let formatedDateTime = `${getMonth}/${getDate}/${getYear} - ${getTime}`;
    return formatedDateTime;
};

const renderEmployeeReportTimeSheet = (timeSheet) => {
    let timeSheetMarkup;
    if (!timeSheet || timeSheet.Project_ID === null) {
        timeSheetMarkup = `<tr><td colspan="6">No Data Found</td></tr>`
    } else {
        timeSheetMarkup = `
                        <tr>
                            <td>${new Date(timeSheet.Clock_out).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</td>
                            <td>${timeSheet.Project_ID}</td>
                            <td>${timeSheet.Task_ID}</td>
                            <td>${convertDatetimeFormat(timeSheet.Clock_in)}</td>
                            <td>${convertDatetimeFormat(timeSheet.Clock_out)}</td>
                            <td>${timeSheet.Minuits_elapsed / 60} Hours</td>
                        </tr>`;
    };
    reportDetailsByEmployeeTable.insertAdjacentHTML('beforeend', timeSheetMarkup);
};
const renderEmployeeSummary = (requestReportData, summaryData, requestReportPerson, totalEmployeeTime) => {
    let reportPeriod = ``;
    let today = new Date();
    while (reportDisplayArea__headerEmployee.hasChildNodes()) {
        reportDisplayArea__headerEmployee.removeChild(reportDisplayArea__headerEmployee.firstChild);
    };

    if (requestReportData.Specific_Date === undefined && requestReportData.From_Date === undefined && requestReportData.Specific_Date === undefined) {
        reportPeriod = `Not Specified`
    } else {
        requestReportData.Specific_Date === undefined ? reportPeriod = `${requestReportData.From_Date} - ${requestReportData.To_Date}` : reportPeriod = `${requestReportData.Specific_Date}`;

    };
    let employeeSummaryMarkup = `
                <div class="reportDisplayArea__summary">
                    <div class="reportSummaryGroup">
                        <h4>Reporting Period:</h4>
                        <p>${reportPeriod}</p>
                    </div>
                    <div class="reportSummaryGroup">
                        <h4>Date of Report:</h4>
                        <p>${today.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div class="reportSummaryGroup">
                        <h4>Report Person:</h4>
                        <p>${requestReportPerson}</p>
                    </div>
                </div>
                <div class="reportDisplayArea__summary">
                    <div class="reportSummaryGroup">
                        <h4>Employee Name:</h4>
                        <p>${summaryData[0].First_Name} ${summaryData[0].Last_Name}</p>
                    </div>
                    <div class="reportSummaryGroup">
                        <h4>Department ID:</h4>
                        <p>${summaryData[0].Department_ID}</p>
                    </div>
                    <div class="reportSummaryGroup">
                        <h4>Total Time:</h4>
                        <p>${totalEmployeeTime / 60} Hours</p>
                    </div>
                </div>`;


    reportDisplayArea__headerEmployee.insertAdjacentHTML('beforeend', employeeSummaryMarkup);

};
const getReportByEmployee = async (requestReportData) => {
    resetReportArea();
    try {
        const result = await fetch(`/api/v1/report/getReportByEmployee`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestReportData)
        });
        const data = await result.json();
        let summaryData = data.reportData;
        let reportPerson = data.requestReportPerson;
        let totalEmployeeTime = 0;
        while (reportDetailsByEmployeeTable.hasChildNodes()) {
            reportDetailsByEmployeeTable.removeChild(reportDetailsByEmployeeTable.firstChild);
        };
        if (data.status === 'Success') {
            reportByEmployeeDetails.style.display = 'flex';
            summaryData.forEach(dayMinutes => {
                totalEmployeeTime += parseFloat(dayMinutes.Minuits_elapsed);
            });
            renderEmployeeSummary(requestReportData, summaryData, reportPerson, totalEmployeeTime);
            summaryData.forEach(timeSheet => {
                renderEmployeeReportTimeSheet(timeSheet);
            });
        } else if (data.status === 'Not Found') {
            displayNotification(statisticsPageNotification, 'createNewEmployeeNotification_shown', data.message, 'failed');

        }

    } catch (err) {
        console.log(err);
    };
};

// GENERATE REPORT FUNCTIONS FOR EMPLOYEE REPORT -------------END


//GENERATE REPORT FUNCTIONS FOR EXPENSE REPORT 

const renderReportExpense = (expense) => {
    let expenseMarkup;
    if (!expense || expense.Project_ID === null) {
        expenseMarkup = `<tr><td colspan="6">No Data Found</td></tr>`
    } else {
        expenseMarkup = `
                        <tr>
                            <td>${expense.Expense_ID}</td>
                            <td>${expense.Expense_Name}</td>
                            <td>${expense.Expense_Description}</td>
                            <td>$${expense.Cost}</td>
                            <td>${expense.Project_ID[0]}</td>
                            <td>${expense.Created_By[0]}</td>
                            <td>${convertDatetimeFormat(expense.Created_At[0])}</td>
                        </tr>`;
    };
    reportDetailsByExpenseTable.insertAdjacentHTML('beforeend', expenseMarkup);
};
const renderExpenseSummary = (requestReportData, summaryData, requestReportPerson, totalCost) => {
    let reportPeriod = ``;
    let today = new Date();
    while (reportDisplayArea__headerExpense.hasChildNodes()) {
        reportDisplayArea__headerExpense.removeChild(reportDisplayArea__headerExpense.firstChild);
    };

    if (requestReportData.Specific_Date === undefined && requestReportData.From_Date === undefined && requestReportData.Specific_Date === undefined) {
        reportPeriod = `Not Specified`
    } else {
        requestReportData.Specific_Date === undefined ? reportPeriod = `${requestReportData.From_Date} - ${requestReportData.To_Date}` : reportPeriod = `${requestReportData.Specific_Date}`;

    };
    let expenseSummaryMarkup = `
                                <div class="reportDisplayArea__summary">
                                    <div class="reportSummaryGroup">
                                        <h4>Reporting Period:</h4>
                                        <p>${reportPeriod}</p>
                                    </div>
                                    <div class="reportSummaryGroup">
                                        <h4>Date of Report:</h4>
                                        <p>${today.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                    <div class="reportSummaryGroup">
                                        <h4>Report Person:</h4>
                                        <p>${requestReportPerson}</p>
                                    </div>
                                </div>
                                <div class="reportDisplayArea__summary">
                                    <div class="reportSummaryGroup">
                                        <h4>Project Name:</h4>
                                        <p>${summaryData[0].Project_Name}</p>
                                    </div>
                                    <div class="reportSummaryGroup">
                                        <h4>Spending are made on:</h4>
                                        <p>${summaryData.length} Items</p>
                                    </div>
                                    <div class="reportSummaryGroup">
                                        <h4>Total Expense:</h4>
                                        <p>$${totalCost}</p>
                                    </div>
                                </div>`;
    reportDisplayArea__headerExpense.insertAdjacentHTML('beforeend', expenseSummaryMarkup);

};
const getReportByExpense = async (requestReportData) => {
    resetReportArea();
    try {
        const result = await fetch(`/api/v1/report/getReportByExpense`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestReportData)
        });
        const data = await result.json();

        let summaryData = data.reportData;
        let reportPerson = data.requestReportPerson;
        while (reportDetailsByExpenseTable.hasChildNodes()) {
            reportDetailsByExpenseTable.removeChild(reportDetailsByExpenseTable.firstChild);
        };
        if (data.status === 'Success') {
            reportByExpenseDetails.style.display = 'flex';
            let totalCost = 0;
            summaryData.forEach(item => {
                totalCost += item.Cost;
            });
            renderExpenseSummary(requestReportData, summaryData, reportPerson, totalCost);
            summaryData.forEach(expense => {
                renderReportExpense(expense);
            });
        } else if (data.status === 'Not Found') {
            displayNotification(statisticsPageNotification, 'createNewEmployeeNotification_shown', data.message, 'failed');

        };

    } catch (err) {
        console.log(err);
    };
};


//GENERATE REPORT FUNCTIONS FOR EXPENSE REPORT ------------------END



if (gerateStatisticsReportBtn) {
    resetReportArea();

    gerateStatisticsReportBtn.addEventListener('click', e => {
        if (selectedReportType === '' || selectedReportType === ' ') {
            displayNotification(statisticsPageNotification, 'createNewEmployeeNotification_shown', 'Please select what type of report you want to generate', 'failed');
        } else {
            let today = new Date();
            let yesterday = new Date(today);
            let lastWeek = new Date(today);
            let last30Days = new Date(today);
            let last90Days = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            lastWeek.setDate(lastWeek.getDate() - 7);
            last30Days.setDate(last30Days.getDate() - 30);
            last90Days.setDate(last90Days.getDate() - 90);


            let reportResquestData = new Object();
            let getReportFromDate;
            let getReportToDate;
            let getReportDate;
            if (reportTimeframes.value === 'yesterday') {
                getReportDate = yesterday.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
            } else if (reportTimeframes.value === 'lastweek') {
                getReportFromDate = today.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
                getReportToDate = lastWeek.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
            } else if (reportTimeframes.value === '30days') {
                getReportToDate = today.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
                getReportFromDate = last30Days.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
            } else if (reportTimeframes.value === '90days') {
                getReportToDate = today.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
                getReportFromDate = last90Days.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
            } else if (reportTimeframes.value === 'specificDate') {
                getReportDate = reportConstructionFormSpecificDate.value;
            } else if (reportTimeframes.value === 'dateRange') {
                getReportFromDate = reportConstructionFormFromDate.value;
                getReportToDate = reportConstructionFormToDate.value;
            }
            reportResquestData.Report_Type = selectedReportType;
            reportResquestData.ID = parseInt(reportKeywords.value);
            reportResquestData.From_Date = getReportFromDate;
            reportResquestData.To_Date = getReportToDate;
            reportResquestData.Specific_Date = getReportDate;
            switch (selectedReportType) {
                case 'Project':
                    getReportByProject(reportResquestData);
                    break;
                case 'Employee':
                    getReportByEmployee(reportResquestData);
                    break;
                case 'Expense':
                    getReportByExpense(reportResquestData);
                    break;
            }


        }
    });
    resetStatisticsReportBtn.addEventListener('click', e => {
        resetReportArea();
        removeSelectedTab();
        resetForm();
        reportTimeframes.value = 'none';
        selectedReportType = '';
        reportKeywords.value = '';
    });

};

const refreshTasksPage = document.getElementById('refreshTasksPage');
const myTasksList = document.getElementById('myTasksList');
const employeeCheckIn = document.querySelectorAll('.employeeCheckIn');
const employeeCheckOut = document.querySelectorAll('.employeeCheckOut');

const renderMyTaskList = (task) => {
    let optionMarkup = ``;
    if (task.Task_Status === 'Started') {
        optionMarkup = `
        <option value="Started" selected disabled>Started</option>
        <option value="Processing">Processing</option>
        <option value="Delay">Delay</option>
        <option value="NeedSupport">Need Support</option>
        <option value="Completed">Completed</option>
        `
    } else if (task.Task_Status === 'Processing') {
        optionMarkup = `
        <option value="Processing" selected disabled>Processing</option>
        <option value="Delay">Delay</option>
        <option value="NeedSupport">Need Support</option>
        <option value="Completed">Completed</option>
        `
    } else if (task.Task_Status === 'Delay') {
        optionMarkup = `
        <option value="Delay" selected disabled>Delay</option>
        <option value="NeedSupport">Need Support</option>
        <option value="Completed">Completed</option>
        `
    } else if (task.Task_Status === 'Need Support') {
        optionMarkup = `
        <option value="NeedSupport" selected disabled>Need Support</option>
        <option value="Completed">Completed</option>
        `
    } else {
        optionMarkup = `
        <option value="Completed" selected disabled>Completed</option>
         `
    }
    let lastUpdatedAt;
    task.Last_Updated_At === null ? lastUpdatedAt = `Not Yet Updated` : lastUpdatedAt = convertDatetimeFormat(tasks.Last_Updated_At);
    let myTaskMarkup = `
                <tr>
                    <td>${task.Task_ID}</td>
                    <td>${task.Project_ID[0]}</td>
                    <td>${task.Milestone_ID}</td>
                    <td>${task.Task_Name}</td>
                    <td>${task.Task_Description}</td>
                    <td>${task.Priority}</td>
                    <td>
                        <select class="employeeUpdateTaskStatus">
                            ${optionMarkup}
                        </select>
                    </td>
                    <td>${convertDatetimeFormat(task.Task_Planned_End_Date)}</td>
                    <td>${convertDatetimeFormat(task.Created_At)}</td>
                    <td>${lastUpdatedAt}</td>
                    <td>${task.Last_Changed_By === null ? 'Not Yet Updated' : task.Last_Changed_By}</td>
                    <td>
                        <a href="/api/v1/project/checkInEmployee/${task.Employee_ID}/${task.Project_ID[0]}/${task.Milestone_ID}" class="employeeCheckIn">Check-in</a>
                        <div class="employeeCheckedIn">Checked-in</div>
                    </td>
                    <td>
                        <a href="/api/v1/project/checkOutEmployee/${task.Employee_ID}/${task.Project_ID[0]}/${task.Milestone_ID}" class="employeeCheckOut">Check-out</a>
                        <div class="employeeCheckedOut">Checked-out</div>
                    </td>
                </tr>`;
    myTasksList.insertAdjacentHTML('beforeend', myTaskMarkup);

};

const getAllMyTask = async (fetchRequest) => {
    try {
        const result = await fetch(`${fetchRequest}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await result.json();
        if (data.status === 'Success') {
            let tasks = data.tasks;
            while (myTasksList.hasChildNodes()) {
                myTasksList.removeChild(myTasksList.firstChild);
            };
            tasks.forEach(task => {
                if (task.Task_Status !== 'Completed') {
                    renderMyTaskList(task);

                };
            });

        };


    } catch (err) { console.log(err) };
};

const employeeUpdateTaskStatus = document.querySelectorAll('.employeeUpdateTaskStatus');
if (myTasksList) {
    myTasksList.addEventListener('click', e => {
        e.preventDefault();
        let taskStatusToUpdate;
        taskStatusToUpdate = e.target.value;
    });
};

if (refreshTasksPage) {
    refreshTasksPage.addEventListener('click', e => {
        e.preventDefault();
        let fetchRequest = refreshTasksPage.getAttribute('href');
        getAllMyTask(fetchRequest);


    })
};

// Render charts
function tasksbyemployee() {
    const tasksbyemployee = document.getElementById('tasksbyemployee').getContext('2d');
    const chart = new Chart(tasksbyemployee, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            responsive: true,
            maintainAspectRatio: false,
            labels: ['--', '--', '--', '--'],
            datasets: [{
                backgroundColor: ['rgba(300, 200, 100,0.6)',
                    'rgba(54,162,235,0.6)',
                    'rgba(153,102,255,0.6)',
                    'rgba(255,99,132,0.6)',

                ],
                barThickness: 80,
                data: [0, 0, 0, 0]
            }]
        },

        // Configuration options go here
        options: {
            animateRotate: true,

            animation: {
                duration: 250,
                easing: 'linear',

            },

            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 50,
                    bottom: 50
                }
            }

        }
    });
};


function employeetasks() {
    const employeetasks = document.getElementById('employeetasks').getContext('2d');
    const chart = new Chart(employeetasks, {
        // The type of chart we want to create
        type: 'doughnut',
        // The data for our dataset
        data: {
            responsive: true,
            maintainAspectRatio: false,
            labels: ['--', '--', '--', '--', '--'],
            datasets: [{
                backgroundColor: ['rgba(300, 200, 100,0.6)',
                    'rgba(54,162,235,0.6)',
                    'rgba(153,102,255,0.6)',
                    'rgba(255,99,132,0.6)',
                    'rgba(255,159,64,0.6)',
                ],
                borderColor: 'rgb(255, 255, 255)',
                fontColor: 'black',
                data: [0, 00, 0, 0, 0]
            }]
        },

        // Configuration options go here
        options: {
            animateRotate: true,
            animation: {
                duration: 1000,
                easing: 'linear',

            },
            legend: {
                position: 'right',

            },
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 50,
                    bottom: 50
                }
            }

        }
    });
};


function init() {
    navbar.classList.remove('navbar__expand');
    burgerBtnAnimation.remove('burger__clicked')

} init;



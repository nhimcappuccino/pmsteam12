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
        case 'July ':
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
    console.log(bodyData);
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
        const photoName = imageFile.value.replace(/^.*[\\\/]/, ''); //get file name
        const formData = new FormData();
        const getEmployeeID = parseInt(document.getElementById('employeeGeneralInfo__group--id').innerHTML);
        formData.append('photo', photoFile);
        formData.append('Employee_ID', getEmployeeID);
        uploadEmployeePhoto(getEmployeeID, formData, photoName);

    });
};



//

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
function setDefaultPage() {
    document.getElementById(`dashboard`).classList.add('show_full_page');

};


function init() {
    navbar.classList.remove('navbar__expand');
    burgerBtnAnimation.remove('burger__clicked')

} init;



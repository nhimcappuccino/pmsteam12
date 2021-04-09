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





//Form variables
let FirstName = document.getElementById('newEmployeeFirstName');
let LastName = document.getElementById('newEmployeeLastName');
let MiddleName = document.getElementById('newEmployeeMiddleName');
let DateofBirth = document.getElementById('newEmployeeDateofBirth');
let Gender = document.getElementById('newEmployeeGender');
let PhoneNumber = document.getElementById('newEmployeePhoneNumber');
let Email = document.getElementById('newEmployeeEmail');
let HouseNumber = document.getElementById('newEmployeeHouseNumber');
let StreetName = document.getElementById('newEmployeeStreetName');
let City = document.getElementById('newEmployeeCity');
let State = document.getElementById('newEmployeeState');
let Zipcode = document.getElementById('newEmployeeZipcode');
let UserID = document.getElementById('newEmployeeUserID');
let Password = document.getElementById('newEmployeePassword');
let PasswordConfirm = document.getElementById('newEmployeePasswordConfirm');
let RoleID = document.getElementById('newEmployeeRoleID');
let Department = document.getElementById('newEmployeeDepartment');
let PayRate = document.getElementById('newEmployeePayRate');
const tickMarks = document.querySelectorAll('.isAMatchPair');



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

function replaceEmptySpace(string) {
    return string.split(' ').join('&');
}
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
                    <div class="centerImg"><img src="/img/${emp.UserID}.jpg" alt="employee__photo"
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
if (newEmployeeInfoSubmitBtn) {
    newEmployeeInfoSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createNewEmployee();
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

// SAVE INFORMATION BUTTON => FETCH POST REQUEST
if (saveNewEmployeeContactData) {
    saveNewEmployeeContactData.addEventListener('click', () => {
        //FETCH UPDATE ROUTE TO UPDATE CONTACT INFORMATION
    });
}
if (saveNewEmployeePersonalData) {
    saveNewEmployeePersonalData.addEventListener('click', () => {
        //FETCH UPDATE ROUTE TO UPDATE PERSONAL INFORMATION

    });

}

// UPDATE PHOTO FORM FUNCTION 
if (updateEmployeePhotoAccessBtn) {
    updateEmployeePhotoAccessBtn.addEventListener('click', () => {
        updateEmployeePhotoForm.classList.add('showUpdatePhotoForm');
    });
};
if (imageFile) {
    let loadFile = function (event) {
        let image = document.getElementById('imageOutput');
        image.src = URL.createObjectURL(event.target.files[0]);
    };
    imageFile.addEventListener('change', loadFile);
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
function setDefaultPage() {
    document.getElementById(`dashboard`).classList.add('show_full_page');

};


function init() {
    navbar.classList.remove('navbar__expand');
    burgerBtnAnimation.remove('burger__clicked')

} init;



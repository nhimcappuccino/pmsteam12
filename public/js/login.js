const loginForm = document.querySelector('.login__form');
const notification = document.getElementById('notification');


function displayNotification(message, status) {
    window.setTimeout(() => {
        notification.innerHTML = message;
        notification.classList.add('notification_shown', `notification_shown_${status}`);

    }, 50);
    window.setTimeout(() => {
        notification.innerHTML = message;
        notification.classList.remove('notification_shown', `notification_shown_${status}`);

    }, 5000);
};
const login = async (username, password) => {
    try {
        const result = await fetch('/api/v1/employee/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password }),
        });
        const data = await result.json();
        const message = data.message;
        const statusCode = data.status.toLowerCase();
        const userRole = data.data.userData.Role_ID;

        if (data.status === "Success") {

            displayNotification(message, statusCode);
            if (userRole < 4) {
                window.setTimeout(() => { location.assign('/dashboard'); }, 2000);

            } else {
                window.setTimeout(() => { location.assign('/projects'); }, 2000);
            }

        } else if (data.status === "Failed") {
            displayNotification(message, statusCode);

        }
    } catch (err) { };
};

if (loginForm) {
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });
};

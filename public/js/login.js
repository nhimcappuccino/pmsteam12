const loginForm = document.querySelector('.login__form');
const notification = document.getElementById('notification');


function displayNotification(message, status) {
    window.setTimeout(() => {
        notification.innerHTML = message;
        notification.classList.add('notification_shown', `notification_shown_${status}`);

    }, 50);
    window.setTimeout(() => {
        notification.innerHTML = message;
        notification.classList.remove('notification_shown');
    }, 5000);
};
const login = async (username, password) => {
    try {
        const result = await fetch('/api/v1/employee/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            },
            body: JSON.stringify({ username: username, password: password }),
        });
        const data = await result.json();
        const response = data;
        if (response.status === "Success") {
            displayNotification(response.message, response.status.toLowerCase());
            if (response.data.userData.Role_ID < 4) {
                window.setTimeout(() => { location.assign('/dashboard'); }, 0);
            } else {
                window.setTimeout(() => { location.assign('/projects'); }, 0);
            };

        } else if (response.status === "Failed") {
            displayNotification(response.message, response.status.toLowerCase());
        };
    } catch (err) {

    };
};

if (loginForm) {
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });
};

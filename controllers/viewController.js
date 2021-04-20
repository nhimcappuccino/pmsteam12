exports.getIndex = (req, res, next) => {
    res.status(200).render(`index`, {
        title: 'Project Management System'
    });
};

exports.getDashboard = (req, res, next) => {
    if (req.session.isLoggedIn) {
        const data = req.session.username;
        const user_full_name = data.First_Name + ' ' + data.Last_Name;
        const user_photo = req.session.userPhoto;
        const loggedInUserID = req.session.loggedInUserID;

        res.status(200).render(`dashboard`, {
            title: `PMS - Manager Dashboard`,
            page: `Dashboard`,
            user: user_full_name,
            user_photo,
            loggedInUserID,
        });
    } else {
        res.redirect('/');
    }
};

exports.getEmployeeManagement = (req, res, next) => {
    if (req.session.isLoggedIn) {
        const data = req.session.username;
        const user_full_name = data.First_Name + ' ' + data.Last_Name;
        const user_photo = req.session.userPhoto;
        const loggedInUserID = req.session.loggedInUserID;

        res.status(200).render(`employees`, {
            title: `PMS - Manager Employee Management`,
            page: `Employee Management`,
            user: user_full_name,
            user_photo,
            loggedInUserID
        });
    } else {
        res.redirect('/');
    }
};

exports.addEmployees = (req, res, next) => {
    if (req.session.isLoggedIn) {
        const data = req.session.username;
        const user_full_name = data.First_Name + ' ' + data.Last_Name;
        const user_photo = req.session.userPhoto;
        const loggedInUserID = req.session.loggedInUserID;

        res.status(200).render(`addEmployees`, {
            title: `PMS - Add New Employee`,
            page: `Add New Employee`,
            user: user_full_name,
            user_photo,
            loggedInUserID
        });
    } else {
        res.redirect('/');
    }
};



exports.getProject = (req, res, next) => {
    if (req.session.isLoggedIn) {
        const data = req.session.username;
        const user_full_name = data.First_Name + ' ' + data.Last_Name;
        const user_photo = req.session.userPhoto;
        const loggedInUserID = req.session.loggedInUserID;

        res.status(200).render(`projects`, {
            title: `PMS - Projects Management`,
            page: `Projects Management`,
            user: user_full_name,
            user_photo,
            loggedInUserID

        });
    } else {
        res.redirect('/');
    }
};

exports.getStatistics = (req, res, next) => {
    if (req.session.isLoggedIn) {
        const data = req.session.username;
        const user_full_name = data.First_Name + ' ' + data.Last_Name;
        const user_photo = req.session.userPhoto;
        const loggedInUserID = req.session.loggedInUserID;

        res.status(200).render(`statistics`, {
            title: `PMS - Statistics`,
            page: `Statistics`,
            user: user_full_name,
            user_photo,
            loggedInUserID

        });
    } else {
        res.redirect('/');
    }
};
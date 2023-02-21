In ICTAK Clock-in is a root folder.

    1) To run project first install the packages using below comment
        for backend - open terminal and then change directory by using 'cd backend'.
        then install packages using 'npm install'.

        for frontend - open terminal and then change directory by using 'cd frontend'.
        then install packages using 'npm install'.

    2) To run the project for backend - open terminal and use 'node app.js' or 'nodemon app.js'.

    3) 2) To run the project for frontend - open terminal and use 'npm start'.

    Inside ICTAK Clock-in folder there are two other folders namely backend and frontend.

Backend

    Inside backend folder there is a model folder which contains the schema of project - project.js,
    tasks - tasks.js, tracker - tracker.js, users - users.js.


    There is a routes folder inside backend folder which contains 

    projectroutes.js - this js file is used for create and read projects.
    taskroute.js - this js file is used for create and read task.
    trackerroutes.js - this js file is used for create, read, update, and delete operations of time tracker.
    userroutes.js - this js file is used for login, register,create, read, update and delete employee.

    In app.js all the above files and folder and required.

    In .env PORT, MONGO_URI, JWT_TOKEN are used for secure connections.


Frontend

    Inside the frontend folder there is a src folder inside which there is a components folder.

    Components folder contains 4 more folders namely Admin, Employee, Footer, Home;

    In Admin folder contains

    AddEmployee.jsx - this is used for creating employee.
    AddProject.jsx - this is used for creating and reading projects and tasks.
    Admin.jsx - this is admin dashboard.
    AdminNavbar.jsx - this is a navbar for admin.
    Analysis.jsx - this is used for reading employee's daily, weekly, monthly, and yearly trackers history.
    UpdateEmployee.jsx - this is for update a specific employee.
    UpdateTracker.jsx - this is for update a specific employee tracker history.
    ViewAll.jsx - this is for reading all employee tracking history.

    In Employee folder contains

    employee.css- this is used for styling employee page.
    Employee.jsx - this is employee time tracking dashboard.
    EmpNavbar.jsx - this is a navbar for employee.

    In Footer folder contains

    Footer.jsx - this is footer for our website.

    In Home folder contains

    HomeNavbar.jsx - this navbar is used only for login page.
    Login.jsx - this is the home/login page of our website.

    In App.js - there is a route for all pages.
    In App.css contains styling that is common for all pages.
window.addEventListener("load", function () {

    /**
     * get the valid userName and save it in local storage
     * @param {string} response
     * @returns bool tells whether the inputs are valid
     */
    function saveNameAndPassword(response) {
        if (response === true) {
            localStorage.userName = userName.value; // saves the userName in local storage
            localStorage.password = password.value; // saves the password in local storage
        }
    }

    /**
     * get the valid inputs and login or sign up the user
     * @param {string} response
     * @returns bool tells whether the inputs are valid
     */
    function logIn(response) {
        //check if the inputs are valid
        if (response === true) {
            let url = "server/login.php?userName=" + userName.value + "&password=" + password.value;
            fetch(url)
                .then(response => response.text()) // retrieves the response text
                .then(function (response) {

                    if (response == "true") {
                        //error
                        error.innerHTML = "";

                        //jump to main menu
                        window.location.href = "../MainMenu/index.php";
                    }
                    else{
                        //error
                        error.innerHTML = response;
                    }


                })
                .catch(error => console.log(error)); // catches any errors
        }
    }

    /**
     * get the respond from server and display error message
     * @param {string} response 
     * @returns bool tells whether the inputs are valid
     */
    function checkInputs(response) {
        confirm.disabled = false;
        saveInputs.disabled = false;
        if (response === "true") {
            error.innerHTML = "";
            return true;
        }
        else {
            error.innerHTML = response;
            return false;
        }
    }

    let userName = document.getElementById("userName");
    let password = document.getElementById("password");
    let confirm = document.getElementById("confirm");
    let saveInputs = document.getElementById("saveInputs");
    let error = document.getElementById("error");
    let message = document.getElementById("message");

    //check local storage for userName and password
    if (localStorage.userName && localStorage.password) {
        userName.value = localStorage.userName;
        password.value = localStorage.password;
    }

    saveInputs.addEventListener("click", function () {
        this.disabled = true;
        let url = "server/checkInputs.php?userName=" + userName.value + "&password=" + password.value;
        fetch(url)
            .then(response => response.text()) // retrieves the response text
            .then(checkInputs) // ckecks if the inputs are valid
            .then(saveNameAndPassword) //login
            .catch(error => console.log(error)); // catches any errors
    });


    confirm.addEventListener("click", function () {
        this.disabled = true;
        let url = "server/checkInputs.php?userName=" + userName.value + "&password=" + password.value;
        fetch(url)
            .then(response => response.text()) // retrieves the response text
            .then(checkInputs) // ckecks if the inputs are valid
            .then(logIn) //login
            .catch(error => console.log(error)); // catches any errors
    });
});
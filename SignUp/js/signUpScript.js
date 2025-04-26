window.addEventListener("load", function () {

    /**
     * get the valid inputs and login or sign up the user
     * @param {string} response
     * @returns bool tells whether the inputs are valid
     */
    function signUp(response) {
        //check if the inputs are valid
        if (response === true) {
            let url = "server/signUp.php?userName=" + userName.value + "&password=" + password.value;
            fetch(url)
                .then(response => response.text()) // retrieves the response text
                .then(function (response) {
                    //jump to main menu
                    window.location.href = "../MainMenu/index.php";
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
    let confirmPassword = document.getElementById("confirmPassword");
    let confirm = document.getElementById("confirm");
    let error = document.getElementById("error");
    let message = document.getElementById("message");


    confirm.addEventListener("click", function () {
        this.disabled = true;
        let url = "server/checkInputs.php?userName=" + userName.value + "&password=" + password.value + "&confirmPassword=" + confirmPassword.value;
        fetch(url)
            .then(response => response.text()) // retrieves the response text
            .then(checkInputs) // ckecks if the inputs are valid
            .then(signUp) //logs in or signs up the user
            .catch(error => console.log(error)); // catches any errors
    });
});
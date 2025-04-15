window.addEventListener("load", function (event) {

    let logout = document.getElementById("logout");

    if (logout) {


        logout.addEventListener("click", function (event) {

            let url = "../Logout/logout.php";
            fetch(url)
                .catch(error => console.log(error)); // catches any errors    });

            //reload page
            location.reload();

        });
    }
});
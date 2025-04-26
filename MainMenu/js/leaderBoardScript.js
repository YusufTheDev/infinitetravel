window.addEventListener('load', function () {

    function showLeaderboard(data) {
        let table = document.getElementById("board");
        table.innerHTML = "<div class = 'column' id = 'c1'><h1>Name</h1></div><div class = 'column'id = 'c2'><h1>Best Score</h1></div>";
        column1 = document.getElementById("c1");
        column2 = document.getElementById("c2");
        for (let i = 0; i < data.length; i++) {
            column1.innerHTML += "<p>" + data[i].userName + "</p>";
            column2.innerHTML += "<p>" + data[i].bestScore + "</p>";

        }

    }


    function getLeaderboard() {
        url = "server/getLeaderBoard.php";
        fetch(url)
            .then(response => response.json())
            .then(showLeaderboard)
            .catch(error => console.error(error));
    }

    getLeaderboard();
});

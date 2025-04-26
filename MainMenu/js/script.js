
window.addEventListener("load", function () {

  let logout = document.getElementById("logout");
 
  if (logout) {
    logout.addEventListener("click", function () {
      fetch("../Logout/logout.php").catch(error => console.log(error));
      location.reload();
    });
  }

  


});


/**
Author : Yusuf Khan
Student Number: 400565596
Date: 2025/04/01

Script for main menu to logout the user by requesting logout php file
*/
window.addEventListener("load", function () {

  // dom element
  let logout = document.getElementById("logout");
 
  // log out
  if (logout) {
    logout.addEventListener("click", function () {
      //request  
      fetch("../Logout/logout.php").catch(error => console.log(error));
      location.reload();
    });
  }

  


});

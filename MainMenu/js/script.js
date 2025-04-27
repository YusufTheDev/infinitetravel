/**
 * Author : Yusuf Khan 
 * Student Number: 400565596
 * Date: 2025/04/01
 *
 * A style file for the game page.
 */

window.addEventListener("load", function () {

  let logout = document.getElementById("logout");
 
  //request log out and reload page
  if (logout) {
    logout.addEventListener("click", function () {
      fetch("../Logout/logout.php").catch(error => console.log(error));
      location.reload();
    });
  }

  


});

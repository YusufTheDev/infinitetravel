
window.addEventListener("load", function () {
  class Upgrade {
    constructor(name, status) {
      this.name = name;
      this.status = status;
      this.element = document.getElementById(name);
    }

    print(){
      console.log(this.name + " " + this.status);
    }

  }

  function loadUpgrades() {
    let upgrades = [];
    url = "server/loadUpgrades.php";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((upgrade) => {
          upgrades.push(new Upgrade(upgrade.name, upgrade.status));
        });
        return upgrades;
      })
      .catch((error) => console.log(error));
  }

  let logout = document.getElementById("logout");
  let upgrades = loadUpgrades();
  for (let i = 0; i < upgrades.length; i++) {
    upgrades[i].print();
  }

  if (logout) {
    logout.addEventListener("click", function () {
      fetch("../Logout/logout.php").catch(error => console.log(error));
      location.reload();
    });
  }


});

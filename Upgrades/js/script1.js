
window.addEventListener("load", function () {
  class Upgrade {
    constructor(name,price, status) {
      this.name = name;
      this.price = price;
      this.status = status;
      this.element = document.getElementById(name);
    }
    
    udpdateElement(){
      if (this.status === 0){

      }
    }

    buyUpgrade(){
      if(this.status === 0){
        url = "server/buyUpgrade.php";
      }
    }
  }

  function loadUpgrades(upgrades,prices) {

    url = "server/loadUpgrades.php";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((upgrade) => {
          upgrades.push(new Upgrade(upgrade.name,upgrade.price, upgrade.status));
        });
        return upgrades;
      })
      .catch((error) => console.log(error));
  }

  let upgrades = [];
  loadUpgrades(upgrades);

});


window.addEventListener("load", function () {
  class Upgrade {
    constructor(name, price,description, status) {
      this.name = name;
      this.price = price;
      this.description = description;
      this.status = status;
      this.render();
    }

    render() {
      let list = document.getElementById("upgradesList");
      
      let item = document.createElement("div");
      item.className = "upgrade-item";
      item.innerHTML = `
        <h2>${this.name}</h2>
      `;
      if(this.status === 0) {
        item.innerHTML += `<p>Price: ${this.price}</p>`;
        item.innerHTML += `<p>${this.description}</p>`;
        item.innerHTML += `<button class="buy-button" onclick="buyUpgrade()">Buy</button>`;
      }
      else if(this.status === 1) {//##############################################
        item.innerHTML += `<p>Price: ${this.price}</p>`;
        item.innerHTML += `<p>${this.description}</p>`;

      }
      list.appendChild(item);
    
    }

    udpdateElement() {
      if (this.status === 0) {

      }
    }

    buyUpgrade() {
      if (this.status === 0) {
        url = "server/buyUpgrade.php";
      }
    }
  }

  function loadUpgrades(upgrades, prices) {

    url = "server/loadUpgrades.php";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((upgrade) => {
          upgrades.push(new Upgrade(upgrade.name, upgrade.price,upgrade.description, upgrade.status));
        });
        return upgrades;
      })
      .catch((error) => console.log(error));
  }

  function updateGold(gold){
    url = "server/updateGold.php";
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
      
        gold.innerHTML = "Gold: " + data;
      })
      .catch((error) => console.log(error));
  }

  
  let upgrades = [];
  loadUpgrades(upgrades);

  let gold = this.document.getElementById("gold");
  updateGold(gold);


});

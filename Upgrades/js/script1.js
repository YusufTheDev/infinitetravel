
window.addEventListener("load", function () {
  class Upgrade {
    constructor(name, type, price, description, status) {
      this.name = name;
      this.type = type;
      this.price = price;
      this.description = description;
      this.status = status;
      this.button;
      this.render();
    }

    render() {
      let list = document.getElementById("upgradesList");
      let item = document.createElement("div");
      item.className = "upgrade-item";
      item.innerHTML = `
        <h2>${this.name}</h2>
      `;
      this.button = document.createElement("button");
      if (this.status === 0) {
        item.innerHTML += `<p>Price: ${this.price}</p>`;
        item.innerHTML += `<p>${this.description}</p>`;
        this.button.innerHTML = "Buy";
        this.button.addEventListener("click", () => this.onClick());
        item.appendChild(this.button);
      }
      else if (this.status === 1) {
        item.innerHTML += `<p>Price: ${this.price}</p>`;
        item.innerHTML += `<p>${this.description}</p>`;
        this.button.addEventListener("click", () => this.onClick());
        this.button.innerHTML = "Select";
        item.appendChild(this.button);
      }
      else if (this.status === 2) {
        item.innerHTML += `<p>Price: ${this.price}</p>`;
        item.innerHTML += `<p>${this.description}</p>`;
        this.button.innerHTML = "Equiped";
        this.button.id = "using";
        this.button.disabled = true;
        item.appendChild(this.button);
      }
      list.appendChild(item);
    }

    reRender() {
      this.button.removeEventListener("click", () => this.onClick());
      this.button.id = "none";
      this.button.disabled = false;
      if (this.status === 0) {
        this.button.innerHTML = "Buy";
      }
      else if (this.status === 1) {
        this.button.innerHTML = "Select";
        this.button.addEventListener("click", () => this.onClick());

      }
      else if (this.status === 2) {
        this.button.innerHTML = "Equiped";
        this.button.id = "using";
        this.button.disabled = true;
      }

    }

    onClick() {
      if (this.status === 0) {
        url = "server/buy.php?skinName=" + this.name + "&price=" + this.price;
        fetch(url).then((response) => response.text())
          .then((info) => {
            if (info === "success") {
              if (this.type === "skin") {
                switchSkin(this.name);
                gold.innerHTML = "Gold: " + (parseInt(gold.innerHTML.split(" ")[1]) - this.price);
              }
              else {
                this.status = 2;
                this.reRender();
                gold.innerHTML = "Gold: " + (parseInt(gold.innerHTML.split(" ")[1]) - this.price);
              }
            }
            else {
              this.button.innerHTML = info;
            }
          })
          .catch((error) => console.log(error));
      }
      else if (this.status === 1) {
        url = "server/buy.php?skinName=" + this.name ;
        fetch(url).then((response) => response.text())
          .then((info) => {
            if (info === "success") {
              switchSkin(this.name);
            }
            else {
              this.button.innerHTML = info;
            }
          })
          .catch((error) => console.log(error));
      }

    }
  }

  function loadUpgrades(upgrades, prices) {
    url = "server/loadUpgrades.php";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let i = 0
        data.forEach((upgrade) => {
          if (i < 2) {
            upgrades[upgrade.name] = (new Upgrade(upgrade.name, "upgrade", upgrade.price, upgrade.description, upgrade.status));
          }
          else {
            upgrades[upgrade.name] = (new Upgrade(upgrade.name, "skin", upgrade.price, upgrade.description, upgrade.status));
          }
          i++;

        });
        return upgrades;
      })
      .catch((error) => console.log(error));
  }

  function switchSkin(newSkin) {


    upgrades[skin].status = 1;
    upgrades[skin].reRender();

    upgrades[newSkin].status = 2;
    upgrades[newSkin].reRender();
    skin = newSkin;


  }




  function loadInfo(gold, callback) {
    url = "server/loadInfo.php";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        gold.innerHTML = "Gold: " + data.gold;
        callback(data.skin);
      })
      .catch((error) => console.log(error));
  }

  //init var and load data
  let upgrades = {};
  loadUpgrades(upgrades);

  let gold = this.document.getElementById("gold");
  let skin;
  loadInfo(gold, function (resultSkin) {
    skin = resultSkin;
  });




});

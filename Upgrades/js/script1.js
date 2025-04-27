/**
 * Author : Tianyan He
 * Student Number: 400579318
 * Date: 2025/04/16
 *
 *  Script of upgrades page. Including display, purchase and select upgrades.
 */
window.addEventListener("load", function () {
  /**
   * a upgrade object. Has the name of upgrade, whether its a skin or boosts, price of it,
   *  the description to be displayed on page and whether it's purchased or equipped.
   */
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

    /**
     * render the discription, price and buy botton
     */
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

    /**
     * update text on the button.
     */
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

    /**
     * funciton when clicked. Buy or select
     */
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

  /**
   * load all upgrade in db and turn them into upgrade objects.
   * @param {json} upgrades 
  */
  function loadUpgrades(upgrades) {
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

  /**
   * which the skin currently using
   * @param {string} newSkin 
   */
  function switchSkin(newSkin) {


    upgrades[skin].status = 1;
    upgrades[skin].reRender();

    upgrades[newSkin].status = 2;
    upgrades[newSkin].reRender();
    skin = newSkin;
  }

  /**
   * load all info needed
   * @param {int} gold 
   * @param {*} callback 
   */
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

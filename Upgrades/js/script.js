let gold = 10000;//just to test
const upgradesBought = {
  speed: false,
  shield: false
};
const unlockedSkins = JSON.parse(localStorage.getItem("unlockedSkins") || "[]");
function buySkin(skinName, cost) {
    if (unlockedSkins.includes(skinName)) {
      alert("Already unlocked. Just select it.");
      selectSkin(skinName);
      return;
    }
    if (gold < cost) {
      alert("Not enough gold.");
      return;
    }
    gold -= cost;
    document.getElementById("goldAmount").innerText = gold;
  
    unlockedSkins.push(skinName);
    localStorage.setItem("unlockedSkins", JSON.stringify(unlockedSkins));
    selectSkin(skinName);
    alert(`${skinName} skin unlocked and selected!`);
}
function selectSkin(skinName) {
    localStorage.setItem("selectedSkin", skinName);
}


function buyUpgrade(type, cost) {
  if (gold < cost || upgradesBought[type]) return;

  gold -= cost;
  document.getElementById("goldAmount").innerText = gold;
  upgradesBought[type] = true;

  localStorage.setItem(`upgrade_${type}`, "1");

  const btn = document.querySelector(`button[onclick*="${type}"]`);
  btn.innerText = "Purchased";
  btn.disabled = true;
  btn.classList.add("upgraded");
}

window.addEventListener("load", function () {
  let logout = document.getElementById("logout");

  if (logout) {
    logout.addEventListener("click", function () {
      fetch("../Logout/logout.php").catch(error => console.log(error));
      location.reload();
    });
  }
});

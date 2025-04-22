<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Player Upgrades</title>
  <link rel="stylesheet" href="css/style.css" />
  <style>
    .upgraded {
      background-color: gray;
      color: white;
      cursor: not-allowed;
    }
  </style>
</head>
<body id="upgrades">
  <div class="container">
    <h1>Player Upgrades</h1>
    <p id="gold">Gold: <span id="goldAmount">100</span></p>

    <div class="upgrade-list">
      <div class="upgrade-item">
        <h2>Speed Boost</h2>
        <p>Increase player movement speed.</p>
        <button class="upgrade-button1" onclick="buyUpgrade('speed', 30)">Buy (30 Gold)</button>
      </div>

      <div class="upgrade-item">
        <h2>More HP</h2>
        <p>Reduce damage taken.</p>
        <button class="upgrade-button3" onclick="buyUpgrade('+hp', 50)">Buy (50 Gold)</button>
      </div>
      <div class="upgrade-item">
        <h2>Original Skin</h2>
        <p>Original Skin</p>
        <button onclick="buySkin('default', 0)">Original Skin</button>
      </div>
      <div class="upgrade-item">
        <h2>A Better Skin</h2>
        <p>This one does nothing, but looks better</p>
        <button onclick="buySkin('golden', 100)">Better Skin (100 Gold)</button>
      </div>

      <div class="upgrade-item">
        <h2>exGold Skin</h2>
        <p>A Much better skin, it allow you to double jump</p>
        <button onclick="buySkin('exGolden', 100)">exGold Skin (200 Gold)</button>
      </div>

      

      <div class="upgrade-item">
        <h2>Skin</h2>
        <p>A pro maxskin</p>
        <button onclick="buySkin('promax', 100)">promax Gold Skin (200 Gold)</button>
      </div>

      <div class="upgrade-item">
        <h2>Skin</h2>
        <p>A strong skin</p>
        <button onclick="buySkin('mew', 100)">Very Strong Skin (200 Gold)</button>
      </div>

      <div class="upgrade-item">
        <h2>?</h2>
        <p>A skin</p>
        <button onclick="buySkin('what', 100)">? (200 Gold)</button>
      </div>

      <div class="upgrade-item">
        <h2>??</h2>
        <p>A skin</p>
        <button onclick="buySkin('big', 100)">?? (200 Gold)</button>
      </div>
    </div>

    <p><a href="index.php" class="button">Back to Home</a></p>
  </div>

  <script src="js/script.js">

  </script>
</body>
</html>

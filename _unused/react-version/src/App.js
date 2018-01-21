import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.min.css';
import $ from 'jquery';

// start resources
const gold = 20;
const wood = 20;
const stone = 15;
const metal = 10;

// initial Level
const initialObjectLevel = {farm: 1, logger: 1, stone: 1, iron: 1};

// Gebäudearten
const gameObjects = ['farm', 'logger', 'stone', 'iron'];

// object costs
// Farm
const farmgold = 10;
const farmwood = 9;
const farmstone = 5;
const farmmetal = 0;
// Forster
const loggergold = 20;
const loggerwood = 10;
const loggerstone = 5;
const loggermetal = 0;
// Steinbruch
const stonegold = 30;
const stonewood = 10;
const stonestone = 5;
const stonemetal = 5;
// Eisenmiene
const irongold = 50;
const ironwood = 20;
const ironstone = 15;
const ironmetal = 5;

// Resourcen pro Sekunde
const goldPerSec = 1;
const woodPerSec = 0;
const stonePerSec = 0;
const metalPerSec = 0;

let gameData = {
	objectCost: {
		farm: {
			gold: farmgold,
			wood: farmwood,
			stone: farmstone,
			metal: farmmetal,
		},
		logger: {
			gold: loggergold,
			wood: loggerwood,
			stone: loggerstone,
			metal: loggermetal,
		},
		stone: {
			gold: stonegold,
			wood: stonewood,
			stone: stonestone,
			metal: stonemetal,
		},
		iron: {
			gold: irongold,
			wood: ironwood,
			stone: ironstone,
			metal: ironmetal,
		},
	},
	objectLevel: {
		farm: initialObjectLevel.farm,
		logger: initialObjectLevel.logger,
		stone: initialObjectLevel.stone,
		iron: initialObjectLevel.iron,
	},
	playerResources: {
		gold: gold,
		wood: wood,
		stone: stone,
		metal: metal,
	}
};

class App extends Component {

componentDidMount() {
  
    //Init -- Start

    //@todo Prüfen ob Spielstand vorhanden ist, ansonsten neuen erstellen
    gameDataSync();
  
    // Derzeit verfügbare Rohstoffe
    updateResources();
  
    // Rohstoff Legende
    $( ".goldPerSec" ).append(goldPerSec);
    $( ".stonePerSec" ).append(stonePerSec);
    $( ".metalPerSec" ).append(metalPerSec);
    $( ".woodPerSec" ).append(woodPerSec);
  
    // Objektkosten
    updateBuildCost()
  
    //Init -- Ende
  
    //Main iteration
    setInterval(function() {
      gameData.playerResources.gold = gameData.playerResources.gold + goldPerSec;
      gameData.playerResources.wood = gameData.playerResources.wood + woodPerSec;
      gameData.playerResources.stone = gameData.playerResources.stone + stonePerSec;
      gameData.playerResources.metal = gameData.playerResources.metal + metalPerSec;
      updateResources();
    }, 1000);
  
    
    //Backend Synchronisation alle 3 Sekunden
    setInterval(function() {
      gameDataSync();
    }, 3000);
  
  
    //Objekt kaufen
    $(".buyButton").click(function(event) {
      var object = event.target.id;
      var bought = buyObject(object);
  
      if (!bought) {
        console.log("Nicht genug resourcen");
      } else {
        console.log("Gekauft!!!!");
      }
  });

function buyObject(type) {
  
    //Prüfe ob type definiert wurde
    if (!type) {
      console.log('Kein type angegeben');
      return false;
    }
  
    //Prüfen ob type existiert
    if (($.inArray(type, gameObjects)) < 0) {
      console.log("type existiert nicht");
      return false;
    }
  
    //Prüfe ob genug resourcen
    var hasEnough = checkResources(type);
  
    if (!hasEnough) {
      return false;
    }
  
    // Rohstoff Abzug durch den Kauf
    decreaseResources(type);
  
    //increase object level (später separate funktion)
    gameData.objectLevel[type] += 1;
    $( "#" + type ).find(".objectLevel").html(" ("+gameData.objectLevel[type]+") ");
  
    // Rohstoff Produktion ans neue Level anpassen
    updateIncome(type);
  
    // Objektkosten aktualisieren
    updateBuildCost(type);
  
    return true;
  
  }
  
  function updateResources() {
    $( ".gold" ).html(gameData.playerResources.gold);
    $( ".wood" ).html(gameData.playerResources.wood);
    $( ".stone" ).html(gameData.playerResources.stone);
    $( ".metal" ).html(gameData.playerResources.metal);
  }
  
  function decreaseResources(type) {
    //decrease resources (später separate funktion)
    gameData.playerResources.gold -= gameData.objectCost[type].gold;
    gameData.playerResources.wood -= gameData.objectCost[type].wood;
    gameData.playerResources.stone -= gameData.objectCost[type].stone;
    gameData.playerResources.metal -= gameData.objectCost[type].metal;
    updateResources();
  }
  
  function updateIncome(type) {
    $( ".goldPerSec" ).html(goldPerSec);
    $( ".stonePerSec" ).html(stonePerSec);
    $( ".metalPerSec" ).html(metalPerSec);
    $( ".woodPerSec" ).html(woodPerSec);
  }
  
  function checkResources(type) {
    if (gameData.playerResources.gold < gameData.objectCost[type].gold || gameData.playerResources.wood < gameData.objectCost[type].wood || gameData.playerResources.stone < gameData.objectCost[type].stone || gameData.playerResources.metal < gameData.objectCost[type].metal) {
      return false;
    }
  
    return true;
  }
  
  //Vorher muss object level hochgesetzt werden
  function updateBuildCost(type) {
    if (type) {
      $.each( gameData.objectCost, function( key, value ) {
        if (key == type) {
          gameData.objectCost[key].gold = Math.ceil(value.gold + value.gold * 0.1);
          gameData.objectCost[key].wood = Math.ceil(value.wood + value.wood * 0.1);
          gameData.objectCost[key].stone = Math.ceil(value.stone + value.stone * 0.1);
          gameData.objectCost[key].metal = Math.ceil(value.metal + value.metal * 0.1);
        }
      });
    }
  
    $( "li.costs" ).each(function() {
      // Baukosten
      $( this ).find(".gold-value").html(gameData.objectCost[this.id].gold);
      $( this ).find(".wood-value").html(gameData.objectCost[this.id].wood);
      $( this ).find(".stone-value").html(gameData.objectCost[this.id].stone);
      $( this ).find(".metal-value").html(gameData.objectCost[this.id].metal);	
  
      $( this ).find(".objectLevel").html(" ("+(gameData.objectLevel[this.id])+") ");
    });
  
  }
  
  function gameDataSync() {
    console.log('Backend Synchronisation beginnt');

    let gameDataJson = JSON.stringify(gameData);

    var query = `mutation {
      createGameDataObj(input: {
        dataObj: "` + escape(gameDataJson) + `",
      }) {
        gameID
        dataObj
      }
      }`;
  
    $.ajax({
      url: 'http://127.0.0.1:4000/api',
      headers: {
        'Content-Type': 'application/json'
      },
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        query: query,
        }),
      success: function (result) {
        $( "#dev-output" ).html( "<p>" + JSON.stringify(result) + "</p>");
        console.log('Synchronisation erfolgreich. gameID: ' + result.data.createGameDataObj.gameID);
      },
      error: function (result) {
        //@todo prüfen ob Backend erreichbar ist und das gewünschte Ergebnis asugibt, wenn nicht: Fehlermeldung an Spieler
        console.log("Synchronisation fehlgeschlagen.");
      }
    });
    return true;
  }


  /*function escapeSpecialCharacters(string)
  {
    return string
      .replace(/[']/g, "\\'")
      .replace(/["]/g, '\\"')
      .replace(/[&]/g, "\\&")
      .replace(/[\n]/g, "\\n")
      .replace(/[\r]/g, "\\r")
      .replace(/[\t]/g, "\\t")
      .replace(/[\b]/g, "\\b")
      .replace(/[\v]/g, "\\v")
      .replace(/[\f]/g, "\\f");
  }

  function stringifyReplacer(key, value)
  {
    if (typeof value === 'string') {
      return escapeSpecialCharacters(value);
    }
    return value;
  }*/
}

  render() {
    return (
      <div className="container">
      <div className="fieldWhole">
        <div className="playField enemySide">
          <div></div>
        </div>
        <div className="playField playerSide">
          <div className="player"></div>
        </div>
      </div>
      <div className="menu sideMenu">
        <ul className="resourceList">
          <li className="resource">Gold: <span className="gold"></span> +<span className="goldPerSec"></span></li>
          <li className="resource">Holz: <span className="wood"></span> +<span className="woodPerSec"></span></li>
          <li className="resource">Stein: <span className="stone	"></span> +<span className="stonePerSec"></span></li>
          <li className="resource">Metall: <span className="metal"></span> +<span className="metalPerSec"></span></li>
        </ul>
      </div>
      <div className="menu bottomMenu">
        <ul className="row">
          <li id="bauen" className="col-xs-2">Bauen</li>
          <li className="col-xs-2">Krieg</li>
          <li className="col-xs-2">Nichts</li>
          <li className="col-xs-2">Nichts</li>
        </ul>
        <div className="bauMenu">
          <p className="costs">Costs</p>
          <ul className="costsDisplay">
            <li className="costs" id="farm">
              <img src="images/farm.png" /> Farm <span className="objectLevel"></span> 
              <ul>
                <li><span className="cost costGold">Gold</span> <span className="gold-value"></span></li>
                <li><span className="cost costWood">Wood</span> <span className="wood-value"></span></li>
                <li><span className="cost costStone">Stone</span> <span className="stone-value"></span></li>
                <li><span className="cost costMetal">Metal</span> <span className="metal-value"></span></li> 
                <button id="farm" className="btn btn-sm btn-info buyButton">Kaufen</button>
              </ul>
            </li>
            <li className="costs" id="logger">
              <img src="images/holz.png" /> Logger <span className="objectLevel"></span> 
              <ul>
                <li><span className="cost costGold">Gold</span> <span className="gold-value"></span></li>
                <li><span className="cost costWood">Wood</span> <span className="wood-value"></span></li>
                <li><span className="cost costStone">Stone</span> <span className="stone-value"></span></li>
                <li><span className="cost costMetal">Metal</span> <span className="metal-value"></span></li>
                <button id="logger" className="btn btn-sm btn-info buyButton">Kaufen</button>
              </ul>
            </li>
            <li className="costs" id="stone">
              <img src="images/steinmine.png" /> Stonecutter <span className="objectLevel"></span> 
              <ul>
                <li><span className="cost costGold">Gold</span> <span className="gold-value"></span></li>
                <li><span className="cost costWood">Wood</span> <span className="wood-value"></span></li>
                <li><span className="cost costStone">Stone</span> <span className="stone-value"></span></li>
                <li><span className="cost costMetal">Metal</span> <span className="metal-value"></span></li>  
                <button id="stone" className="btn btn-sm btn-info buyButton">Kaufen</button>
              </ul>
            </li>
            <li className="costs" id="iron">
              <img src="images/eisenmine.png" /> Iron Mine <span className="objectLevel"></span>
              <ul>
                <li><span className="cost costGold">Gold</span> <span className="gold-value"></span></li>
                <li><span className="cost costWood">Wood</span> <span className="wood-value"></span></li>
                <li><span className="cost costStone">Stone</span> <span className="stone-value"></span></li>
                <li><span className="cost costMetal">Metal</span> <span className="metal-value"></span></li>  
                <button id="iron" className="btn btn-sm btn-info buyButton">Kaufen</button>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="dev-out"></div>
    </div>
    );
  }
}


export default App;

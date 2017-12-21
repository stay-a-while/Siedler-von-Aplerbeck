// Resourcen
var gold = 20;
var wood = 20;
var stone = 15;
var metal = 10;

// Gebäudearten
var gameObjects = ['farm', 'logger', 'stone', 'iron'];

// Initial Level (wird später vom backend synchronisiert)
var initialObjectLevel = {farm: 1, logger: 1, stone: 1, iron: 1};

// Gebäudekosten Start ---------------------------
// Farm
var farmgold = 10;
var farmwood = 9;
var farmstone = 5;
var farmmetal = 0;
// Forster
var loggergold = 20;
var loggerwood = 10;
var loggerstone = 5;
var loggermetal = 0;
// Steinbruch
var stonegold = 30;
var stonewood = 10;
var stonestone = 5;
var stonemetal = 5;
// Eisenmiene
var irongold = 50;
var ironwood = 20;
var ironstone = 15;
var ironmetal = 5;
// Gebäudekosten Ende ----------------------------

// Resourcen pro Sekunde
var goldPerSec = 1;
var woodPerSec = 0;
var stonePerSec = 0;
var metalPerSec = 0;

var gameData = {
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

$(document).ready(function () {

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

	
	var query = `mutation {
		createGameDataObj(input: {
		  dataObj: "` + btoa(gameData) + `",
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
			result.dataObjJson = JSON.stringify(atob(result.data.createGameDataObj.dataObj));
			$( "#dev-output" ).html( "<p>" + JSON.stringify(result) + "</p>");
			console.log(result.data);
		},
		error: function (result) {
			//@todo prüfen ob Backend erreichbar ist und das gewünschte Ergebnis asugibt, wenn nicht: Fehlermeldung an Spieler
			console.log(result);
		}
	});

	console.log(query);
	console.log('Backend Synchronisation abgeschlossen');
	return true;
}
// Resourcen
var gold = 20;
var wood = 20;
var stone = 15;
var metal = 10;

// Gebäudearten
var gameObjects = ['farm', 'logger', 'stone', 'iron', 'Kaserne', 'Stallungen', 'Schießstand', 'Sklavenmarkt'];
//Einheiten
// Initial Level (wird später vom backend synchronisiert)
var initialObjectLevel = {farm: 1, logger: 1, stone: 1, iron: 1, Kaserne: 0, Stallungen: 0, Schießstand: 0, Sklavenmarkt: 0};
//Einheitencounter
//var unitNumbers = {Soldier: 0, Rider: 0, Archer: 0, Slavetroop: 0};
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
// Kaserne
var Kasernegold = 300;
var Kasernewood = 200;
var Kasernestone = 150;
var Kaserneiron = 100;
//Stallungen
var Stallungengold = 300;
var Stallungenwood = 200;
var Stallungenstone = 150;
var Stallungeniron = 100;
//Schießstand
var Schießstandgold = 300;
var Schießstandwood = 200;
var Schießstandstone = 150;
var Schießstandiron = 100;
//Sklavenmarkt
var Sklavenmarktgold = 300;
var Sklavenmarktwood = 200;
var Sklavenmarktstone = 150;
var Sklavenmarktiron = 100;
// Gebäudekosten Ende ----------------------------
/*
//Einheitenkosten pro Einheit

//Soldat
var Soldiergold = 20;
var Soldierwood = 0;
var Soldierstone = 0;
var Soldieriron = 10;

//Reiter
var Ridergold = 50;
var Riderwood = 0;
var Riderstone = 0;
var Rideriron = 30;

//Bogenschütze
var Archergold = 30;
var Archerwood = 10
var Archerstone = 0
var Archeriron = 5

//Sklavensoldat
var Slavetroopgold = 5;
var Slavetroopwood = 5;
var Slavetroopstone = 0;
var Slavetroopiron = 5;

//Einheitenkostenende----------------------------
*/
//Resourcen Multiplikatoren
var goldPerSecMult = 0.25;
var woodPerSecMult = 0.25;
var stonePerSecMult = 0.25;
var metalPerSecMult = 0.25;

// Resourcen pro Sekunde
var goldPerSec = 0.25;
var woodPerSec = 0;
var stonePerSec = 0;
var metalPerSec = 0;

//Forschungsarten
var researchObjects = ['military', 'field', 'forest', 'stoneMine', 'ironMine'];

//Forschungslevel
var initialResearchLevel = {military: 0, field: 0, forest: 0, stoneMine: 0, ironMine: 0};

//Forschungskosten Start ---------------------------
//Militär
var militaryGold = 10;
var militaryWood = 10;
var militaryStone = 10;
var militaryMetal = 10;
//Feld
var fieldGold = 10;
var fieldWood = 10;
var fieldStone = 10;
var fieldMetal = 10;
//Wald
var forestGold = 10;
var forestWood = 10;
var forestStone = 10;
var forestMetal = 10;
//Steinmine
var stoneMineGold = 10;
var stoneMineWood = 10;
var stoneMineStone = 10;
var stoneMineMetal = 10;
//Eisenmine
var ironMineGold = 10;
var ironMineWood = 10;
var ironMineStone = 10;
var ironMineMetal = 10;
//Forschungskosten Ende ---------------------------
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
		Kaserne: {
			gold: Kasernegold,
			wood: Kasernewood,
			stone: Kasernestone,
			metal: Kaserneiron,
		},
		Stallungen: {
			gold: Stallungengold,
			wood: Stallungenwood,
			stone: Stallungenstone,
			metal: Stallungeniron,
		},
		Schießstand: {
			gold: Schießstandgold,
			wood: Schießstandwood,
			stone: Schießstandstone,
			metal: Schießstandiron,
		},
		Sklavenmarkt: {
			gold: Sklavenmarktgold,
			wood: Sklavenmarktwood,
			stone: Sklavenmarktstone,
			metal: Sklavenmarktiron,
		},
	},

/*	unitCost: {
		Soldier: {
			gold: Soldiergold,
			wood: Soldierwood,
			stone: Soldierstone,
			metal: Soldieriron,
		},

		Rider: {
			gold: Ridergold,
			wood: Riderwood,
			stone: Riderstone,
			metal: Rideriron,
		},

		Archer: {
			gold: Archergold,
			wood: Archerwood,
			stone: Archerstone,
			metal: Archeriron,
		},

		Slavetroop: {
			gold: Slavetroopgold,
			wood: Slavetroopwood,
			stone: Slavetroopstone,
			metal: Slavetroopiron,
		},
	},*/

	objectLevel: {
		farm: initialObjectLevel.farm,
		logger: initialObjectLevel.logger,
		stone: initialObjectLevel.stone,
		iron: initialObjectLevel.iron,
		Kaserne: initialObjectLevel.Kaserne,
		Stallungen: initialObjectLevel.Stallungen,
		Schießstand: initialObjectLevel.Schießstand,
		Sklavenmarkt: initialObjectLevel.Sklavenmarkt,
	},
	playerResources: {
		gold: gold,
		wood: wood,
		stone: stone,
		metal: metal,
	},

	researchList: {
		researchCost: {
			military: {
				gold: militaryGold,
				wood: militaryWood,
				stone: militaryStone,
				metal: militaryMetal,
			},
			field: {
				gold: fieldGold,
				wood: fieldWood,
				stone: fieldStone,
				metal: fieldMetal,
			},
			forest: {
				gold: forestGold,
				wood: forestWood,
				stone: forestStone,
				metal: forestMetal,
			},
			stoneMine: {
				gold: stoneMineGold,
				wood: stoneMineWood,
				stone: stoneMineStone,
				metal: stoneMineMetal,
			},
			ironMine: {
				gold: ironMineGold,
				wood: ironMineWood,
				stone: ironMineStone,
				metal: ironMineMetal,
			},
		},
		researchLevel: {
		military: initialResearchLevel.military,
		field: initialResearchLevel.field,
		forest: initialResearchLevel.forest,
		stoneMine: initialResearchLevel.stoneMine,
		ironMine: initialResearchLevel.ironmine,
		},
	}	
};
//Gegner vars
var enemySoldiers 	= 10;
var soldiersRounded = enemySoldiers;


$(document).ready(function () {

	//Init -- Start

	//@todo Prüfen ob Spielstand vorhanden ist, ansonsten neuen erstellen
	gameDataSync();

	//Aktuelle RessourcenProduktion
	calculateIncome();

	// Derzeit verfügbare Rohstoffe
	updateResources();

	setInterval(function() {
		enemySoldiers += (enemySoldiers/100)*1;
		soldiersRounded = Math.round(enemySoldiers)
	}, 1000);

	// Rohstoff Legende
	$( ".goldPerSec" ).append(4*goldPerSec);
	$( ".stonePerSec" ).append(4*stonePerSec);
	$( ".metalPerSec" ).append(4*metalPerSec);
	$( ".woodPerSec" ).append(4*woodPerSec);

	// Gegner Legende
	$( ".enemyCount" ).append(soldiersRounded);

	//Passives Gegnerverhalten
	enemyPassive();

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
	}, 250);

	
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
	
	//Berechnung der Ressourcenproduktion
	calculateIncome();

	// Rohstoff Produktion ans neue Level anpassen
	updateIncome(type);

	// Objektkosten aktualisieren
	updateBuildCost(type);

	return true;

}

function updateResources() {
	$( ".gold" ).html(Math.ceil(gameData.playerResources.gold));
	$( ".wood" ).html(Math.ceil(gameData.playerResources.wood));
	$( ".stone" ).html(Math.ceil(gameData.playerResources.stone));
	$( ".metal" ).html(Math.ceil(gameData.playerResources.metal));
	$( ".enemyCount" ).html(soldiersRounded);
}

function decreaseResources(type) {
	//decrease resources (später separate funktion)
	gameData.playerResources.gold -= gameData.objectCost[type].gold //|| gameData.unitCost[type].gold;
	gameData.playerResources.wood -= gameData.objectCost[type].wood //|| gameData.unitCost[type].wood;
	gameData.playerResources.stone -= gameData.objectCost[type].stone //|| gameData.unitCost[type].stone;
	gameData.playerResources.metal -= gameData.objectCost[type].metal //|| gameData.unitCost[type].metal;
	updateResources();
}

//Berechnet die Ressourcenrate neu
function calculateIncome() {
	goldPerSec = goldPerSecMult*gameData.objectLevel.farm;
	stonePerSec = stonePerSecMult*gameData.objectLevel.stone;
	metalPerSec = metalPerSecMult*gameData.objectLevel.iron;
	woodPerSec = woodPerSecMult*gameData.objectLevel.logger;
}

//Aktualisiert die visuelle Darstellung der Ressourcenrate
function updateIncome(type) {
	$( ".goldPerSec" ).html(goldPerSec*4);
	$( ".stonePerSec" ).html(stonePerSec*4);
	$( ".metalPerSec" ).html(metalPerSec*4);
	$( ".woodPerSec" ).html(woodPerSec*4);
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

function bauVisibility() {
	$(bauMenu).css('display', 'inherit');
	$(KriegMenu).css('display', 'none');
	$(UnitMenu).css('display', 'none');
}

function kriegVisibility() {
	$(KriegMenu).css('display', 'inherit');
	$(bauMenu).css('display', 'none');
	$(UnitMenu).css('display', 'none');
}

function unitVisibility() {
	$(UnitMenu).css('display', 'inherit');
	$(bauMenu).css('display', 'none');
	$(KriegMenu).css('display', 'none');
}

function enemyPassive() {

	x = true;
	// Spawn und Verhalten nach Spawn
	if (x == true) {enemySpawn();}
	function enemySpawn() {

		var leftRand = Math.floor((Math.random() * 90) + 1);
		var leftSpawn = leftRand.toString();
		leftSpawn += '%';

		var topRand = Math.floor((Math.random() * 60) + 1);
		var topSpawn = topRand.toString();
		topSpawn += '%';

		$(".enemyBase").addClass(" baseActive");
		$('.enemyBase').css({ 'left': leftSpawn,'top':topSpawn })

	

	}

}
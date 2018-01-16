// Resourcen
var gold = 2000;
var wood = 2000;
var stone = 1500;
var metal = 1000;
var research = 2000;

// Gebäudearten
var gameObjects = ['farm', 'logger', 'stone', 'iron', 'Kaserne', 'Stallungen', 'Schießstand', 'Sklavenmarkt', 'Soldier', 'university', 'field', 'forest', 'stoneMine', 'ironMine'];

// Initial Level (wird später vom backend synchronisiert)
var initialObjectLevel = {farm: 1, logger: 1, stone: 1, iron: 1, Kaserne: 0, Stallungen: 0, Schießstand: 0, Sklavenmarkt: 0, Soldier: 0, university: 0, field: 1, forest: 1, stoneMine: 1, ironMine: 1};

// Gebäudekosten Start ---------------------------
// Farm
var farmgold = 10;
var farmwood = 9;
var farmstone = 5;
var farmmetal = 0;
var farmresearch = 0;
// Forster
var loggergold = 20;
var loggerwood = 10;
var loggerstone = 5;
var loggermetal = 0;
var loggerresearch = 0;
// Steinbruch
var stonegold = 30;
var stonewood = 10;
var stonestone = 5;
var stonemetal = 5;
var stoneresearch = 0;
// Eisenmiene
var irongold = 50;
var ironwood = 20;
var ironstone = 15;
var ironmetal = 5;
var ironresearch = 0;
// Kaserne
var Kasernegold = 300;
var Kasernewood = 200;
var Kasernestone = 150;
var Kaserneiron = 100;
var Kaserneresearch = 0;
//Stallungen
var Stallungengold = 300;
var Stallungenwood = 200;
var Stallungenstone = 150;
var Stallungeniron = 100;
var Stallungenresearch = 0;
//Schießstand
var Schießstandgold = 300;
var Schießstandwood = 200;
var Schießstandstone = 150;
var Schießstandiron = 100;
var Schießstandresearch = 0;
//Sklavenmarkt
var Sklavenmarktgold = 300;
var Sklavenmarktwood = 200;
var Sklavenmarktstone = 150;
var Sklavenmarktiron = 100;
var Sklavenmarktresearch = 0;
//Universität
var universitygold = 500;
var universitywood = 500;
var universitystone = 500;
var universityiron = 500;
var universityresearch = 0;
// Gebäudekosten Ende ----------------------------
//Einheitenkosten pro Einheit

//Soldat
var Soldiergold = 5;
var Soldierwood = 0;
var Soldierstone = 5;
var Soldieriron = 5;
var Soldierresearch = 0;


//Einheitenkostenende----------------------------

//Resourcen Multiplikatoren
var goldPerSecMult = 0.25;
var woodPerSecMult = 0.25;
var stonePerSecMult = 0.25;
var metalPerSecMult = 0.25;
var researchPerSecMult = 0.25;

// Resourcen pro Sekunde
var goldPerSec = 0.25;
var woodPerSec = 0;
var stonePerSec = 0;
var metalPerSec = 0;
var researchPerSec = 0;

//Forschungskosten Start ---------------------------
//Feld
var fieldgold = 0;
var fieldwood = 0;
var fieldstone = 0;
var fieldiron = 0;
var fieldresearch = 150;
//Wald
var forestgold = 0;
var forestwood = 0;
var foreststone = 0;
var forestiron = 0;
var forestresearch = 150;
//Steinmine
var stoneMinegold = 0;
var stoneMinewood = 0;
var stoneMinestone = 0;
var stoneMineiron = 0;
var stoneMineresearch = 150;
//Eisenmine
var ironMinegold = 0;
var ironMinewood = 0;
var ironMinestone = 0;
var ironMineiron = 0;
var ironMineresearch = 150;
//Forschungskosten Ende ---------------------------
var gameData = {
	objectCost: {
		farm: {
			gold: farmgold,
			wood: farmwood,
			stone: farmstone,
			metal: farmmetal,
			research: farmresearch,
		},
		logger: {
			gold: loggergold,
			wood: loggerwood,
			stone: loggerstone,
			metal: loggermetal,
			research: loggerresearch,
		},
		stone: {
			gold: stonegold,
			wood: stonewood,
			stone: stonestone,
			metal: stonemetal,
			research: stoneresearch,
		},
		iron: {
			gold: irongold,
			wood: ironwood,
			stone: ironstone,
			metal: ironmetal,
			research: ironresearch,
		},
		Kaserne: {
			gold: Kasernegold,
			wood: Kasernewood,
			stone: Kasernestone,
			metal: Kaserneiron,
			research: Kaserneresearch,
		},
		Stallungen: {
			gold: Stallungengold,
			wood: Stallungenwood,
			stone: Stallungenstone,
			metal: Stallungeniron,
			research: Stallungenresearch,
		},
		Schießstand: {
			gold: Schießstandgold,
			wood: Schießstandwood,
			stone: Schießstandstone,
			metal: Schießstandiron,
			research: Schießstandresearch,
		},
		Sklavenmarkt: {
			gold: Sklavenmarktgold,
			wood: Sklavenmarktwood,
			stone: Sklavenmarktstone,
			metal: Sklavenmarktiron,
			research: Sklavenmarktresearch,
		},
		Soldier: {
			gold: Soldiergold,
			wood: Soldierwood,
			stone: Soldierstone,
			metal: Soldieriron,
			research: Soldierresearch,
		},
		university: {
			gold: universitygold,
			wood: universitywood,
			stone: universitystone,
			metal: universityiron,
			research: universityresearch,
		},
		field: {
			gold: fieldgold,
			wood: fieldwood,
			stone: fieldstone,
			metal: fieldiron,
			research: fieldresearch,
		},
		forest: {
			gold: forestgold,
			wood: forestwood,
			stone: foreststone,
			metal: forestiron,
			research: forestresearch,
		},
		stoneMine: {
			gold: stoneMinegold,
			wood: stoneMinewood,
			stone: stoneMinestone,
			metal: stoneMineiron,
			research: stoneMineresearch,
		},
		ironMine: {
			gold: ironMinegold,
			wood: ironMinewood,
			stone: ironMinestone,
			metal: ironMineiron,
			research: ironMineresearch,
		},

	},

	objectLevel: {
		farm: initialObjectLevel.farm,
		logger: initialObjectLevel.logger,
		stone: initialObjectLevel.stone,
		iron: initialObjectLevel.iron,
		Kaserne: initialObjectLevel.Kaserne,
		Stallungen: initialObjectLevel.Stallungen,
		Schießstand: initialObjectLevel.Schießstand,
		Sklavenmarkt: initialObjectLevel.Sklavenmarkt,
		Soldier: initialObjectLevel.Soldier,
		university: initialObjectLevel.university,
		field: initialObjectLevel.field,
		forest: initialObjectLevel.forest,
		stoneMine: initialObjectLevel.stoneMine,
		ironMine: initialObjectLevel.ironMine,

	},
	playerResources: {
		gold: gold,
		wood: wood,
		stone: stone,
		metal: metal,
		research: research,
	},	
};
//Soldaten vars
var enemySoldiers 	= 10;
var soldiersRounded = enemySoldiers;
var soldiersAll = 0;

//Kaserne gekauft ja/nein

var KasBought = false

$(document).ready(function () {

	//Init -- Start
	var sync = null;

	// Spielstand initial Synchronisierung
	sync = gameDataSync(true);

	//Aktuelle RessourcenProduktion
	calculateIncome();

	// Derzeit verfügbare Rohstoffe anzeigen
	updateResources();

	// Erhöht die Zahl der Gegner um 1 Prozent (gerundet) pro Sekunde und updated deine Soldatenzahl
	setInterval(function() {
		enemySoldiers += (enemySoldiers/100)*2;
		soldiersRounded = Math.round(enemySoldiers)

		soldiersAll = gameData.objectLevel.Soldier;
	}, 1000);

	// Timer für Gegner Angriff checkt jedes mal ob Gegner schon gespawnt ist
	setInterval(function() {

		if ($(".enemyBase").hasClass("baseActive")) {
			enemyAttack();
		}

	}, 50000);


	// Rohstoff Legende
	$( ".goldPerSec" ).append(4*goldPerSec);
	$( ".stonePerSec" ).append(4*stonePerSec);
	$( ".metalPerSec" ).append(4*metalPerSec);
	$( ".woodPerSec" ).append(4*woodPerSec);
	$( ".researchPerSec" ).append(4*researchPerSec);

	// Gegner Legende
	$( ".enemyCount" ).append(soldiersRounded);

	// Objektkosten
	updateBuildCost()

	//Init -- Ende

	//Main iteration
	setInterval(function() {
		gameData.playerResources.gold = gameData.playerResources.gold + goldPerSec;
		gameData.playerResources.wood = gameData.playerResources.wood + woodPerSec;
		gameData.playerResources.stone = gameData.playerResources.stone + stonePerSec;
		gameData.playerResources.metal = gameData.playerResources.metal + metalPerSec;
		gameData.playerResources.research = gameData.playerResources.research + researchPerSec;
		updateResources();
	}, 250);

	//Backend Synchronisation alle 1 Sekunden, wenn Storage vorhanden ist
	if (sync !== 'storage_not_supported') {
		setInterval(function() {
			sync = gameDataSync();
		}, 1500);
	}


	if (sync === 'storage_not_supported') {
		alert('LocalStorage wird vom Browser nicht unterstützt. Spielstand wird nicht gespeichert!');
	}

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

	//New Game Btn
	$('.newGameBtn').click(function() {
		newGameBtn();
		exit;
	});

	// Spielstand speichern beim schließen des Browsers, Tabs oder Neuladen der Seite
	window.addEventListener("beforeunload", function () {
		gameDataSync();
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
	$( ".research" ).html(Math.ceil(gameData.playerResources.research));

	$( ".enemyCount" ).html(soldiersRounded);
	$( ".playerCount" ).html(soldiersAll);
}

function decreaseResources(type) {
	//decrease resources (später separate funktion)
	gameData.playerResources.gold -= gameData.objectCost[type].gold;
	gameData.playerResources.wood -= gameData.objectCost[type].wood ;
	gameData.playerResources.stone -= gameData.objectCost[type].stone;
	gameData.playerResources.metal -= gameData.objectCost[type].metal ;
	gameData.playerResources.research -= gameData.objectCost[type].research;
	updateResources();
}

//Berechnet die Ressourcenrate neu
function calculateIncome() {
	goldPerSec = goldPerSecMult*gameData.objectLevel.farm*gameData.objectLevel.field;
	stonePerSec = stonePerSecMult*gameData.objectLevel.stone*gameData.objectLevel.stoneMine;
	metalPerSec = metalPerSecMult*gameData.objectLevel.iron*gameData.objectLevel.ironMine;
	woodPerSec = woodPerSecMult*gameData.objectLevel.logger*gameData.objectLevel.forest;
	researchPerSec = researchPerSecMult*gameData.objectLevel.university;
}

//Aktualisiert die visuelle Darstellung der Ressourcenrate
function updateIncome(type) {
	$( ".goldPerSec" ).html(goldPerSec*4);
	$( ".stonePerSec" ).html(stonePerSec*4);
	$( ".metalPerSec" ).html(metalPerSec*4);
	$( ".woodPerSec" ).html(woodPerSec*4);
	$( ".researchPerSec" ).html(researchPerSec*4);
}

function checkResources(type) {
	if (gameData.playerResources.gold < gameData.objectCost[type].gold || gameData.playerResources.wood < gameData.objectCost[type].wood || gameData.playerResources.stone < gameData.objectCost[type].stone || gameData.playerResources.metal < gameData.objectCost[type].metal || gameData.playerResources.research < gameData.objectCost[type].research) {
		return false;
	}

	return true;
}

//Vorher muss object level hochgesetzt werden
function updateBuildCost(type) {	
	if (type) {
		$.each( gameData.objectCost, function( key, value ) {
			if (key == type) {

				if(type !== 'Soldier'){

					gameData.objectCost[key].gold = Math.ceil(value.gold + value.gold * 0.1);
					gameData.objectCost[key].wood = Math.ceil(value.wood + value.wood * 0.1);
					gameData.objectCost[key].stone = Math.ceil(value.stone + value.stone * 0.1);
					gameData.objectCost[key].metal = Math.ceil(value.metal + value.metal * 0.1);
				gameData.objectCost[key].research = Math.ceil(value.research + value.research * 0.1);
				
				}
			}
		});
	}

	$( "li.costs" ).each(function() {
		// Baukosten
		$( this ).find(".gold-value").html(gameData.objectCost[this.id].gold);
		$( this ).find(".wood-value").html(gameData.objectCost[this.id].wood);
		$( this ).find(".stone-value").html(gameData.objectCost[this.id].stone); 
		$( this ).find(".metal-value").html(gameData.objectCost[this.id].metal);
		$( this ).find(".research-value").html(gameData.objectCost[this.id].research);	

		$( this ).find(".objectLevel").html(" ("+(gameData.objectLevel[this.id])+") ");
	});

}

function gameDataSync(initialSync = false) {
	console.log('Synchronisation beginnt');

	var gameStorage = getLocalStorage();
	var currentdate = Date($.now());

	if (!getLocalStorage()) {
		return 'storage_not_supported';
	}

	if( initialSync ) {
		//Prüfen ob ein Spielstand im Storage vorhanden ist
		if (gameStorage.gameData === undefined) {
			// Initial Object
			gameStorage.setItem('gameData', JSON.stringify(gameData));
			gameStorage.setItem('time', currentdate);
			alert('Derzeit befindet sich kein gespeicherter Spielstand im Browser localStorage. Ein neues Spiel beginnt.');
		} else {
			// Obj aus dem Storage
			gameData = JSON.parse(gameStorage.gameData);

			var lastPlayedTime;
			if (gameStorage.time === undefined) {
				lastPlayedTime = 'N/A';
			} else {
				lastPlayedTime = gameStorage.time;
			}
			alert('Dein letzter Spielstand wurde geladen. Zeitpunkt der letzten Speicherung: '+ lastPlayedTime);
			// Prüfung ob das Object, den vorgaben entspricht?
		}
	}

	//durchgehende Speicherung der Spieldaten
	gameStorage.removeItem('gameData');
	gameStorage.setItem('gameData', JSON.stringify(gameData));
	gameStorage.setItem('time', currentdate);

	console.log('Synchronisation erfolgreich abgeschlossen');
	return true;


	/*var query = `mutation {
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
		console.log('Backend Synchronisation abgeschlossen');
	});*/
}

// Quelle: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

function newGameBtn() {
		var quitGame;
		quitGame = window.confirm("Willst du wirklich ein neues Spiel starten? Der derzeitge Spielstand wird dabei gelöscht!");

		if(!quitGame) {
			return false;
		}

		window.addEventListener("beforeunload", function () {
			getLocalStorage().removeItem('gameData');
			getLocalStorage().removeItem('time');
		});

		return window.location.reload(true);
}

function getLocalStorage() {
	if (storageAvailable('localStorage')) {
		return localStorage;
	} else {
		false;
	}
}

function bauVisibility() {
	$(bauMenu).css('display', 'inherit');
	$(KriegMenu).css('display', 'none');
	$(UnitMenu).css('display', 'none');
	$(researchMenu).css('display', 'none');
}

function kriegVisibility() {
	$(KriegMenu).css('display', 'inherit');
	$(bauMenu).css('display', 'none');
	$(UnitMenu).css('display', 'none');
	$(researchMenu).css('display', 'none');
}

function unitVisibility() {
	$(UnitMenu).css('display', 'inherit');
	$(bauMenu).css('display', 'none');
	$(KriegMenu).css('display', 'none');
	$(researchMenu).css('display', 'none');
}

function researchVisibility() {
	$(researchMenu).css('display', 'inherit');
	$(UnitMenu).css('display', 'none');
	$(bauMenu).css('display', 'none');
	$(KriegMenu).css('display', 'none');
}

function enemySpawn() {
	$(".enemyBase").addClass(" baseActive");
}


// Gegnerisches Angriffsverhalten
function enemyAttack() {

	// 10% der Gegner greifen an
	attackSize = (enemySoldiers/100)*10;
	attackSizeRounded = Math.round(attackSize);
	enemySoldiers -= attackSizeRounded;

	$("#enemyTroopSize").html(attackSizeRounded);

	$(".enemyTroops").addClass(" visible");

	$(".enemyTroops").animate({
		top: '500px'
	}, 30000);

	setTimeout(function(){

		enemySiege();

		// Zurücksetzen nach Angriff
		$(".enemyTroops").removeClass(" visible");
		$(".enemyTroops").animate({
			top: '0px'
		});
	}, 30000);

}

function enemySiege() {

	// Schaden = 10% der Angreifergröße, Kampf solange es noch Soldaten auf beiden Seiten gibt
	attackDamage = (attackSizeRounded/100)*10;
	if(attackDamage < 1) {
		attackDamage = 1;
	}

	while (attackSizeRounded > 0 && soldiersAll > 0) {
   			
		attackSizeRounded -= attackDamage;
		soldiersAll -= attackDamage;

		soldiersAll = Math.round(soldiersAll);
		$( ".playerCount" ).html(soldiersAll);
		gameData.objectLevel.Soldier = soldiersAll;
	}
	if (soldiersAll < 1) {
		gameData.objectLevel.Soldier = 0;
	}
}

setInterval(function buyableUnitSol () {
	if (gameData.objectLevel.Kaserne >= 1) {
		$('.SoldierBtn').css('display', 'inherit');
		KasBought = true;
		enemySpawn();
		}
},1000)
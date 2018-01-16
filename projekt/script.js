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

    var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
        $('.coords').html('<p>X / Left: ' + currentMousePos.x + ' | Y / Top: ' + currentMousePos.y + '</p>');
    }).mouseover();


    $('.coords').hide();

	//Init -- Start
	var sync = null;

	// Spielstand initial Synchronisierung
	sync = gameDataSync(true);

	// Derzeit verfügbare Rohstoffe anzeigen
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

function gameDataSync(initialSync = false) {
	console.log('Synchronisation beginnt');

	var gameStorage = localStorage;
	var currentdate = Date($.now());

	if (!storageAvailable('localStorage')) {
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
		//Lock, verhindere weitere Tabs
		gameStorage.setItem('lock', true);
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
			localStorage.removeItem('gameData');
			localStorage.removeItem('time');
		});

		return window.location.reload(true);
}
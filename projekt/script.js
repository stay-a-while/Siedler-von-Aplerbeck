// Resourcen
var gold = 20;
var wood = 20;
var stone = 15;
var metal = 10;

// Gebäudearten
var gameObjects = ['farm', 'logger', 'stone', 'iron'];

// Initial Level (wird später vom backend synchronisiert)
var objectLevel = {farm: 1, logger: 1, stone: 1, iron: 1};

// Gebäudekosten Start ---------------------------
// Farm
var farmgold = 10 * objectLevel.farm;
var farmwood = 9 * objectLevel.farm;
var farmstone = 5 * objectLevel.farm;
var farmmetal = 0 * objectLevel.farm;
// Forster
var loggergold = 20 * objectLevel.logger;
var loggerwood = 10 * objectLevel.logger;
var loggerstone = 5 * objectLevel.logger;
var loggermetal = 0 * objectLevel.logger;
// Steinbruch
var stonegold = 30 * objectLevel.stone;
var stonewood = 10 * objectLevel.stone;
var stonestone = 5 * objectLevel.stone;
var stonemetal = 5 * objectLevel.stone;
// Eisenmiene
var irongold = 50 * objectLevel.iron;
var ironwood = 20 * objectLevel.iron;
var ironstone = 15 * objectLevel.iron;
var ironmetal = 5 * objectLevel.iron;
// Gebäudekosten Ende ----------------------------

// Resourcen pro Sekunde
var goldPerSec = 1;
var woodPerSec = 0;
var stonePerSec = 0;
var metalPerSec = 0;

// Resourcen var-Liste
var buildCost = {
	type: {
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
	}
};

$(document).ready(function () {
		setInterval(function() {
			gold = gold + goldPerSec;
			wood = wood + woodPerSec;
			stone = stone + stonePerSec;
			metal = metal + metalPerSec;
			
			$(".wood").html(wood);
			$( ".gold" ).html(gold);
			$( ".stone" ).html(stone);
			$( ".metal" ).html(metal);
		}, 1000);

		// Resourcen pro Sekunde
		$( ".goldPerSec" ).append(goldPerSec);

		$( "li.costs" ).each(function() {
			// Baukosten
			$( this ).find(".costGold").append(buildCost.type[this.id].gold);
			$( this ).find(".costWood").append(buildCost.type[this.id].wood);
			$( this ).find(".costStone").append(buildCost.type[this.id].stone);
			$( this ).find(".costMetal").append(buildCost.type[this.id].metal);	

			$( this ).find(".objectLevel").html(" ("+objectLevel[this.id]+") ");		
		});

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


//decrease resources (später separate funktion)
gold -= buildCost.type[type].gold;
wood -= buildCost.type[type].wood;
stone -= buildCost.type[type].stone;
metal -= buildCost.type[type].metal;

//increase object level (später separate funktion)
objectLevel[type] += 1;
$( "#" + type ).find(".objectLevel").html(" ("+objectLevel[type]+") ");

return true;

}

function checkResources(type) {
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

	if (gold < buildCost.type[type].gold || wood < buildCost.type[type].wood || stone < buildCost.type[type].stone || metal < buildCost.type[type].metal) {
		return false;
	}

	return true;

}
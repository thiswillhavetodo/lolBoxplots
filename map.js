var monsterTotal;
var monsterCreated;
var monstersRemaining;
var monsterArray;
var monsterDistanceArray;
var tileArray;
var monsterHealthBackArray;
var monsterHealthFrontArray;
var monsterRemainingText;

var mapScene = new Phaser.Scene('map');

mapScene.create = function() {	
	monsterTotal = 15;
	monstersRemaining = 15;
	monsterCreated = 0;
	monsterArray = [];
	monsterHealthBackArray = [];
	monsterHealthFrontArray = [];
	monsterDistanceArray = [];
	activeScene = "map";
	var background = this.add.sprite(512, 288, 'countrysideMap').setInteractive();
	background.on('pointerdown', function(pointer) { 
		console.log('click');
		if (monsterCreated<monsterTotal) { 
			this.createMonster(pointer.y); 
		} 
	}, this); 	
	tileArray = [[0, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0],  //0 = grass, 1 = river, 2 = long grass, 3 = mud, 4 = flowers
				 [0, 1, 1, 1, 0, 3, 0, 0, 4, 0, 0], 
				 [0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0], 
				 [0, 0, 3, 1, 0, 0, 2, 0, 0, 0, 0], 
				 [0, 0, 0, 1, 1, 1, 0, 3, 0, 0, 0], 
				 [0, 0, 2, 0, 0, 1, 0, 0, 4, 0, 0]];
	this.add.text(950, 10, "Monsters Remaining", { fontSize: '16px', fill: '#fff' }).setFontFamily('Arial').setOrigin(0.5);
	monsterRemainingText = this.add.text(950, 35, monsterTotal-monsterCreated, { fontSize: '42px', fill: '#fff' }).setFontFamily('Arial').setOrigin(0.5);
};

mapScene.createMonster = function(pointerY) {
	var yBand = Math.floor(pointerY/96);
	var yPos = (yBand*96)+48;
	var healthBarBack = this.add.sprite(0, yPos+30, 'healthBar').setOrigin(0);
	healthBarBack.setFrame(0);
	var healthBarFront = this.add.sprite(0, yPos+30, 'healthBar').setOrigin(0);
	healthBarFront.setFrame(1);
	var monster = this.add.sprite(0, yPos, 'monsters').setOrigin(0, 0.5);
	monster.maxHp = 22+Math.floor(Math.random()*4);
	monster.hp = monster.maxHp;
	monster.terrainType = 0;
	monster.setFrame(8);	
	monster.alive = true;
	console.log(monster);
	if (monsterCreated==0) {
		this.time.delayedCall(500, function() {
			mapScene.moveMonsters();
		}, [], this);
	}
	monsterCreated++;
	monsterRemainingText.text = monsterTotal-monsterCreated;
	console.log(monsterCreated);
	monsterArray.push(monster);
	monsterHealthBackArray.push(healthBarBack);
	monsterHealthFrontArray.push(healthBarFront);
};

mapScene.moveMonsters = function() {
	console.log('click');
	mapScene.checkTerrain();
	var duration;
	for (var i=0; i<monsterArray.length; i++) {		
		if (monsterArray[i].hp>0) {
			switch (monsterArray[i].terrainType) {
				case 0:
					monsterArray[i].anims.play('monsterRunRed');
					duration = 700,
					monsterArray[i].hp-=2;					
					break;
				case 1:
					monsterArray[i].anims.play('monsterRunRed');
					duration = 1400,
					monsterArray[i].hp-=7;
					break;
				case 2:
					monsterArray[i].anims.play('monsterRunRed');
					duration = 1400,	
					monsterArray[i].hp-=4;
					break;
				case 3:
					monsterArray[i].anims.play('monsterRunRed');
					duration = 1400,
					monsterArray[i].hp-=5;
					break;
				case 4:
					monsterArray[i].anims.play('monsterRunRed');
					duration = 1400,	
					monsterArray[i].hp-=3;
					break;
			}
			this.tweens.add({
				targets: monsterArray[i],
				x: "+=96",
				ease: 'Sine.easeIn',				
				duration: duration,					
			});	
			this.tweens.add({
				targets: monsterHealthBackArray[i],
				x: "+=96",
				ease: 'Sine.easeIn',				
				duration: duration,					
			});	
			this.tweens.add({
				targets: monsterHealthFrontArray[i],
				x: "+=96",
				ease: 'Sine.easeIn',				
				duration: duration,					
			});	
			monsterHealthFrontArray[i].setCrop(-21, 0, (monsterArray[i].hp/monsterArray[i].maxHp)*42, 10);
		}
	}	
	this.time.delayedCall(1500, function() {
		mapScene.checkMonsters();
	}, [], this);
};

mapScene.checkTerrain = function() {
	for (var i=0; i<monsterArray.length; i++) {	
		var xCord = Math.floor(monsterArray[i].x/96);
		var yCord = Math.floor(monsterArray[i].y/96);
		//console.log(monsterArray[i].terrainType);
		monsterArray[i].terrainType = tileArray[yCord][xCord];
		//console.log(monsterArray[i].terrainType);
	}
};

mapScene.checkMonsters = function() {
	for (var i=0; i<monsterArray.length; i++) {		
		if (monsterArray[i].hp<=0) {
			monsterArray[i].anims.play('death');
			this.tweens.add({
				targets: monsterArray[i],
				alpha: 0,
				ease: 'Sine.easeIn',				
				duration: 1000,					
			});	
			this.tweens.add({
				targets: monsterHealthFrontArray[i],
				alpha: 0,
				ease: 'Sine.easeIn',				
				duration: 1000,					
			});	
			this.tweens.add({
				targets: monsterHealthBackArray[i],
				alpha: 0,
				ease: 'Sine.easeIn',				
				duration: 1000,					
			});	
			console.log(i);			
			if (monsterArray[i].alive) {
				monsterDistanceArray.push(monsterArray[i].x);
				monstersRemaining--;
				monsterArray[i].alive = false;
			}
		}
	}
	this.time.delayedCall(500, function() {
		if (monstersRemaining>0) {
			mapScene.moveMonsters();
		}
		else {			
			console.log(monsterDistanceArray);
			mapScene.returnToBase();
		}
	}, [], this);
			
}

mapScene.returnToBase = function() {
	this.time.delayedCall(1000, function() {
		mapScene.scene.stop("map");
		mapScene.scene.start("main");
	}, [], this);
}
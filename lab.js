var madScientistLabSprite;
var monster;
var victim;
var treadmill;
var treadmillTwo;
var speedText;
var lifeText;
var finished;

var labScene = new Phaser.Scene('lab');

labScene.create = function() {
	console.log(extraIngredient1.name);
	if (extraIngredient1.name=='none') {
		extraIngredient1.name = 'Soda';
	}
	finished = false;
    var background = this.add.image(400, 300, 'labBackground');
    background.setScale(2);
	this.add.image(550, 100, 'labSign');
    madScientistLabSprite = this.add.sprite(730, 504, 'madScientist');
    madScientistLabSprite.setScale(2);
    madScientistLabSprite.anims.play('msStand');
    treadmill = this.add.sprite(200, 524, 'treadmill');
    treadmill.setScale(2);
    treadmillTwo = this.add.sprite(500, 524, 'treadmill');
    treadmillTwo.setScale(2);
    monster = this.add.sprite(200, 460, 'monsters');
    monster.setScale(2);
    monster.setFrame(2);
    victim = this.add.sprite(500, 460, 'victims');
    victim.setScale(2);
    victim.setFrame(0);
    var speechText = "Here we have our monster ready to test the new formula, and a volunteer to give it some encouragement. I'll just give it a zap.";
    this.time.delayedCall(750, function() { this.createBubble(635, 300, speechText); }, [], this);
	this.add.text(445, 230, 'Speed (mph) :', { fontSize: '15px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
	speedText = this.add.text(590, 230, '0', { fontSize: '15px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
	this.add.text(445, 295, 'Lifetime (sec) :', { fontSize: '15px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
	lifeText = this.add.text(590, 295, '0', { fontSize: '15px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
};

labScene.setResults = function() {
	var ingredient, speed, lifetime, currentNumber;
	if (extraIngredient3.name!='none') {
		ingredient = extraIngredient3.name;
		currentNumber = 3;
	}
	else if (extraIngredient2.name!='none') {
		ingredient = extraIngredient2.name;
		currentNumber = 2;
	}
	else if (extraIngredient1.name!='none') {
		ingredient = extraIngredient1.name;
		currentNumber = 1;
	}
	switch (ingredient) {
		case 'Cat Fur':
			speed = 7;
			lifetime = 8;
			break;
		case 'Ketchup':
			speed = 4;
			lifetime = 12;
			break;
		case 'Soda':
			speed = 6;
			lifetime = 9;
			break;
		case 'Slime':
			speed = 5;
			lifetime = 11;
			break;
		case 'Bananas':
			speed = 6;
			lifetime = 12;
			break;
		case 'Chocolate':
			speed = 6;
			lifetime = 10;
			break;
	}
	if (currentNumber==1) {
		extraIngredient1.speed = speed;
		extraIngredient1.lifetime = lifetime;
	}
	else if (currentNumber==2) {
		extraIngredient2.speed = speed;
		extraIngredient2.lifetime = lifetime;
	}
	else if (currentNumber==3) {
		extraIngredient3.speed = speed;
		extraIngredient3.lifetime = lifetime;
	}
	return [ingredient, speed, lifetime];
};

labScene.testAnimation = function() {
	var resultsArray = this.setResults();
    var zap = this.add.sprite(200, 460, 'electricEffect');
    zap.setScale(3.5);
    zap.anims.play('electricEffect');
    this.time.delayedCall(500, function() {
        zap.anims.stop('electricEffect');
        zap.visible = false;
        monster.setFrame(1);
    }, [], this);
    this.time.delayedCall(800, function() { monster.setFrame(5); }, [], this);
    this.time.delayedCall(1300, function() {
        treadmill.anims.play('treadmillActive');
        treadmillTwo.anims.play('treadmillActive');
        monster.anims.play('monsterRun');
        victim.anims.play('victimRun');
    }, [], this);
	var monsterDeathSprite;
	this.time.delayedCall(resultsArray[2]*1000, function() {
		monster.anims.stop('monsterRun');
		monster.visible = false;
		monsterDeathSprite = this.add.sprite(monster.x, monster.y, 'zombieDeath');
		monsterDeathSprite.setScale(2);
		monsterDeathSprite.anims.play('death');
		this.tweens.add({
			targets: monsterDeathSprite,
			x: -100,
			ease: 'Sine.easeIn',
			delay: 300,
			duration: 500,
		});
	}, [], this);
	var timeDisplayed = 0;
	var speedDisplayed = 0;
	var counterTime = 0;
	var counterSpeed = 0;
	while (counterTime<resultsArray[2]) {
		counterTime++;
		this.time.delayedCall(1000*counterTime, function() { 
			timeDisplayed++; 
			lifeText.text = timeDisplayed;
			if (timeDisplayed==resultsArray[2]) {
				var speechText = "Interesting. The monster lasted "+resultsArray[2]+" seconds and reached a top speed of "+resultsArray[1]+" miles per hour.";
				finished = true;
				this.time.delayedCall(2000, function() { this.createBubble(635, 300, speechText); }, [], this);
			}
		}, [], this);		
		
	}
	while (counterSpeed<resultsArray[1]) {
		counterSpeed++;
		this.time.delayedCall(250*counterSpeed, function() { speedDisplayed++; speedText.text = speedDisplayed; }, [], this);		
	}
};

labScene.createBubble = function(x, y, text) {
    var bubbleSprite = this.add.sprite(x, y, 'speechBubble').setInteractive( { useHandCursor: true } );
    bubbleSprite.setScale(2);
    bubbleSprite.setTint(0xfeffb1);
    bubbleSprite.on('animationcomplete', function (anim, frame) {
      this.emit('animationcomplete_' + anim.key, anim, frame);
    }, bubbleSprite);
    bubbleSprite.anims.play('bubbleOpen');
    bubbleSprite.on('animationcomplete_bubbleOpen', function () {
        bubbleSprite.setFrame(3);
    });
    bubbleSprite.on('animationcomplete_bubbleClose', function () {
        bubbleSprite.destroy();
    });
    var bubbleText = this.add.text(x, y-20, text, { fontSize: '26px', fill: '#000', wordWrap: { width: 320, useAdvancedWrap: true } }).setFontFamily('Verdana').setOrigin(0.5);
    bubbleText.visible = false;
    
    this.time.delayedCall(250, function() {
        bubbleText.visible = true;
        madScientistLabSprite.anims.play('msTalk');
        if (!mute) {
            //speechBubbleSfx.play();
        }
    }, [], this);
    var that = this;
    bubbleSprite.on('pointerdown', function() {
        bubbleText.text = '';
        bubbleSprite.anims.play('bubbleClose');
        madScientistLabSprite.anims.play('msStand');
        that.time.delayedCall(500, function() {
			if (!finished) {
            	labScene.testAnimation();
			}
			else {
				var speechText = "We'll collect the results from the other monsters and view them together.";				
    			that.createBubble(635, 300, speechText);
				that.time.delayedCall(8000, function() { 
					labScene.scene.stop("lab");
	    			labScene.scene.start("main"); 
				}, [], this);
			}
        }, [], this);
    }); 
    this.time.delayedCall(6000, function() {
        madScientistLabSprite.anims.play('msStand');
    }, [], this);
};
var madScientistLabSprite;
var monster;
var victim;
var treadmill;
var treadmillTwo;
var speedText;
var lifeText;
var finished;
var readyToLeave;
var screamSfx;
var growlSfx;
var treadmillSfx;
var wooshSfx;
var zapSfx;

var labScene = new Phaser.Scene('lab');

labScene.create = function() {
	activeScene = "lab";
	//console.log(extraIngredient1.name);	
	if (possibleIngredientsArray.length==5) {
		var progress = {
		  currentProgress: 6,
		  maximumProgress: 13			  
		};
		LoLApi('progress', progress );
	}
	finished = false;
	readyToLeave = false;
    var background = this.add.image(512, 276, 'labBackground');
    background.setScale(2);
	this.add.image(850, 200, 'labSign');
    madScientistLabSprite = this.add.sprite(880, 480, 'madScientist');
    madScientistLabSprite.setScale(2);
    madScientistLabSprite.anims.play('msStand');
    treadmill = this.add.sprite(200, 500, 'treadmill');
    treadmill.setScale(2);
    treadmillTwo = this.add.sprite(500, 500, 'treadmill');
    treadmillTwo.setScale(2);
    monster = this.add.sprite(200, 436, 'monsters');
    monster.setScale(2);
    monster.setFrame(2);
    victim = this.add.sprite(500, 436, 'victims');
    victim.setScale(2);
    victim.setFrame(0);
    var speechTextLab = jsonText.labSpeech1;
    this.time.delayedCall(750, function() { this.createBubble(785, 276, speechTextLab); }, [], this);
	if (!mute) {				
		LoLApi('speakText', { key: 'labSpeech1' });
	}
	this.add.text(445, 206, 'Speed (mph) :', { fontSize: '15px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
	speedText = this.add.text(590, 206, '0', { fontSize: '15px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
	this.add.text(445, 271, 'Lifetime (sec) :', { fontSize: '15px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
	lifeText = this.add.text(590, 271, '0', { fontSize: '15px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
	nextButton = this.add.sprite(512, 526, 'buttonLarge').setInteractive( { useHandCursor: true  } );    
	var that = this;
	nextButton.on('pointerdown', function() {
        //bubbleText.text = '';	
		/*if (bubbleVisible) {
			bubbleSprite.anims.play('bubbleClose');
		}*/
		that.time.delayedCall(500, function() {
            labScene.nextStep();
        }, [], this);		
    }); 	
	nextButton.visible = false;
    nextButtonLabel = this.add.text(517, 526, jsonText.mainButton1, { fontSize: '38px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 }).setOrigin(0.5);
	nextButtonLabel.visible = false;
	if (!mute) {
		screamSfx = this.sound.add('scream');
		zapSfx = this.sound.add('zap');
		growlSfx = this.sound.add('growl');
		wooshSfx = this.sound.add('woosh');
		speechBubbleSfx = this.sound.add('pop');
		treadmillSfx = this.sound.add('treadmill');			
	}
};

labScene.setResults = function() {
	var ingredient, speed, lifetime, currentNumber;
	ingredient = extraIngredient1.name;
	currentNumber = 1;
	/*if (extraIngredient3.name!='none') {
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
	}*/
	switch (ingredient) {
		case jsonText.possIngredients0:
			speed = 7;
			lifetime = 8;
			break;
		case jsonText.possIngredients1:
			speed = 4;
			lifetime = 12;
			break;
		case jsonText.possIngredients2:
			speed = 6;
			lifetime = 9;
			break;
		case jsonText.possIngredients3:
			speed = 5;
			lifetime = 11;
			break;
		case jsonText.possIngredients4:
			speed = 6;
			lifetime = 12;
			break;
		case jsonText.possIngredients5:
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
    var zap = this.add.sprite(200, 436, 'electricEffect');
    zap.setScale(3.5);
    zap.anims.play('electricEffect');
	if (!mute) {
		zapSfx.play();
	}
    this.time.delayedCall(500, function() {
        zap.anims.stop('electricEffect');
        zap.visible = false;
        monster.setFrame(1);
		if (!mute) {
			zapSfx.stop();
			growlSfx.play( { volume: 1.5 } );
		}
    }, [], this);
    this.time.delayedCall(800, function() { monster.setFrame(5); }, [], this);
    this.time.delayedCall(1300, function() {
        treadmill.anims.play('treadmillActive');
        treadmillTwo.anims.play('treadmillActive');
        monster.anims.play('monsterRun');
        victim.anims.play('victimRun');
		if (!mute) {
			screamSfx.play();
			treadmillSfx.play( { loop: true, volume: 0.75 });
		}
    }, [], this);
	var monsterDeathSprite;
	this.time.delayedCall(resultsArray[2]*1000, function() {
		monster.anims.stop('monsterRun');
		monster.visible = false;
		monsterDeathSprite = this.add.sprite(monster.x, monster.y, 'zombieDeath');
		monsterDeathSprite.setScale(2);
		monsterDeathSprite.anims.play('death');
		if (!mute) {
			wooshSfx.play( { volume: 2 } );
		}
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
				var speechTextLab = jsonText.labSpeech2+resultsArray[2]+jsonText.labSpeech3+resultsArray[1]+jsonText.labSpeech4;
				finished = true;
				this.time.delayedCall(2000, function() { 
					this.createBubble(785, 276, speechTextLab); 
					if (!mute) {						
						LoLApi('speakText', { key: 'labSpeech6' });
					}
				}, [], this);
			}
		}, [], this);		
		
	}
	while (counterSpeed<resultsArray[1]) {
		counterSpeed++;
		this.time.delayedCall(500*counterSpeed, function() { speedDisplayed++; speedText.text = speedDisplayed; }, [], this);		
	}
};

labScene.createBubble = function(x, y, text) {
    bubbleSprite = this.add.sprite(x, y, 'speechBubble');
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
    bubbleText = this.add.text(x, y-20, text, { fontSize: '26px', fill: '#000', wordWrap: { width: 320, useAdvancedWrap: true } }).setFontFamily('Verdana').setOrigin(0.5);
    bubbleText.visible = false;
    
    this.time.delayedCall(250, function() {
        bubbleText.visible = true;
        madScientistLabSprite.anims.play('msTalk');
        if (!mute) {
            speechBubbleSfx.play();
        }
    }, [], this);    
    this.time.delayedCall(6000, function() {
        madScientistLabSprite.anims.play('msStand');
		nextButton.visible = true;
		nextButtonLabel.visible = true;
    }, [], this);
};

labScene.nextStep = function() {
	bubbleText.text = '';
	bubbleSprite.anims.play('bubbleClose');
	madScientistLabSprite.anims.play('msStand');
	nextButton.visible = false;
	nextButtonLabel.visible = false;
	this.time.delayedCall(500, function() {
		if (!finished) {
			labScene.testAnimation();
		}
		else if (!readyToLeave) {
			readyToLeave = true;
			var speechTextLab = jsonText.labSpeech5;				
			this.createBubble(785, 276, speechTextLab);
			if (!mute) {				
				LoLApi('speakText', { key: 'labSpeech5' });
			}
		}
		else {
			this.time.delayedCall(500, function() { 
				if (!mute) {
					treadmillSfx.stop();
				}
				labScene.scene.stop("lab");
				activeScene = "main";
				labScene.scene.start("main"); 
			}, [], this);
		}
	}, [], this);
};
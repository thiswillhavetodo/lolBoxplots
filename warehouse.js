var cratesArray;
var ingredientsCollected;
var correctChoice;
var correctAvailable;
var tweenDuration;
var conveyorBelt;
var conveyorBelt2;
var madScientistWarehouse;
var cratesCollectedText;
var quelchSfx;
var smashSfx;
var speechBubbleSfx;
var conveyorSFX;

var warehouseScene = new Phaser.Scene('warehouse');

warehouseScene.create = function() {	
	activeScene = "warehouse";
	cratesArray = [];
	ingredientsCollected = 0;
	correctChoice = extraIngredient1.frame;
	correctAvailable = false;
	tweenDuration = 7000;
	var background = this.add.image(512, 276, 'blankBackground');
    background.setScale(2);
	conveyorBelt = this.add.sprite(512, 526, 'conveyor');
    conveyorBelt.setScale(3, 2);
	conveyorBelt.anims.play('conveyorActive');
	conveyorBelt2 = this.add.sprite(512, 250, 'conveyor');
    conveyorBelt2.setScale(3, 2);
	conveyorBelt2.anims.play('conveyorActiveRight');
	var crateIcon = this.add.sprite(470, 333, 'crates');
	crateIcon.setFrame(correctChoice);
	crateIcon.visible = false;
	cratesCollectedText = this.add.text(512, 317, '= '+ingredientsCollected, { fontSize: '26px', fill: '#fff' }).setFontFamily('Verdana');
	cratesCollectedText.visible = false;
	var delay = 9500;
	for (var i=0; i<7; i++) {
		this.createCrate(delay, 'left');
		this.createCrate(delay, 'right');
		delay+=1000;
	}
	madScientistWarehouse = this.add.sprite(1180, 480, 'madScientist');
    madScientistWarehouse.setScale(2);
    madScientistWarehouse.anims.play('msWalk');
	this.tweens.add({
        targets: madScientistWarehouse,
        x: 930,
        ease: 'Sine.easeIn',
		delay: 0,		
        duration: 2000,					
    });	
	this.time.delayedCall(2000, function() {
		madScientistWarehouse.anims.stop('msWalk');
		madScientistWarehouse.anims.play('msStand');
	}, [], this);
	var speechTextWarehouse = jsonText.warehouseSpeech1+extraIngredient1.name+jsonText.warehouseSpeech2;
    this.time.delayedCall(2250, function() { 
		this.createBubble(835, 276, speechTextWarehouse);		
		if (!mute) {			
			LoLApi('speakText', { key: 'warehouseSpeech3' });
		}
	}, [], this);
	this.time.delayedCall(10500, function() {
		madScientistWarehouse.anims.stop('msStand');
		madScientistWarehouse.anims.play('msWalk');
		crateIcon.visible = true;
		cratesCollectedText.visible = true;
	}, [], this);
	this.tweens.add({
        targets: madScientistWarehouse,
        x: 1180,
        ease: 'Sine.easeIn',
		delay: 10500,		
        duration: 2000,					
    });	
	if (!mute) {
		squelchSfx = this.sound.add('squelch');
		smashSfx = this.sound.add('smash');
		speechBubbleSfx = this.sound.add('pop');
		conveyorSFX = this.sound.add('conveyor', { loop: true, volume: 0.3 });
		conveyorSFX.play();		
	}
};

warehouseScene.createCrate = function(delay, direction) {
	var x, y, targetX, frame;
	var framesArray = [0, 1, 2, 3, 4, 5, correctChoice];
	if (correctAvailable) {
		frame = framesArray[Math.floor(Math.random()*framesArray.length)];
	}
	else {
		frame = correctChoice;
		correctAvailable = true;
	}
	if (direction=='left') {
		x = 1200;
		y = 410;
		targetX = -200;
	}
	else {
		x = -200;
		y = 134;
		targetX = 1200;
	}
	var crate = this.add.sprite(x, y, 'crates').setInteractive( { useHandCursor: true } );
	crate.setScale(2);
	crate.setFrame(frame);
	crate.frameUsed = frame;
	crate.direction = direction;
	crate.on('pointerdown', function() { 
		crate.visible = false; 
		warehouseScene.crateClicked(crate.frameUsed);
	}); 
	crate.tween1 = this.tweens.add({
        targets: crate,
        x: targetX,
        ease: 'Sine.easeIn',
		delay: delay,		
        duration: function () { return tweenDuration; },
		repeat: -1,		
		onRepeat: function() {
			crate.visible = true;	
			crate.tween1.restart();
		}				
    });	
	cratesArray.push(crate);
};

warehouseScene.crateClicked = function(frame) {
	if (frame==correctChoice) {
		ingredientsCollected++;
		if (!mute) {
			smashSfx.play();
		}
		cratesCollectedText.text = '= '+ingredientsCollected;
		//console.log(ingredientsCollected);
		if (ingredientsCollected==3) {			
			tweenDuration = 5200;			
		}
		else if (ingredientsCollected==9) {
			tweenDuration = 4300;
		}
		else if (ingredientsCollected==9) {
			tweenDuration = 3400;
		}
		else if (ingredientsCollected==12) {
			tweenDuration = 2650;			
		}
		else if (ingredientsCollected==15) {
			tweenDuration = 7000;
			this.time.delayedCall(750, function() { warehouseScene.endScene(); }, [], this);			
		}
	}
	else {
		warehouseScene.splatter(frame);
	}
};

warehouseScene.splatter = function(frame) {
	var splatter = this.add.sprite(512, 276, 'splatter');
	splatter.setFrame(frame);
	splatter.setScale(3, 2);
	this.tweens.add({
        targets: splatter,
        alpha: 0,
        ease: 'Sine.easeIn',
		delay: 250,		
        duration: 2000,					
    });	
	if (!mute) {
		squelchSfx.play();
	}
};

warehouseScene.endScene = function() {	
	for (var i=0; i<cratesArray.length; i++) {
		cratesArray[i].tween1.stop();				
	}
	if (!mute) {
		conveyorSFX.stop();
	}
	conveyorBelt.anims.stop('conveyorActive');	
	conveyorBelt.setFrame(3);
	conveyorBelt2.anims.stop('conveyorActiveRight');
	conveyorBelt2.setFrame(3);
	var labButton = this.add.sprite(512, 526, 'buttonLarge').setInteractive( { useHandCursor: true } ); 
	labButton.on('pointerdown', this.toTheLab); 
	this.add.text(517, 526, jsonText.warehouseButton1, { fontSize: '38px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 }).setOrigin(0.5);
};

warehouseScene.toTheLab = function() {	
	warehouseScene.scene.stop("warehouse");
	warehouseScene.scene.start("lab");
};

warehouseScene.createBubble = function(x, y, text) {
    var bubbleSprite = this.add.sprite(x, y, 'speechBubble');
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
        madScientistWarehouse.anims.play('msTalk');
        if (!mute) {
            speechBubbleSfx.play();
        }
    }, [], this);
    
    this.time.delayedCall(7500, function() {
        madScientistWarehouse.anims.play('msStand');
		bubbleText.text = '';
        bubbleSprite.anims.play('bubbleClose');
    }, [], this);
};
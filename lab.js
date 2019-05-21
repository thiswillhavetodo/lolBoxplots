var madScientistLabSprite;
var monster;
var victim;
var treadmill;
var treadmillTwo;

var labScene = new Phaser.Scene('lab');

labScene.create = function() {
	if (extraIngredient1=='none') {
		extraIngredient1 = 'Soda';
	}
    var background = this.add.image(400, 300, 'labBackground');
    background.setScale(2);
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
};

labScene.setResults = function() {
	var ingredient, speed, lifetime;
	if (extraIngredient3!='none') {
		ingredient = extraIngredient3;
	}
	else if (extraIngredient2!='none') {
		ingredient = extraIngredient2;
	}
	else if (extraIngredient1!='none') {
		ingredient = extraIngredient1;
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
	this.time.delayedCall(resultsArray[1]*1000, function() {
		monster.anims.stop('monsterRun');
		monster.visible = false;
		monsterDeathSprite = this.add.sprite(monster.x, monster.y, 'zombieDeath');
		monsterDeathSprite.anims.play('death');
		this.tweens.add({
			targets: monsterDeathSprite,
			x: -100,
			ease: 'Sine.easeIn',
			delay: 1000,
			duration: 500,
		});
	}, [], this);
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
            labScene.testAnimation();
        }, [], this);
    }); 
    this.time.delayedCall(6000, function() {
        madScientistLabSprite.anims.play('msStand');
    }, [], this);
};
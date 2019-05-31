/*global Phaser*/
var mute;

var preloadScene = new Phaser.Scene('preload');

preloadScene.preload = function() {
	
	var logo = this.add.image(400, 200, 'rubbleLogoLarge');
	logo.alpha = 0;
	this.add.text(335, 350, "Loading...", { fontSize: '38px', fill: '#fff' }).setFontFamily('Arial');
	this.tweens.add({
        targets: logo,
        alpha: 1,
        ease: 'Sine.easeIn',
        duration: 2000,
    });
	
    //spritesheets
    
	this.load.spritesheet('madScientist', 
        'gameassets/images/pixelMadScientist.png',
        { frameWidth: 64, frameHeight: 96 }
    );
    this.load.spritesheet('monsters', 
        'gameassets/images/pixelZombie.png',
        { frameWidth: 48, frameHeight: 96 }
    );
    this.load.spritesheet('victims', 
        'gameassets/images/pixelMan.png',
        { frameWidth: 64, frameHeight: 96 }
    );
    this.load.spritesheet('speechBubble', 
        'gameassets/images/speechBubbleAnim.png',
        { frameWidth: 178, frameHeight: 146 }
    );
    
    this.load.spritesheet('computer', 
        'gameassets/images/computer.png',
        { frameWidth: 156, frameHeight: 134 }
    );
    
    this.load.spritesheet('treadmill', 
        'gameassets/images/treadmill.png',
        { frameWidth: 86, frameHeight: 76 }
    ); 
    
    this.load.spritesheet('ingredients', 
        'gameassets/images/ingredients.png',
        { frameWidth: 38, frameHeight: 32 }
    ); 
    
    this.load.spritesheet('electricEffect', 
        'gameassets/images/electricEffect24x24.png',
        { frameWidth: 24, frameHeight: 24 }
    ); 
	
	this.load.spritesheet('zombieDeath', 
        'gameassets/images/zombieDeathTrimmed.png',
        { frameWidth: 96, frameHeight: 96 }
    ); 
	
	this.load.spritesheet('conveyor', 
        'gameassets/images/conveyor_belt.png',
        { frameWidth: 400, frameHeight: 50 }
    );
	
	this.load.spritesheet('crates', 
        'gameassets/images/crates.png',
        { frameWidth: 64, frameHeight: 64 }
    ); 
	this.load.spritesheet('splatter', 
        'gameassets/images/splatter.png',
        { frameWidth: 400, frameHeight: 300 }
    ); 
    //audio
    
    //music tracks
    /*this.load.audio('menuTheme', [
        'gameassets/audio/Magic Scout - Cottages.mp3',
    ]);*/
    
    //sfx
    /*this.load.audio('match', [
        'gameassets/audio/PowUp_03.mp3',
    ]);*/
    
    //images
    
    this.load.image('officeBackground', 'gameassets/images/officeBackground.png');
    this.load.image('labBackground', 'gameassets/images/labBackground.png');
	this.load.image('blankBackground', 'gameassets/images/blankBackground.png');
	this.load.image('labSign', 'gameassets/images/labSign.png');
    this.load.image('table', 'gameassets/images/table.png');
    this.load.image('buttonLong', 'gameassets/images/button200x66blue.png');
    this.load.image('buttonLarge', 'gameassets/images/pixelBlankButton240x80.png');
};

preloadScene.create = function() {
    /*try {
        this.saveLoad();
    }
    catch(err) {
        saveDataAvailable = false;
    }*/
    this.animsCreate();
	
	var startButton = this.add.sprite(400, 375, 'buttonLarge').setInteractive( { useHandCursor: true  } );
    startButton.on('pointerdown', this.start); 
    this.add.text(350, 350, "Play!", { fontSize: '38px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 });
    var startMutedButton = this.add.sprite(400, 475, 'buttonLarge').setInteractive( { useHandCursor: true  } );
    startMutedButton.on('pointerdown', this.startMuted); 
    this.add.text(295, 450, "Play Muted", { fontSize: '38px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 });
	
};

preloadScene.start = function() {
    preloadScene.scene.stop("preload");
	preloadScene.scene.start("main");
};

preloadScene.startMuted = function() {
    mute = true;
    preloadScene.scene.stop("preload");
	preloadScene.scene.start("warehouse");
};

preloadScene.animsCreate = function() {
    this.anims.create({
        key: 'msStand',
        frames: this.anims.generateFrameNumbers('madScientist', { frames: [ 0, 1, 0, 1, 0, 1, 2, 0, 2, 1, 2, 0, 1, 0, 1, 2, 0, 1, 3, 0, 3, 1 ] }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'msTalk',
        frames: this.anims.generateFrameNumbers('madScientist', { frames: [ 6, 7, 6, 7, 6, 7, 8, 7, 8, 6, 7, 6, 7, 8, 6, 7, 3, 6, 7, 6, 7] }),
        frameRate: 8,
        repeat: -1
    });
	this.anims.create({
        key: 'msWalk',
        frames: this.anims.generateFrameNumbers('madScientist', { frames: [ 4, 0, 5 ] }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'victimRun',
        frames: this.anims.generateFrameNumbers('victims', { frames: [ 1, 3, 2, 3 ] }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'monsterRun',
        frames: this.anims.generateFrameNumbers('monsters', { frames: [ 3, 5, 4, 5 ] }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'bubbleOpen',
        frames: this.anims.generateFrameNumbers('speechBubble', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 16,
        repeat: 0
    });
    this.anims.create({
        key: 'bubbleClose',
        frames: this.anims.generateFrameNumbers('speechBubble', { frames: [ 3, 2, 1, 0 ] }),
        frameRate: 16,
        repeat: 0
    });
    this.anims.create({
        key: 'treadmillActive',
        frames: this.anims.generateFrameNumbers('treadmill', { frames: [ 0, 1, 2 ] }),
        frameRate: 16,
        repeat: -1
    });
    this.anims.create({
        key: 'electricEffect',
        frames: this.anims.generateFrameNumbers('electricEffect', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 12,
        repeat: -1
    });
	this.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers('zombieDeath', { frames: [ 0, 1, 2 ] }),
        frameRate: 6,
        repeat: 0
    });
	this.anims.create({
        key: 'conveyorActive',
        frames: this.anims.generateFrameNumbers('conveyor', { frames: [ 0, 1, 2, 3, 1, 2, 3, 1, 2 ] }),
        frameRate: 16,
        repeat: -1
    });
	this.anims.create({
        key: 'conveyorActiveRight',
        frames: this.anims.generateFrameNumbers('conveyor', { frames: [ 3, 2, 1, 0, 2, 1, 3, 2, 1 ] }),
        frameRate: 16,
        repeat: -1
    });
};
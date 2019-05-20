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
	preloadScene.scene.start("lab");
};

preloadScene.saveLoad = function() {
    if (localStorage.length>0) {
        saveFileExists = true;
    }
    var defaultSaveState = {
        storyStage : 0,
        hardmode : false,
        saveFileExists : false,
        playerBaseHp: 100,
        playerStrength: 15,
        playerXp: 0,
        playerNextLevel: 30,
        playerLevel: 1,
        droneStrength: 40,
        droneXp: 0,
        droneNextLevel: 30,
        droneLevel: 1,
        equipHp: 35,
        equipAttack: 10,
        weapon: {
            isDefault: true,
            name: "Genericor 'Budget' Rifle",
            cost: 100, 
            attack: 10
        },
        helmet: {
            isDefault: true,
            name: "Genericor 'Budget' Visor",
            cost: 100,
            hp: 8
        },
        chestArmour: {
            isDefault: true,
            name: "Genericor 'Budget' Vest",
            cost: 100,
            hp: 9
        },
        gloves: {
            isDefault: true,
            name: "Tatty Old Mittens",
            cost: 10, 
            attack: 0, 
            hp: 3
        },
        leggings: {
            isDefault: true,
            name: "Worn Leather Trousers",
            cost: 90,
            hp: 8
        },
        boots: {
            isDefault: true,
            name: "Genericor 'Budget' Boots",
            cost: 100,
            hp: 7
        },
        spareSlot1: {
            isDefault: true,
            type: "empty",
            name: "Empty"
        },
        spareSlot2: {
            isDefault: true,
            type: "empty",
            name: "Empty"
        },
        spareSlot3: {
            isDefault: true,
            type: "empty",
            name: "Empty"
        },
        spareSlot4: {
            isDefault: true,
            type: "empty",
            name: "Empty"
        },
        credits: 0,
        metal: 0,
        silicon: 0,
        crystal: 0,
        weaponsmith: {
            name: "weaponsmith",
            level: 1,
            xp: 0,
            nextLevelXp: 35,
            credits: 1500,
            metal: 0,
            crystal: 0,
            silicon: 0,
            requestsMetal: true,
            requestsCrystal: true,
            requestsSilicon: true,
            discountDelay: false,
            discountTimer: 0,
            stock: 0
        },
        weaponsmithTimer: 0,
        weaponsmithSlot1: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        weaponsmithSlot2: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        weaponsmithSlot3: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        heavyArmourer: {
            name: "heavy armourer",
            level: 1,
            xp: 0,
            nextLevelXp: 35,
            credits: 1000,
            metal: 0,
            crystal: 0,
            silicon: 0,
            requestsMetal: true,
            requestsCrystal: true,
            requestsSilicon: true,
            discountDelay: false,
            discountTimer: 0,
            stock: 0
        },
        heavyArmourerTimer: 0,
        heavyArmourerSlot1: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        heavyArmourerSlot2: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        heavyArmourerSlot3: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        fineArmourer: {
            name: "fine armourer",
            level: 1,
            xp: 0,
            nextLevelXp: 35,
            credits: 1000,
            metal: 0,
            crystal: 0,
            silicon: 0,
            requestsMetal: true,
            requestsCrystal: true,
            requestsSilicon: true,
            discountDelay: false,
            discountTimer: 0,
            stock: 0
        },
        fineArmourerTimer: 0,
        fineArmourerSlot1: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        fineArmourerSlot2: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        fineArmourerSlot3: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        tinkerer: {
            name: "tinkerer",
            level: 1,
            xp: 0,
            nextLevelXp: 35,
            credits: 1000,
            metal: 0,
            crystal: 0,
            silicon: 0,
            requestsMetal: true,
            requestsCrystal: true,
            requestsSilicon: true,
            discountDelay: false,
            discountTimer: 0,
            stock: 0
        },
        tinkererTimer: 0,
        tinkererSlot1: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        tinkererSlot2: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        tinkererSlot3: {
            type: "empty",
            name: "No Stock",
            level: 0,
            discount: 0,
            cost: 0
        },
        equipTutorialComplete: false,
        artisanTutorialComplete: false,
        weaponsmithReward: false,
        heavyArmourerReward: false,
        fineArmourerReward: false,
        tinkererReward: false
    };
    
    function getSaveState (key) {
      var saveObject = localStorage.getItem(key)
      return Object.assign({}, defaultSaveState, JSON.parse(saveObject));
    }
    
    // Call it
    var saveObject = getSaveState('prideRubbleSave'); //defaultSaveState;//
    console.log(saveObject);
    storyStage = saveObject.storyStage;
    hardmode = saveObject.hardmode;
    saveFileExists = saveObject.saveFileExists;
    playerBaseHp = saveObject.playerBaseHp;
    playerStrength = saveObject.playerStrength;
    playerXp = saveObject.playerXp;
    playerNextLevel = saveObject.playerNextLevel;
    playerLevel = saveObject.playerLevel;
    droneStrength = saveObject.droneStrength;
    droneXp = saveObject.droneXp;
    droneNextLevel = saveObject.droneNextLevel;
    droneLevel = saveObject.droneLevel;
    equipHp = saveObject.equipHp;
    equipAttack = saveObject.equipAttack;
    weapon = saveObject.weapon;
    helmet = saveObject.helmet;
    chestArmour = saveObject.chestArmour;
    gloves = saveObject.gloves;
    leggings = saveObject.leggings;
    boots = saveObject.boots;
    spareSlot1 = saveObject.spareSlot1;
    spareSlot2 = saveObject.spareSlot2;
    spareSlot3 = saveObject.spareSlot3;
    spareSlot4 = saveObject.spareSlot4;
    credits = saveObject.credits;
    metal = saveObject.metal;
    silicon = saveObject.silicon;
    crystal = saveObject.crystal;
    weaponsmith = saveObject.weaponsmith;
    weaponsmithTimer = saveObject.weaponsmithTimer;
    weaponsmithSlot1 = saveObject.weaponsmithSlot1;
    weaponsmithSlot2 = saveObject.weaponsmithSlot2;
    weaponsmithSlot3 = saveObject.weaponsmithSlot3;
    heavyArmourer = saveObject.heavyArmourer;
    heavyArmourerTimer = saveObject.heavyArmourerTimer;
    heavyArmourerSlot1 = saveObject.heavyArmourerSlot1;
    heavyArmourerSlot2 = saveObject.heavyArmourerSlot2;
    heavyArmourerSlot3 = saveObject.heavyArmourerSlot3;
    fineArmourer = saveObject.fineArmourer;
    fineArmourerTimer = saveObject.fineArmourerTimer;
    fineArmourerSlot1 = saveObject.fineArmourerSlot1;
    fineArmourerSlot2 = saveObject.fineArmourerSlot2;
    fineArmourerSlot3 = saveObject.fineArmourerSlot3;
    tinkerer = saveObject.tinkerer;
    tinkererTimer = saveObject.tinkererTimer;
    tinkererSlot1 = saveObject.tinkererSlot1;
    tinkererSlot2 = saveObject.tinkererSlot2;
    tinkererSlot3 = saveObject.tinkererSlot3;
    equipTutorialComplete = saveObject.equipTutorialComplete;
    artisanTutorialComplete = saveObject.artisanTutorialComplete;
    weaponsmithReward = saveObject.weaponsmithReward;
    heavyArmourerReward = saveObject.heavyArmourerReward;
    fineArmourerReward = saveObject.fineArmourerReward;
    tinkererReward = saveObject.tinkererReward;
}; //probably not needed

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
};
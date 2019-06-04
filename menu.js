var menuScene = new Phaser.Scene('menu');

menuScene.create = function() {
	var background = this.add.image(512, 288, 'menuBackground');
    //background.setScale(2);
	var startButton = this.add.sprite(512, 375, 'buttonLarge').setInteractive( { useHandCursor: true  } );
    startButton.on('pointerdown', this.start); 
    this.add.text(517, 375, jsonText.pre1, { fontSize: '38px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 }).setOrigin(0.5);
	if (!mute) {
        var growlSFX = this.sound.add('growl');
		growlSFX.play();
    }
};

menuScene.start = function() {	
    menuScene.scene.stop("menu");
	menuScene.scene.start("main");
};
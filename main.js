/*global Phaser*/
var madScientistSprite;
var bubbleSprite;
var textNumber = 8; //*********************  reset to 0  *************************
var namesArray = [];
var distanceArray = [];
var buttonArray = [];
var sortedDistanceArray = [];
var correctRow;
var nextButton;
var nextButtonLabel;
var dataTable;
var bubbleSprite;
var bubbleText;
var bubbleSpriteTwo;
var bubbleTextTwo;
var bubbleVisible = false;
var bubbleTwoVisible = false;
var line;
var lineLabelArray;
var pointerActive;
var boxplotGraphicsArray = [];

var xArray;
var graphAxisTextArray;
var againButton;
var againButtonLabel;
var lineButton;
var lineButtonLabel;
var stemButton;
var stemButtonLabel;
var ingredientsButtonArray;
var correctGraphType;
var broken;
var brokenStemLeafArray;
var brokenLinePlotArray;
var brokenAmount;
var brokenType;
var unitsOnlyArray;
var winSfx;
var highestRowButtonArray = [];
var highestColumnButtonArray = [];
var activeBrokenData = 'none';
var brokenLineDataArray = [];
var brokenStemDataArray = [];
//var speechText;

var mainScene = new Phaser.Scene('main');

mainScene.create = function() {	
	activeScene = "main";
    pointerActive = false;
    var background = this.add.image(512, 276, 'officeBackground');
    background.setScale(2);
    madScientistSprite = this.add.sprite(940, 480, 'madScientist');
    madScientistSprite.setScale(2);
    madScientistSprite.anims.play('msStand');
    var speechText = this.changeText();
    this.createBubble(845, 276, speechText, true);
    var computer = this.add.image(200, 452, 'computer');
    computer.setScale(0.65);
    var table = this.add.image(200, 536, 'table');
    table.setScale(1.25);   
	dataTable = this.add.sprite(370, 280, 'computer');
    dataTable.setFrame(1);
    dataTable.setScale(4);
	dataTable.visible = false;
	nextButton = this.add.sprite(512, 530, 'buttonLarge').setInteractive( { useHandCursor: true  } );    
	var that = this;
	nextButton.on('pointerdown', function() {      
		if (bubbleVisible) {
			bubbleText.text = '';	
			bubbleSprite.anims.play('bubbleClose');
		}
		if (bubbleTwoVisible) {
			bubbleTextTwo.text = '';	
			bubbleSpriteTwo.anims.play('bubbleClose');
		}
		that.time.delayedCall(500, function() {
            mainScene.nextStep();
        }, [], this);		
    }); 	
	nextButton.visible = false;
    //nextButtonLabel = this.add.text(517, 530, jsonText.mainButton1, { fontSize: '34px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 }).setOrigin(0.5);
	nextButtonLabel = this.add.text(517, 530, 'Next', { fontSize: '34px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 }).setOrigin(0.5);
	nextButtonLabel.visible = false;
	if (!mute) {	
		speechBubbleSfx = this.sound.add('pop');			
	}	
	
	this.input.on('pointerdown', function (pointer) {
		if (pointerActive) {
			mainScene.checkPointerPos(pointer);
		}
	}, this);
	
};

mainScene.nextStep = function() {	
	bubbleText.text = '';	
	madScientistSprite.anims.play('msStand');
	nextButton.visible = false;
	nextButtonLabel.visible = false;
	//var that = this;
	var speechText;
	switch(textNumber) {
		case 0:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 1:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 2:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 3:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 4:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 5:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 6:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 7:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 8:
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 9:
			mainScene.scene.stop("main");
			mainScene.scene.start("map");
			break;
		case 10:
			this.showData();
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 11:
			for (var i=0; i<namesArray.length; i++) {
                namesArray[i].visible = false; 
				this.tweens.add({
					targets: distanceArray[i],
					x: "-=160",
					ease: 'Sine.easeIn',				
					duration: 500,					
				});	
            }
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 12:
			mainScene.sortTable();
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 13:
			correctRow = 8;
			mainScene.createRowButtons();
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, false);
			break;
		case 14:
			mainScene.removeRowButtons();
			mainScene.createNumberLine();
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, false);
			correctX = mainScene.calcCorrectX(7);
			this.time.delayedCall(500, function() {
				pointerActive = true;
			}, [], this);  			
			break;	
		case 15:
			boxplotGraphicsArray = [];
			var dot = this.add.graphics()
			dot.fillStyle(0x008106, 1);
			dot.fillCircle(Math.round(correctX), 350, 4);
			boxplotGraphicsArray.push(dot);
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, true);
			break;
		case 16:
			console.log(textNumber);
			for (var i=0; i<sortedDistanceArray.length; i++) {
				if (i<7) {
					sortedDistanceArray[i].setColor('#ffff00');
				}
				else if (i>7) {
					sortedDistanceArray[i].setColor('#ff0000');
				}
			}
			correctRow = 4;
			mainScene.createRowButtons();
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, false);
			break;
		case 17:
			mainScene.removeRowButtons();
			mainScene.createNumberLine();
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, false);
			correctX = mainScene.calcCorrectX(3);
			this.time.delayedCall(500, function() {
				pointerActive = true;
			}, [], this);  	
			break;
		case 18:
			var dot2 = this.add.graphics()
			dot2.fillStyle(0x008106, 1);
			dot2.fillCircle(Math.round(correctX), 350, 4);
			boxplotGraphicsArray.push(dot2);
			correctRow = 12;
			mainScene.createRowButtons();
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, false);
			break;
		case 19:
			mainScene.removeRowButtons();
			mainScene.createNumberLine();
			speechText = mainScene.changeText();
			mainScene.createBubble(845, 276, speechText, false);
			correctX = mainScene.calcCorrectX(11);
			this.time.delayedCall(500, function() {
				pointerActive = true;
			}, [], this);  			
			break;	
		case 20:
			var dot3 = this.add.graphics()
			dot3.fillStyle(0x008106, 1);
			dot3.fillCircle(Math.round(correctX), 350, 4);
			boxplotGraphicsArray.push(dot3);
			break;
	}
	/*if (textNumber==6&&!dataTable.visible) {
		mainScene.showData(4, 10);
	}
	else if (textNumber==8) {		
		mainScene.createStemAndLeafPlot(lifeArray);
	}
	else if (textNumber==8.5) {
		speechText = mainScene.changeText();
		mainScene.createBubble(845, 276, speechText, false);
	}
	else if (textNumber==10) {
		mainScene.createStemAndLeafPlot(speedArray);
	}
	else if (textNumber==12) {		
		mainScene.createLinePlot(speedArray);
	}	
	else if (textNumber==14) {                
		mainScene.hideData();
		mainScene.addIngredients();
		speechText = mainScene.changeText();
		mainScene.createBubble(845, 276, speechText, true);
	}
	else if (textNumber==15) {
		speechText = mainScene.changeText();
		mainScene.createBubble(845, 276, speechText, false);
	}
	else if (textNumber==16) {
		mainScene.zoomToLab();
	}
	else if (textNumber==17&&!dataTable.visible) {
		mainScene.showData(extraIngredient1.speed, extraIngredient1.lifetime);
	}
	else if (textNumber==19) {
		for (var i=0; i<lifeArray.length; i++) {
			namesArray[i].visible = false;   
			lifeArray[i].visible = false;                
		}
		mainScene.chooseGraph(lifeArray);
	}
	else if (textNumber==20) {
		mainScene.hideData(true);
		broken = true;
		mainScene.createStemAndLeafPlot(lifeArray);
	}
	else if (textNumber==23) {
		mainScene.chooseGraph(speedArray);
	}
	else if (textNumber==24) {
		for (var i=0; i<unitsOnlyArray.length; i++) {
			unitsOnlyArray[i].visible = false;   				             
		}
		for (var i=0; i<stemPlotArray.length; i++) {
			stemPlotArray[i].visible = false;
		}
		for (var i=0; i<sortedDisplayArray.length; i++) {
			sortedDisplayArray[i].visible = false;
		}
		mainScene.hideData(true);
		broken = true;
		mainScene.createLinePlot(speedArray);
	}
	else if (textNumber==27) {
		speechText = mainScene.changeText();
		mainScene.createBubble(845, 276, speechText, false);
	}
	else if (textNumber==28) {		
		mainScene.reset();
		mainScene.scene.stop("main");
		mainScene.scene.start("menu");
	}
	else {
		speechText = mainScene.changeText();
		mainScene.createBubble(845, 276, speechText, true);
	}*/
	/*this.time.delayedCall(500, function() {
		
	}, [], this);   */ 
};

mainScene.reset = function() {
	textNumber = 0;
	namesArray = [];
	speedArray = [];
	lifeArray = [];
	stemPlotArray = [];
	sortedDisplayArray = [];
};

mainScene.createBubble = function(x, y, text, triggerNext) {	
	if (bubbleVisible) {
		bubbleText.text = '';	
		bubbleSprite.destroy();
		bubbleVisible = false;
	}	
	if (bubbleTwoVisible) {
		bubbleTextTwo.text = '';	
		bubbleSpriteTwo.destroy();
		bubbleTwoVisible = false;
	}	
    bubbleSprite = this.add.sprite(x, y, 'speechBubble');
    bubbleSprite.setScale(2);
    bubbleSprite.setTint(0xfeffb1);
	bubbleVisible = true;
    bubbleSprite.on('animationcomplete', function (anim, frame) {
      this.emit('animationcomplete_' + anim.key, anim, frame);
    }, bubbleSprite);
    bubbleSprite.anims.play('bubbleOpen');
    bubbleSprite.on('animationcomplete_bubbleOpen', function () {
        bubbleSprite.setFrame(3);
    });
    bubbleSprite.on('animationcomplete_bubbleClose', function () {
        bubbleSprite.destroy();
		bubbleVisible = false;
    });
    bubbleText = this.add.text(x, y-20, text, { fontSize: '26px', fill: '#000', wordWrap: { width: 320, useAdvancedWrap: true } }).setFontFamily('Verdana').setOrigin(0.5);
    bubbleText.visible = false;
    
    this.time.delayedCall(250, function() {
        bubbleText.visible = true;
        madScientistSprite.anims.play('msTalk');
        if (!mute) {
            speechBubbleSfx.play();
        }
    }, [], this);    
    
    this.time.delayedCall(7250, function() {  //make sure to reset to 8000 after testing
        madScientistSprite.anims.play('msStand');
		if (broken||!triggerNext) {
			bubbleText.text = '';	
			if (bubbleVisible) {
				bubbleSprite.anims.play('bubbleClose');
			}
		}
		else if (triggerNext) {
			nextButton.visible = true;			
			nextButtonLabel.visible = true;
		}
    }, [], this);
};

mainScene.createBubbleTwo = function(x, y, text, triggerNext) {	
	if (bubbleTwoVisible) {
		bubbleTextTwo.text = '';	
		bubbleSpriteTwo.destroy();
		bubbleTwoVisible = false;
	}	
    bubbleSpriteTwo = this.add.sprite(x, y, 'speechBubble');
    bubbleSpriteTwo.setScale(2);
    bubbleSpriteTwo.setTint(0xfeffb1);
	bubbleTwoVisible = true;
    bubbleSpriteTwo.on('animationcomplete', function (anim, frame) {
      this.emit('animationcomplete_' + anim.key, anim, frame);
    }, bubbleSpriteTwo);
    bubbleSpriteTwo.anims.play('bubbleOpen');
    bubbleSpriteTwo.on('animationcomplete_bubbleOpen', function () {
        bubbleSpriteTwo.setFrame(3);
    });
    bubbleSpriteTwo.on('animationcomplete_bubbleClose', function () {
        bubbleSpriteTwo.destroy();
		bubbleTwoVisible = false;
    });
    bubbleTextTwo = this.add.text(x, y-20, text, { fontSize: '26px', fill: '#000', wordWrap: { width: 320, useAdvancedWrap: true } }).setFontFamily('Verdana').setOrigin(0.5);
    bubbleTextTwo.visible = false;
    
    this.time.delayedCall(250, function() {
        bubbleTextTwo.visible = true;
        madScientistSprite.anims.play('msTalk');
        if (!mute) {
            speechBubbleSfx.play();
        }
    }, [], this);    
    
    this.time.delayedCall(6500, function() {  //make sure to reset to 8000 after testing
        madScientistSprite.anims.play('msStand');
		if (broken||!triggerNext) {
			bubbleTextTwo.text = '';	
			if (bubbleTwoVisible) {
				bubbleSpriteTwo.anims.play('bubbleClose');
			}
		}
		else if (triggerNext) {
			nextButton.visible = true;
			if (textNumber==28) { 
				if (!mute) {
					winSfx.play();
				}
				nextButtonLabel.text = jsonText.mainButton2;				
			}
			nextButtonLabel.visible = true;
		}
    }, [], this);
};

mainScene.changeText = function() {
	var text, difference, progress;
    switch (textNumber) {
        case 0:
            /*text = jsonText.mainText0;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText0' });
			}*/
			text = "Oh good, my new assistant. I don't believe we've met.";
            textNumber++;
            break;
        case 1:
            /*text = jsonText.mainText1;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText1' });
			}*/
			text = "I'm Professor David Structo, founder and C.E.O of Build A Monster Inc.";
            textNumber++;
            break;
        case 2:
            /*text = jsonText.mainText2;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText2' });
			}*/
			text = "Build A Monster Inc. are the premium supplier of monsters to, well to people who buy that sort of thing.";
            textNumber++;
            break;
        case 3:
            /*text = jsonText.mainText3;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText3' });
			}*/
			text = "Our latest model is ready for deployment, and that means field tests.";
            textNumber++;
            break;
        case 4:
            /*text = jsonText.mainText4;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText4' });
			}*/
			text = "We'll put our new product up against a variety of terrains and environments.";
            textNumber++;
            break;
        case 5:
            /*text = jsonText.mainText5;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText5' });
			}*/
			text = "You'll be in charge of the tests, and also of interpreting the data we collect.";
            textNumber++;
            break;
        case 6:
			/*progress = {
			  currentProgress: 1,
			  maximumProgress: 13			  
			};
			LoLApi('progress', progress );
            text = jsonText.mainText6;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText6' });
			}*/
			text = "Due to the potentially volatile nature of our work we'll supervise the test from here.";
            textNumber++;
            break;
        case 7:
            /*text = jsonText.mainText7;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText7' });
			}
            textNumber++;
            */
			text = "In a moment I'll bring up the map. Study it carefully and then click to release our monsters.";
            textNumber++;
            break;
        case 8: 
			/*
			LoLApi('progress', progress );
            text = jsonText.mainText8;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText8' });
			}  */          
			text = "Make sure you release all 15 monsters to give us a nice sample. Are you ready?";
            textNumber++;
            break;		
        case 9:
			/*
			LoLApi('progress', progress );
            text = jsonText.mainText9;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText9' });
			}
            textNumber++;
			*/
			text = "Excellent, you collected some very good data. I'll bring it up on the screen.";
            textNumber++;
            break;
        case 10:
            /*text = jsonText.mainText10;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText10' });
			}*/
			text = "Here are our results. We're not interested in the performance of individual monsters so we don't need names.";
            textNumber++;
            break;
        case 11:
			/*
			LoLApi('progress', progress );
            text = jsonText.mainText11;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText11' });
			} */
			text = "Ok. Now we need to sort the data from shortest distance to longest.";
            textNumber++;
            break;
		case 12:            
            /*text = jsonText.mainText12;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText12' });
			}*/
			text = "That's good, but there are much better ways to represent the data than in a table. Let's try a boxplot.";
            textNumber++;
            break;
        case 13:
			/*
            text = jsonText.mainText13;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText13' });
			}*/			
			text = "First, click on the median, or middle value in our data.";
            textNumber++;
            break;
        case 14:
            /*text = jsonText.mainText14;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText14' });
			}*/
			text = "Good, now plot this value on the number line.";
            textNumber++;
            break;
		case 15:
			/*text = possibleResponsesArray[0];			
			if (!mute) {				
				LoLApi('speakText', { key: response });
			}	*/
			text = "Excellent. As you can see, the median value neatly divides our data into two parts.";
            textNumber++;
			break;
		case 16:				
			/*text = jsonText.mainText16;	
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText16' });
			}		*/
			text = "Now, find the median value of the first part. I've marked them in yellow for you.";
            textNumber++;
			break;
		case 17:
			/*text = jsonText.mainText17;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText17' });
			}*/
			text = "Great, now plot that value on the line.";
            textNumber++;			
			break;
		case 18:					
			/*text = jsonText.mainText18;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText18' });
			}*/
			text = "Now, find the median value of the second part. The values that are colored red.";
            textNumber++;
			break;
		case 19:
			/*text = jsonText.mainText19;
			textNumber++;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText19' });
			}*/
			text = "Good job, now once again plot the value on the number line.";
            textNumber++;	
			break;
		case 20:
			text = jsonText.mainText20;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText20' });
			}
			textNumber++;
			break;		
		case 21:			
			text = mainScene.showDifference(difference);			
			//console.log(text);
			textNumber++;
			break;
		case 22:			
			text = jsonText.mainText22;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText22' });
			}
			textNumber++;
			break;
		case 23:
			text = jsonText.mainText23;
			textNumber++;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText23' });
			}        
			break;
		case 24:
			text = jsonText.mainText24;
			if (!mute) {				
				LoLApi('speakText', { key: 'mainText24' });
			}
			textNumber++;
			break;
		case 25:						
			text = mainScene.showDifference(difference);			
			textNumber++;
			break;
		case 26: 			
			text = mainScene.finalResultText();
			textNumber++;
			break;
		case 27:
			if (possibleIngredientsArray.length==5) {
				progress = {
				  currentProgress: 13,
				  maximumProgress: 13			  
				};
				LoLApi('progress', progress );					
			}
			LoLApi('complete', {});
			//LoLApi('completeGame', {});
			textNumber++;			
			if (possibleIngredientsArray.length>3) {
				text = jsonText.mainText27b;
				if (!mute) {				
					LoLApi('speakText', { key: 'mainText27b' });
				}
				againButton = this.add.sprite(512, 430, 'buttonLarge').setInteractive( { useHandCursor: true  } );    
				var that = this;
				againButton.on('pointerdown', function() {
					bubbleText.text = '';	
					if (bubbleVisible) {
						bubbleSprite.anims.play('bubbleClose');
					}
					that.time.delayedCall(500, function() {
						mainScene.testAgain();
					}, [], this);		
				}); 				
				againButtonLabel = this.add.text(517, 430, jsonText.mainButton2, { fontSize: '30px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 }).setOrigin(0.5);			
			}
			else {
				text = jsonText.mainText27a;
				if (!mute) {				
					LoLApi('speakText', { key: 'mainText27a' });
				}
			}	
			nextButton.visible = true;			
			nextButtonLabel.visible = true;
			nextButtonLabel.text = jsonText.mainButton3;			
			break;		
    }
    return text;
};

mainScene.showData = function() {
    dataTable.visible = true;    
    var nameTitle = this.add.text(80, 80, 'Subject', { fontSize: '24px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
    var distanceTitle = this.add.text(240, 80, 'Distance', { fontSize: '24px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');    
    namesArray.push(nameTitle);
    distanceArray.push(distanceTitle);
    for (var i=1; i<=15; i++) {
		var randomAmount = Math.floor(Math.random()*50);
		monsterDistanceArray[i]+=randomAmount;
	}
    
    for (var i=1; i<=15; i++) {
        var name = this.add.text(80, 90+(i*25), 'Monster '+i, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
        var distance = this.add.text(320, 108+(i*25), monsterDistanceArray[i-1], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0, 1);        
        namesArray.push(name);
        distanceArray.push(distance);        
    }
	this.time.delayedCall(500, function() {
		nextButton.visible = true;
		nextButtonLabel.visible = true;
	}, [], this);    
};

mainScene.sortTable = function() {
	sortedDistanceArray = [];
	for (var i=1; i<distanceArray.length; i++) {
		distanceArray[i].visible = false; 		
	}
	var sortedArray = monsterDistanceArray.sort(function (a, b) {  return a - b;  });
	for (var i=1; i<=15; i++) {        
        var distance = this.add.text(100, 108+(i*25), sortedArray[i-1], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0, 1);      
        sortedDistanceArray.push(distance);        
    }	
};

mainScene.hideData = function(textOnly) {
	if (!textOnly) {
		dataTable.visible = false;
	}
	line.visible = false;
	for (var i=0; i<xArray.length; i++) {
		xArray[i].visible = false;
	}
	for (var i=0; i<graphAxisTextArray.length; i++) {
		graphAxisTextArray[i].visible = false;
	}
};

mainScene.createLinePlot = function(array) {
    for (var i=0; i<speedArray.length; i++) {
        namesArray[i].visible = false;
        speedArray[i].visible = false;
        lifeArray[i].visible = false;
    }
	var labelFont;
	if (array==lifeArray) {
		labelFont = '12px';
		correctGraphType = false;
	}
	else {
		labelFont = '16px';
		correctGraphType = true;
	}
    var newArray = [];
    var textProperty;
    for (var i=0; i<array.length; i++) {
        textProperty = array[i].text;
        newArray.push(textProperty);
    }
    newArray.splice(0, 1); 
    var sortedArray = newArray.sort(function (a, b) {  return a - b;  });
    //console.log(sortedArray);
    var adjuster = 0;
    var sortedDisplay;
    sortedDisplayArray = [];
    for (var i=0; i<sortedArray.length; i++) {
        sortedDisplay = this.add.text(85+(i*32)-adjuster, 100, sortedArray[i], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
        sortedDisplayArray.push(sortedDisplay);
        if (sortedArray[i]<10) {
            adjuster+=8;
        }
    }
    //console.log(sortedDisplayArray);
    line  = this.add.graphics();
	line.visible = true;
    line.lineStyle(1, 0x008106, 1);
    line.beginPath();
    line.moveTo(100, 450);
    line.lineTo(500, 450);
    line.moveTo(100, 450);
    line.lineTo(100, 150);
    line.closePath();
    line.strokePath();
    var graphAxisText;
    graphAxisTextArray = [];
    var range = sortedArray[sortedArray.length-1]-sortedArray[0]+1;
    var gap = 400/range;
    for (var i=0; i<range; i++) {
        graphAxisText = this.add.text(100+((i+0.5)*gap), 475, i+parseFloat(sortedArray[0]), { fontSize: labelFont, fill: '#008106' }).setFontFamily('Verdana').setOrigin(0.5);
        graphAxisTextArray.push(graphAxisText);
    }
    var xPos;
    var yPos = 425;
    xArray = [];
    var xPosArray = [];
    var yPosArray = [];
    var delay = 1000;
    for (var i=0; i<sortedDisplayArray.length; i++) {
        xPos = 100+(((sortedArray[i]-sortedArray[0])+0.5)*gap);
        if (sortedArray[i]==sortedArray[i-1]) {
            yPos-=50;
        }
        else {
            yPos = 425;
        }        
		if (broken&&i%2==0) {
			sortedDisplayArray[i].visible = false;
			var brokenDataInfo = {
				x: sortedDisplayArray[i].x,
				y: sortedDisplayArray[i].y,
				startX: sortedDisplayArray[i].x,
				startY: sortedDisplayArray[i].y,
				targetX: xPos,
				targetY: yPos,
				value: sortedArray[i],				
			};
			brokenLinePlotArray.push(brokenDataInfo);
		}
		else {
			xPosArray.push(xPos);
        	yPosArray.push(yPos);
		}
        delay+=100;
        this.tweens.add({
            targets: sortedDisplayArray[i],
            x: xPos,
            y: yPos,
            ease: 'Sine.easeIn',
            delay: delay,
            duration: 500,
        }); 
        this.tweens.add({
            targets: sortedDisplayArray[i],
            alpha: 0,
            ease: 'Sine.easeIn',
            delay: delay+450,
            duration: 50,
        }); 
    }	
	if (!broken&&textNumber==12) {		
		mainScene.checkHighestColumn(xPosArray, sortedArray[0]);		
	}
    for (var i=0; i<xPosArray.length; i++) {
        var xText = this.add.text(xPosArray[i], yPosArray[i], 'X', { fontSize: '22px', fill: '#008106' }).setFontFamily('Arial').setOrigin(0.5);
        xText.alpha = 0;
		this.tweens.add({
			targets: xText,
			alpha: 1,
			ease: 'Sine.easeIn',
			delay: 1675+(i*100),
			duration: 25,
		}); 
		xArray.push(xText);
    }
	var speechText;
	if (broken) {
		speechText = jsonText.lineBrokenResponse;
		this.correctBrokenLinePlot();
	}
	else {
		speechText = this.changeText();
	}  
    this.time.delayedCall(1500, function() { 
		if (textNumber==12||textNumber==13) {
			this.createBubble(845, 276, speechText, false);
		}
		else {
			this.createBubble(845, 276, speechText, true);
		}
		if (!mute) {	
			if (broken) {
				LoLApi('speakText', { key: 'lineBrokenResponse' });
			}
			else {
				LoLApi('speakText', { key: speechText });
			}			
		}
	}, [], this);
    //console.log(xArray);
};

mainScene.createBrokenDataLine = function(i) {
	var brokenData = this.add.text(brokenLinePlotArray[i].x, brokenLinePlotArray[i].y, brokenLinePlotArray[i].value, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setInteractive( { useHandCursor: true } );
	brokenData.targetX = brokenLinePlotArray[i].targetX;
	brokenData.targetY = brokenLinePlotArray[i].targetY;
	brokenData.startX = brokenLinePlotArray[i].startX;
	brokenData.startY = brokenLinePlotArray[i].startY;
	brokenData.unitText = brokenLinePlotArray[i].unitValue;
	brokenData.matched = false;
	var that = this;
	brokenData.on('pointerdown', function() {      
		for (var i=0; i<brokenLineDataArray.length; i++) {
			brokenLineDataArray[i].setScale(1);
		}
		brokenData.setScale(1.15);	
		activeBrokenData = brokenData;		
		that.input.on('pointerdown', function (pointer) {			
			//console.log(pointer.x);
			//console.log(pointer.y);
			if (brokenAmount>0&&activeBrokenData!='none') {
				if ((pointer.x>=brokenData.targetX-25)&&(pointer.x<=brokenData.targetX+45)&&(pointer.y>=120)&&(pointer.y<=510)) {			
					that.tweens.add({
						targets: brokenData,
						x: (brokenData.targetX)-11,
						y: (brokenData.targetY)-11,
						ease: 'Sine.easeIn',					
						duration: 500,					
					});
					var finalPosX = that.add.text(brokenData.targetX, brokenData.targetY, 'X', { fontSize: '22px', fill: '#008106' }).setFontFamily('Arial').setOrigin(0.5);
					finalPosX.visible = false;
					xArray.push(finalPosX);	
					that.time.delayedCall(500, function() { 
						brokenData.setScale(1);	
						brokenData.visible = false;	
						finalPosX.visible = true;
					}, [], this);								
					if (!brokenData.matched) {						
						brokenAmount--;
						brokenData.matched = true;
						activeBrokenData = 'none';
						if (brokenAmount==0&&broken) {
							broken = false;
							speechText = that.changeText();
							that.createBubble(845, 276, speechText, true);
						}
					}	
				}
				else {	
					mainScene.wrongSL();	
				}
			}
		}, this);			
	}); 
	brokenLineDataArray.push(brokenData);
};

mainScene.correctBrokenLinePlot = function() {
	brokenLineDataArray = [];
	brokenType = 'lp';
	brokenAmount = 8;
	for (var i=0; i<brokenLinePlotArray.length; i++) {
		mainScene.createBrokenDataLine(i);
		/*var brokenData = this.add.text(brokenLinePlotArray[i].x, brokenLinePlotArray[i].y, brokenLinePlotArray[i].value, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setInteractive( { useHandCursor: true } );
		brokenData.targetX = brokenLinePlotArray[i].targetX;
		brokenData.targetY = brokenLinePlotArray[i].targetY;
		brokenData.startX = brokenLinePlotArray[i].startX;
		brokenData.startY = brokenLinePlotArray[i].startY;
		brokenData.unitText = brokenLinePlotArray[i].unitValue;
		brokenData.matched = false;
		var that = this;
		brokenData.on('pointerdown', function() {      
			brokenData.setScale(1.1);	
			activeBrokenData = brokenData;
			that.input.once('pointerdown', function (pointer) {
				if (brokenAmount>0&&activeBrokenData!='none') {
					if ((pointer.x>=brokenData.targetX-25)&&(pointer.x<=brokenData.targetX+45)&&(pointer.y>=90)&&(pointer.y<=510)) {			
						that.tweens.add({
							targets: brokenData,
							x: brokenData.targetX-11,
							y: brokenData.targetY-11,
							ease: 'Sine.easeIn',					
							duration: 500,					
						}); 
						var finalPosX = that.add.text(brokenData.targetX, brokenData.targetY, 'X', { fontSize: '22px', fill: '#008106' }).setFontFamily('Arial').setOrigin(0.5);				
						xArray.push(finalPosX);				
						if (!brokenData.matched) {					
							brokenData.visible = false;	
							brokenAmount--;
							brokenData.matched = true;
							activeBrokenData = 'none';
							if (brokenAmount==0&&broken) {
								broken = false;
								speechText = that.changeText();
								that.createBubble(845, 276, speechText, true);
							}
						}	
					}
					else {	
						mainScene.wrongSL();	
					}
				}
			}, this);			
		}); */
		//old drag code
		/*
		this.input.setDraggable(brokenData);
		this.input.on('drag', function (pointer, gameObject, dragX, dragY) {			
			gameObject.x = dragX;
			gameObject.y = dragY;
			gameObject.matched = false;
		});		
		var that = this;
		this.input.on('dragend', function (pointer, gameObject) {
			if ((gameObject.x>=gameObject.targetX-25)&&(gameObject.x<=gameObject.targetX+45)&&(gameObject.y>=90)&&(gameObject.y<=510)) {				
				gameObject.x = gameObject.targetX-11;
				gameObject.y = gameObject.targetY-11;	
				var finalPosX = that.add.text(gameObject.targetX, gameObject.targetY, 'X', { fontSize: '22px', fill: '#008106' }).setFontFamily('Arial').setOrigin(0.5);				
				xArray.push(finalPosX);				
				if (!gameObject.matched) {					
					gameObject.visible = false;	
					brokenAmount--;
					gameObject.matched = true;					
					if (brokenAmount==0&&broken) {
						broken = false;
						speechText = that.changeText();
						that.createBubble(845, 276, speechText, true);
					}
				}	
			}
			else {	
				that.tweens.add({
					targets: gameObject,
					x: gameObject.startX,
					y: gameObject.startY,
					ease: 'Sine.easeIn',					
					duration: 500,					
				}); 
			}
		});*/
	}	
};

mainScene.createStemAndLeafPlot = function(array) {
    if (array==lifeArray) {		
		correctGraphType = true;
	}
	else {		
		correctGraphType = false;
	}
	for (var i=0; i<speedArray.length; i++) {
        namesArray[i].visible = false;
        speedArray[i].visible = false;
        lifeArray[i].visible = false;
    }
    var newArray = [];
    var textProperty;
    for (var i=0; i<array.length; i++) {
        textProperty = array[i].text;
        newArray.push(textProperty);
    }
    newArray.splice(0, 1); 
    var sortedArray = newArray.sort(function (a, b) {  return a - b;  });
    //console.log(sortedArray);
    var adjuster = 0;
    var sortedDisplay;
    sortedDisplayArray = [];
    for (var i=0; i<sortedArray.length; i++) {
        sortedDisplay = this.add.text(85+(i*32)-adjuster, 100, sortedArray[i], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
        sortedDisplayArray.push(sortedDisplay);
        if (sortedArray[i]<10) {
            adjuster+=8;
        }		
    }
    //console.log(sortedDisplayArray);
    var max = sortedArray[sortedArray.length-1];
    var stemTitle = this.add.text(100, 150, 'Stem', { fontSize: '18px', fill: '#008106' }).setFontFamily('Verdana');
    stemTitle.visible = false;
    var stem1 = this.add.text(100, 220, 0, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
    stem1.visible = false;
    var stem2 = this.add.text(100, 290, 1, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
    stem2.visible = false;
    var stem3 = this.add.text(100, 360, 2, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
    stem3.visible = false;
    var stem4 = this.add.text(100, 430, 3, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
    stem4.visible = false;
    var leafTitle = this.add.text(202, 150, 'Leaf', { fontSize: '18px', fill: '#008106' }).setFontFamily('Verdana');
    leafTitle.visible = false;
    stemPlotArray.push(stemTitle, stem1, stem2, stem3, stem4, leafTitle);
    this.time.delayedCall(150, function() { stemTitle.visible = true; }, [], this);
    this.time.delayedCall(300, function() { stem1.visible = true; }, [], this);
    var delay = 1000;
    var spacing = 32;
    if (max>=30) {
        this.time.delayedCall(750, function() { stem4.visible = true; }, [], this);
    }
    else {
        delay = 750;
    }
    if (max>=20) {
        this.time.delayedCall(600, function() { stem3.visible = true; }, [], this);
    }
    else {
        delay = 600;
    }
    if (max>=10) {
        this.time.delayedCall(450, function() { stem2.visible = true; }, [], this);
    }
    else {
        delay = 450;
		if (max>=10&&max<=20) {
        	spacing = 28;
		}
		else if (max<10) {
			spacing = 24;
		}
    }
    
    if (delay==1000) {
        this.time.delayedCall(900, function() { leafTitle.visible = true; }, [], this);
    }
    else {
        this.time.delayedCall(delay+150, function() { leafTitle.visible = true; }, [], this);
    }
    var xPos = 202-spacing;
    var yPos = 220;
	var xPosArray = [];
    var yPosArray = [];
	var unitsDisplayArray = [];
	var units = 0;
	var tens = 0;
	var twenties = 0;
	var thirties = 0;
    for (var i=0; i<sortedDisplayArray.length; i++) {
        if (sortedArray[i]<10) {
            xPos+=spacing;
			sortedDisplayArray[i].unitsText = sortedDisplayArray[i].text;
			units++;
        }
        else if (sortedArray[i]<20) {
            if (sortedArray[i-1]<10) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 290;
            sortedDisplayArray[i].unitsText = sortedDisplayArray[i].text-10;
			tens++;
        } 
        else if (sortedArray[i]<30) {
            if (sortedArray[i-1]<20) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 360;
            sortedDisplayArray[i].unitsText = sortedDisplayArray[i].text-20;
			twenties++;
        }
        else if (sortedArray[i]<40) {
            if (sortedArray[i-1]<30) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 430;
            sortedDisplayArray[i].unitsText = sortedDisplayArray[i].text-30;
			thirties++;
        }
		if (broken&&i%2==0) {
			sortedDisplayArray[i].visible = false;
			var brokenDataInfo = {
				x: sortedDisplayArray[i].x,
				y: sortedDisplayArray[i].y,
				startX: sortedDisplayArray[i].x,
				startY: sortedDisplayArray[i].y,
				targetX: xPos,
				targetY: yPos,
				value: sortedArray[i],
				unitValue: sortedDisplayArray[i].unitsText
			};
			brokenStemLeafArray.push(brokenDataInfo);
		}		
        delay+=150;		
        this.tweens.add({
            targets: sortedDisplayArray[i],
            x: xPos,
            y: yPos,
            ease: 'Sine.easeIn',
            delay: delay,
            duration: 500,			
        }); 
		xPosArray.push(xPos);
		yPosArray.push(yPos);
		if (broken&&i%2==0) {
			unitsDisplayArray.push('');
		}
		else {			
			unitsDisplayArray.push(sortedDisplayArray[i].unitsText);
		}		
    }
	//console.log('Delay: '+delay);
	//console.log(xPosArray);
	//console.log(yPosArray);
	//console.log(unitsDisplayArray);
	if (!broken&&textNumber==8) {
		mainScene.checkHighestRow(units, tens, twenties, thirties);
		//console.log(units+', '+tens+', '+twenties+', '+thirties);
	}
	for (var i=0; i<unitsDisplayArray.length; i++) {        
        var unitsOnlyText = this.add.text(xPosArray[i], yPosArray[i], unitsDisplayArray[i], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
		unitsOnlyText.alpha = 0;
		this.tweens.add({
            targets: unitsOnlyText,
            alpha: 1,
            ease: 'Sine.easeIn',
            delay: (delay-1750)+(i*150),  
			duration: 50
        });    
		unitsOnlyArray.push(unitsOnlyText);
    }
	for (var i=0; i<sortedDisplayArray.length; i++) {        
        this.tweens.add({
            targets: sortedDisplayArray[i],
            alpha: 0,
            ease: 'Sine.easeIn',
            delay: (delay-1775)+(i*150),  
			duration: 50
        });         
    }
	var speechText;
	if (broken) {
		speechText = jsonText.stemBrokenResponse;
		this.correctBrokenStemLeaf();
	}
	else {
		speechText = this.changeText();
	}    
    this.time.delayedCall(delay-2000, function() { 
		this.createBubble(845, 276, speechText, true);		
		if (!mute) {
			if (broken) {
				LoLApi('speakText', { key: 'stemBrokenResponse' });
			}
			else {
				LoLApi('speakText', { key: speechText });
			}			
		}
	}, [], this);
};

mainScene.createNumberLine = function() {
	lineLabelArray = [];
	line = this.add.graphics();1
	line.visible = true;
    line.lineStyle(1, 0x008106, 1);
    line.beginPath();
    line.moveTo(200, 430);
    line.lineTo(648, 430);
	line.moveTo(200, 430);
	line.lineTo(200, 440);
	var lineLabel = this.add.text(200, 450, 300, { fontSize: '14px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0.5);  
			lineLabelArray.push(lineLabel);
	for (var i=1; i<=14; i++) {
		line.moveTo(200+(i*32), 430);
		if (i%2==0) {
			line.lineTo(200+(i*32), 440);
			lineLabel = this.add.text(200+(i*32), 450, 300+(i*50), { fontSize: '14px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0.5);  
			lineLabelArray.push(lineLabel);
		}
		else {
			line.lineTo(200+(i*32), 435);
		} 		   
	}    
    line.closePath();
    line.strokePath();
		
}

mainScene.checkPointerPos = function(pointer) {
	var speechTextWrong;
	console.log(pointer.x);
	console.log(correctX);
	if (pointer.x>correctX-20&&pointer.x<correctX+20) {
		//correct		
		pointerActive = false;		
		mainScene.nextStep();
	}
	else if (pointer.x<correctX-20) {
		//right a bit
		speechTextWrong = "Right a bit."
		mainScene.createBubbleTwo(845, 276, speechTextWrong, false);
	}
	else {
		//left a bit
		speechTextWrong = "Left a bit."
		mainScene.createBubbleTwo(845, 276, speechTextWrong, false);
	}
}

mainScene.calcCorrectX = function(arrayPos) {
	var answer = (monsterDistanceArray[arrayPos]-300)/700;
	answer = (answer*448)+200;
	return answer;
};

mainScene.createRowButtons = function() {
	buttonArray = [];
	var button1 = this.add.sprite(130, 124, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button1.setScale(1, 0.37);
    button1.alpha = 0.1;	
	button1.on('pointerdown', function() { 
		mainScene.checkCorrectRow(1); 
	}, this); 	
	var button2 = this.add.sprite(130, 149, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button2.setScale(1, 0.37);
    button2.alpha = 0.1;
	button2.on('pointerdown', function() { 
		mainScene.checkCorrectRow(2); 
	}, this);
	var button3 = this.add.sprite(130, 174, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button3.setScale(1, 0.37);
    button3.alpha = 0.1;	
	button3.on('pointerdown', function() { 
		mainScene.checkCorrectRow(3); 
	}, this);
	var button4 = this.add.sprite(130, 199, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button4.setScale(1, 0.37);
    button4.alpha = 0.1;
	button4.on('pointerdown', function() { 
		mainScene.checkCorrectRow(4); 
	}, this);
	var button5 = this.add.sprite(130, 224, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button5.setScale(1, 0.37);
    button5.alpha = 0.1;
	button5.on('pointerdown', function() { 
		mainScene.checkCorrectRow(5); 
	}, this);
	var button6 = this.add.sprite(130, 249, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button6.setScale(1, 0.37);
    button6.alpha = 0.1;
	button6.on('pointerdown', function() { 
		mainScene.checkCorrectRow(6); 
	}, this);
	var button7 = this.add.sprite(130, 274, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button7.setScale(1, 0.37);
    button7.alpha = 0.1;
	button7.on('pointerdown', function() { 
		mainScene.checkCorrectRow(7); 
	}, this);
	var button8 = this.add.sprite(130, 299, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button8.setScale(1, 0.37);
    button8.alpha = 0.1;
	button8.on('pointerdown', function() { 
		mainScene.checkCorrectRow(8); 
	}, this);
	var button9 = this.add.sprite(130, 324, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button9.setScale(1, 0.37);
    button9.alpha = 0.1;
	button9.on('pointerdown', function() { 
		mainScene.checkCorrectRow(9); 
	}, this);
	var button10 = this.add.sprite(130, 349, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button10.setScale(1, 0.37);
    button10.alpha = 0.1;
	button10.on('pointerdown', function() { 
		mainScene.checkCorrectRow(10); 
	}, this);
	var button11 = this.add.sprite(130, 374, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button11.setScale(1, 0.37);
    button11.alpha = 0.1;
	button11.on('pointerdown', function() { 
		mainScene.checkCorrectRow(11); 
	}, this);
	var button12 = this.add.sprite(130, 399, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button12.setScale(1, 0.37);
    button12.alpha = 0.1;
	button12.on('pointerdown', function() { 
		mainScene.checkCorrectRow(12); 
	}, this);
	var button13 = this.add.sprite(130, 424, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button13.setScale(1, 0.37);
    button13.alpha = 0.1;
	button13.on('pointerdown', function() { 
		mainScene.checkCorrectRow(13); 
	}, this);
	var button14 = this.add.sprite(130, 449, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button14.setScale(1, 0.37);
    button14.alpha = 0.1;
	button14.on('pointerdown', function() { 
		mainScene.checkCorrectRow(14); 
	}, this);
	var button15 = this.add.sprite(130, 474, 'buttonLong').setInteractive( { useHandCursor: true  } );
	button15.setScale(1, 0.37);
    button15.alpha = 0.1;
	button15.on('pointerdown', function() { 
		mainScene.checkCorrectRow(15); 
	}, this);
	buttonArray = [button1, button2, button3, button4, button5, button6, button7, button8, button9, button10, button11, button12, button13, button14, button15]
};

mainScene.removeRowButtons = function() {
	for (var i=0; i<buttonArray.length; i++) {
		buttonArray[i].destroy();
	}
};

mainScene.checkCorrectRow = function(row) {
	if (row==correctRow) {
		//sortedDistanceArray[row-1].fill = 0xffffff;
		//sortedDistanceArray[row-1].style.color = "#ffffff"; .setColor('#ffff00');
		sortedDistanceArray[row-1].setColor('#ffffff');
		mainScene.nextStep();
	}
	else {
		mainScene.wrongAnswer();
	}
};

mainScene.checkHighestRow = function(units, tens, twenties, thirties) {
	var tensCorrect, twentiesCorrect;
	if (tens>twenties) {
		tensCorrect = true;
		twentiesCorrect = false;
	}
	else if (tens<twenties) {
		tensCorrect = false;
		twentiesCorrect = true;
	}
	else if (tens==twenties) {
		tensCorrect = true;
		twentiesCorrect = true;
	}
	//console.log(units+', '+tens+', '+twenties+', '+thirties);
	//console.log(tensCorrect+', '+twentiesCorrect);
	//create buttons  70high, yPos = 220, 290, 360, 430
	var unitsButton = this.add.sprite(285, 228, 'buttonLong').setInteractive( { useHandCursor: true  } );
	unitsButton.setScale(2, 1);
    unitsButton.alpha = 0.01;	
	var tensButton = this.add.sprite(285, 298, 'buttonLong').setInteractive( { useHandCursor: true  } );
	tensButton.setScale(2, 1);
    tensButton.alpha = 0.01;	
	var twentiesButton = this.add.sprite(285, 368, 'buttonLong').setInteractive( { useHandCursor: true  } );
	twentiesButton.setScale(2, 1);
    twentiesButton.alpha = 0.01;	
	var thirtiesButton = this.add.sprite(285, 438, 'buttonLong').setInteractive( { useHandCursor: true  } );
	thirtiesButton.setScale(2, 1);
    thirtiesButton.alpha = 0.01;	
	var that = this;
	unitsButton.on('pointerdown', function() { 
		mainScene.wrongSL();		
	}); 
	if (tensCorrect) {
		tensButton.on('pointerdown', function() { 			
			mainScene.correctSL();
		} ); 		
	}
	else {
		tensButton.on('pointerdown', function() { 
			mainScene.wrongSL();			
		}); 
	}
	if (twentiesCorrect) {
		twentiesButton.on('pointerdown', function() { 			
			mainScene.correctSL(); 
		} ); 		
	}
	else {
		twentiesButton.on('pointerdown', function() { 
			mainScene.wrongSL();			
		}); 
	}
	thirtiesButton.on('pointerdown', function() { 
		mainScene.wrongSL();		
	}); 
	highestRowButtonArray = [unitsButton, tensButton, twentiesButton, thirtiesButton];
};

mainScene.wrongAnswer = function() {	
	//console.log(textNumber);
	/*var speechTextWrong = jsonText.wrongAnswer;	
	if (!mute) {				
		LoLApi('speakText', { key: 'wrongAnswer' });		
	}	*/
	var speechTextWrong = "No, try again."
	mainScene.createBubbleTwo(845, 276, speechTextWrong, false);
};

mainScene.correctSL = function() {	
	if (textNumber==9) {	
		var speechText = mainScene.changeText();
		mainScene.createBubble(845, 276, speechText, true);
		if (!mute) {				
			LoLApi('speakText', { key: speechText });
		}	
		if (highestRowButtonArray.length>0) {
			for (var i=0; i<highestRowButtonArray.length; i++) {
				highestRowButtonArray[i].destroy();
			}
		}	
	}
};

mainScene.correctLP = function() {	
	if (textNumber==13) {	
		var speechText = mainScene.changeText();
		mainScene.createBubble(845, 276, speechText, true);
		if (!mute) {				
			LoLApi('speakText', { key: speechText });
		}		
		if (highestColumnButtonArray.length>0) {
			for (var i=0; i<highestColumnButtonArray.length; i++) {
				highestColumnButtonArray[i].destroy();
			}
		}
	}
};

mainScene.checkHighestColumn = function(array, start) {
	var newXPosArray = this.removeDuplicates(array);
	var gap = newXPosArray[1]-newXPosArray[0];
	var xScale = gap/200;
	var correctColumn;
	if (start==1) {
		correctColumn = 3;
	}
	else {
		correctColumn = 2;
	}
	for (var i = 0; i<newXPosArray.length; i++) {
		var columnButton = this.add.sprite(newXPosArray[i], 288, 'buttonLong').setInteractive( { useHandCursor: true  } );
		columnButton.setScale(xScale, 6);
		columnButton.alpha = 0.01;	
		if (i==correctColumn) {
			columnButton.on('pointerdown', function() { 				
				mainScene.correctLP(); 
			} ); 		
		}
		else {
			columnButton.on('pointerdown', function() { 
				mainScene.wrongSL();				
			}); 
		}
		highestColumnButtonArray.push(columnButton);
	}
};

mainScene.createBrokenDataStem = function(i) {
	var brokenData = this.add.text(brokenStemLeafArray[i].x, brokenStemLeafArray[i].y, brokenStemLeafArray[i].value, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setInteractive( { useHandCursor: true } );
	brokenData.targetX = brokenStemLeafArray[i].targetX;
	brokenData.targetY = brokenStemLeafArray[i].targetY;
	brokenData.startX = brokenStemLeafArray[i].startX;
	brokenData.startY = brokenStemLeafArray[i].startY;
	brokenData.unitText = brokenStemLeafArray[i].unitValue;
	brokenData.matched = false;
	var that = this;
	brokenData.on('pointerdown', function() {      
		for (var i=0; i<brokenStemDataArray.length; i++) {
			brokenStemDataArray[i].setScale(1);
		}
		brokenData.setScale(1.15);	
		activeBrokenData = brokenData;		
		that.input.on('pointerdown', function (pointer) {			
			//console.log(pointer.x);
			//console.log(pointer.y);
			if (brokenAmount>0&&activeBrokenData!='none') {
				if ((pointer.x>=brokenData.targetX-40)&&(pointer.x<=brokenData.targetX+60)&&(pointer.y>=brokenData.targetY-40)&&(pointer.y<=brokenData.targetY+60)) {			
					that.tweens.add({
						targets: brokenData,
						x: brokenData.targetX,
						y: brokenData.targetY,
						ease: 'Sine.easeIn',					
						duration: 500,					
					}); 								
					if (!brokenData.matched) {	
						brokenData.setScale(1);	
						brokenData.text = brokenData.unitText;
						brokenAmount--;
						brokenData.matched = true;
						activeBrokenData = 'none';
						if (brokenAmount==0&&broken) {
							broken = false;							
							speechText = that.changeText();
							that.createBubble(845, 276, speechText, true);
						}
					}	
				}
				else {	
					mainScene.wrongSL();	
				}
			}
		}, this);			
	}); 
	brokenStemDataArray.push(brokenData);
};

mainScene.correctBrokenStemLeaf = function() {
	brokenAmount = 8;
	brokenType = 's&l';
	for (var i=0; i<brokenStemLeafArray.length; i++) {
		mainScene.createBrokenDataStem(i);
		/*var brokenData = this.add.text(brokenStemLeafArray[i].x, brokenStemLeafArray[i].y, brokenStemLeafArray[i].value, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setInteractive( { useHandCursor: true } );
		brokenData.targetX = brokenStemLeafArray[i].targetX;
		brokenData.targetY = brokenStemLeafArray[i].targetY;
		brokenData.startX = brokenStemLeafArray[i].startX;
		brokenData.startY = brokenStemLeafArray[i].startY;
		brokenData.unitText = brokenStemLeafArray[i].unitValue;
		brokenData.matched = false;
		this.input.setDraggable(brokenData);
		this.input.on('drag', function (pointer, gameObject, dragX, dragY) {			
			gameObject.x = dragX;
			gameObject.y = dragY;
		});
		var that = this;
		if (brokenType=='s&l') {
			this.input.on('dragend', function (pointer, gameObject) {
				if ((gameObject.x>=gameObject.targetX-40)&&(gameObject.x<=gameObject.targetX+60)&&(gameObject.y>=gameObject.targetY-40)&&(gameObject.y<=gameObject.targetY+60)) {
					gameObject.x = gameObject.targetX;
					gameObject.y = gameObject.targetY;
					gameObject.text = gameObject.unitText;
					if (!gameObject.matched) {
						brokenAmount--;					
						gameObject.matched = true;
						sortedDisplayArray.push(gameObject);
						//console.log(brokenAmount);
						if (brokenAmount==0&&broken) {
							broken = false;
							speechText = that.changeText();
							that.createBubble(845, 276, speechText, true);
						}
					}
					//console.log(brokenAmount);
				}
				else {
					//console.log(gameObject.x+', '+gameObject.y+'/ '+gameObject.targetX+', '+gameObject.targetY);
					that.tweens.add({
						targets: gameObject,
						x: gameObject.startX,
						y: gameObject.startY,
						ease: 'Sine.easeIn',					
						duration: 500,					
					}); 
				}
			});
		}*/
	}
};

mainScene.addIngredients = function() {
    var button1 = this.add.image(150, 100, 'buttonLarge').setInteractive( { useHandCursor: true } );
    button1.on('pointerdown', function() { this.ingredientSelected(1); }, this); 
    var button1Text = this.add.text(45, 83, possibleIngredientsArray[0][0], { fontSize: '28px', fill: '#000' }).setFontFamily('Verdana');
    var image1 = this.add.image(230, 100, 'ingredients');
    image1.setScale(2);
    image1.setFrame(possibleIngredientsArray[0][1]);
    var button2 = this.add.image(150, 200, 'buttonLarge').setInteractive( { useHandCursor: true } );
    button2.on('pointerdown', function() { this.ingredientSelected(2); }, this); 
    var button2Text = this.add.text(45, 183, possibleIngredientsArray[1][0], { fontSize: '28px', fill: '#000' }).setFontFamily('Verdana');
    var image2 = this.add.image(230, 200, 'ingredients');
    image2.setScale(2);
    image2.setFrame(possibleIngredientsArray[1][1]);
    var button3 = this.add.image(150, 300, 'buttonLarge').setInteractive( { useHandCursor: true } );
    button3.on('pointerdown', function() { this.ingredientSelected(3); }, this); 
    var button3Text = this.add.text(45, 283, possibleIngredientsArray[2][0], { fontSize: '28px', fill: '#000' }).setFontFamily('Verdana');
    var image3 = this.add.image(230, 300, 'ingredients');
    image3.setScale(2);
    image3.setFrame(possibleIngredientsArray[2][1]);
	ingredientsButtonArray = [button1, button1Text, image1, button2, button2Text, image2, button3, button3Text, image3];
};

mainScene.ingredientSelected = function(button) {
    var frame;
	for (var i=0; i<ingredientsButtonArray.length; i++) {
		ingredientsButtonArray[i].visible = false;
	}
	var newIngredient;
	if (bubbleVisible) {
		bubbleText.text = '';		
		bubbleSprite.anims.play('bubbleClose');	
	}
	if (button==1) {
        newIngredient = possibleIngredientsArray[0][0];
		frame = possibleIngredientsArray[0][1];
		possibleIngredientsArray.splice(0, 1);
    }
    else if (button==2) {
        newIngredient = possibleIngredientsArray[1][0];
		frame = possibleIngredientsArray[1][1];
		possibleIngredientsArray.splice(1, 1);
    }
    else if (button==3) {
        newIngredient = possibleIngredientsArray[2][0];
		frame = possibleIngredientsArray[2][1];
		possibleIngredientsArray.splice(2, 1);
    }
	extraIngredient1.name = newIngredient;
	extraIngredient1.frame = frame;
	/*if (extraIngredient1.name=='none') {
		extraIngredient1.name = newIngredient;
		extraIngredient1.frame = frame;
	}
	else if (extraIngredient2.name=='none') {
		extraIngredient2.name = newIngredient;
		extraIngredient2.frame = frame;
	}
	else if (extraIngredient3.name=='none') {
		extraIngredient3.name = newIngredient;
		extraIngredient3.frame = frame;
	}*/
	//console.log(extraIngredient1.name);
	
	this.time.delayedCall(250, function() { 
        var speechText = mainScene.changeText();
    	mainScene.createBubble(845, 276, speechText, true);
		if (!mute) {				
			LoLApi('speakText', { key: speechText });
		}
    }, [], this);
	
};

mainScene.zoomToLab = function() {
    var cam = this.cameras.main;
    
    cam.zoomTo(3, 1150);
    cam.pan(215, 350, 700);
    this.time.delayedCall(1150, function() { cam.zoomTo(5, 400); }, [], this);
    
    this.time.delayedCall(1600, function() { 
        mainScene.scene.stop("main");
	    mainScene.scene.start("warehouse"); 
    }, [], this);
};

mainScene.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

mainScene.removeDuplicates = function(arr) {
	var elems = {},    
	arr = arr.filter(function (e) {
		if (elems[e] === undefined) {
			elems[e] = true;
			return true;
		}
		return false;
	});
	return arr;
};

mainScene.findMode = function(array) {
    var counter = {};
    var mode = [];
    var max = 0;
    for (var i in array) {
        if (!(array[i] in counter))
            counter[array[i]] = 0;
        counter[array[i]]++;
 
        if (counter[array[i]] == max) 
            mode.push(array[i]);
        else if (counter[array[i]] > max) {
            max = counter[array[i]];
            mode = [array[i]];
        }
    }
    return mode; 
};
/*global Phaser*/
var madScientistSprite;
var bubbleSprite;
var textNumber = 0;
var namesArray = [];
var speedArray = [];
var lifeArray = [];
var speedArrayOriginal = [];
var lifeArrayOriginal = [];
var speedArray1 = [];
var lifeArray1 = [];
var speedArray2 = [];
var lifeArray2 = [];
var speedArray3 = [];
var lifeArray3 = [];
var stemPlotArray = [];
var sortedDisplayArray = [];
var extraIngredient1 = {
	name: 'none',
	speed: 0,
	lifetime: 0,
	frame: 0
};
var extraIngredient2 = {
	name: 'none',
	speed: 0,
	lifetime: 0
};
var extraIngredient3 = {
	name: 'none',
	speed: 0,
	lifetime: 0
};

var dataTable;
var line;
var xArray;
var graphAxisTextArray;
var nextButton;
var nextButtonLabel;
var bubbleSprite;
var bubbleText;
var bubbleVisible = false;
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
//var speechText;

var mainScene = new Phaser.Scene('main');

mainScene.create = function() {	
    if (textNumber==0) {
        this.shuffle(possibleIngredientsArray);
		this.shuffle(possibleResponsesArray);
    }
	broken = false;
	ingredientsButtonArray = [];
	brokenStemLeafArray = [];
	brokenLinePlotArray = [];
	unitsOnlyArray = [];
    var background = this.add.image(512, 276, 'officeBackground');
    background.setScale(2);
    madScientistSprite = this.add.sprite(810, 480, 'madScientist');
    madScientistSprite.setScale(2);
    madScientistSprite.anims.play('msStand');
    var speechText = this.changeText();
    this.createBubble(715, 276, speechText);
    var computer = this.add.image(200, 452, 'computer');
    computer.setScale(0.65);
    var table = this.add.image(200, 536, 'table');
    table.setScale(1.25);   
	dataTable = this.add.sprite(320, 280, 'computer');
    dataTable.setFrame(1);
    dataTable.setScale(4);
	dataTable.visible = false;
	nextButton = this.add.sprite(512, 530, 'buttonLarge').setInteractive( { useHandCursor: true  } );    
	var that = this;
	nextButton.on('pointerdown', function() {
        bubbleText.text = '';	
		if (bubbleVisible) {
			bubbleSprite.anims.play('bubbleClose');
		}
		that.time.delayedCall(500, function() {
            mainScene.nextStep();
        }, [], this);		
    }); 	
	nextButton.visible = false;
    nextButtonLabel = this.add.text(517, 530, jsonText.mainButton1, { fontSize: '38px', fill: '#000' }).setFontStyle('bold italic').setFontFamily('Arial').setPadding({ right: 16 }).setOrigin(0.5);
	nextButtonLabel.visible = false;
	if (!mute) {		
		winSfx = this.sound.add('win');
		speechBubbleSfx = this.sound.add('pop');			
	}	
};

mainScene.nextStep = function() {	
	bubbleText.text = '';	
	madScientistSprite.anims.play('msStand');
	nextButton.visible = false;
	nextButtonLabel.visible = false;
	//var that = this;
	var speechText;
	if (textNumber==6&&!dataTable.visible) {
		mainScene.showData(4, 10);
	}
	else if (textNumber==8) {		
		mainScene.createStemAndLeafPlot(lifeArray);
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
		mainScene.createBubble(715, 276, speechText);
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
	else if (textNumber==28) {
		mainScene.reset();
		mainScene.scene.stop("main");
		mainScene.scene.start("menu");
	}
	else {
		speechText = mainScene.changeText();
		mainScene.createBubble(715, 276, speechText);
	}
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

mainScene.createBubble = function(x, y, text) {
	bubbleVisible = true;
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
    
    this.time.delayedCall(8000, function() {  //make sure to reset to 8000 after testing
        madScientistSprite.anims.play('msStand');
		if (broken) {
			bubbleText.text = '';	
			if (bubbleVisible) {
				bubbleSprite.anims.play('bubbleClose');
			}
		}
		else if (textNumber!=15) {
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
	var text, difference;
    switch (textNumber) {
        case 0:
            text = jsonText.mainText0;
            textNumber++;
            break;
        case 1:
            text = jsonText.mainText1;
            textNumber++;
            break;
        case 2:
            text = jsonText.mainText2;
            textNumber++;
            break;
        case 3:
            text = jsonText.mainText3;
            textNumber++;
            break;
        case 4:
            text = jsonText.mainText4;
            textNumber++;
            break;
        case 5:
            text = jsonText.mainText5;
            textNumber++;
            break;
        case 6:
            text = jsonText.mainText6;
            textNumber++;
            break;
        case 7:
            text = jsonText.mainText7;
            textNumber++;
            for (var i=0; i<speedArray.length; i++) {
                speedArray[i].visible = false;
                this.tweens.add({
                    targets: lifeArray[i],
                    x: '-=190',
                    ease: 'Sine.easeIn',
                    duration: 500,
                });
            }
            break;
        case 8: //add more info on stem & leaf plots
            text = jsonText.mainText8;
            textNumber+=0.5;
            break;
		case 8.5:
            text = jsonText.mainText8_5;
            textNumber+=0.5;
            break;
        case 9:
            text = jsonText.mainText9;
            textNumber++;
			for (var i=0; i<unitsOnlyArray.length; i++) {
                unitsOnlyArray[i].visible = false;   				             
            }
            for (var i=0; i<stemPlotArray.length; i++) {
                stemPlotArray[i].visible = false;
            }
            for (var i=0; i<sortedDisplayArray.length; i++) {
                sortedDisplayArray[i].visible = false;
            }
            for (var i=0; i<speedArray.length; i++) {
                namesArray[i].visible = true;
                speedArray[i].visible = true;
            }
            break;
        case 10:
            text = jsonText.mainText10;
            textNumber++;
            break;
        case 11:
            text = jsonText.mainText11;
            textNumber+=0.5;
			for (var i=0; i<unitsOnlyArray.length; i++) {
                unitsOnlyArray[i].visible = false;   				             
            }
            for (var i=0; i<stemPlotArray.length; i++) {
                stemPlotArray[i].visible = false;
            }
            for (var i=0; i<sortedDisplayArray.length; i++) {
                sortedDisplayArray[i].visible = false;
            }
            for (var i=0; i<speedArray.length; i++) {
                namesArray[i].visible = true;
                speedArray[i].visible = true;
            }
            break;
		case 11.5:
            text = jsonText.mainText11_5;
            textNumber+=0.5;
            break;
        case 12:
            var speedArrayValues = [];
            for (var i = 0; i<speedArray.length; i++) {
                speedArrayValues.push(parseFloat(speedArray[i].text));
            }
            var modeArray = this.findMode(speedArrayValues);
            var mode1 = modeArray[0];
            console.log(mode1);
            if (modeArray.length==1) {
                text = jsonText.mainText12a1+modeArray[0]+jsonText.mainText12a2;
            }
            else if (modeArray.length==2) {
                text = jsonText.mainText12b1+modeArray[0]+jsonText.mainText12b2+modeArray[1]+jsonText.mainText12b3;
            }
            else if (modeArray.length==3) {
                text = jsonText.mainText12b1+modeArray[2]+", "+modeArray[0]+jsonText.mainText12b2+modeArray[1]+jsonText.mainText12b3;
            }
            textNumber++;
            break;
        case 13:
            text = jsonText.mainText13;
            textNumber++;
            break;
        case 14:
            text = jsonText.mainText14;
            textNumber++;
            break;
		case 15:
			text = possibleResponsesArray[0];
			possibleResponsesArray.splice(0, 1);
            textNumber++;
			break;
		case 16:
			text = jsonText.mainText16;			
			namesArray = [];
			speedArrayOriginal = speedArray;
			speedArray = [];
			lifeArrayOriginal = lifeArray;
			lifeArray = [];
            textNumber++;
			break;
		case 17:
			text = jsonText.mainText17;
            textNumber++;
			for (var i=0; i<speedArray.length; i++) {
                speedArray[i].visible = false;
                this.tweens.add({
                    targets: lifeArray[i],
                    x: '-=190',
                    ease: 'Sine.easeIn',
                    duration: 500,
                });
            }
			break;
		case 18:			
			text = jsonText.mainText18;
            textNumber++;
			break;
		case 19:
			if (correctGraphType) {
				text = jsonText.mainText19a;
				textNumber+=2;
			}
			else {				
				text = jsonText.mainText19b;
				textNumber++;
			}            
			break;
		case 20:
			text = jsonText.mainText20;
			textNumber++;
			break;		
		case 21:
			difference = extraIngredient1.lifetime-10;
			console.log(difference);
			text = mainScene.showDifference(difference);
			console.log(text);
			textNumber++;
			break;
		case 22:
			for (var i=0; i<unitsOnlyArray.length; i++) {
                unitsOnlyArray[i].visible = false;   				             
            }
			for (var i=0; i<lifeArray.length; i++) {                  
				lifeArray[i].visible = false;                
            }
			for (var i=0; i<brokenStemLeafArray.length; i++) {
                brokenStemLeafArray[i].visible = false;   				             
            }			
			for (var i=0; i<stemPlotArray.length; i++) {
                stemPlotArray[i].visible = false;
            }
            for (var i=0; i<sortedDisplayArray.length; i++) {
                sortedDisplayArray[i].visible = false;
            }
			for (var i=0; i<namesArray.length; i++) {
                namesArray[i].visible = true; 
				speedArray[i].visible = true; 
            }
			text = jsonText.mainText22;
			textNumber++;
			break;
		case 23:
			if (correctGraphType) {
				text = jsonText.mainText23a;
				textNumber+=2;
			}
			else {
				mainScene.hideData(true);				
				text = jsonText.mainText23b;
				textNumber++;
			}            
			break;
		case 24:
			text = jsonText.mainText24;
			textNumber++;
			break;
		case 25:
			difference = extraIngredient1.speed-4;
			console.log(difference);
			text = mainScene.showDifference(difference);
			console.log(text);
			textNumber++;
			break;
		case 26: 
			mainScene.hideData(false);
			text = mainScene.finalResultText();
			textNumber++;
			break;
		case 27:
			text = jsonText.mainText27;
			textNumber++;			
			break;
    }
    return text;
};

mainScene.showData = function(avSpeed, avLife) {
    dataTable.visible = true;    
    var nameTitle = this.add.text(80, 80, 'Subject', { fontSize: '24px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
    var speedTitle = this.add.text(240, 80, 'Top Speed', { fontSize: '24px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
    var lifeTitle = this.add.text(430, 80, 'Lifetime', { fontSize: '24px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
    namesArray.push(nameTitle);
    speedArray.push(speedTitle);
    lifeArray.push(lifeTitle);
    var speedValuesArray = [avSpeed, avSpeed+1, avSpeed+2, avSpeed+3, avSpeed, avSpeed-1, avSpeed-2, avSpeed-3, avSpeed, avSpeed+1, avSpeed+2, avSpeed, avSpeed-1, avSpeed-2, avSpeed, avSpeed+1, avSpeed-1];
    this.shuffle(speedValuesArray);
    var lifeValuesArray = [avLife, avLife+1, avLife+2, avLife+3, avLife+4, avLife-1, avLife-2, avLife-3, (2*avLife), (2*avLife)+1, (2*avLife)+2, (2*avLife)+3, (2*avLife)-1, (2*avLife)-2, (2*avLife)-3, (3*avLife), (3*avLife)+1, (3*avLife)-1, (3*avLife)-2, (3*avLife)-3];
    this.shuffle(lifeValuesArray);
    for (var i=1; i<=15; i++) {
        var name = this.add.text(80, 90+(i*25), 'Monster '+i, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
        var speed = this.add.text(360, 108+(i*25), speedValuesArray[i-1], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0, 1);
        var life = this.add.text(515, 108+(i*25), lifeValuesArray[i-1], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0, 1);
        namesArray.push(name);
        speedArray.push(speed);
        lifeArray.push(life);
    }
	this.time.delayedCall(500, function() {
		nextButton.visible = true;
		nextButtonLabel.visible = true;
	}, [], this);
    /*var that = this;
    dataTable.on('pointerdown', function() {
        that.time.delayedCall(500, function() {
            var speechText = that.changeText();
            that.createBubble(600, 300, speechText);
        }, [], this);
    }); */
};

mainScene.showDifference = function(difference) {
	var response;
	if (difference>1) {
		response = jsonText.diffResponse1;
	}
	else if (difference==1) {
		response = jsonText.diffResponse2;
	}
	else if (difference==0) {
		response = jsonText.diffResponse3;
	}
	else if (difference==-1) {
		response = jsonText.diffResponse4;
	}
	else if (difference<-1) {
		response = jsonText.diffResponse5;
	}
	console.log(response);
	return response;
};

mainScene.finalResultText = function() { 
	var response, response1, response2;
	var diff1 = extraIngredient1.lifetime-10;
	var diff2 = extraIngredient1.speed-4;
	var responseIntro = jsonText.finalResponse1+extraIngredient1.name+jsonText.finalResponse2;
	if (diff1>1) {
		response1 = jsonText.finalResponse3;
	}
	else if (diff1==1) {
		response1 = jsonText.finalResponse4;
	}
	else if (diff1==0) {
		response1 = jsonText.finalResponse4;
	}
	else if (diff1==-1) {
		response1 = jsonText.finalResponse4;
	}
	else if (diff1<-1) {
		response1 = jsonText.finalResponse5;
	}
	if (diff2>1) {
		response2 = jsonText.finalResponse6;
	}
	else if (diff2==1) {
		response2 = jsonText.finalResponse7;
	}
	else if (diff2==0) {
		response2 = jsonText.finalResponse7;
	}
	else if (diff2==-1) {
		response2 = jsonText.finalResponse7;
	}
	else if (diff2<-1) {
		response2 = jsonText.finalResponse8;
	}
	response = responseIntro+response1+response2;
	console.log(response);
	return response;
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

mainScene.chooseGraph = function(array) {
	lineButton = this.add.image(200, 123, 'buttonLarge').setInteractive( { useHandCursor: true } );
    lineButton.on('pointerdown', function() { 
		if (textNumber==23) {
			broken = true;
		}
		this.hideGraphButtons(); 
		this.createLinePlot(array); 
	}, this); 
	lineButtonLabel = this.add.text(93, 110, jsonText.graphButtonLabel1, { fontSize: '20px', fill: '#000' }).setFontFamily('Verdana');
	stemButton = this.add.image(200, 223, 'buttonLarge').setInteractive( { useHandCursor: true } );
    stemButton.on('pointerdown', function() { 
		if (textNumber==19) {
			broken = true;
		}
		this.hideGraphButtons(); 
		this.createStemAndLeafPlot(array); 
	}, this); 
	stemButtonLabel = this.add.text(93, 210, jsonText.graphButtonLabel2, { fontSize: '20px', fill: '#000' }).setFontFamily('Verdana');
};

mainScene.hideGraphButtons = function() {
	bubbleText.text = '';	
	if (bubbleVisible) {
		bubbleSprite.anims.play('bubbleClose');
	}
	lineButton.visible = false;
	lineButtonLabel.visible = false;
	stemButton.visible = false;
	stemButtonLabel.visible = false;
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
    console.log(sortedArray);
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
    console.log(sortedDisplayArray);
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
		if (broken&&i%3==0) {
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
        delay+=150;
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
    for (var i=0; i<xPosArray.length; i++) {
        var xText = this.add.text(xPosArray[i], yPosArray[i], 'X', { fontSize: '22px', fill: '#008106' }).setFontFamily('Arial').setOrigin(0.5);
        xText.alpha = 0;
		this.tweens.add({
			targets: xText,
			alpha: 1,
			ease: 'Sine.easeIn',
			delay: 1675+(i*150),
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
    this.time.delayedCall(5000, function() { this.createBubble(715, 276, speechText); }, [], this);
    console.log(xArray);
};

mainScene.correctBrokenLinePlot = function() {
	brokenType = 'lp';
	brokenAmount = 5;
	for (var i=0; i<brokenLinePlotArray.length; i++) {
		var brokenData = this.add.text(brokenLinePlotArray[i].x, brokenLinePlotArray[i].y, brokenLinePlotArray[i].value, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setInteractive( { useHandCursor: true } );
		brokenData.targetX = brokenLinePlotArray[i].targetX;
		brokenData.targetY = brokenLinePlotArray[i].targetY;
		brokenData.startX = brokenLinePlotArray[i].startX;
		brokenData.startY = brokenLinePlotArray[i].startY;
		brokenData.unitText = brokenLinePlotArray[i].unitValue;
		brokenData.matched = false;
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
				//gameObject.text = 'X';	
				var finalPosX = that.add.text(gameObject.targetX, gameObject.targetY, 'X', { fontSize: '22px', fill: '#008106' }).setFontFamily('Arial').setOrigin(0.5);
				console.log(finalPosX);
				xArray.push(finalPosX);
				console.log(gameObject);
				if (!gameObject.matched) {
					
					gameObject.visible = false;	
					brokenAmount--;
					gameObject.matched = true;
					console.log(brokenAmount);
					if (brokenAmount==0&&broken) {
						broken = false;
						speechText = that.changeText();
						that.createBubble(715, 276, speechText);
					}
				}
				console.log(brokenAmount);
			}
			else {
				console.log(gameObject.x+', '+gameObject.y+'/ '+gameObject.targetX+', '+gameObject.targetY);
				that.tweens.add({
					targets: gameObject,
					x: gameObject.startX,
					y: gameObject.startY,
					ease: 'Sine.easeIn',					
					duration: 500,					
				}); 
			}
		});
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
    console.log(sortedArray);
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
    console.log(sortedDisplayArray);
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
    for (var i=0; i<sortedDisplayArray.length; i++) {
        if (sortedArray[i]<10) {
            xPos+=spacing;
			sortedDisplayArray[i].unitsText = sortedDisplayArray[i].text;
        }
        else if (sortedArray[i]<20) {
            if (sortedArray[i-1]<10) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 290;
            sortedDisplayArray[i].unitsText = sortedDisplayArray[i].text-10;
        } 
        else if (sortedArray[i]<30) {
            if (sortedArray[i-1]<20) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 360;
            sortedDisplayArray[i].unitsText = sortedDisplayArray[i].text-20;
        }
        else if (sortedArray[i]<40) {
            if (sortedArray[i-1]<30) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 430;
            sortedDisplayArray[i].unitsText = sortedDisplayArray[i].text-30;
        }
		if (broken&&i%3==0) {
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
		if (broken&&i%3==0) {
			unitsDisplayArray.push('');
		}
		else {			
			unitsDisplayArray.push(sortedDisplayArray[i].unitsText);
		}		
    }
	console.log('Delay: '+delay);
	console.log(xPosArray);
	console.log(yPosArray);
	console.log(unitsDisplayArray);
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
    this.time.delayedCall(delay+1000, function() { this.createBubble(715, 276, speechText); }, [], this);
};

mainScene.correctBrokenStemLeaf = function() {
	brokenAmount = 5;
	brokenType = 's&l';
	for (var i=0; i<brokenStemLeafArray.length; i++) {
		var brokenData = this.add.text(brokenStemLeafArray[i].x, brokenStemLeafArray[i].y, brokenStemLeafArray[i].value, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setInteractive( { useHandCursor: true } );
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
						console.log(brokenAmount);
						if (brokenAmount==0&&broken) {
							broken = false;
							speechText = that.changeText();
							that.createBubble(715, 276, speechText);
						}
					}
					console.log(brokenAmount);
				}
				else {
					console.log(gameObject.x+', '+gameObject.y+'/ '+gameObject.targetX+', '+gameObject.targetY);
					that.tweens.add({
						targets: gameObject,
						x: gameObject.startX,
						y: gameObject.startY,
						ease: 'Sine.easeIn',					
						duration: 500,					
					}); 
				}
			});
		}
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
	bubbleText.text = '';		
	bubbleSprite.anims.play('bubbleClose');	
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
	if (extraIngredient1.name=='none') {
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
	}
	console.log(extraIngredient1.name);
	
	this.time.delayedCall(250, function() { 
        var speechText = mainScene.changeText();
    	mainScene.createBubble(715, 276, speechText);
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
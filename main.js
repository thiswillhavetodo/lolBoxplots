/*global Phaser*/
var madScientistSprite;
var bubbleSprite;
var textNumber = 5;
var namesArray = [];
var speedArray = [];
var lifeArray = [];
var stemPlotArray = [];
var sortedDisplayArray = [];
var possibleIngredientsArray = [['Cat Fur', 0], ['Ketchup', 1], ['Soda', 2], ['Slime', 3], ['Bananas', 4], ['Chocolate', 5]];
var extraIngredient1 = 'none';
var extraIngredient2 = 'none';
var extraIngredient3 = 'none';
//var speechText;

var mainScene = new Phaser.Scene('main');

mainScene.create = function() {
    if (textNumber==0) {
        this.shuffle(possibleIngredientsArray);
    }
    var background = this.add.image(400, 300, 'officeBackground');
    background.setScale(2);
    madScientistSprite = this.add.sprite(710, 504, 'madScientist');
    madScientistSprite.setScale(2);
    madScientistSprite.anims.play('msStand');
    var speechText = this.changeText();
    this.createBubble(615, 300, speechText);
    var computer = this.add.image(200, 476, 'computer');
    computer.setScale(0.65);
    var table = this.add.image(200, 560, 'table');
    table.setScale(1.25);
    //this.zoomToLab();
    this.addIngredients();
};

mainScene.createBubble = function(x, y, text) {
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
        madScientistSprite.anims.play('msTalk');
        if (!mute) {
            //speechBubbleSfx.play();
        }
    }, [], this);
    var that = this;
    bubbleSprite.on('pointerdown', function() {
        bubbleText.text = '';
        bubbleSprite.anims.play('bubbleClose');
        madScientistSprite.anims.play('msStand');
        that.time.delayedCall(500, function() {
            if (textNumber==6) {
                that.showData(4, 10);
            }
            else if (textNumber==8) {
                that.createStemAndLeafPlot(lifeArray);
            }
            else if (textNumber==10) {
                that.createStemAndLeafPlot(speedArray);
            }
            else if (textNumber==12) {
                that.createLinePlot(speedArray);
            }
            else {
                var speechText = that.changeText();
                that.createBubble(615, 300, speechText);
            }
        }, [], this);
    }); 
    this.time.delayedCall(6000, function() {
        madScientistSprite.anims.play('msStand');
    }, [], this);
};

mainScene.changeText = function() {
    switch (textNumber) {
        case 0:
            var text = "Ah, hello there. You must be my latest assistant. Please, allow me to introduce myself.";
            textNumber++;
            break;
        case 1:
            text = "My name is Professor David Structo, and I am founder and C.E.O of Build A Monster Inc.";
            textNumber++;
            break;
        case 2:
            text = "Here at Build A Monster Inc we don't want to build just any monster. We insist on building the best monster we can.";
            textNumber++;
            break;
        case 3:
            text = "That means we test our monsters to breaking point and beyond. Then we gather up all that lovely, lovely data.";
            textNumber++;
            break;
        case 4:
            text = "Your job is to help me make sense of that data, and also clean up the mess.";
            textNumber++;
            break;
        case 5:
            text = "The latest batch of test data is on the screen. Let's take a close look and see how our monsters performed.";
            textNumber++;
            break;
        case 6:
            text = "Well, looking at the raw data in a table doesn't tell us much. We need a better way to show our data.";
            textNumber++;
            break;
        case 7:
            text = "Let's look at the monster lifetime data first. We'll use a stem and leaf plot to represent the information.";
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
        case 8:
            text = "The stem shows the tens and the leaf shows the units. Now we can see that most of our monsters lasted between 10 and 30 seconds.";
            textNumber++;
            break;
        case 9:
            text = "Okay, now let's take a look at the monster speed data.";
            textNumber++;
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
            text = "Well, that's no good at all. With such a small data range the stem and leaf plot doesn't tell us anything useful.";
            textNumber++;
            break;
        case 11:
            text = "We need to represent the data in a different way. Let's try a line plot instead.";
            textNumber++;
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
        case 12:
            var speedArrayValues = [];
            for (var i = 0; i<speedArray.length; i++) {
                speedArrayValues.push(parseFloat(speedArray[i].text));
            }
            var modeArray = this.findMode(speedArrayValues);
            var mode1 = modeArray[0];
            console.log(mode1);
            if (modeArray.length==1) {
                text = "Now that is much better. We can see now that the most common speed was "+mode1+" miles per hour.";
            }
            else if (modeArray.length==2) {
                text = "Now that is much better. We can see now that the most common speeds were "+modeArray[0]+" and "+modeArray[1]+" miles per hour.";
            }
            else if (modeArray.length==3) {
                text = "Now that is much better. We can see now that the most common speeds were "+modeArray[0]+", "+modeArray[1]+" and "+modeArray[2]+" miles per hour.";
            }
            textNumber++;
            break;
        case 13:
            text = "Now we can start trying to improve on our monster formula. We will add ingredients to our secret formula and see what effect they have.";
            textNumber++;
            break;
        case 14:
            text = "Choose an ingredient to add.";
            textNumber++;
            break;
    }
    return text;
};

mainScene.showData = function(avSpeed, avLife) {
    var dataTable = this.add.sprite(320, 280, 'computer').setInteractive( { useHandCursor: true } );
    dataTable.setFrame(1);
    dataTable.setScale(4);
    
    var nameTitle = this.add.text(80, 80, 'Subject', { fontSize: '24px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
    var speedTitle = this.add.text(240, 80, 'Top Speed', { fontSize: '24px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
    var lifeTitle = this.add.text(430, 80, 'Lifetime', { fontSize: '24px', fill: '#008106' }).setFontFamily('Verdana').setFontStyle('bold');
    namesArray.push(nameTitle);
    speedArray.push(speedTitle);
    lifeArray.push(lifeTitle);
    var speedValuesArray = [avSpeed, avSpeed+1, avSpeed+2, avSpeed+3, avSpeed, avSpeed-1, avSpeed-2, avSpeed-3, avSpeed, avSpeed+1, avSpeed+2, avSpeed, avSpeed-1, avSpeed-2, avSpeed, avSpeed+1, avSpeed-1];
    this.shuffle(speedValuesArray);
    var lifeValuesArray = [avLife, avLife+1, avLife+2, avLife+3, avLife, avLife-1, avLife-2, avLife-3, (2*avLife), (2*avLife)+1, (2*avLife)+2, (2*avLife), (2*avLife)-1, (2*avLife)-2, (3*avLife), (3*avLife)+1, (3*avLife)-1];
    this.shuffle(lifeValuesArray);
    for (var i=1; i<=15; i++) {
        var name = this.add.text(80, 90+(i*25), 'Monster '+i, { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana');
        var speed = this.add.text(360, 108+(i*25), speedValuesArray[i-1], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0, 1);
        var life = this.add.text(515, 108+(i*25), lifeValuesArray[i-1], { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0, 1);
        namesArray.push(name);
        speedArray.push(speed);
        lifeArray.push(life);
    }
    var that = this;
    dataTable.on('pointerdown', function() {
        that.time.delayedCall(500, function() {
            var speechText = that.changeText();
            that.createBubble(600, 300, speechText);
        }, [], this);
    }); 
};

mainScene.createLinePlot = function(array) {
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
    var line  = this.add.graphics();
    line.lineStyle(1, 0x008106, 1);
    line.beginPath();
    line.moveTo(100, 450);
    line.lineTo(500, 450);
    line.moveTo(100, 450);
    line.lineTo(100, 150);
    line.closePath();
    line.strokePath();
    var graphAxisText;
    var graphAxisTextArray = [];
    var range = sortedArray[sortedArray.length-1]-sortedArray[0]+1;
    var gap = 400/range;
    for (var i=0; i<range; i++) {
        graphAxisText = this.add.text(100+((i+0.5)*gap), 475, i+parseFloat(sortedArray[0]), { fontSize: '16px', fill: '#008106' }).setFontFamily('Verdana').setOrigin(0.5);
        graphAxisTextArray.push(graphAxisText);
    }
    var xPos;
    var yPos = 425;
    var xArray = [];
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
        xPosArray.push(xPos);
        yPosArray.push(yPos);
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
            delay: 1650+(i*150),
            duration: 50,
        }); 
        xArray.push(xText);
    }
    console.log(xArray);
};

mainScene.createStemAndLeafPlot = function(array) {
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
    if (max>30) {
        this.time.delayedCall(750, function() { stem4.visible = true; }, [], this);
    }
    else {
        delay = 750;
    }
    if (max>20) {
        this.time.delayedCall(600, function() { stem3.visible = true; }, [], this);
    }
    else {
        delay = 600;
    }
    if (max>10) {
        this.time.delayedCall(450, function() { stem2.visible = true; }, [], this);
    }
    else {
        delay = 450;
        spacing = 24;
    }
    
    if (delay==1000) {
        this.time.delayedCall(900, function() { leafTitle.visible = true; }, [], this);
    }
    else {
        this.time.delayedCall(delay+150, function() { leafTitle.visible = true; }, [], this);
    }
    var xPos = 202-spacing;
    var yPos = 220;
    for (var i=0; i<sortedDisplayArray.length; i++) {
        if (sortedArray[i]<10) {
            xPos+=spacing;
        }
        else if (sortedArray[i]<20) {
            if (sortedArray[i-1]<10) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 290;
            sortedDisplayArray[i].text = sortedDisplayArray[i].text-10;
        } 
        else if (sortedArray[i]<30) {
            if (sortedArray[i-1]<20) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 360;
            sortedDisplayArray[i].text = sortedDisplayArray[i].text-20;
        }
        else if (sortedArray[i]<40) {
            if (sortedArray[i-1]<30) {
                xPos = 170;
            }
            xPos+=spacing;
            yPos = 430;
            sortedDisplayArray[i].text = sortedDisplayArray[i].text-30;
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
    }
    var speechText = this.changeText();
    this.time.delayedCall(delay+1000, function() { this.createBubble(615, 300, speechText); }, [], this);
};

mainScene.addIngredients = function() {
    var button1 = this.add.image(150, 100, 'buttonLarge').setInteractive( { useHandCursor: true } );
    button1.on('pointerdown', function() { this.ingredientSelected(1); }, this); 
    this.add.text(45, 83, possibleIngredientsArray[0][0], { fontSize: '28px', fill: '#000' }).setFontFamily('Verdana');
    var image1 = this.add.image(230, 100, 'ingredients');
    image1.setScale(2);
    image1.setFrame(possibleIngredientsArray[0][1]);
    var button2 = this.add.image(150, 200, 'buttonLarge').setInteractive( { useHandCursor: true } );
    button2.on('pointerdown', function() { this.ingredientSelected(2); }, this); 
    this.add.text(45, 183, possibleIngredientsArray[1][0], { fontSize: '28px', fill: '#000' }).setFontFamily('Verdana');
    var image2 = this.add.image(230, 200, 'ingredients');
    image2.setScale(2);
    image2.setFrame(possibleIngredientsArray[1][1]);
    var button3 = this.add.image(150, 300, 'buttonLarge').setInteractive( { useHandCursor: true } );
    button3.on('pointerdown', function() { this.ingredientSelected(3); }, this); 
    this.add.text(45, 283, possibleIngredientsArray[2][0], { fontSize: '28px', fill: '#000' }).setFontFamily('Verdana');
    var image3 = this.add.image(230, 300, 'ingredients');
    image3.setScale(2);
    image3.setFrame(possibleIngredientsArray[2][1]);
};

mainScene.addIngredients = function(button) {
    if (button==1) {
        
    }
    else if (button==2) {
        
    }
    else if (button==3) {
        
    }
};

mainScene.zoomToLab = function() {
    var cam = this.cameras.main;
    
    cam.zoomTo(3, 1150);
    cam.pan(122, 370, 700);
    this.time.delayedCall(1150, function() { cam.zoomTo(5, 400); }, [], this);
    
    this.time.delayedCall(1600, function() { 
        mainScene.scene.stop("main");
	    mainScene.scene.start("lab"); 
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
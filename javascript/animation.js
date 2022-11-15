const animationWidth = 800;
const animationHeight = 600;

var paper;
var backGround;

var cssRoot = document.querySelector(':root');
var animationSound = new Audio("assets/BrightonShort.mp3");

window.onload= () =>
{
    generateWindow();
    cssRoot.style.setProperty('--primary-color', localStorage.getItem('primary'));
}

window.onresize = () =>
{
    paper.canvas.parentNode.removeChild(paper.canvas);
    stopAnimation();
    backGround.remove();
    generateWindow();
}

function generateWindow()
{
    //220 is the width of the side bar so we use half of that
    paper = new Raphael(((window.innerWidth * 0.5) + 110) - (animationWidth*0.5), (window.innerHeight * 0.5) - (animationHeight*0.5), animationWidth, animationHeight);
    backGround = paper.rect(0,0,animationWidth, animationHeight); 
    backGround.attr({ fill: "black"});
}

function runAnimation()
{
    var playbutton = document.getElementById("playButton");
    playbutton.innerHTML = "🛇";
    playbutton.onclick = stopAnimation;

    animationSound.play();

    /* Actual Animation */
    var cityBackingFar = paper.image('assets/animBacking3.png', 0, 1000, 1000, 600);
    var cityBackingMedium = paper.image('assets/animBacking2.png', 0, 1000, 1000, 600);
    var cityBackingClose = paper.image('assets/animBacking1.png', 0, 1000, 1000, 600);

    var mainCharacter = paper.rect(50, -600, 150, 150).attr({ fill: "45-rgb(158, 38, 38)-blue"});

    var ground = paper.rect(-1000, 450, 1000, 400).attr({ fill: "rgb(120,120,120)"});

    var finalTransition = paper.rect(800, 0, 800, 600).attr({fill: "black"});

    //#region IntialFall
    function mainCharacterFall()
    {
        mainCharacter.animate({y: 275, x:75}, 500, 'ease-in', groundAppearWait);
        mainCharacter.animate({height: 200, width: 100}, 500, mainCharacterLand);
    }

    function mainCharacterLand()
    {
        mainCharacter.animate({width: 180, x: 35, height: 125, y: 150}, 200, 'bounce', mainCharacterReset);
    }
    
    function mainCharacterReset()
    {
        mainCharacter.animate({width: 150, height: 150, y: 300, x: 50}, 450, 'bounce');
    }
    //#endregion

    //#region Ground move in
    function groundAppearWait()
    {
        setTimeout(groundAppear, 200);
    }

    function groundAppear()
    {
        ground.animate({x: -200}, 400, 'elastic', setSkyWait);
    }
    //#endregion

    //#region Other Enviroment Setup
    function setSkyWait()
    {
        setTimeout(setSky, 240);
    }

    function setSky()
    {
        backGround.attr({fill: "45-rgb(36, 44, 51)-black"});
        setTimeout(cityAppear, 800);
    }

    function cityAppear()
    {
        cityBackingClose.animate({y: 0}, 150);
        cityBackingMedium.animate({y: 0}, 250);
        cityBackingFar.animate({y: 0}, 350);
        setTimeout(mainCharacterJumpUp, 500);
    }

    //#endregion

    //#region Run
    function mainCharacterJumpUp()
    {
        mainCharacter.animate({r: 100}, 250, "bounce");
        mainCharacter.animate({height: 180}, 250, "bounce");
        mainCharacter.animate({x: 325, y: 150}, 250, "ease-in", mainCharacterFallFromJump);
        cityBackingClose.animate({x: -200}, 19000);
        cityBackingMedium.animate({x: -100}, 19000);
    }

    function mainCharacterFallFromJump()
    {
        mainCharacter.animate({height: 150, y: 300, x: 600}, 100, "bounce", mainCharacterHitGroundAfterJump);
    }

    function mainCharacterHitGroundAfterJump()
    {
        mainCharacter.animate({width: 180, x: 585, height: 120, y:330}, 100, "bounce", mainCharacterStartRun);
    }

    function mainCharacterStartRun()
    {
        mainCharacter.animate({width: 150, x: 600, height:150, y:300}, 100, "elastic", mainCharacterRun);
        mainCharacterRotate();
    }

    function mainCharacterRotate()
    {
        mainCharacter.animate({transform: 'r360'}, 100, mainCharacterRotate2);
    }

    function mainCharacterRotate2()
    {
        mainCharacter.animate({transform: 'r0'}, 0, mainCharacterRotate);
    }

    function mainCharacterRun()
    {
        mainCharacter.animate({x: 300}, 17000, "elastic", jumpOffGround);
    }
    //endregion

    //region Ending
    function jumpOffGround()
    {
        setTimeout(endingTransition, 1500);
        setTimeout(finalFall, 500);
        mainCharacter.animate({y: 100}, 200, 'ease-in');
    }

    function finalFall()
    {
        mainCharacter.animate({x:5000, y:1000}, 1500);   
        ground.animate({x: -1000}, 100);
    }

    function endingTransition()
    {
        finalTransition.animate({x: 0}, 500, "bounce");
    }
    //endregion


    mainCharacterFall();
}

function stopAnimation()
{
    var playbutton = document.getElementById("playButton");
    playbutton.innerHTML = "▶"; //➤
    playbutton.onclick = runAnimation;

    animationSound.currentTime = 0; //Do this to reset the progress bar
    animationSound.pause();

    generateWindow(); //Reset animation
}

animationSound.ontimeupdate = () =>
{
    let percentThru = animationSound.currentTime/animationSound.duration * 100;
    cssRoot.style.setProperty('--videoProgresPercent', `${percentThru}%`);
}

animationSound.onended = () =>
{
    stopAnimation();
}
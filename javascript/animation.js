const animationWidth = 800;
const animationHeight = 600;

var paper;

var animationSound = new Audio("assets/Brighton.mp3");

window.onload= () =>
{
    generateWindow();
}

window.onresize = () =>
{
    paper.canvas.parentNode.removeChild(paper.canvas);
    generateWindow();
}

function generateWindow()
{
    //220 is the width of the side bar so we use half of that
    paper = new Raphael(((window.innerWidth * 0.5) + 110) - (animationWidth*0.5), (window.innerHeight * 0.5) - (animationHeight*0.5), animationWidth, animationHeight);
    var backGround = paper.rect(0,0,animationWidth, animationHeight); 
    backGround.attr({ fill: "black"});
}

function runAnimation()
{
    var playbutton = document.getElementById("playButton");
    playbutton.innerHTML = "🛇";
    playbutton.onclick = stopAnimation;

    animationSound.currentTime = 0;
    animationSound.play();
}

function stopAnimation()
{
    var playbutton = document.getElementById("playButton");
    playbutton.innerHTML = "▶"; //➤
    playbutton.onclick = runAnimation;

    animationSound.pause();
}
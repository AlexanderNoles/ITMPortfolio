
var cssRoot = document.querySelector(':root');
var onClickNavSound = new Audio("assets/click.wav");

function changeToRed() //Only first function is commented as they all do the same thing
{
    //Set property in current page
    cssRoot.style.setProperty('--primary-color', 'rgba(199, 43, 63, 1)');
    //Save item to localStorage so colour choice can be reapplied when page is changed
    localStorage.setItem('primary', 'rgba(199, 43, 63, 1)');
    onNavClick();
}

function changeToGreen() 
{
    cssRoot.style.setProperty('--primary-color', 'rgba(31, 181, 71, 1)');
    localStorage.setItem('primary', 'rgba(31, 181, 71, 1)');
    onNavClick();
}

function changeToBlue() 
{
    cssRoot.style.setProperty('--primary-color', 'rgba(34, 95, 135, 1)');
    localStorage.setItem('primary', 'rgba(34, 95, 135, 1)');
    onNavClick();
}

window.onload = () =>
{
    cssRoot.style.setProperty('--primary-color', localStorage.getItem('primary'));
};

function onNavClick()
{
    onClickNavSound.currentTime = 0;
    onClickNavSound.play();
}



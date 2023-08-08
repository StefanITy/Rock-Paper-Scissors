let changeOrientation = document.getElementById("changeOrientation");

function checkWindowDimensions() {
    if(window.innerWidth > window.innerHeight){
        changeOrientation.style.display="none";
    } else {
        changeOrientation.style.display="flex";
    }
}

// Check initial dimensions
checkWindowDimensions();

// Update when the window is resized
window.addEventListener('resize', checkWindowDimensions);


let rockButton=document.getElementById("rockButton");
let paperButton=document.getElementById("paperButton");
let scissorsButton=document.getElementById("scissorsButton");
let imageContainerPlayer=document.getElementById("imageContainerPlayer");
let imageContainerAI=document.getElementById("imageContainerAI");
let restartButton=document.getElementById("restartButton");

let score=document.getElementById("score");

let playerScore=0;
let AIScore=0;

let playerMove=0;
let AIMove=0;

rockButton.addEventListener("click", function() {playerMove=1;  playItem("Src/Rock.png");});
paperButton.addEventListener("click", function() {playerMove=2; playItem("Src/Paper.png");});
scissorsButton.addEventListener("click", function() {playerMove=3; playItem("Src/Scissors.png");});
restartButton.addEventListener("click", Restart);





function playItem(src){
    playItemAI();
    imageContainerPlayer.firstElementChild.src="Src/Rock.png";
    imageContainerPlayer.classList.add("playAnimationPlayer");


    setTimeout(function() {
        imageContainerPlayer.firstElementChild.src=src;
        imageContainerPlayer.classList.remove("playAnimationPlayer");
        RoundOver();
    }, 750);
}

function playItemAI(){
    AIMove=Math.floor(Math.random() * 3) + 1;
    imageContainerAI.firstElementChild.src="Src/Rock.png";
    imageContainerAI.classList.add("playAnimationAI");


    setTimeout(function() {
        switch(AIMove){
            case 1:imageContainerAI.firstElementChild.src="Src/Rock.png";
                break;
            case 2:imageContainerAI.firstElementChild.src="Src/Paper.png";
                break;
            case 3:imageContainerAI.firstElementChild.src="Src/Scissors.png";
                break;
        }
        imageContainerAI.classList.remove("playAnimationAI");
    }, 750);

}

let rundsOver=0;
let win=0;

function RoundOver(){
    win=0;
    console.log("Over!"+playerMove+AIMove);
    if(playerMove==AIMove){
        console.log("Tie!");
    }else if(playerMove==1 && AIMove==2){
        console.log("AI Win!");
        AIScore++;
        win--;
    }else if(playerMove==1 && AIMove==3){
        console.log("Player Win!");
        playerScore++;
        win++;
    }else if(playerMove==2 && AIMove==1){
        console.log("Player Win!");
        playerScore++;
        win++;
    }else if(playerMove==2 && AIMove==3){
        console.log("AI Win!");
        AIScore++;
        win--;
    }else if(playerMove==3 && AIMove==1){
        console.log("AI Win!");
        AIScore++;
        win--;
    }else if(playerMove==3 && AIMove==2){
        console.log("Player Win!");
        playerScore++;
        win++;
    }
    score.innerHTML=playerScore.toString()+" - "+AIScore.toString();
    rundsOver++;
    scoreHistoryApend();
}

let scoreHistoryContainer=document.getElementById("scoreHistoryContainer");

let scoreHistoryDiv = document.querySelector('.scoreHistory');
scoreHistoryDiv.style.display="none";

let clonedScoreHistoryDiv;

function scoreHistoryApend(){
    clonedScoreHistoryDiv = scoreHistoryDiv.cloneNode(true);
    scoreHistoryDiv.remove();
    clonedScoreHistoryDiv.style.display="flex";
    scoreHistoryContainer.prepend(clonedScoreHistoryDiv);
    scoreHistoryBlockSetUp()
    
    console.log(scoreHistoryContainer.children.length);
    if(rundsOver>3){
        scoreHistoryContainer.children[0].classList.add("HistoryDownApearClass");
        scoreHistoryContainer.children[1].classList.add("HistoryDownClass");
        scoreHistoryContainer.children[2].classList.add("HistoryDownClass");
        scoreHistoryContainer.children[3].classList.add("HistoryDownRemoveClass");
        setTimeout(function() {
            scoreHistoryContainer.lastElementChild.remove();
            scoreHistoryContainer.children[0].classList.remove("HistoryDownApearClass");
            scoreHistoryContainer.children[1].classList.remove("HistoryDownClass");
            scoreHistoryContainer.children[2].classList.remove("HistoryDownClass");
        }, 490);
        
    }
}



function scoreHistoryBlockSetUp(){
    let scoreHistoryPlayerMove=clonedScoreHistoryDiv.children[0].children[0];
    let scoreHistorAIMove=clonedScoreHistoryDiv.children[0].children[2];
    let scoreHistorWinText=clonedScoreHistoryDiv.children[1].children[0];
    let scoreHistorScoreText=clonedScoreHistoryDiv.children[2].children[0];
    switch(playerMove){
        case 1:scoreHistoryPlayerMove.src="Src/Rock.png";
            break;
        case 2:scoreHistoryPlayerMove.src="Src/Paper.png";
            break;
        case 3:scoreHistoryPlayerMove.src="Src/Scissors.png";
            break;
    }

    switch(AIMove){
        case 1:scoreHistorAIMove.src="Src/Rock.png";
            break;
        case 2:scoreHistorAIMove.src="Src/Paper.png";
            break;
        case 3:scoreHistorAIMove.src="Src/Scissors.png";
            break;
    }


    switch(win){
        case 1: clonedScoreHistoryDiv.style["background-color"]="#98FB98";
                scoreHistorWinText.innerHTML="YOU WIN!";
                scoreHistorScoreText.innerHTML="1 - 0";
            break;
        case -1:clonedScoreHistoryDiv.style["background-color"]="#D9544D";
                scoreHistorWinText.innerHTML="YOU LOSE!";
                scoreHistorScoreText.innerHTML="0 - 1";
            break;
        case 0: clonedScoreHistoryDiv.style["background-color"]="#FDFD96";
                scoreHistorWinText.innerHTML="TIE!";
                scoreHistorScoreText.innerHTML="0 - 0";
        break;
    }
}


function Restart(){
    playerScore=0;
    AIScore=0;
    score.innerHTML=playerScore.toString()+" - "+AIScore.toString();

    imageContainerPlayer.firstElementChild.src="Src/Rock.png";
    imageContainerAI.firstElementChild.src="Src/Rock.png";

    rundsOver=0;
    let child = scoreHistoryContainer.lastElementChild;
        while (child) {
            scoreHistoryContainer.removeChild(child);
            child = scoreHistoryContainer.lastElementChild;
        }
}




function SwitchFullScreen(){
    if (!document.fullscreenElement) { // Check if we are not in fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
        document.getElementById('FullScreenButton').src="Src/WindowScreen.png";
    } else { // We are in fullscreen, let's exit
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        document.getElementById('FullScreenButton').src="Src/FullScreen.png";
    }
}

document.getElementById('FullScreenButton').addEventListener('click',SwitchFullScreen);










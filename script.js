var score = 0;
var timer = 60;
var timerColor = 'black';
var wrapper = document.getElementById('wrapper');
localStorage.highScore = localStorage.score || 0;
document.querySelector('.highest-score-num').innerHTML = localStorage.highScore;

var configList = document.querySelector('.config-list');
var board = document.querySelector('.board');

setInterval(function(){
	timer = timer - 1;
	timerColor = timer <= 10 ? 'red' : 'black';
	document.querySelector('.time-sec').style.color = timerColor;
	document.querySelector('.time-sec').innerHTML = timer;
	timer === 0 && gameRestart(); 
}, 1000);

function gameRestart() {
	localStorage.score = score;
	alert('Time-out! Your Score is '+ score +'.\n Your game will restart!')
	timer = 0;
	score = 0;
	location.reload();
}

boardSize('3x3');

function boardSize(selected){
	generateBoard(selected);
}

function generateBoard(boardSize){
	var boardCells = '';
	var boardPoints = boardSize.split('x');
	var boardView = boardPoints[0] * boardPoints[1];
	console.log(boardView);
	for (var i = 0; i < boardView; i++) {
		boardCells += '<li onclick="capture(this);" class="grey board-cell cell-'+i+'"></li>';
	}
	board.innerHTML = boardCells;
	board.style.width = (document.querySelector('.board-cell').offsetWidth+20) * boardPoints[0] + 'px';
}

setInterval(highlightCell, 1000);

function highlightCell(){
	var cells = configList.value.split('x')[0] * configList.value.split('x')[0];
	var cellNo = Math.floor(Math.random() * cells);
	var cellBoxes = document.querySelectorAll('.board-cell');
	for (var i=0; i<cellBoxes.length; i++) {
	    cellBoxes[i].className = cellBoxes[i].className.replace('green','');
	  }
	document.querySelector('.cell-' + cellNo).classList.add("green");
}

function capture(li){
	if(li.classList.contains('green')){
		score++
	} else {
		score = score === 0 ? 0 : score - 1;
	}
	document.querySelector('.score-num').innerHTML = score;
}

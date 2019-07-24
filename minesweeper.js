var mineField;
var size;
var cellsLeft;
var numBombs;
var flag;
function newGame(){
    size = Number(document.getElementById("textSize").value);
    numBombs= Number(document.getElementById("textBombs").value);
    flag = false;
    //Check that size is a positive number
    if(checkValidGameParams()){
        //size is valid: generate new game
        document.getElementById("textSize").disabled = true;
        document.getElementById("textBombs").disabled = true;
        
        //Generate table of buttons
        createMineField();

        //enable end game button and disable new game button
        document.getElementById("buttonEndGame").disabled = false;
        document.getElementById("buttonNewGame").disabled = true;
    }
    document.getElementById("textSize").select();
}

function checkValidGameParams(){
    if(isNaN(size) || isNaN(numBombs)){
        //Size or number of bombs is not a number
        alert("Size and number of bombs must be numbers!");
        return false;
    }

    if(size <= 0 || numBombs <= 0){
        //Size or number of bombs is 0 or negative
        alert("Size and number of bombs must be greater than zero.");
        return false;
    }

    if(size * size < numBombs){
        //Not enough space for the number of bombs selected
        alert("Not enough space for that many bombs!");
        return false;
    }
    //Game parameters are valid: continue
    return true;
}

//onClick event for buttons on mine field
function clickMine(row, col){
    var buttonClicked = document.getElementById("buttonMine"+(row).toString()+'-'+(col).toString());
    //Check if the flag is set and check for mine if not
    if(flag){
        if(buttonClicked.style.backgroundColor !== "white"){
            if(buttonClicked.dataset.flagged === "true"){
                //Remove background if already flagged
                buttonClicked.style.background = "";
                buttonClicked.dataset.flagged = "false";
            }
            else{
                //Set background of button to flag image
                buttonClicked.style.background = "url(resources/flag.png)";
                buttonClicked.style.backgroundSize = "100%";
                buttonClicked.dataset.flagged = "true";
            }
        }
    }
    else{
        if(buttonClicked.innerHTML !== "F"){
            checkMine(row, col);
        }
    }
}

function checkMine(row, col){
    //
    var strOutput = row.toString() + ', ' + col.toString();
    if(row < 0 || col < 0 || row >= size || col >= size){
        return;
    }
    var btnClicked = document.getElementById("buttonMine"+(row).toString()+'-'+(col).toString());
    if(btnClicked.style.backgroundColor !== ""){
        return;
    }
    //alert(btnClicked);
    if(mineField[row][col] === "X"){
        btnClicked.style.backgroundColor = "red";
        btnClicked.style.background = "url(resources/mine.png";
        btnClicked.style.backgroundSize = "100%";
        //disable all buttons and alert to game over
        gameOver(false);
        return;
    }
    else{
        btnClicked.style.backgroundColor = "white";
        if(mineField[row][col] === 0){
            //Call function to clear all adjacent 0's
            checkMine(row+1, col);
            checkMine(row-1, col);
            checkMine(row, col+1);
            checkMine(row, col-1);
        }
        else{
            btnClicked.innerHTML = mineField[row][col];
        }
    }
    cellsLeft--;
    if(cellsLeft <= numBombs){
        gameOver(true);
    }
}

function gameOver(win){
    for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            disableMine(i,j);
        }
    }
    win ? alert("You Win!!") : alert("Game Over! You lose!");
}

function disableMine(row, col){
    document.getElementById("buttonMine"+(row).toString()+'-'+(col).toString()).disabled = true;
}

function endGame() {
    document.getElementById("textSize").value = "";
    document.getElementById("textSize").disabled = false;
    document.getElementById("textSize").focus();

    document.getElementById("textBombs").value = "";
    document.getElementById("textBombs").disabled = false;


    document.getElementById("tableField").style.display = "none";
    document.getElementById("buttonEndGame").disabled = true;
    document.getElementById("buttonNewGame").disabled = false;
    
    flag = true;
    toggleFlag();
}

function getRandInt(max){
    return Math.floor(Math.random() * max);
}

function createMineField(){
    //Populate table with buttons for minefield
    var strHtml = '';
    for(var i=0; i < size; i++)
    {
        strHtml += '<tr>'
        for(var j=0; j < size; j++)
        {
            strHtml += '<td><button class="button-cell" onClick="clickMine(' 
            + i.toString() + ',' + j.toString() + ')" id="buttonMine' + i.toString() + '-' + j.toString() + '" ></button></td>';
        }
        strHtml += '</tr>'
    }

    //Display playing field
    document.getElementById("tableField").innerHTML = strHtml;
    document.getElementById("tableField").style.display = "";

    //initialize the 2D minefield array and set value to 0
    mineField = new Array(size);
    cellsLeft = size * size;
    for(var i = 0; i < size; i++){
        mineField[i] = new Array(size);
        for(var j = 0; j < size; j++){
            mineField[i][j] = 0;
        }
    }

    //insert mines at random locations
    for (var i = 0; i < numBombs; i++){
        //mineField[getRandInt(size)][getRandInt(size)] = "X";
        insertMine(getRandInt(size), getRandInt(size));
    }
}

function insertMine(row, col){
    if(mineField[row][col] === "X"){
        insertMine(getRandInt(size), getRandInt(size));
    }
    else{
        mineField[row][col] = "X"
        for(var i = row-1; i <= row+1; i++){
            for(var j = col-1; j <= col+1; j++){
                if(i>=0 && j>=0 && i<size && j<size && mineField[i][j]!=="X"){
                    mineField[i][j]++;
                }
            }
        }
    }
}

document.onkeypress = function keyToggleFlag(e){
    if(e.code === "KeyF"){
        toggleFlag();
    }
}

function toggleFlag(){
    //flag ? function(){ flag = false; document.getElementById("buttonFlag").style.backgroundColor = "#FFB6C1";} : function(){flag = true; document.getElementById("buttonFlag").style.backgroundColor = "";};
    if(flag){
        flag = false; 
        document.getElementById("buttonFlag").style.backgroundColor = "";
    }
    else{
        flag = true; 
        document.getElementById("buttonFlag").style.backgroundColor = "#FFB6C1";
    }

}
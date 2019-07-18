var mineField;
var size;
function newGame(){
    size = Number(document.getElementById("textSize").value);
    var numBombs= Number(document.getElementById("textBombs").value);
    //Check that size is a positive number
    if(!isNaN(size) && !isNaN(numBombs)){
        if(size > 0 && numBombs > 0){
            //size is valid: generate new game
            document.getElementById("textSize").disabled = true;
            document.getElementById("textBombs").disabled = true;
            //Generate table of buttons
            var strHtml = '';
            for(var i=0; i < size; i++)
            {
                strHtml += '<tr>'
                for(var j=0; j < size; j++)
                {
                    strHtml += '<td><button class="button-cell" custAttr="uc" onClick="checkMine(' 
                    + i.toString() + ',' + j.toString() + ')" id="buttonMine' + i.toString() + '-' + j.toString() + '" ></button></td>';
                }
                strHtml += '</tr>'
            }
            createMineField(numBombs);

            //Display playing field
            document.getElementById("tableField").innerHTML = strHtml;
            document.getElementById("tableField").style.display = "";

            //enable end game button and disable new game button
            document.getElementById("buttonEndGame").disabled = false;
            document.getElementById("buttonNewGame").disabled = true;
        }
        else{
            alert("Size and number of bombs must be greater than zero.");
            document.getElementById("textSize").select();
        }
    }
    else{
        alert("Size and number of bombs must be numbers!");
        document.getElementById("textSize").select();
    }
}

function checkMine(row, col){
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
    
}

function getRandInt(max){
    return Math.floor(Math.random() * max);
}

function createMineField(numBombs){
    mineField = new Array(size);
    for(var i = 0; i < size; i++){
        mineField[i] = new Array(size);
        for(var j = 0; j < size; j++){
            mineField[i][j] = 0;
        }
    }
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
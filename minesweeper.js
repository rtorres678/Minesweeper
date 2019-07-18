function newGame(){
    var size = Number(document.getElementById("textSize").value);

    //Check that size is a positive number
    if(!isNaN(size)){
        if(size > 0){
            //size is valid: generate new game
            document.getElementById("textSize").disabled = true;
            //Generate table of buttons
            var strHtml = '';
            for(var i=0; i < size; i++)
            {
                strHtml += '<tr>'
                for(var j=0; j < size; j++)
                {
                    strHtml += '<td><button class="button-cell" custAttr="uc" onClick="checkMine(' 
                    + i.toString() + ',' + j.toString() + ', this)" id="buttonMine' + i.toString() + '-' + j.toString() + '" ></button></td>';
                }
                strHtml += '</tr>'
            }
            
            //Display playing field
            document.getElementById("tableField").innerHTML = strHtml;
            document.getElementById("tableField").style.display = "";

            //enable end game button and disable new game button
            document.getElementById("buttonEndGame").disabled = false;
            document.getElementById("buttonNewGame").disabled = true;
        }
        else{
            alert("Size must be greater than zero.");
            document.getElementById("textSize").select();
        }
    }
    else{
        alert("Size must be a number!");
        document.getElementById("textSize").select();
    }
}

function checkMine(row, col, btnClicked){
    var strOutput = row.toString() + ', ' + col.toString();
    //alert(btnClicked);
    
    if(btnClicked.getAttribute("custAttr") !== "red"){
        btnClicked.style.backgroundColor = "red";
        btnClicked.setAttribute("custAttr", "red")
    }
    else{
        btnClicked.style.backgroundColor = "";
        btnClicked.setAttribute("custAttr", "")
    }
}

function endGame() {
    document.getElementById("textSize").value = "";
    document.getElementById("textSize").disabled = false;
    document.getElementById("textSize").focus();


    document.getElementById("tableField").style.display = "none";
    document.getElementById("buttonEndGame").disabled = true;
    document.getElementById("buttonNewGame").disabled = false;
    
}
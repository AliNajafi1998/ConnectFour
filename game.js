var player1 = prompt('Player One: Enter Your Name,you will be blue');
var player1Color = 'rgb(86,151,255)';

var player2 = prompt('Player One: Enter Your Name,you will be red');
var player2Color = 'rgb(237,45,73)';

var game_on = true;
var table = $('table tr');
console.log(table);


function reportWin(rowNum, colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
    console.log(color);

    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}
function getColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
    var colorReport = getColor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        colorReport = getColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }
    }
}


function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(getColor(row, col), getColor(row, col + 1), getColor(row, col + 2), getColor(row, col + 3))) {
                console.log('horiz');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}


function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(getColor(row, col), getColor(row + 1, col), getColor(row + 2, col), getColor(row + 3, col))) {
                console.log('vertical');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (colorMatchCheck(getColor(row, col), getColor(row + 1, col + 1), getColor(row + 2, col + 2), getColor(row + 3, col + 3))) {
                console.log('diag');
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(getColor(row, col), getColor(row - 1, col + 1), getColor(row - 2, col + 2), getColor(row - 3, col + 3))) {
                console.log('diag');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}





//Start With player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text("player1" + " it's your turn, pick a colum to drop in!");


$('.board button').on('click', function () {
    if (game_on === true) {
        var col = $(this).closest("td").index();


        var bottomAvail = checkBottom(col);
        console.log(bottomAvail);
        console.log(col);


        changeColor(bottomAvail, col, currentColor);

        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
            $('h1').text(currentName + ' You have won!');
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
            game_on = false;
        }
        currentPlayer *= -1;
        if (currentPlayer === 1) {
            currentName = player1;
            $('h3').text(currentName + ' it\'s your turn!');
            currentColor = player1Color;
        } else {
            currentName = player2;
            $('h3').text(currentName + ' it\'s your turn!');
            currentColor = player2Color;
        }
    }


});





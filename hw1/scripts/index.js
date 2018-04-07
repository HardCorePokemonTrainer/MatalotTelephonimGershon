// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


var empty_button_coor = [3,3];
var empty_button;
var button_matrix = [];

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        var matrix = createShuffeledArray();
        
        console.log(matrix);
        
        var new_tbody = $("<tbody>");
        var counter = 1;    
        for (var r = 0; r < 4; r++) {
            var new_row = $("<tr>");
            button_matrix[r] = []
            for (var c = 0; c < 4; c++) {
                var new_cell = $("<td>");
                
                var myButton = $('<button>');
                myButton.text(matrix[r][c].toString());
                myButton.attr('tabindex',counter * 100 );
                myButton.css('width', '60px');                        
                myButton.css('height','60px');
                myButton.css('backgroundColor','rgb(' + parseInt(Math.random()*256) +
                ',' + parseInt(Math.random()*256) + 
                ',' + parseInt(Math.random()*256) + 
                ',' + parseInt(Math.random()*256) + ')');	 
    		    
                myButton.click ( function () { myClick(this);});
                myButton.appendTo(new_cell);
                
                if (counter == 16){
                    myButton.hide();
                    empty_button = myButton;
                }
                button_matrix[r][c] = myButton;
	            
                new_cell.appendTo(new_row);
                counter ++;
            }
            new_row.appendTo(new_tbody);
        }
        new_tbody.appendTo($("#myTable"));
        
        console.log(button_matrix);
    };
    
    
    
    
    function createShuffeledArray(){
        var table_rows = 4;
        var table_cols = 4;
        var values = [];
        
        // Create a matrix with the same size as the board with the values 1 to the size of the board in order
        for (var i = 0; i < table_rows; i++){
            values[i] = []
            
            for (var j = 0; j < table_cols; j++){
                values[i][j] = i*table_cols + j + 1
            }
        }
        
        
        // Shuffle
        var row1, col1, row2, col2;
        
        for (var i = 0; i < table_rows*table_cols*table_rows; i++){
            row1 = Math.floor(Math.random()*table_rows)
            col1 = Math.floor(Math.random()*table_cols)
            
            row2 = Math.floor(Math.random()*table_rows)
            col2 = Math.floor(Math.random()*table_cols)
            
            if ((row1+1)*(col1+1) == table_rows*table_cols ||
                (row2+1)*(col2+1) == table_rows*table_cols)
                continue;
    
            var b = values[row1][col1];
            values[row1][col1] = values[row2][col2];
            values[row2][col2] = b;
        }
        
        
        return values  
    } 
    
    
    
    
    function findButtonByText(button_value){
        for (var i = 0; i < 4; i++){        
            for (var j = 0; j < 4; j++){
                console.log(button_matrix[i][j]);
                if (button_matrix[i][j][0].innerHTML == button_value)
                    return [i,j];
            }
        } 
        return null;
    }
    
    
    
    function isNeighbor(coor1, coor2){
        return Math.abs(coor1[0]-coor2[0]) + Math.abs(coor1[1]-coor2[1]) <= 1;
    }
    
    
    
    
    function isGameOver(){
        return button_matrix[0][0][0].innerHTML == '1' && button_matrix[0][1][0].innerHTML == '2';
    }
    
    
    

    function myClick(clickedButton) 
    {        
        var coor = findButtonByText(clickedButton.innerHTML);
        
        if (!isNeighbor(coor, empty_button_coor))
            return;
        
        
        var jqueryButton = button_matrix[coor[0]][coor[1]];
        jqueryButton.hide();
        empty_button.show();
        
        empty_button.css('backgroundColor', jqueryButton.css('backgroundColor'));
        empty_button.text(jqueryButton[0].innerHTML);
        
        empty_button_coor = coor;
        empty_button = jqueryButton;
        
        if (isGameOver()){
            if(confirm('Game Over!\nDo you want to play again?'))
                window.location.reload(true);
            else
                close();
        }
        
    }
    
    
    
    

})();
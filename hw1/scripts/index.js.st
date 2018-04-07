// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


var button_matrix = [];

var corr = [3,3];

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    
    

    function onDeviceReady() {
        var matrix = createShuffeledArray();
        
        for (var i = 0; i < 4; i++){
            button_matrix[i] = []
            for (var j = 0; j < 4; j++){
                var newBtn_1 = $('<button id="btn' + (i*4+j) + '" style="height:60px;width:60px">' + matrix[i][j] + '</button>');
                if (i*4+j+1 == 16)
                    newBtn_1.style.visibility = "hidden";
                
                button_matrix[i][j] = newBtn_1;

                newBtn_1.css("background-color",
                'rgb(' + parseInt(Math.random() * 256) +
                ','  + parseInt(Math.random() * 256) +
                ','  + parseInt(Math.random() * 256) + ')');
                
                newBtn_1.click(onClick);
                newBtn_1.insertBefore('#'+ (i+1));
            }
        }
    };
    
    
    
    function findButtonByText(button_value){
        for (var i = 0; i < 4; i++){        
            for (var j = 0; j < 4; j++){
                if (button_matrix[i][j][0].innerHTML == button_value)
                    return [i,j];
            }
        } 
        return null;
    }

    
    
            
    function isNeighbor(coor1, coor2){
        return Math.abs(coor1[0]-coor2[0]) + Math.abs(coor1[1]-coor2[1]) <= 1;
    }
    
    
    function onClick(e){
        var clciked_button = findButtonByText(e.target.innerHTML);
        
        


        
        var btn = e.target;
        btn.style.left = corr[0]*60 + "px";
        btn.style.top = corr[1]*60 + "px";
        
        console.log(btn);
    }
    
    
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




})();
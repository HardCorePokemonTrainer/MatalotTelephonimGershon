// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	
	var invisiblePlace;
    function onDeviceReady() {
		var buttons = new Array();
		var bText = new Array();
		
		for(var n=1;n<=15;n++)
			bText[n] = 0;
        var counter = 1;    
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
				var flag = 0;
                
                var myButton = $('<button>');
                myButton.text(counter.toString());
                myButton.attr('tabindex',counter * 100 );
                myButton.attr('id',counter);
                myButton.css('width', '60px');                        
                myButton.css('height','60px');
				myButton.css('position' ,'absolute');
                myButton.css('top' ,(r * 60).toString() + 'px');
                myButton.css('left' ,(c * 60).toString() + 'px');

                myButton.css('backgroundColor',get_rand_color());				
                myButton.click ( function () { CurrentStep(this);});
				
				while(flag == 0 && !(r == 3 && c == 3)){
				var n = Math.floor((Math.random() * 15) + 1);
				if(bText[n] == 0){
					bText[n] = 1;
					myButton.text(n.toString());
					flag = 1;
					}
				}
				
				if(r != 3 || c != 3){
					myButton.appendTo($("#myDiv"));
					buttons[counter] = myButton;
					counter ++;
				}
            }
        }
		invisiblePlace = 16;
    };
	
	function GameOver(){
	var flag = true;
            for (var i = 1; i < 16; i++) {
                    if (parseInt($('#' + i).text()) == 1) {
                        if (parseInt($('#' + i).css('left').substr(0, $('#' + i).css('left').length - 2)) != 0 ||
                            parseInt($('#' + i).css('top').substr(0, $('#' + i).css('top').length - 2)) != 0)
                            flag = false;
                    }
                    if (parseInt($('#' + i).text()) == 2) {
                        if (parseInt($('#' + i).css('left').substr(0, $('#' + i).css('left').length - 2)) != 60 ||
                            parseInt($('#' + i).css('top').substr(0, $('#' + i).css('top').length - 2)) != 0)
                            flag = false;
                    }
            }
            if (flag == true) {
                var r = confirm("Game Over! New Game?");
                if (r == true) {
                    window.location.reload();
                }
            }
}

    function CurrentStep(clickedButton) 
    {
		var id = parseInt(clickedButton.id);
            if (id + 1 == invisiblePlace && id % 4 != 0)
                MoveRight(clickedButton);
            else if (id - 1 == invisiblePlace && id % 4 != 1)
                MoveLeft(clickedButton);
            else if (id - 4 == invisiblePlace)
                MoveUp(clickedButton);
            else if (id + 4 == invisiblePlace)
                MoveDown(clickedButton);
    }
	
	function MoveUp(clickedButton) {
            var i = invisiblePlace;
            invisiblePlace = parseInt(clickedButton.id);
			$('#' + clickedButton.id).attr('id',i);
            var le = parseInt(clickedButton.style.top.substr(0, clickedButton.style.top.length - 2)) - 60;
            $(clickedButton).animate({
                top: le + "px"
            }, 400, GameOver);
        }

        function MoveDown(clickedButton) {
            var i = invisiblePlace;
            invisiblePlace = parseInt(clickedButton.id);
            $('#' + clickedButton.id).attr('id',i);
            var le = parseInt(clickedButton.style.top.substr(0, clickedButton.style.top.length - 2)) + 60;
            $(clickedButton).animate({
                top: le + "px"
            }, 400, GameOver);
        }

        function MoveLeft(clickedButton) {
            var i = invisiblePlace;
            invisiblePlace = parseInt(clickedButton.id);
			$('#' + clickedButton.id).attr('id',i);
            var le = parseInt(clickedButton.style.left.substr(0, clickedButton.style.left.length - 2)) - 60;
            $(clickedButton).animate({
                left: le + "px"
            }, 400, GameOver);
        }

        function MoveRight(clickedButton) {
            var i = invisiblePlace;
            invisiblePlace = parseInt(clickedButton.id);
            $('#' + clickedButton.id).attr('id',i);
            var le = parseInt(clickedButton.style.left.substr(0, clickedButton.style.left.length - 2)) + 60;
            $(clickedButton).animate({
                left: le + "px"
            }, 400, GameOver);
        }
	
	function get_rand_color()
	{
		var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
		while(color.length < 6) {
			color = "0" + color;
		}
		return "#" + color;
	}

})();
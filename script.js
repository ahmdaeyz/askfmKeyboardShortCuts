// ==UserScript==
// @name         askfmKeyboardShortCuts
// @namespace    ahmdaeyz
// @version      0.1
// @description  control the site using the keyboard
// @author       ahmdaeyz
// @match        https://ask.fm/account/wall
// @match       https://ask.fm/*
// @icon        https://github.com/ahmdaeyz/askfmKeyboardShortCuts/blob/master/icon.png
// @homepageURL 	https://github.com/ahmdaeyz
// @license         MIT
// @grant GM_addStyle
// @grant GM_deleteValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_setValue
// @noframes
// ==/UserScript==

// stores computed style of the active tab be it WALL or DISCOVER
var style = getComputedStyle(document.querySelector("#topMenu > div.rsp-lte-tablet.rsp-container > section > a"));
// stores the color of the acc in RGB
var colorInRGB = style.borderBottomColor;
//getting rid of "(",")","rgb" and then spliting the string to a 3 elements array.
var colors = (colorInRGB.replace("(","")).replace(")","").replace("rgb","").split(", ");

var rgbToHex = function (rgb) {
  //decimal to hexadecimal conversion
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(rgbArr) {
  //computes the whole hexadecimal number of the color
  var red = rgbToHex(rgbArr[0]);
  var green = rgbToHex(rgbArr[1]);
  var blue = rgbToHex(rgbArr[2]);
  return red+green+blue;
};
//color of the acc in HEX to be used to highlight the active answer.
var colorHEX = fullColorHex(colors);
var cursorAt =0;
var answers= document.getElementsByClassName("streamItem-answer");
document.addEventListener("keypress",function(e){
	if(e.keyCode==50){
        //sets the border of the older answer/non-active to normal.
        answers[cursorAt].style.borderTop="8px solid #f2f2f9";
        if(document.querySelector(".item-page-next")!=null){
            if(cursorAt==answers.length-2){
                document.querySelector(".item-page-next").scrollIntoView();
                answers[cursorAt].scrollIntoView();
                answers= document.getElementsByClassName("streamItem-answer");
            }
        }else{
            document.location.reload();
            cursorAt=0;
        }
        //  press number "2" to navigate to the next answer.
        answers[++cursorAt].scrollIntoView(false);
        //highlight the border of the active/current answer (same color as the user's prefered color).
		answers[cursorAt].style.borderTop="8px solid #"+colorHEX;
	}else if(e.keyCode==51){
        //sets the border of the older answer/non-active to normal.
        answers[cursorAt].style.borderTop="8px solid #f2f2f9";
        if(document.querySelector(".item-page-next")!=null){
            if(cursorAt==answers.length-2){
                document.querySelector(".item-page-next").scrollIntoView();
                answers[cursorAt].scrollIntoView();
                answers= document.getElementsByClassName("streamItem-answer");
            }
        }else{
            document.location.reload();
            cursorAt=0;
        }
        //  press number "3" to navigate to the previous answer.
        answers[--cursorAt].scrollIntoView(false);
        //highlight the border of the active/current answer (same color as the user's prefered color).
		answers[cursorAt].style.borderTop="8px solid #"+colorHEX;
	}else if(e.keyCode==52){
        // press number "4" to like the current answer.
		var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            var done = answers[cursorAt].querySelector(".icon-like").dispatchEvent(event);
	}else if(e.keyCode==53){
        // press number "5" to keep asking the user of the current answer.
		var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            answers[cursorAt].querySelector(".icon-send").dispatchEvent(event);
    }else if(e.keyCode==54){
        //press number "6" to read the whole answer whenever there is a readMore.
        if(answers[cursorAt].querySelector(".readMore")!=null){
            var readmore = answers[cursorAt].querySelector(".readMore").querySelector("a.button");
            var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            readmore.dispatchEvent(event);
        }
    }

});

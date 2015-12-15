/*
* casts a jquery Object collection to an array
*/
var castToArray = function(obj){
	return [].map.call(obj, function(e){return e})
}

/*
* get the array of id = divIdName div cards 
*/
var getArray = function(divIdName){
	return castToArray( grabCards(divIdName) )
}

/*
* not used in the game... created for development
*/
var showPcHandInConsole = function(){
	return [].map.call( grabCards("pc-hand"), function(e){
		return card(e)
	})
}

/*
* shows pc-hand cards when the game is over
*/
var showPcCards = function(time){
	var pcHand = getArray("pc-hand");
	if(pcHand.length !== 0){
		pcHand.forEach(function(elem){
			var x = Number( elem.style.left.replace(/[^0-9,.,-]/g, '') );
			moveByFlip(elem, x, 0, time, true)
		})
    }
}

/*
* return trump suit name like "spades"
*/
var trump = function(){
	var suitChar = $("#trump").html();
	return suitCharToString(suitChar)
}

function makeMyHandSelectable(callback){
    getArray("my-hand").forEach(function(elem){
        $(elem).mouseover(function(){
            $(this).css({'top': popUp()+'em'});
        });
        $(elem).mouseout(function(){
            $(this).css({'top': '0em'});
        });
        $(elem).click(function(){   
            var cardNode = $(this).get(0);
            callback(cardNode);
        });
    });
}


function loop(number, frequancyTime, callback){
	setTimeout(function () {   
      callback();                        
      if (--number) loop(number, frequancyTime, callback);      
    }, frequancyTime)
}

/*
* f.ex. context = document.body where to attache the button
* btnTitle = "end attack"
* btnStyleID = "btn1" or "btn2"
* func = function determining the functionality of button when clicked
*/
function createButton(context,btnTitle,btnStyleID, func){
    var button = document.createElement("button");
    button.className = "myButton"
    button.id = btnStyleID;
    button.onclick = func;
    button.innerHTML = btnTitle;
    context.appendChild(button)
}


//1000 is the time of card move. 600 is the sorting time and 100 extra time
var dealHandTime = function(divHandIDName){
	var deckLength = grabCards("deck").length;
	var handLength = grabCards(divHandIDName).length;
	var number = minHandLength() - handLength;
    if(number <= 0){
    	return 600+100
    }else if(deckLength >= number){
    	return number*1000 + 600 + 100;
    }else{
    	return deckLength*1000 + 600 + 100;
    }
}

var isCardArraySorted = function(trumpSuit, arr){	
	return arr.every(function(card){
	   var i = arr.indexOf(card);
	   if(i === 0){
	   	return true;
	   }else{
	   	return highestCard(trumpSuit, arr[i-1], card) === arr[i-1] ||
	   	       highestCard(trumpSuit, arr[i-1], card).length === 2;
	   }
	})
}

/*
* returns sorted array so that the highest card is on the left
* and the lowest card is on the right
* if array is sorted already it returns the array without sorting it
*/
var sortCardArray = function(trumpSuit, arr){
	if( isCardArraySorted(trumpSuit, arr) ){return arr;}

	if(arr.length <= 1){return arr;}

	//var pivotIndex = Math.round(Math.random()*(arr.length - 1));
	var pivot = arr[0];

	var right = arr.filter(function(card){
		return highestCard(trumpSuit, pivot, card) === pivot;   
	})
	var left = arr.filter(function(card){
		return highestCard(trumpSuit, pivot, card) !== pivot && card !== pivot;   
	})

	left = sortCardArray(trumpSuit,left);
	right = sortCardArray(trumpSuit,right);
	return left.concat([pivot],right);
}

/*
* reorders cardNodes in the parent <div id = "cardsDivIdName"></div>
* so that the highest cardNodes come first in the mentioned div stack
*/
var sortCardNodesOrder = function(trumpSuit, cardsDivIdName){
		//convert grabbed cards to usual javascript array []
	    var arr = getArray(cardsDivIdName);

       	var	arrSorted = sortCardArray(trumpSuit, arr);	    

        $(arrSorted[0]).prependTo("#"+cardsDivIdName);

        for (var i = 1; i < arrSorted.length; i++) {
        	$(arrSorted[i]).insertAfter($(arrSorted[i-1]))
        };
}

/*
* used only in dev. mode to add a card on the table
*/
var pcAddLowestCard = function(time){
	var arr = getArray("pc-hand");
	var hand = sortCardArray(trump(), arr);
	var cardNode = hand[hand.length - 1];
    addToCollect(cardNode, time);
}

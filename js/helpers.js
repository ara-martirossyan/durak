//casts a jquery Object collection to an array
var castToArray = function(obj){
	return [].map.call(obj, function(e){return e})
}

var getArray = function(divIdName){
	return castToArray( grabCards(divIdName) )
}


var showPcHand = function(){
	return [].map.call( grabCards("pc-hand"), function(e){
		return card(e)
	})
}

//f.ex. context = document.body
//btnTitle = "end attack"
//btnStyle = "btn1" or "btn2"
//func = function determining the functionality of button when clicked
function createButton(context,btnTitle,btnStyle, func){
    var button = document.createElement("button");
    button.id = btnStyle;
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

// returns sorted array so that the highest card is on the left
// and the lowest card is on the right
// if array is sorted already it returns the array without sorting it
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

//reorders cardNodes in the parent <div id = "cardsDivIdName"></div>
//so that the highest cardNodes come first in the mentioned div stack
var sortCardNodesOrder = function(trumpSuit, cardsDivIdName){
		//convert grabbed cards to usual javascript array []
	    var arr = getArray(cardsDivIdName);

       	var	arrSorted = sortCardArray(trumpSuit, arr);	    

        $(arrSorted[0]).prependTo("#"+cardsDivIdName);

        for (var i = 1; i < arrSorted.length; i++) {
        	$(arrSorted[i]).insertAfter($(arrSorted[i-1]))
        };
}



var pcAttackLowestCard = function(time){
	var arr = getArray("pc-hand");
	var hand = sortCardArray(trump(), arr);
	var cardNode = hand[hand.length - 1];
    playMove(cardNode, time);
}

var pcAddLowestCard = function(time){
	var arr = getArray("pc-hand");
	var hand = sortCardArray(trump(), arr);
	var cardNode = hand[hand.length - 1];
    addToCollect(cardNode, time);
}

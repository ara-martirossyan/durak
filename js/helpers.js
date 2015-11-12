var showPcHand = function(){
	return [].map.call( grabCards("pc-hand"), function(e){return card(e)})
}



var pcAttackLowestCard = function(time){
	var arr = [].map.call( grabCards("pc-hand"), function(e){return e});
	var hand = sortCardArray(trump(), arr);
	var cardNode = hand[hand.length - 1];
    playMove(cardNode, time);
}



/*


// a recoursive loop that moves numberOfCards from srcDivIdName to handDivIdName
function moveCards (numberOfCards, srcDivIdName, handDivIdName,  prepared) {          
   setTimeout(function () {   
      moveFromSrcToHand(srcDivIdName, handDivIdName,  prepared)                        
      if (--numberOfCards) moveCards(numberOfCards, srcDivIdName, handDivIdName,  prepared);      
   }, 1000)
};

//the distance-scale at wich the cards are 
// separated from each other in the hand
var handScale = function(arrayOfCards){
	if(arrayOfCards.length <= capacityN()){
		return cardWidth();
	}else{
		return cardWidth()*(capacityN() - 1)/(arrayOfCards.length - 1);
	}
}

//time
// srcDivIdName em avelacrel
var moveFromSrcToHand = function(srcDivIdName, handDivIdName,  prepared){
	var srcTopCard = topCardOfStack(srcDivIdName);
	// off is the relative distance of the top card in the source from srcDivIdName in em's
	// already includes em measure
	var offX = Number( srcTopCard.style.left.replace(/[^0-9,.,-]/g, '') ); 
	var offY = Number( srcTopCard.style.top.replace(/[^0-9,.,-]/g, '') );		
	// srcTop and srcLeft are the relative distances of the srcDivIdName from handDivIdName in em's
	var srcTop, srcLeft;

	if(srcDivIdName === "deck"){
	    srcTop = (handDivIdName === "pc-hand"?  deckTopFromPcHand()  : deckTopFromMyHand() )
	    srcLeft = (handDivIdName === "pc-hand"? deckLeftFromPcHand() : deckLeftFromMyHand())
	}else if(srcDivIdName === "table"){
	    srcTop = (handDivIdName === "pc-hand"?  tableTopFromPcHand()  : tableTopFromMyHand() )
	    srcLeft = 0;	
	}

    var scale = handScale(prepared);
    var idx = prepared.indexOf(srcTopCard);
	var card = insert(srcTopCard, prepared, srcDivIdName, handDivIdName)
	.css({top: srcTop + offY + 'em', left: srcLeft + offX + 'em'})
	
	if(handDivIdName === "my-hand"){
		if(srcDivIdName === "deck"){
			moveByFlip(card, idx*scale, 0, 900, true)
		}else if(srcDivIdName === "table"){
			card.animate({left: idx*scale+"em", top: 0+"em"},900,"swing")
		}			
	}else if(handDivIdName === "pc-hand"){
		if(srcDivIdName === "deck"){
			card.animate({left: idx*scale+"em", top: 0+"em"},900,"swing")
		}else if(srcDivIdName === "table"){
			moveByFlip(card, idx*scale, 0, 900, false)
		}		
	}	
}



var insert = function(cardNode, prepared, srcDivIdName, handDivIdName){
	var indexOfCardNode = prepared.indexOf(cardNode)
	var source = [].map.call( grabCards(srcDivIdName) , function(e){return e});
	for (var i = indexOfCardNode; i >= 0; i--) {
		if(source.indexOf(prepared[i]) === -1){
			$(cardNode).insertAfter( $(prepared[i]) )
			break;
		}
		if(i === 0){
			$(cardNode).prependTo("#" + handDivIdName)
		}

	};

	return $(cardNode)
}

//time = 600
// prepares space in the targetDivIdName hand to add number of cards into the hand
var prepare = function(number,sourceDivIdName,targetDivIdName,trumpSuit,time){
   var srcCardNum = grabCards(sourceDivIdName).length
   if(number <= srcCardNum){
   	    var cardsToBeAdded = grabCards(sourceDivIdName).slice(srcCardNum-number);
   		var target  = grabCards(targetDivIdName).add( cardsToBeAdded );
   		//convert target to usual javascript array []
   		var target = [].map.call( target, function(e){return e});
   		var targetSorted = sortCardArray(trumpSuit, target);
   		var scale = handScale(targetSorted);

        sortCardNodesOrder(trumpSuit, targetDivIdName);

	    grabCards(targetDivIdName).each(function(idx,card){	
	    	$(card).animate(
	    		{left: targetSorted.indexOf(card)*scale+"em", top: 0+"em"},
	    		{
	    			duration: time,
	    			queue: false,
	    		}
	        );
	    })
	    return targetSorted;
   }
}


// verjum anpayman kjnjes ay tgha
// test functionality on interface 
var toBeDeletedUselessFunction = function(handInputId){
	var num = document.getElementById(handInputId).value
	var suit = $('input[type=radio]:checked').val();
	var prepared = prepare(num, "deck", handInputId+"-hand", suit, 600)
	moveCards(num, "deck", handInputId+"-hand", prepared);
}

*/

/*
var cardNode = grabCards("pc-hand")[0]
playMove(cardNode, 600)

var num = grabCards("table").length
takeCards(num, 600, 3000)
*/
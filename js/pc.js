
var pcTurn = function(time){
	var status = statusOfGame();
	var attackingCards, defendingCards, cardNode;
	if(isGameOver()){

	}else if(status === "attack" && getValidCardsToAttack("pc-hand").length !== 0){
		attackingCards = getValidCardsToAttack("pc-hand") ;
		cardNode = attackingCards[ attackingCards.length - 1 ];
		playMove(cardNode,time);

		
		setTimeout(myTurn, time + 200);
		

	}else if(status === "defend" && getValidCardsToDefend("pc-hand").length !== 0){
		defendingCards = getValidCardsToDefend("pc-hand") ;
		cardNode = defendingCards[ defendingCards.length - 1 ];
		playMove(cardNode,time);

		
		setTimeout(myTurn, time + 200);
		
		
	}else if(status === "attack"){//no valid cards to attack
		discard(time);
		setTimeout(function(){
			dealHandsStartingFrom("pc-hand");
			setTimeout(myTurn, dealHandTime("pc-hand") + dealHandTime("my-hand") + 200)
		}, time );
	}else if(status === "defend"){//no valid cards to defend
		pcCollect(time); // involves myTurn recursive call
	}
}


var pcCollect = function(time){
	var maxNumberOfAllowedCardsToAccept = grabCards("pc-hand").length - 1;
	var checkNumber = grabCards("table").length + maxNumberOfAllowedCardsToAccept ;
	if(grabCards("table").length < checkNumber){
		promptMessage( "I accept the cards. You can add additional cards" )
		addCardsForPcToCollect(checkNumber, time); // involves myTurn recursive call
	}else{
		changeTurnAfterPcAccept(time); // involves myTurn recursive call
	}
}

/*
* accepts cards to pc-hand then deal hands and change to myTurn
*/
var changeTurnAfterPcAccept = function(time){ //+
	promptMessage("");
	disableTurn();
	acceptCardsToPcHand(time);
	setTimeout(function () {
		dealHandsStartingFrom("my-hand");
		setTimeout(myTurn, dealHandTime("pc-hand") + dealHandTime("my-hand") + 200);
	}, time + 300)
}

// checkNumber is the max allowed # of cards on the table to be accepted 
// into the pc-hand
// checkNumber = grabCards("table").length + maxNumberOfAllowedCardsToAccept
// defined at the time of declaration about collecting the cards
var addCardsForPcToCollect = function(checkNumber, time){
	createButton( document.body , "finish adding", "btn1", function(){
		changeTurnAfterPcAccept(time);			
	})
	makeMyHandSelectable(function(cardNode){
 	   validateCardAndAddForCollection(checkNumber,cardNode,time);
	});
}

var validateCardAndAddForCollection = function(checkNumber, cardNode, time){
	if( isValidCardToAttack(cardNode) && grabCards("table").length < checkNumber  ){
		promptMessage("");
		disableTurn();
		addToCollect(cardNode,time);
		setTimeout(function(){
			addCardsForPcToCollect(checkNumber, time);
		},time)
	}else if( !isValidCardToAttack(cardNode) && grabCards("table").length < checkNumber){
		promptMessage( "There are no " + rankWithWordsInPlural(cardNode) + " on the table, choose a valid card or finish adding");
	}else if(grabCards("table").length >= checkNumber){
		promptMessage( "There is no more place to accept, press finish adding");
	}
}
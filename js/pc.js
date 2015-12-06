var pcTurn = function(time){
	var status = statusOfGame();
	var attackingCards, defendingCards, cardNode;	
	if(status === "attack" && getValidCardsToAttack("pc-hand").length !== 0){
		attackingCards = getValidCardsToAttack("pc-hand") ;
		cardNode = attackingCards[ attackingCards.length - 1 ];
		playMove(cardNode,time);
	}else if(status === "defend" && getValidCardsToDefend("pc-hand").length !== 0){
		defendingCards = getValidCardsToDefend("pc-hand") ;
		cardNode = defendingCards[ defendingCards.length - 1 ];
		playMove(cardNode,time);
	}else if(status === "attack"){//no valid cards to attack
		discard(time);
	}else if(status === "defend"){//no valid cards to defend
		promptMessage( "I accept the cards. You can add additional cards" )
		addCardsForPcToCollect(time);
	}
}


var addCardsForPcToCollect = function(time){
	createButton( document.body , "finish adding", "btn1", function(){
			promptMessage("");
			acceptCardsToPcHand(time);
			disableTurn();
	})

	getArray("my-hand").forEach(function(elem){
		$(elem).mouseover(function(){
			$(this).css({'top': popUp()+'em'});
		});
		$(elem).mouseout(function(){
			$(this).css({'top': '0em'});
		});
		$(elem).click(function(){   
		    var cardNode = $(this).get(0);
            validateCardAndAddForCollection(cardNode,time);
	    });
	})
}

var validateCardAndAddForCollection = function(cardNode, time){
	if( isValidCardToAttack(cardNode) ){
		promptMessage("");
		disableTurn();
		addToCollect(cardNode,time);
		setTimeout(function(){
			addCardsForPcToCollect(time);
		},time)
	}else{
		promptMessage( "There are no " + rankWithWordsInPlural(cardNode) + " on the table, choose a valid card or finish adding");
	}
}


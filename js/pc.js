var pcTurn = function(time){
	var status = statusOfGame();
	var attackingCards;	
	var defendingCards;

	var cardNode;
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
		acceptCardsToPcHand(time);
	}
}
//make my hand selectable
// i.e. when hovered on the card pop up
//and when clicked move the card onto the table
// and at last disable the selectable mode
var myTurn = function(){
	
	makeMyHandSelectable(function(cardNode){
 	   play(cardNode, 600);
	});

	if( statusOfGame() === "attack" && grabCards("table").length !== 0 ){
		createButton( document.body , "end attack", "btn1", function(){
			promptMessage("");
			discard(1000);
			disableTurn();
		})
	}else if( statusOfGame() === "defend"){
		createButton( document.body , "accept cards", "btn1", function(){
			promptMessage("");
			acceptCardsToMyHand(1000);
			disableTurn();
		})
	}	
}

var disableTurn = function(){
	getArray("my-hand").forEach(function(elem){
		$(elem).unbind('mouseover mouseout click');
	})

	$("#btn1").remove();
	$("#btn2").remove();
}

var statusOfGame = function(){
	var status = "attack";
	if( grabCards("table").length % 2 ){
		status = "defend";
	}
	return status;
}

//returns true if cardNode is a valid card to attack
//and false otherwise
var isValidCardToAttack = function(cardNode){
   if( grabCards("table").length === 0 ){
   	return true;
   }
   var tableRanks = getArray("table").map(function(card){
   	 return rank(card);
   });
   if(tableRanks.indexOf( rank(cardNode) ) > -1){
   	return true;
   }else{
   	return false;
   }
}

//returns true if cardNode is a valid card to defend
//and false otherwise
var isValidCardToDefend = function(cardNode){
   var attackingCard = topCardOfStack("table");
   var trumpSuit = trump();
   var ranksIndexOfCardNode = ranks.indexOf( rank(cardNode) );
   var ranksIndexOfAttackingCard = ranks.indexOf( rank(attackingCard) );

   if( suit(cardNode) === suit(attackingCard) && ranksIndexOfCardNode > ranksIndexOfAttackingCard ){
   	 return true;
   }else if( suit(attackingCard) !== trumpSuit && suit(cardNode) === trumpSuit ){
   	 return true;
   }else{
   	 return false;
   }
}

//returns an array of valid cards in the hand to attack 
var getValidCardsToAttack = function(handDivIdName){
	var hand = getArray(handDivIdName);
	var valid = sortCardArray(trump(), hand).filter(function(card){
		return isValidCardToAttack(card);
	})
	return valid;
}

//returns an array of valid cards in the hand to defend
var getValidCardsToDefend = function(handDivIdName){
	var hand = getArray(handDivIdName);
	var valid = sortCardArray(trump(), hand).filter(function(card){
		return isValidCardToDefend(card);
	})
	return valid;
}


var play = function(cardNode, time){
	var status = statusOfGame();
	if( (status === "attack" && isValidCardToAttack(cardNode)) ||  (status === "defend" && isValidCardToDefend(cardNode)) ){
		promptMessage("");
		playMove(cardNode,time);
	    disableTurn();
	}else if(status === "attack"){
		promptMessage( "There are no " + rankWithWordsInPlural(cardNode) + " on the table, choose a valid card or finish the attack");
	}else if(status === "defend"){
		var attackingCard = topCardOfStack("table");
		promptMessage( "The " + rankWord(cardNode) + " of " + suit(cardNode) + " does not beat the " + rankWord(attackingCard) + " of " + suit(attackingCard) );
	}

}
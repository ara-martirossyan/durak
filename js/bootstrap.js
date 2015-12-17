
$(window).bind("load", function() { 
   deckInit(); 
   shuffleDeck();
});

/*
* deals 12 cards from the top of the deck 
* successively one to each hand starting from my-hand
* then creates trump card from the top of the deck
* by flipping(X-axis) and rotating(Z-axis) into the bottom of deck
* and sorting my-hand according to trump card
* after what the furstTurn() function bootstraps the game
*/
var startGame = function( initDealLoopTime, flipTime, rotateTime, sortTime ){
	$("#message").empty();
	firstDealOfBothHands(12, initDealLoopTime, initDealLoopTime - 100);
	setTimeout(function(){
    createTrumpCard( flipTime, rotateTime, sortTime );
		setTimeout( firstTurn, flipTime + rotateTime + sortTime )
	}, (12 + 1)*initDealLoopTime+300 );
}


var isGameOver = function(){
  var deck = grabCards("deck").length;
  var myHand = grabCards("my-hand").length;
  var pcHand = grabCards("pc-hand").length;
  if( deck === 0 && pcHand === 0 && myHand > 1 ){
    promptMessage("Hey Durak, you have lost, wise up now and pay the cost!");
    return true;
  }else if( deck === 0 && myHand === 0 && pcHand > 1 ){
    promptMessage("You won!");
    return true;
  }else if( deck === 0 && myHand === 0 && pcHand === 0){
    promptMessage("It's a draw!");
    return true;
  }else if( deck === 0 && myHand === 0 && pcHand === 1 && !isValidCardToDefend(grabCards("pc-hand")[0]) ){
    promptMessage("You won!");
    return true;
  }else if( deck === 0 && myHand === 1 && pcHand === 0 && !isValidCardToDefend(grabCards("my-hand")[0])){
    promptMessage("Hey Durak, you have lost, wise up now and pay the cost!");
    return true;
  }else{
    return false;
  }
}
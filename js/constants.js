// constant "em" scale at which
// the cards are separated from each other
// to give a feeling of width for the deck
var deckScale = function(){
	return 0.01;
}

//minimium number of cards allowed 
//in the hand of the game DURAK 
var minHandLength = function(){
	return 6;
}

//the number of cards that 
//the hand container can hold 
//without having cards overlapped
var capacityN = function(){
	return 9;
};
//the width of single card in "em"s	
var cardWidth = function(){
	return 4;
};

var deckLeftFromPcHand = function(){
	return -7.8;
}

var deckTopFromPcHand = function(){
	return 9;
}

var deckLeftFromMyHand = function(){
	return -7.8;
}

var deckTopFromMyHand = function(){
	return -9;
}

//returns the top em value when card in my-hand selected
var popUp = function(){
	return -1;
}

///////////////////////////////////////////////
// SCALE DEFINITION FOR THE HAND             //
///////////////////////////////////////////////
// cardWidth --> the width of single card
// capacityN --> the number of cards that 
//               the container can hold 
//               without having cards overlapped

// containerLength = capacityN * cardWidth

// the configuration of cards in the container
// must be such that if the number of cards
// in the container is less or equal to capacityN
// then the distance-scale at wich the cards are 
// separated from each other is cardWidth
// otherwise the scale is 

// (containerLength - cardWidth)/(handLength-1)

// if(handLength <= capacityN){
// 	scale = cardWidth;
// }else{
// 	scale = cardWidth*(capacityN - 1)/(handLength-1)
// }

//the distance-scale at wich the cards are 
// separated from each other in the hand
var handScale = function(arrayOfCards){
	if(arrayOfCards.length <= capacityN()){
		return cardWidth();
	}else{
		return cardWidth()*(capacityN() - 1)/(arrayOfCards.length - 1);
	}
}

////////////////////////////////////////////////////////
//                TABLE PARAMETERS                    //
////////////////////////////////////////////////////////

//the number of cards that 
//the table container can hold 
//without having card-pairs overlapped
var tableCapacity = function(){
	return 16;//8 pairs
}


var pairOffSetX = function(){
	return 0.5;
}

var pairOffSetY = function(){
	return 1.5;
}

var pairWidth = function(){
    return cardWidth() + pairOffSetX();
}

var tableScale = function(n){
 if (n <= tableCapacity() ){ 
 	return pairWidth() 
 } else{
 	return pairWidth()*(tableCapacity() - 1)/(n - 1);
 };
}

var tableTopFromPcHand = function(){
	return 8.4;
}

var tableTopFromMyHand = function(){
	return -9.6;
}

////////////////////////////////////////////////////////
//                DISCARD PARAMETERS                  //
////////////////////////////////////////////////////////

var tableLeftFromDiscard = function(){
	return -40.2;
}

var tableTopFromDiscard = function(){
	return -0.6;
}
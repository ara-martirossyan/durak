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

// returns the [left,top] coordinates 
// of the i'th card in ems
// in the table container
// containing n total number of cards 
var coord = function(n,i){
	var x,y;
	if(i%2 === 0){
		x = i/2 * tableScale(n);
		y = 0;
	}else if(i%2 === 1){
		x = (i-1)/2 * tableScale(n) + pairOffSetX();
		y = pairOffSetY();
	}
	return [x,y]
}

//time
var makeSpaceOnTable = function(){
	var number = grabCards("table").length;	
	if(number >= tableCapacity() ){// && number%2 === 0
		var table = [].map.call(grabCards("table"), function(e){return e});
		grabCards("table").each(function(idx,card){	
			$(card).animate(
				{ 
				  left: coord(number+1,table.indexOf(card))[0]+"em", 
				   top: coord(number+1,table.indexOf(card))[1]+"em"
				},
				{
					duration: 600,
					queue: false,
				}
			);
		})
	}
}

//returns the hand name of the cardNode as a string("pc-hand", "my-hand" )
//if there is no cardNode in any of hands it throws an error 
var handOfCard = function(cardNode){
	var idxPC = [].map.call(grabCards("pc-hand"),function(e){return e}).indexOf(cardNode);
	var idxMY = [].map.call(grabCards("my-hand"),function(e){return e}).indexOf(cardNode);
	if(idxPC > -1 ){
		return "pc-hand";
	}else if(idxMY > -1){
		return "my-hand";
	}else{
		throw "handOfCard: the card does not exist in any of hands";
	}
}

//move cards on the right side of cardNode to the left according to new handScale
//after removing cardNode from hand (when playing cardNode)
var squeezHandAfterTurn = function(cardNode,time){
	var handName  =  handOfCard(cardNode);
	var handArray = [].map.call( grabCards(handName), function(e){return e});
	var index = handArray.indexOf(cardNode);
	handArray.splice(index,1);
	var scale = handScale(handArray);
	handArray.forEach(function(card){	
		$(card).animate(
			{left: handArray.indexOf(card)*scale+"em", top: 0+"em"},
			{
				duration: time,
				queue: false,
			}
			);
	})
}

//make a card play on the table and squeez the hand from which the card is played
//where x and y are  absolute coord  of table in ems
var moveAndAttacheToTable = function(cardNode,x,y,time){
   var handName = handOfCard(cardNode);
   var movedCard;
   if(handName === "pc-hand"){
   	movedCard = moveByFlip(cardNode,x,y+tableTopFromPcHand(),time, true);   	
   }else if(handName === "my-hand"){
   	movedCard = $(cardNode).animate({
   		left: x + "em", 
   		top: y + tableTopFromMyHand() + "em"
   	},time,"swing")
   	
   }else{
   	throw "moveAndAttacheToTable: the card does not exist in any of hands";
   }
    //move cards on the right side of cardNode to the left according to new handScale
   	squeezHandAfterTurn(cardNode,time);
   	movedCard.queue(function(){
   		$(this).appendTo("#table").css({ left: x+"em", top: y+"em"});
   	})
}


var playMove = function(cardNode,time){
	makeSpaceOnTable();
	var number = grabCards("table").length + 1;
	moveAndAttacheToTable(cardNode,coord(number,number-1)[0],coord(number,number-1)[1],time)
}

//returns true if cardNode is a valid card to attack
//and false otherwise
var isValidCardToAttack = function(cardNode){
   if( grabCards("table").length === 0 ){
   	return true;
   }
   var tableRanks = [].map.call( grabCards("table") , function(e){return rank(e)} )
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
	var hand = [].map.call( grabCards(handDivIdName), function(e){return e});
	var valid = hand.filter(function(card){
		return isValidCardToAttack(card);
	})
}

//returns an array of valid cards in the hand to defend
var getValidCardsToDefend = function(handDivIdName){
	var hand = [].map.call( grabCards(handDivIdName), function(e){return e});
	var valid = hand.filter(function(card){
		return isValidCardToDefend(card);
	})
}






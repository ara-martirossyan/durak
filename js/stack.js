//Creates the deck in a sorted order like
//(6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,
//10,10,10,10,J,J,J,J,D,D,D,D,K,K,K,K,A,A,A,A)
//and put them in the board
var deckInit = function () {
	for (var r = 0; r < ranks.length; r++) {
		for (var s = 0; s < suits.length; s++) {
			var card = new Card(ranks[r], suits[s]);
			var cardNode = card.put("deck", -(4*r+s)*deckScale(), -(4*r+s)*deckScale(), "down")
		};
	};
};

//removes the entire stack from the <div id = "divIDName"></div>
// and returns it as an array
var pickStack = function(divIDName){
	var grabbedStack = document.getElementById(divIDName).getElementsByClassName("card");
	var size = grabbedStack.length;
	var stack = [];
	for (var i = 0; i < size; i++) {
		var card = pickUp(grabbedStack[0]);		
		stack.push(card);
	};
	return stack;
}

// fisher-yates shuffle
// picks up the deck from the board
// shuffles it and puts it down again
var shuffleDeck = function () {
	//pick up the entire deck
	var deck = pickStack("deck");
	//shuffle
	for (var i = deck.length - 1; i >= 0; i--) {
		var j = Math.round(Math.random()*i);
		var temp = deck[i];
		    deck[i] = deck[j];
		    deck[j] = temp;
	};
	//put it down again
	for (var i = 0; i < deck.length; i++) {
	 	putDown(deck[i], "deck", -i*deckScale(), -i*deckScale(), "down")
	 }; 
	return deck;
};

// returns the top card on the stack
// indicated by <div id = "divIDName"></div>
// if no cards are left returns null
var topCardOfStack = function(divIDName){
	var lastIndex = grabCards(divIDName).length - 1 ;
	if(lastIndex > -1){
		var top = grabCards(divIDName)[lastIndex];
		return top;
	}else{
		return null;
	}		
}




// deal the hand <div id = "divHandIDName"></div>
// from the deck
var dealHand = function(divHandIDName){
	if(divHandIDName !== "pc-hand" && divHandIDName !== "my-hand"){
		throw "dealHand: " + divHandIDName + " does not match neither with pc-hand nor with my-hand";
	}
	var handLength = grabCards(divHandIDName).length;
	var prepared;
	if(handLength < minHandLength()){
		var numberOfCards = minHandLength() - handLength;
		var deckLength = grabCards("deck").length;
		if(numberOfCards >= deckLength){
			numberOfCards = deckLength;
		}
		if(divHandIDName === "pc-hand"){
			moveCards(numberOfCards, divHandIDName,  pcHandMakeSpaceToAccept(600, numberOfCards) ); 
		}else{
			prepared = prepare(numberOfCards, "deck", "my-hand", trump(), 600)	
			moveCards(numberOfCards, divHandIDName,  prepared);		
		}
	}
}

var dealHandsStartingFrom = function(divHandIDName){
  var time = dealHandTime(divHandIDName);
  var nextHand;
  if(divHandIDName === "pc-hand"){
  	nextHand = "my-hand"
  }else{
  	nextHand = "pc-hand"
  }
  dealHand(divHandIDName);
  setTimeout(function(){
  	dealHand(nextHand);
  },time)
}



var moveByFlip = function(cardNode,x,y,time, showOrHide){
	var angle, visibility;
	if(showOrHide){
		angle = "180";
		vsblt = "visible"
	}else{
	    angle = "0";
		vsblt = "hidden"
	}
	$(cardNode).animate(
		{left: x+"em", top: y+"em",   rotation: angle},
		{
			duration: time,
			step: function(now,fx) {
				$(this).css({"transform": "rotateX("+now+"deg)"});
			}

		}
		,"linear")
	setTimeout(function () {   
      $(cardNode).find("div").css({visibility: vsblt})     
    }, time/2)
    return 	$(cardNode);
}



//time

// a recoursive loop that moves numberOfCards from deck to handDivIdName
function moveCards (numberOfCards, handDivIdName,  prepared) {          
   setTimeout(function () {   
      moveFromDeckTo(handDivIdName,  prepared)                        
      if (--numberOfCards) moveCards(numberOfCards, handDivIdName,  prepared);      
   }, 1000)
};



//time
var moveFromDeckTo = function(handDivIdName,  prepared){
	var deckTopCard = topCardOfStack("deck");
	//take care of the bottom trump card
	if(grabCards("deck").length === 1){
		grabCards("deck").unwrap().appendTo("#deck").css({left: "0em", top: "0em" }).dequeue();
	}

	// off is the relative distance of the top card in the deck from deck div in em's
	var off = Number( deckTopCard.style.left.replace(/[^0-9,.,-]/g, '') );
	// deckTop and deckLeft are the relative distances of the deck from handDivIdName in em's
	var deckTop = (handDivIdName === "pc-hand"? deckTopFromPcHand() : deckTopFromMyHand())
	var deckLeft = (handDivIdName === "pc-hand"? deckLeftFromPcHand() : deckLeftFromMyHand())
    var scale = handScale(prepared);
    var idx = prepared.indexOf(deckTopCard);
	var card = insert(deckTopCard, prepared, "deck", handDivIdName)
	.css({top: deckTop + off + 'em', left: deckLeft + off + 'em'})	

	if(grabCards("deck").length === 0 && handDivIdName === "pc-hand"){
		moveByFlip(card, idx*scale, 0, 900, false)
	}else if(grabCards("deck").length === 0 && handDivIdName === "my-hand"){
		card.animate({left: idx*scale+"em", top: 0+"em"},900,"swing")
	}else if( handDivIdName === "my-hand" ){
		moveByFlip(card, idx*scale, 0, 900, true)
	}else if( handDivIdName === "pc-hand" ){
		card.animate({left: idx*scale+"em", top: 0+"em"},900,"swing")
	}
	
}

var insert = function(cardNode, prepared, srcDivIdName, handDivIdName){
	var indexOfCardNode = prepared.indexOf(cardNode)
	var source = getArray(srcDivIdName);
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
	var srcCardNum = grabCards(sourceDivIdName).length;
	var cardsToBeAdded;
	if(number <= srcCardNum){
		cardsToBeAdded = grabCards(sourceDivIdName).slice(srcCardNum-number);
	}else{
   		//when number argument is bigger than the number of cards in sourceDivIdName
   		cardsToBeAdded = grabCards(sourceDivIdName);
   	}
   	var target  = grabCards(targetDivIdName).add( cardsToBeAdded );
   	//convert target to usual javascript array []
   	var target = castToArray(target);
   	var targetSorted = sortCardArray(trumpSuit, target);
   	var scale = handScale(targetSorted);

   	sortCardNodesOrder(trumpSuit, targetDivIdName);

   	getArray(targetDivIdName).forEach(function(card){	
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


// verjum anpayman kjnjes ay tgha
// test functionality on interface 
var toBeDeletedUselessFunction = function(handInputId){
	var num = document.getElementById(handInputId).value
	var suit = $('input[type=radio]:checked').val();
	var prepared = prepare(num, "deck", handInputId+"-hand", suit, 600)
	moveCards(num,handInputId+"-hand", prepared);
}


////////////////////////////////////////////////////////////////////////////
//                            START GAME                                  //
////////////////////////////////////////////////////////////////////////////
//time = 900
var initDealMove = function(){

	//var cardsArr = castToArray( grabCards("deck").slice(36-12) );
	var cardsArr = getArray("deck").slice(36-12) ;
	var pc = cardsArr.filter(function(e){ return cardsArr.indexOf(e)%2 === 0});
	var my = cardsArr.filter(function(e){ return cardsArr.indexOf(e)%2 === 1});

	var handDivIdName;
	var topCard = topCardOfStack("deck");

	if( pc.indexOf(topCard) === -1 ){
		handDivIdName = "my-hand";
	}else if(my.indexOf(topCard) === -1 ){
		handDivIdName = "pc-hand";
	}
	var deckTop = (handDivIdName === "pc-hand"? deckTopFromPcHand() : deckTopFromMyHand())
	var deckLeft = (handDivIdName === "pc-hand"? deckLeftFromPcHand() : deckLeftFromMyHand())
	var card = $(topCard).prependTo("#"+handDivIdName)
	.css({top: deckTop - grabCards("deck").length*deckScale() + 'em', 
		left: deckLeft - grabCards("deck").length*deckScale() + 'em'})

	if(handDivIdName === "my-hand"){
		var idx = my.indexOf(topCard)
		moveByFlip(topCard, idx*cardWidth(), 0, 100, true)//900!
	}else if(handDivIdName === "pc-hand"){
		var idx = pc.indexOf(topCard)
		card.animate({left: idx*cardWidth()+"em", top: 0+"em"},100,"swing")//900!
	}
}


//time
function firstDealOfBothHands(numberOfCards) {          
   setTimeout(function () {   
      initDealMove();                        
      if (--numberOfCards) {
      	firstDealOfBothHands(numberOfCards);    
      }
   }, 100)// mi hat el 0 avelacra sarqi 1000!
};

//return trump suit name like "spades"
var trump = function(){
	var suitChar = $("#trump").html();
	return suitCharToString(suitChar)
}


var sortMyHand =  function(time){
	prepare(0, "deck", "my-hand", trump(), time);
}

var createTrumpDiv = function(){
	var trumpDiv = document.createElement("H1");
	var subTrump = document.createElement("STRONG");
	subTrump.id = "trump";
	trumpDiv.left = "13em";
	trumpDiv.top = "50em"
	var cardNode = document.getElementById("bottom").firstChild;
	var suitChar = card(cardNode)[1];
	var suitName = suit(cardNode);
	if(suitName === "diamonds" || suitName === "hearts"){
		subTrump.className = "red"
	}
	$(subTrump).append(suitChar);
	$(trumpDiv).append("Trump suit: " + $(subTrump).prop('outerHTML'));
	$(trumpDiv).appendTo("body")	
}

//rotTime = 1000 sortTime = 600
var insertTopCardIntoBottomOfDeckByRotatingAndThenSortMyHand = function(rotTime, sortTime){
	bottomCard = document.createElement("DIV");
	bottomCard.id = "bottom";
	$(bottomCard).prependTo("#deck")
	$(topCardOfStack("deck")).prependTo(bottomCard);
	$("#deck #bottom")
	.animate(
		{rotation: "90"},
		{
			duration: rotTime,
			step: function(now,fx) {
				$(this).css({"transform": "rotateZ("+now+"deg)",
					"transform-origin": "8em -1em"});
			}

		}
		,"linear").queue(function(){
			createTrumpDiv();
			sortMyHand(sortTime);
		});
	
}

var lowestTrumpCard = function(divHandIDName){
	var sortedArrayOfTrumpCards = sortCardArray(
		trump(),
		getArray(divHandIDName).filter(function(card){
		   return suit(card) === trump();
	    })
	);
	if(sortedArrayOfTrumpCards.length === 0){
		return null;
	}else{
		return sortedArrayOfTrumpCards[sortedArrayOfTrumpCards.length - 1];
	}
}


var promptMessage = function(messageString){
  $("#message").html(messageString)
}

//shows the message for time msec
var keepMessage = function(messageString, time){
	$("#message").html(messageString)
	setTimeout(function(){
		$("#message").empty();
	}, time)
}
//time
var showLowestTrumpCard = function(cardNode, showTime){
	promptMessage("I have the lowest trump card");
	//show card
	moveByFlip(cardNode, $(cardNode).css("left"), 5, showTime/3, true);
	setTimeout(function(){
		//hide card
		moveByFlip(cardNode, $(cardNode).css("left"), 0, showTime/3, false); 
		$("#message").empty();
	},showTime);
}

//make my hand selectable
// i.e. when hovered on the card pop up
//and when clicked move the card onto the table
// and at last disable the selectable mode
var myTurn = function(){
	getArray("my-hand").forEach(function(elem){
		$(elem).mouseover(function(){
			$(this).css({'top': popUp()+'em'});
		});
		$(elem).mouseout(function(){
			$(this).css({'top': '0em'});
		});
		$(elem).click(function(){   
		    var cardNode = $(this).get(0);
		    playMove(cardNode,600);
		    disableTurn();
	    });
	})
}

var disableTurn = function(){
	getArray("my-hand").forEach(function(elem){
		$(elem).unbind('mouseover mouseout click');
	})
}



var firstTurn = function(){
	var trumpSuit = trump();
	var my = lowestTrumpCard("my-hand");
	var pc = lowestTrumpCard("pc-hand");
	if(my === null && pc === null){
		promptMessage("Parzvum a voch mek kozr chuni");
	}else if( my === null ){
		showLowestTrumpCard(pc, 3000);
	}else if( pc === null ){
		keepMessage("You have the lowest trump card. You attack!", 2000);
	}else if( highestCard(trumpSuit,pc,my) === my ){
		showLowestTrumpCard(pc, 3000);
	}else if( highestCard(trumpSuit,pc,my) === pc ){
		keepMessage("You have the lowest trump card. You attack!", 2000);
	}
}

//flips the top card (trump) of the deck to its side
//rotates 90 degree to the bottom of the deck
//and then sorts my hand w.r.t bottom trump card 
var createTrumpCard = function(flipTime, rotTime, sortTime){
	moveByFlip(topCardOfStack("deck"), 6, -1, flipTime, true)
	.queue(function(){
		insertTopCardIntoBottomOfDeckByRotatingAndThenSortMyHand(rotTime, sortTime);
	})
}



var startGame = function(){
	$("#message").empty();
	firstDealOfBothHands(12);
	setTimeout(function(){
		//flip, rotate, sort
		createTrumpCard(1000,1000,600);
		setTimeout(firstTurn,3000)
		setTimeout(myTurn,8000)
	}, 1500);//13000!
}






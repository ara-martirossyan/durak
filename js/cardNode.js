//returns jquery Object collection of of div.card in <div id = "divIDName"></div>
var grabCards = function(divIDName){ 
	//return document.getElementById(divIDName).getElementsByClassName("card"); //Object (HTMLCollection)//
	return $("#" + divIDName + " .card");
}

var pickUp = function(cardNode){
	cardNode.remove();
	cardNode.style = "";
	cardNode.firstChild.style = "";
	return cardNode;
}

var putDown = function(cardNode, divIDName, x, y, faceUpOrDown){
  //set the position of cardNode on (x,y)
  cardNode.style.left = x + "em"; 
  cardNode.style.top = y + "em"; 

  //if the faceUpOrDown argument is "up" 
  // or not defined or even something else
  // then the card face is by default turned up 
  //if the faceUpOrDown argument is "down" then turn the card face down  
  if( faceUpOrDown === "down"){
    cardNode.firstChild.style.visibility = "hidden";
  }
  document.getElementById(divIDName).appendChild(cardNode);
}

//returns an array like ["Q", "\u2665"] where \u2665 is the symbol for hearts
var card = function(cardNode){
 return cardNode.getElementsByClassName("indexTop")[0].innerHTML.split("<br>");
}

// returns an entry string of the ranks array like "10" or "queen"
var rank = function(cardNode){
	var rankIndex = card(cardNode)[0];
	return ranks.filter(function(r){
		return r[0].toUpperCase() === rankIndex[0];
	})[0]
}

// returns the rank in plural form  like "tens", "sixes" or "queens"
var rankWithWordsInPlural = function(cardNode){
	var r = rankWord(cardNode);
	if(r === "six"){
		return r + "es";
    }else{
    	return r + "s";
    }
}

//returns the rank as a word like "ten" or "seven"
var rankWord = function(cardNode){
	var r = rank(cardNode);
	if(r === "6"){
		return "six"
	}else if(r === "7"){
		return "seven"
	}else if(r === "8"){
		return "eight"
	}else if(r === "9"){
		return "nine"
	}else if(r === "10"){
		return "ten"
    }else{
    	return r;
    }
}

// returns an entry string of the suits array like "diamonds" or "spades"
var suit = function(cardNode){	
	var suitChar = card(cardNode)[1];
	return suitCharToString(suitChar);
}

var suitCharToString = function(suitChar){
	var suit;
		switch (suitChar) {
		case "\u2663" :
		suit = "clubs";
		break;
		case "\u2666" :
		suit = "diamonds";
		break;
		case "\u2665" :
		suit = "hearts";
		break;
		case "\u2660" :
		suit = "spades";
		break;
	}
	return suit;
}

// returns the highest card node if the trump is trumpSuit
// but if the cardNodes are equally high
// it returns the both
var highestCard = function(trumpSuit, cardNode1, cardNode2){
	if(suit(cardNode1) === trumpSuit && suit(cardNode2) !== trumpSuit){
		return cardNode1;
	}else if(suit(cardNode1) !== trumpSuit && suit(cardNode2) === trumpSuit){
		return cardNode2;
	}else{
		if( ranks.indexOf(rank(cardNode1)) > ranks.indexOf(rank(cardNode2)) ){
			return cardNode1;
		}else if( ranks.indexOf(rank(cardNode1)) < ranks.indexOf(rank(cardNode2)) ){
			return cardNode2;
		}else{
		    return [cardNode1, cardNode2];			
		}
	}
}



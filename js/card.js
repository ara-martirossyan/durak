var suits = ["clubs", "diamonds", "hearts", "spades"];
var ranks = ["6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
// in durak we do not need ranks "2", "3", "4", "5", 

// return true if the input is a suit, false otherwise.
var isSuit = function (suit) {
	return suits.some(function(currentSuit){
		return suit === currentSuit;
	})
};

// return true if the input is a rank, false otherwise.
var isRank = function (rank) {
	return ranks.some(function(currentRank){
		return rank === currentRank;
	})
};

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;

  this.toString   = cardToString;
  this.createNode = cardCreateNode;
  this.put = putCardAt;
}

function cardToString() {  
  if(isRank(this.rank) && isSuit(this.suit)){
  	return this.rank + " of " + this.suit; 	
  }else{
    return "this is not a card";
  }  
}


function cardCreateNode() {
  var cardNode, frontNode, indexNode, spotNode, tempNode, textNode;
  var indexStr, spotChar;

  // This is the main node, a DIV tag.
  cardNode = document.createElement("DIV");
  cardNode.className = "card";

  // Build the front of card.
  frontNode = document.createElement("DIV");
  frontNode.className = "front";

  // Get proper character for card suit and change font color if
  // necessary.
  spotChar = "\u00a0";
  switch (this.suit) {
    case "clubs" :
      spotChar = "\u2663";
      break;
    case "diamonds" :
      frontNode.className += " red";
      spotChar = "\u2666";
      break;
    case "hearts" :
      frontNode.className += " red";
      spotChar = "\u2665";
      break;
    case "spades" :
      spotChar = "\u2660";
      break;
  }

  // Create and add the index (rank) to the upper-left corner of the
  // card.
  if(this.rank !== "10"){
  	indexStr = this.rank.toUpperCase()[0];
  }else{
  	indexStr = "10";
  }
  if (this.toString() === "this is not a card"){
    indexStr = "\u00a0";
  }

  
  spotNode = document.createElement("DIV");
  spotNode.className = "indexTop";
  textNode = document.createTextNode(indexStr)
  spotNode.appendChild(textNode);
  spotNode.appendChild(document.createElement("BR"));
  textNode = document.createTextNode(spotChar)
  spotNode.appendChild(textNode);
  frontNode.appendChild(spotNode);
  tempNode = spotNode.cloneNode(true);
  tempNode.className = "indexBottom";
  frontNode.appendChild(tempNode);
  
  // Create and add spots based on card rank (Ace thru 10).
  spotNode = document.createElement("DIV");
  textNode = document.createTextNode(spotChar);
  spotNode.appendChild(textNode);
  if (this.rank == "ace") {
    spotNode.className = "ace";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }

  if(this.rank === "8"){
    spotNode.className = "spotB2";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if(this.rank === "6" || this.rank === "7" || this.rank === "8"){
    spotNode.className = "spotA1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.style.transform = "rotateX(180deg)"
    spotNode.className = "spotA5";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC5";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotA3";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC3";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }

  if(this.rank === "7" || this.rank === "8"){
    spotNode.className = "spotB4";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }

  if ( this.rank == "10") {
    spotNode.className = "spotB2";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }

  if (this.rank == "9" || this.rank == "10") {
    spotNode.className = "spotA1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotA2";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);    
    spotNode.className = "spotC1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC2";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.style.transform = "rotateX(180deg)"
    spotNode.className = "spotA4";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotA5";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC4";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);   
    spotNode.className = "spotC5";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }

  if ( this.rank == "9") {
    spotNode.className = "spotB3";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }


  if ( this.rank == "10") {
    spotNode.className = "spotB4";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }

  // For face cards (Jack, Queen or King), create and add the proper
  // image.
  tempNode = document.createElement("IMG");
  tempNode.className = "face";
  if (this.rank == "jack")
    tempNode.src = "graphics/jack.gif";
  if (this.rank == "queen")
    tempNode.src = "graphics/queen.gif";
  if (this.rank == "king")
    tempNode.src = "graphics/king.gif";

  // For face cards, add suit characters to the upper-left and
  // lower-right corners.
  if (this.rank == "jack" || this.rank == "queen" || this.rank == "king") {
    frontNode.appendChild(tempNode);
    spotNode.className = "spotA1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC5";
    spotNode.style.transform = "rotateX(180deg)"
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }

  // Add front node to the card node.
  cardNode.appendChild(frontNode);


  // Return the card node.
  return cardNode;
}


/*
* put the card in <div id = "divIDName"> 
*/
function putCardAt(divIDName, x, y, faceUpOrDown){
   var cardNode = this.createNode();
    
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
  return cardNode
}



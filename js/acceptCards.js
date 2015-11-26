/**
* accept cards on table into "my-hand"
*/
var acceptCardsToMyHand = function(time){	
 	var table = getArray("table");
  	var prepared = prepare(table.length, "table", "my-hand", trump(), time/2)
	var scale = handScale(prepared);
	setTimeout(function(){
		table.forEach(function(cardNode){
			var offY = Number( cardNode.style.top.replace(/[^0-9,.,-]/g, '') );
			var card = insert(cardNode, prepared, "table", "my-hand")
			.css({top: tableTopFromMyHand() + offY + 'em', left: cardNode.style.left })
			var idxCard = prepared.indexOf(cardNode);
			$(card).animate(
	    			{left: idxCard*scale+"em", top: 0+"em",},
	    			{
	    				duration: time,
	    				queue: false,
	   		 		}
	   		);
	   		$(card).dequeue();
	    }) 
	},time/2) 

}

/**
* shift cards in pc hand to the right side
* in order to accept cards from table or deck
* number argument is optional and if undefined
* the hand is going to accept from table and if defined
* the hand is going to accept number of cards from deck 
* and returns the array that would be formed after accepting
*/
var pcHandMakeSpaceToAccept = function(time, number){
	var target;
	if(number === undefined){
	 target = grabCards("pc-hand").add( grabCards("table") );
	}else if(grabCards("deck").length >= number){
	 var deck = grabCards("deck");
	 target = grabCards("pc-hand").add( deck.slice(deck.length-number) );
	}else{
		//when number argument is bigger than the number of cards in deck"
		target = grabCards("pc-hand").add( grabCards("deck") );
	}
	target  = castToArray(target);
	var scale = handScale(target);
	grabCards("pc-hand").each(function(idx,card){	
		$(card).animate(
			{left: target.indexOf(card)*scale+"em", top: 0+"em"},
			{
				duration: time,
				queue: false,
			}
		);
	});
	return target;
}

/**
* accept cards on table into "my-hand"
*/
var acceptCardsToPcHand = function(time){
	var table = getArray("table");
	var target = pcHandMakeSpaceToAccept(time);
	var scale = handScale(target);
	setTimeout(function(){
		table.forEach(function(cardNode){
			var offY = Number( cardNode.style.top.replace(/[^0-9,.,-]/g, '') );
			var card = insert(cardNode, target, "table", "pc-hand")
			.css({top: tableTopFromPcHand() + offY + 'em', left: cardNode.style.left })
			.dequeue()
			var idxCard = target.indexOf(cardNode);
	   		moveByFlip(card, idxCard*scale, 0, time, false)
		})
	},time)
}




	

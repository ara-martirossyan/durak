/**
* accept cards on table into "my-hand"
*/
var acceptCardsToMyHand = function(time){	
 	var table = [].map.call(grabCards("table"), function(e){return e})
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
* in order to accept cards from table 
* and returns the array that would be formed after accepting
*/
var pcHandMakeSpaceToAccept = function(time){
	var target = grabCards("pc-hand").add( grabCards("table") );
	target  = [].map.call( target,  function(e){return e}  )
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
	var table = [].map.call(grabCards("table"), function(e){return e})
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




	

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




	

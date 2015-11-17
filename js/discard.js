var discard = function(time){
	var table = getArray("table");
	table.forEach(function(cardNode){
		var offX = Number( cardNode.style.left.replace(/[^0-9,.,-]/g, '') );
		var offY = Number( cardNode.style.top.replace(/[^0-9,.,-]/g, '') );
		var num = grabCards("discard").length
		var cardNode = $(cardNode).appendTo("#discard")
		.css({
			left: offX + tableLeftFromDiscard() + "em",
			top:  offY + tableTopFromDiscard() + "em"
		}).dequeue()
		moveByFlip(cardNode,num*deckScale(),-num*deckScale(),time, false)
	})

}
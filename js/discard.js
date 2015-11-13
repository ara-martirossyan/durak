var tableLeftFromDiscard = function(){
	return -40.2;
}

var tableTopFromDiscard = function(){
	return -0.6;
}

var discard = function(time){
	var table = [].map.call(grabCards("table"), function(e){return e});
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
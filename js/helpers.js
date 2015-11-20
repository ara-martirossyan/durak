//casts a jquery Object collection to an array
var castToArray = function(obj){
	return [].map.call(obj, function(e){return e})
}

var getArray = function(divIdName){
	return castToArray( grabCards(divIdName) )
}



var showPcHand = function(){
	return [].map.call( grabCards("pc-hand"), function(e){
		return card(e)
	})
}



var pcAttackLowestCard = function(time){
	var arr = getArray("pc-hand");
	var hand = sortCardArray(trump(), arr);
	var cardNode = hand[hand.length - 1];
    playMove(cardNode, time);
}

var pcAddLowestCard = function(time){
	var arr = getArray("pc-hand");
	var hand = sortCardArray(trump(), arr);
	var cardNode = hand[hand.length - 1];
    addToCollect(cardNode, time);
}

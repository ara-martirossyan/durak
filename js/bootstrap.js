var isGameOver = function(){
  var deck = grabCards("deck").length;
  var myHand = grabCards("my-hand").length;
  var pcHand = grabCards("pc-hand").length;
  if( deck === 0 && pcHand === 0 && myHand > 1 ){
  	promptMessage("You lost!");
  	return true;
  }else if( deck === 0 && myHand === 0 && pcHand > 1 ){
  	promptMessage("You won!");
  	return true;
  }else if( deck === 0 && myHand === 0 && pcHand === 0){
  	promptMessage("It's a draw!");
  	return true;
  }else if( deck === 0 && myHand === 0 && pcHand === 1 ){
  	promptMessage("has to be edited");
  	return true;
  }else if( deck === 0 && myHand === 1 && pcHand === 0 ){
  	promptMessage("has to be edited");
  	return true;
  }else{
  	return false;
  }
}
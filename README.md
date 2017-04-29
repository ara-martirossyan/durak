# Durak

Durak is a card game to play with the computer. It is played with a deck of 36 cards. The deck is shuffled, and each player receives six cards. The top card on the remaining deck is made visible and placed at the bottom of the deck at a 90 degree angle. This determines the trump suit.     
        
The first player to attack is the one who holds the lowest trump suit in his hand. The attacker throws any card he wishes from his hand and the defender must beat this card. A card can be beaten by a higher card of the same suit or any card of the trump suit, unless the card is itself from the trump suit. In the latter case it can only be beaten by a higher trump. 

If the defender cannot or does not want to beat the card of the attacker he must collect it and add it to his hand. If the defender beats the card the attacker can add another card of the same rank of one of the cards on the table. The defender must beat this card too. The defender cannot be attacked by a number of cards that exceeds the number of cards in his hand.

  If the defender cannot beat one or more cards he has been attacked with he must collect all the cards at the table and add them to his han. If the defender succeeds to beat all the cards, these cards are discarded. In the next turn, the defender will attack.
  
  If there are no cards left in the remaining deck the face-up trump card is taken by the person whose turn is to take cards. After this no more cards are taken and the game continues until one of the players gets rid of his hand. The person who remains with the cards is called Durak.
  
 Demo
--------------
To play online visit please the following [webpage](http://aralmighty.com/durak/index.html).
  
 Download
--------------
To download this into the computer and play, one needs to download the [jQuery](http://jquery.com/download/) library as well and put it in the js folder and also change its
corresponding name in the script tag of index.html file.

    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
       

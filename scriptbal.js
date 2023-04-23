var cards = [
	{
		type: "visa",
		number: "**** **** **** ****",
		expiration: "$10",
		transactions: [
       {
				name: "NO DATA ($)",
				type: "credit",
				category: "",
        ID: "ADDED", 
				date: "STAY TUNED",
				amount: "+0.000000"
			}
		]
	},
	{
		type: "amex",
		number: "**** ****** ****",
		expiration: "NO LIMIT",
		transactions: [
      {
				name: "NO SPIN REWARD(₱)",
				type: "credit",
				category: "",
        ID: "ADDED", 
				date: "STAY TUNED",
				amount: "+0.000000"
      }
		]
	},
	{
		type: "mc",
		number: "**** **** **** ****",
		expiration: "NET7/HOLD7",
		transactions: [
      {
				name: "NO COMMISSION(₱)",
				type: "credit",
				category: "",
        ID: "ADDED", 
				date: "STAY TUNED",
				amount: "+0.000000"
      }
		]
	}
];

//Print Cards
function generateCards() {
	var output = "";
	cards.forEach(function(cards, index) {
		output += "<div class='credit-card " + cards.type + "'>";
		output += "<div class='card-image'></div>";
		output += "<div class='credit-card_number'>" + cards.number + "</div>";
		output += "<div class='credit-card_expiration'>Max output:" + cards.expiration + "</div>";
		output += "</div>"
	});
	return output;
}
//Display Cards on Page
document.querySelector('.cards').innerHTML = generateCards();
//Add initial active class
document.querySelector('.credit-card.visa').classList.add('active');;

//Print Cards
function showTransactions(creditCards, card) {
	var output = "";
	var total = 0;
  //if card is active print its transactions from cards data 
	for (var i = 0; i < creditCards.length; i++) {
		if (creditCards[i] === card) {
			for (var n = 0; n < cards[i].transactions.length; n++) {
				output += "<div class='transaction-item " + cards[i].transactions[n].type + "'>";
				output += "<div class='transaction-item_details'>";
				output += "<h3>"+ cards[i].transactions[n].name +"</h3>";
				output += "<span class='details'>"+ cards[i].transactions[n].category + " " + cards[i].transactions[n].ID +" - " + cards[i].transactions[n].date + "</span>";
				output += "</div>";
				output += "<div class='transaction-item_amount'><span></span><p class='amount'>"+ cards[i].transactions[n].amount +"</p></div>";
				output += "</div>";
				//for transaction length add amounts to total 
				total += parseFloat(cards[i].transactions[n].amount);
			}
			document.querySelector('.transactions').innerHTML = output;
			document.querySelector('.total-balance').innerHTML = total.toFixed(6); //2 decimal places
		} 
	}
}

//Grab cardList
var cardsList = document.querySelectorAll('.credit-card');
//Grab single card
var creditCard = document.querySelector( '.credit-card' );
//Grab activeCard
var activeCard = document.querySelector('.credit-card.active');
//Grab transaction
var transaction = document.querySelector('.transactions');

//Show transactions
showTransactions(cardsList, activeCard);

//add class show to transaction div for animation
transaction.classList.add('show')

//Toggle Active class on Cards and show class on transactions
for(let i = 0; i < cardsList.length; i++) {
	cardsList[i].addEventListener("click", function(e) {
		e.preventDefault;
		for(let n = 0; n < cardsList.length; n++) {
			if(cardsList[n].classList.contains('active')) {
				cardsList[n].classList.remove('active');
			}
		}
		this.classList.add('active');
		showTransactions(cardsList, this);

		transaction.classList.remove("show");
		//triggering reflow
		void transaction.offsetWidth;

		transaction.classList.add("show");		
  });
}

//simple modal
var modalControl = document.querySelector('.modal-control');
var modalClose = document.querySelector('.modal-close');
var modal = document.querySelector('.modal');

modalControl.addEventListener('click', function() {
	document.querySelector('.modal').classList.add('open');
}, false);

//click anywhere to close example modal
modal.addEventListener('click', function() {
	document.querySelector('.modal').classList.remove('open');
}, false);

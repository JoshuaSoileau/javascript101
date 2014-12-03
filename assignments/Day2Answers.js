var userName		=	"Josh Soileau";
var userAddress		=	"145 Williman St";
var accountNumber;	=	8675309;
var accountOpenDate =	"Nov 1, 2014";
var accountBalance	=	0.01;

var printAccountInfo = function() {
	console.log( "User Name is: " + userName );
	console.log( "User Address is: " + userAddress );
	console.log( "User Account Number is: " + accountNumber );
	console.log( "User Account Open Date is: " + accountOpenDate );
	console.log( "User Account Balance is: " + accountBalance );
};

var setBalance = function( newBalance ) {
	accountBalance = newBalance;
};

var withdraw = function( numToWithdraw ) {
	accountBalance -= numToWithdraw;
};

var deposit = function( numToDeposit ) {
	accountBalance += numToDeposit;
};

var setAddress = function( newAddress ) {
	userAddress = newAddress;
};

var giveInterest = function() {
	accountBalance *= 1.03;
};

var predictBalance = function( yearsToPredict ) {
	// for loop, counting from 0 to yearsToPredict - 1
	var tempNewBalance = accountBalance; // we don't want to overwrite the global accountBalance function, so we make a new local one for us to use JUST in this function
	for( i=0; i<yearsToPredict; i++ ) {
		tempNewBalance *= 1.03; // add 3% to the account balance each time the loop happens
	}
	console.log( "In " + yearsToPredict + " the account balance will be " + tempNewBalance );
};
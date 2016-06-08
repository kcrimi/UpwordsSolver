
if (Words.find().count() === 0) {
	console.log("Importing base word list to db")

	var data = Assets.getText("TWL06.txt")
	var lines = data.split(/\r\n|\n/);
	var lastLetter = "BEGIN";
	for (var i = 0; i < lines.length -1; i++){
		if (lines[i][0] != lastLetter){
			lastLetter = lines[i][0];
			console.log(""+lastLetter);
		}
		lineWord = lines[i];
		Words.insert({word:lineWord, length: lineWord.length});
	}
	console.log("end import")
}


Meteor.methods({
	// 'searchLetters': function(userLetters, boardLetters){
	// 	var userArray = userLetters.toUpperCase().split('');
	// 	var possibleWords = [];

	// 	for (var i = 0; i < boardLetters.length; i++){
	// 		fin
	// 	}
	// 	var realWords = Words.find({word:{ $in: possibleWords}}).fetch();
	// },

	'checkWords': function(possibleWordArray){
		return Words.find({word: {$in: possibleWordArray}},{sort: {length: -1}}).fetch();
	}

})
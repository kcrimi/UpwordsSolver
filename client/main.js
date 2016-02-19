Meteor.subscribe('possibleWords');

Template.wordResults.helpers({
	words: function() {
		return Words.find({}, {sort: {length: -1}})
	}
})

Template.wordLookupForm.events({
	'click button': function(e, t){

		var userLetters = $('#userLetters').val().toUpperCase().split('');
		var boardLetters = $('#boardLetters').val().toUpperCase().split('');
		var possibleWords = [];

		for (var i = 0; i < boardLetters.length; i++){
			possibleWords.push(findPermutations('', userLetters.concat(boardLetters[i])));
		}

		var uniquePossibleWords = deDupe(_.flatten(possibleWords));
		Meteor.call('checkWords', uniquePossibleWords);
	}
})

function findPermutations(joinedString, letterArray){
	var permutationsArray = [];
	if(joinedString.length > 0){
		permutationsArray.push(joinedString);
	}

	for (var i = 0; i < letterArray.length; i++){
		var selectLetter = letterArray[i];
		var remainder = letterArray.slice(0,i).concat(letterArray.slice(i+1,letterArray.length))
		var childArray = findPermutations(joinedString+selectLetter, remainder);
		
		permutationsArray.push(childArray);
	}
	return permutationsArray;
}

function deDupe(array){
	var unique = [];
	$.each(array, function(i, el){
	    if($.inArray(el, unique) === -1) unique.push(el);
	});
	return unique;
}
#! /usr/bin/env node
console.log('This is the dictionary CLU');

var definitions = [];
var synonyms = [];
var antonyms = [];
var examples = [];
var word = {};
var randomWord = {};

var userArgs = process.argv.slice(2);
// console.log(userArgs);
var searchPattern = userArgs[0];

// var request = require('superagent');
var program = require('commander');
// var co = require('co');
// var prompt = require('co-prompt');
var prompt = require('prompt');
var Constants = require('./Constants');
var Request = require('./Request');
var Output = require('./Output');
// console.log(" constant is " + Constants.DEFINITION);


function storingDefinitions(arg) {
    definitions = arg;
    Output.printHeadingAndArrayElements("Definition", definitions);
}

function storingSynonyms(arg) {
    synonyms = arg;
    Output.printHeadingAndArrayElements("Synonym", synonyms);
}

function storingAntonyms(arg) {
    antonyms = arg;
    Output.printHeadingAndArrayElements("Antonym", antonyms);
}

function storingExample(arg) {
    examples = arg;
    Output.printHeadingAndArrayElements("Example", examples);
}

var getAllWordDetails = function (wordx) {
    word = wordx;
    Request.getDefinition(word, saveDefinitionAndGetSynonym);


    function saveDefinitionAndGetSynonym(arg) {
        definitions = arg;
        Request.getSynonym(word, saveSynonymAndGetAntonym);
    }

    function saveSynonymAndGetAntonym(arg) {
        synonyms = arg;
        Request.getAntonym(word, saveAntonymAndGetExample);
    }

    function saveAntonymAndGetExample(arg) {
        antonyms = arg;
        Request.getExample(word, printall);
    }

    function printall(arg) {
        examples = arg;
        Output.printHeadingAndArrayElements("Definitions", definitions);
        Output.printHeadingAndArrayElements("Synonyms", synonyms);
        Output.printHeadingAndArrayElements("Antonyms", antonyms);
        Output.printHeadingAndArrayElements("Examples", examples);


    }
};


if (userArgs[1])
    userArgs[1] = userArgs[1].trim();

if (userArgs[0])
    userArgs[0] = userArgs[0].trim();


if (userArgs[0] == Constants.DEFINITION) {
    if (userArgs.length == 2) {
        Request.getDefinition(userArgs[1], storingDefinitions);
    } else {
        console.log("Please Enter a word whose definition you want to see")
    }

} else if (userArgs[0] == Constants.SYNONYM) {
    if (userArgs.length == 2) {
        Request.getSynonym(userArgs[1], storingSynonyms);
    } else {
        console.log("Please Enter a word whose synonym you want to see");
    }

} else if (userArgs[0] == Constants.ANTONYM) {
    if (userArgs.length == 2) {
        Request.getAntonym(userArgs[1], storingAntonyms);
    } else {
        console.log("Please Enter a word whose antonym you want to see");
    }

} else if (userArgs[0] == Constants.EXAMPLE) {
    if (userArgs.length == 2) {
        Request.getExample(userArgs[1], storingExample);
    } else {
        console.log("Please Enter a word whose example you want to see");
    }

} else if (userArgs.length == 0) {
    Request.getWordOfDay(getAllWordDetails);


} else if (userArgs[0] == Constants.PLAY) {
    Request.getRandomWord(DefSynAnt);
    function DefSynAnt(word) {
        randomWord = word;
        Request.getDefinition(randomWord, showDefinition);
    };

    function showDefinition(defn) {
        definitions = defn;
        Request.getSynonym(randomWord, showSynonym);
    }

    function showSynonym(synonym) {
        synonyms = synonym;
        Request.getAntonym(randomWord, showAntonym);
    }

    function showAntonym(antonym) {
        antonyms = antonym;
        Request.getExample(word, startWordPlay);

        function startWordPlay(arg) {
            examples = arg;
            // console.log("random word " + randomWord);
            console.log("Hey!! Lets play a Guess Word game,it will be fun ");

            prompt.start();
            console.log("Definition: ");
            console.log(definitions[0]);

            startPrompt();
            function startPrompt() {

                prompt.get([{
                    name: 'inputWord',
                    description: 'Enter a word which matches the given definition',
                    required: true
                }], function (err, result) {
                    if (result.inputWord == randomWord) {
                        console.log("Bingo!!!! You got the word");
                        return 1;
                    }
                    else {
                        if (synonyms.length != 0) {
                            for (i = 0; i < synonyms.length; i++) {
                                if (synonyms[i] == result.inputWord) {
                                    console.log("Bingo!!! That was one of the synonyms");
                                    return 1;
                                }
                            }
                        }

                        console.log("Sorry, but that was a wrong word");
                        prompt.get([{
                            name: 'choiceOption',
                            description: 'Enter 1 to try again, 2 for showing hint, 3 for quitting this game',
                            required: true
                        }], function (error, result) {
                            if (result.choiceOption == "1") {
                                console.log("Definition;");
                                console.log(definitions[0]);
                                startPrompt();
                            } else if (result.choiceOption == "2") {
                                if (definitions.length > 1) {
                                    var index = Math.floor(Math.random() * definitions.length);
                                    console.log("Here is a hint for you. Another definition: ");
                                    console.log(definitions[index]);
                                } else if (synonyms.length > 1) {
                                    var index = Math.floor(Math.random() * synonyms.length);
                                    console.log("Here is a hint for you. Synonym: ");
                                    console.log(synonyms[index]);
                                } else if (antonyms.length > 1) {
                                    var index = Math.floor(Math.random() * antonyms.length);
                                    console.log("Here is a hint for you. Antonym: ");
                                    console.log(antonyms[index]);
                                } else {
                                    var a = randomWord.split(""),
                                        n = a.length;

                                    for (var i = n - 1; i > 0; i--) {
                                        var j = Math.floor(Math.random() * (i + 1));
                                        var tmp = a[i];
                                        a[i] = a[j];
                                        a[j] = tmp;
                                    }
                                    var shuffle = a.join("");
                                    console.log("Here is a hint for you. Look at this shuffle and guess");
                                    console.log(shuffle);
                                }

                                startPrompt();

                            } else if (result.choiceOption == "3") {
                                Output.printHeadingAndObject("Word", randomWord);
                                Output.printHeadingAndArrayElements("Definition", definitions);
                                Output.printHeadingAndArrayElements("Synonyms", synonyms);
                                Output.printHeadingAndArrayElements("Antonyms", antonyms);
                                Output.printHeadingAndArrayElements("Examples", examples);
                            }
                        });

                    }
                });
            }
        }

    }
} else if (userArgs.length != 0) {

    getAllWordDetails(userArgs[0]);

}


// setTimeout(function () {
//
//
//     console.log(definitions);
//     console.log(synonyms);
//     console.log(antonyms);
//
// }, 2000);




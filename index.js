#! /usr/bin/env node

//Importing required node modules
var program = require('commander');
var prompt = require('prompt');
var colors = require('colors');

//Importing custom files
var Constants = require('./Constants');
var Request = require('./Request');
var Output = require('./Output');

//setting options for colored console output
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
    imp: 'yellow'
});

console.log("This is a dictionary Command Line Tool. Use dict as a command with some options".info);

//Initialising dictionary variables to be used later on
var userArgs = process.argv.slice(2);
var definitions = [];
var synonyms = [];
var antonyms = [];
var examples = [];
var word = {};
var randomWord = {};

//Storing definition and displaying it
function storingDefinitions(arg) {
    definitions = arg;
    Output.printHeadingAndArrayElements("Definition", definitions);
}

//Stroing Synonyms and displaying it
function storingSynonyms(arg) {
    synonyms = arg;
    Output.printHeadingAndArrayElements("Synonym", synonyms);
}

//Storing antonym and displaying it
function storingAntonyms(arg) {
    antonyms = arg;
    Output.printHeadingAndArrayElements("Antonym", antonyms);
}

//Storing example and displaying it
function storingExample(arg) {
    examples = arg;
    Output.printHeadingAndArrayElements("Example", examples);
}

//To store all the word related details and display all of them
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

//for trimming extra spaces
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
    //get Random Word
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
            console.log("Hey!! Lets play a Guess Word game,it will be fun ".imp);

            prompt.start();
            console.log("Definition: ".debug);
            console.log(definitions[0].info);

            startPrompt();
            function startPrompt() {

                prompt.get([{
                    name: 'inputWord',
                    description: 'Enter a word which matches the given definition'.imp,
                    required: true
                }], function (err, result) {
                    if (result.inputWord == randomWord) {
                        console.log("Bingo!!!! You got the word".silly);
                        return 1;
                    }
                    else {
                        if (synonyms.length != 0) {
                            for (i = 0; i < synonyms.length; i++) {
                                if (synonyms[i] == result.inputWord) {
                                    console.log("Bingo!!! That was one of the synonyms".silly);
                                    return 1;
                                }
                            }
                        }

                        console.log("Sorry, but that was a wrong word".imp);
                        prompt.get([{
                            name: 'choiceOption',
                            description: 'Enter 1 to try again, 2 for showing hint, 3 for quitting this game'.info,
                            required: true
                        }], function (error, result) {
                            if (result.choiceOption == "1") {
                                console.log("Definition:".debug);
                                console.log(definitions[0].imp);
                                startPrompt();
                            } else if (result.choiceOption == "2") {
                                if (definitions.length > 1) {
                                    var index = Math.floor(Math.random() * definitions.length);
                                    console.log("Here is a hint for you. Another definition: ".info);
                                    console.log(definitions[index].imp);
                                } else if (synonyms.length > 1) {
                                    var index = Math.floor(Math.random() * synonyms.length);
                                    console.log("Here is a hint for you. Synonym: ");
                                    console.log(synonyms[index]);
                                } else if (antonyms.length > 1) {
                                    var index = Math.floor(Math.random() * antonyms.length);
                                    console.log("Here is a hint for you. Antonym: ".info);
                                    console.log(antonyms[index].imp);
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
                                    console.log("Here is a hint for you. Look at this shuffle and guess".info);
                                    console.log(shuffle.imp);
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





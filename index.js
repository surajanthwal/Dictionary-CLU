#! /usr/bin/env node
console.log('This is the dictionary CLU');

var userArgs = process.argv.slice(2);
// console.log(userArgs);
var searchPattern = userArgs[0];

// var request = require('superagent');
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');
var Constants = require('./Constants');
var Request = require('./Request');
// console.log(" constant is " + Constants.DEFINITION);

var getAllWordDetails = function (word) {

    Request.getDefinition(word,getSynonym);

    function getSynonym() {
        Request.getSynonym(word,getAntonym);
    }
    function getAntonym() {
        Request.getAntonym(word,getExample);
    }

    function getExample() {
        Request.getExample(word);
    }

};

if (userArgs[1])
    userArgs[1] = userArgs[1].trim();

if (userArgs[0] == Constants.DEFINITION) {
    Request.getDefinition(userArgs[1],null);
} else if (userArgs[0] == Constants.SYNONYM) {
    Request.getSynonym(userArgs[1],null);

} else if (userArgs[0] == Constants.ANTONYM) {
    Request.getAntonym(userArgs[1],null);

} else if (userArgs[0] == Constants.EXAMPLE) {
    Request.getExample(userArgs[1],null);
} else if (userArgs.length == 0) {
    Request.getWordOfDay(getAllWordDetails);


} else if (userArgs.length != 0) {
    getAllWordDetails(userArgs[0]);
}


#! /usr/bin/env node
console.log('This is the dictionary CLU');

var userArgs = process.argv.slice(2);

var searchPattern = userArgs[0];

var request = require('superagent');
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');
var Constants = require('./Constants');
// console.log(" constant is " + Constants.DEFINITION);

if (userArgs[1])
    userArgs[1] = userArgs[1].trim();

if (userArgs[0] == Constants.DEFINITION) {
    request
        .get("http://api.wordnik.com:80/v4/word.json/" + userArgs[1] + "/definitions")
        .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
        .set('Accept', 'application/json')
        .end(function (err, res) {
            for (var i = 0; i < res.body.length; i++) {
                console.log(res.body[i].text);
                console.log("\t" + res.body[i].attributionText + "\n");
            }
        });
}


// program
//     .arguments('<word>')
//
//     // .option('-u, --username <username>', 'The user to authenticate as')
//     // .option('-p, --password <password>', 'The user\'s password')
//
//     .action(function (word) {
//         co(function *() {
//             // var username = yield prompt('username: ');
//             // var password = yield prompt.password('password: ');
//             // console.log('user: %s pass: %s file: %s', username, password, file);
//
//             request
//                 .get("http://api.wordnik.com:80/v4/word.json/utter/definitions")
//                 .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
//                 .set('Accept', 'application/json')
//                 .end(function (err, res) {
//                     for (var i = 0; i < res.body.length; i++) {
//                         console.log(res.body[i].text );
//                         console.log("\t" + res.body[i].attributionText+"\n");
//                     }
//                 });
//
//
//         });
//     })
//     .parse(process.argv);


var request = require('superagent');
var definitions = [];
var synonyms = [];
var antonyms = [];
var examples = [];
var word = {};
var randomWord = {};

module.exports = {
    getDefinition: function (word, callback) {
        definitions = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/definitions")
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                // console.log("DEFINITIONS: ");
                for (var i = 0; i < res.body.length; i++) {
                    // console.log(res.body[i].text);
                    definitions.push(res.body[i].text)
                }
                if (typeof callback == "function")
                    callback(definitions);
            });
    },
    getSynonym: function (word, callback) {
        synonyms = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords")
            .query({relationshipTypes: 'synonym'})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {

                if (res.body.length != 0) {
                    synonyms = res.body[0].words;
                    // console.log(synonyms);
                }

                // console.log("NO Synonym" + "\n");
                // else {
                // console.log("SYNONYMS: ");
                // for (i = 0; i < synonyms.length; i++) {
                //     if (synonyms.length > 1)
                //         console.log(synonyms[i] + ",");
                //     else
                //         console.log(synonyms[i]);
                // }
                // console.log("\n");
                if (typeof callback == "function")
                    callback(synonyms);
            });

    },
    getAntonym: function (word, callback) {
        antonyms = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords")
            .query({relationshipTypes: 'antonym'})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (res.body.length != 0)
                    antonyms = res.body[0].words;

                //     console.log("NO antonym" + "\n");
                // else {
                // for (i = 0; i < antonyms.length; i++) {
                //     if (antonyms.length > 1)
                //         console.log(antonyms[i] + ",");
                //     else
                //         console.log(antonyms[i]);
                // }
                // console.log("\n");
                // }
                if (typeof callback == "function")
                    callback(antonyms);
            });
    },
    getExample: function (word, callback) {
        examples = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/examples")
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (res.body.examples) {
                    for (i = 0; i < res.body.examples.length; i++) {
                        examples.push(res.body.examples[i].text);
                    }
                    // console.log("\n");
                }

                if (typeof callback == "function")
                    callback(examples);

            });
    }
    ,
    getWordOfDay: function (callback) {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var date = year + "-" + month + "-" + day;
        word = {};
        request
            .get("http://api.wordnik.com:80/v4/words.json/wordOfTheDay")
            .query({date: date})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                console.log("WORD OF THE DAY: ");
                if (res.body.word) {
                    word = res.body.word;
                    // console.log(res.body.word);
                    // console.log("\n");
                    if (typeof callback == "function")
                        callback(word);
                }
            });
    }
    ,

    getRandomWord: function (callback) {
        randomWord = {};
        request
            .get("http://api.wordnik.com:80/v4/words.json/randomWord")
            .query({hasDictionaryDef: false})
            .query({minCorpusCount: 0})
            .query({maxCorpusCount: -1})
            .query({minDictionaryCount: 1})
            .query({maxDictionaryCount: -1})
            .query({minLength: 5})
            .query({maxLength: -1})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                // console.log("RANDOM WORD: ");
                if (res.body.word) {
                    randomWord = res.body.word;
                    // console.log(randomWord);
                    if (typeof callback == "function")
                        callback(randomWord);

                }
            });
    }
    // ,
    // definitions: definitions,
    // synonyms: synonyms,
    // antonyms: antonyms,
    // examples: examples,
    // word: word,
    // randomWord: randomWord

}
;

var request = require('superagent');

module.exports = {
    getDefinition: function (word, callback) {
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/definitions")
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                console.log("DEFINITIONS: ")
                for (var i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].text);
                    console.log("\t" + res.body[i].attributionText);
                }
                console.log("\n");
                if (typeof callback == "function")
                    callback();
            });
    },
    getSynonym: function (word, callback) {
        var synonyms = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords")
            .query({relationshipTypes: 'synonym'})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {

                if (res.body.length == 0)
                    console.log("NO Synonym" + "\n");
                else {
                    console.log("SYNONYMS: ")
                    synonyms = res.body[0].words;
                    for (i = 0; i < synonyms.length; i++) {
                        if (synonyms.length > 1)
                            console.log(synonyms[i] + ",");
                        else
                            console.log(synonyms[i]);
                    }
                    console.log("\n");
                }
                if (typeof callback == "function")
                    callback();
            });
    },
    getAntonym: function (word, callback) {
        var antonyms = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords")
            .query({relationshipTypes: 'antonym'})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (res.body.length == 0)
                    console.log("NO antonym" + "\n");
                else {
                    antonyms = res.body[0].words;
                    for (i = 0; i < antonyms.length; i++) {
                        if (antonyms.length > 1)
                            console.log(antonyms[i] + ",");
                        else
                            console.log(antonyms[i]);
                    }
                    console.log("\n");
                }
                if (typeof callback == "function")
                    callback();
            });
    },
    getExample: function (word) {
        var examples = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/examples")
            // .query({relationshipTypes: 'antonym'})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                console.log("EXAMPLES: ");
                if (res.body.examples) {
                    examples = res.body.examples;
                    for (i = 0; i < examples.length; i++) {
                        console.log(examples[i].text);
                    }
                    console.log("\n");
                }
                return 1;
            });
    },
    getWordOfDay: function (callback) {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var date = year + "-" + month + "-" + day;

        request
            .get("http://api.wordnik.com:80/v4/words.json/wordOfTheDay")
            .query({date: date})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                console.log("WORD OF THE DAY: ");
                if (res.body.word)
                    console.log(res.body.word);
                // console.log("\n");
                if (typeof callback == "function")
                    callback(res.body.word);
            });
    }


};

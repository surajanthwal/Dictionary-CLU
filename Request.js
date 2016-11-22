var request = require('superagent');

module.exports = {
    getDefinition: function (word) {
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/definitions")
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                for (var i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].text);
                    console.log("\t" + res.body[i].attributionText + "\n");
                }
            });
    },
    getSynonym: function (word) {
        var synonyms = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords")
            .query({relationshipTypes: 'synonym'})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (res.body.length == 0)
                    console.log("No synonym");
                else {
                    synonyms = res.body[0].words;
                    for (i = 0; i < synonyms.length; i++) {
                        if (synonyms.length > 1)
                            console.log(synonyms[i] + ",");
                        else
                            console.log(synonyms[i]);
                    }
                }
            });
    },
    getAntonym: function (word) {
        var antonyms = [];
        request
            .get("http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords")
            .query({relationshipTypes: 'antonym'})
            .set("api_key", "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (res.body.length == 0)
                    console.log("No antonym");
                else {
                    antonyms = res.body[0].words;
                    for (i = 0; i < antonyms.length; i++) {
                        if (antonyms.length > 1)
                            console.log(antonyms[i] + ",");
                        else
                            console.log(antonyms[i]);
                    }
                }
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
                if (res.body.examples) {
                    examples = res.body.examples;
                    for (i = 0; i < examples.length; i++) {
                        console.log(examples[i].text);
                    }
                }
            });
    },
    getWordOfDay: function () {
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
                if (res.body.word)
                    return res.body.word;
            });
    }


};

var colors = require('colors');
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



var elements = [];
var heading = {};
var object = {};


module.exports = {

    printHeadingAndArrayElements: function (heading, elements) {
        console.log(heading + ": ".debug);
        // console.log(arrayElements);
        if (elements.length != 0) {
            for (i = 0; i < elements.length; i++)
                console.log(elements[i].info);
        } else console.log("No " + heading+" are available".imp);
    },
    printHeadingAndObject: function (heading, object) {
        console.log(heading+": ".debug);
        if (typeof object == 'undefined')
            console.log("No " + heading+" is available".imp);

        else console.log(object.info);
    }

};

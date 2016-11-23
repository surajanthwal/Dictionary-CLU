var elements = [];
var heading = {};
var object = {};


module.exports = {

    printHeadingAndArrayElements: function (heading, elements) {
        console.log(heading + ": ");
        // console.log(arrayElements);
        if (elements.length != 0) {
            for (i = 0; i < elements.length; i++)
                console.log(elements[i]);
        } else console.log("No " + heading+" are available");
    },
    printHeadingAndObject: function (heading, object) {
        console.log(heading+": ");
        if (typeof object == 'undefined')
            console.log("No " + heading+" is available");

        else console.log(object);
    }

};

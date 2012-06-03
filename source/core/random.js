define([
    './each',
    './keys',
    './range'
], function(each, keys, range) {
    /*
        Function: random
        
        Provides you with a random number or random item from an object or array.

        (start code)
        random(1, 10); // 3

        var list = [
            'foo',
            'bar',
            'baz'
        ];

        random(list); // bar
        (end)

        You can also set the scale to get decimal numbers or things such as multiples of 10.

        (start code)
        random(1, 10, 0.5); // 6.5
        (end)
        
        Parameters:
        
            from - Either the number to use as the start of the random range or a object or array to pick from.
            to - The highest random number to select from.
            scale - An optional scale to select the random number with. Defaults to 1. So you can select a decimal random number by changing it to 0.5.
        
        Returns:
        
            Either a random number between your specified range or a random item from an array or object.

        Requires:

            - <each>
            - <keys>
            - <range>
    */
    function random(from, to, scale) {
        // Check if the `from` is an iterable
        if(each(from)) {
            // It is, return a random item from this list using keys
            var listKeys = keys(from),
                rand = Math.floor(Math.random() * ((listKeys.length - 1) - 0 + 1)) + 0;

            return from[listKeys[rand]];
        }

        // This means `from` is a number
        // Generate a random list of numbers and return a random item from it
        return random(range(from, to, scale));
    }

    return random;
});
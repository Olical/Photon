define([
    './each'
], function(each) {
    /*
        Function: pick

        Returns an array containing all items from an object or array that caused your check function to return true.

        (start code)
        var list = [
            'foo',
            'foo',
            'bar',
            'foo'
        ];

        function checker(value, key) {
            if(value === 'foo') {
                return true;
            }

            return false;
        }

        pick(list, checker); // ['foo', 'foo', 'foo']
        (end)

        Parameters:

            list - Your object or array to loop over.
            checker - Your function that all values and keys should be passed to. This function should return either true or a falsy value. This can be either false or nothing at all.
            thisArg - An optional object that the this keyword should be set to within the loop.

        Returns:

            An array of items that caused your checker to return true.

        Requires:

            - <each>
    */
    function pick(list, checker, thisArg) {
        // Set up the array to return
        var picked = [];

        // Loop over all in the list
        each(list, function(value, key) {
            // If the checker returns true, add the item to the picked array
            if(checker(value, key)) {
                picked.push(value);
            }
        }, thisArg);

        return picked;
    }

    return pick;
});
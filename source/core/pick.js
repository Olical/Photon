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

        Returns:

            An array of items that caused your checker to return true.

        Requires:

            - <each>
    */
    function pick(list, checker) {
        // Set up the array to return
        var picked = [];

        // Loop over all in the list
        each(list, function(value, key) {
            // If the checker returns true, add the item to the picked array
            if(checker(value, key)) {
                picked.push(value);
            }
        });

        return picked;
    }

    return pick;
});
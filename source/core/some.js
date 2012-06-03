define([
    './each'
], function(each) {
    /*
        Function: some

        Returns true if any iterations over a list passed through a function return true. This allows you to make sure some values in a object or array meets your requirements.

        (start code)
        var good = [
            'foo',
            'bar',
            'baz', // THIS IS WHAT IT IS LOOKING FOR
            'bar'
        ];

        var bad = [
            'foo',
            'bar',
            'foo',
            'bar'
        ];

        function checker(value, key) {
            if(value === 'baz') {
                return true;
            }

            return false;
        }

        some(good, checker); // true
        some(bad, checker); // false
        (end)

        Parameters:

            list - Your object or array to check.
            checker - Your function that all values and keys should be passed to. This function should return either true or a falsy value. This can be either false or nothing at all.

        Returns:

            True if your checker function returned true for any, false if all returned falsy value such as null or undefined.

        Requires:

            - <each>
    */
    function some(list, checker) {
        // Set up the flag to return
        var pass = false;

        // Loop over all in the list
        each(list, function(value, key) {
            // If the checker returns true, the pass flag is now true
            if(checker(value, key)) {
                pass = true;
            }
        });

        return pass;
    }

    return some;
});
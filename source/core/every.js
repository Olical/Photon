define([
    './each'
], function(each) {
    /*
        Function: every

        Returns true if all iterations over a list passed through a function return true. This allows you to make sure a whole object or array meets your requirements.

        (start code)
        var good = [
            'foo',
            'bar',
            'foo',
            'bar'
        ];

        var bad = [
            'foo',
            'bar',
            'baz', // THIS IS THE ODD ONE OUT
            'bar'
        ];

        function checker(value, key) {
            if(value === 'foo' || value === 'bar') {
                return true;
            }

            return false;
        }

        every(good, checker); // true
        every(bad, checker); // false
        (end)

        Parameters:

            list - Your object or array to check.
            checker - Your function that all values and keys should be passed to. This function should return either true or a falsy value. This can be either false or nothing at all. It will receive the same arguments as the callback in <each>.
            thisArg - An optional object that the this keyword should be set to within the loop.

        Returns:

            True if your checker function returned true for all, false if any returned falsy value such as null or undefined.

        Requires:

            - <each>
    */
    function every(list, checker, thisArg) {
        // Loop over all in the list
        // Return the value that came out of each
        // Default to true
        return !each(list, function() {
            // If the checker returns false, the pass flag is now false
            if(!checker.apply(null, arguments)) {
                return true;
            }
        }, thisArg) || false;
    }

    return every;
});
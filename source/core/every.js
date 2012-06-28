define([
    './each',
    './type'
], function(each, type) {
    /*
        Function: every

        Returns true if all iterations over a list passed through a function return true. This allows you to make sure a whole object or array meets your requirements.

        The every function will leverage <Array.prototype.every at https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every> if it is present in your browser.

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
            - <type>
    */
    function every(list, checker, thisArg) {
        // Use the native method if found
        if(type(list) === 'array' && type(list.every) === 'function') {
            return list.every(function(value, key) {
                // Return the response of the checker
                return checker.call(thisArg || null, value, key, list, key);
            });
        }

        // Loop over all in the list
        // Return the value that came out of each
        // Default to true
        return !each(list, function() {
            // If the checker returns false, the pass flag is now false
            if(!checker.apply(this, arguments)) {
                return true;
            }
        }, thisArg) || false;
    }

    return every;
});
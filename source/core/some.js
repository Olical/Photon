define([
    './each',
    './type'
], function(each, type) {
    /*
        Function: some

        Returns true if any iterations over a list passed through a function return true. This allows you to make sure some values in a object or array meets your requirements.

        The some function will leverage <Array.prototype.some at https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some> if it is present in your browser.

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
            checker - Your function that all values and keys should be passed to. This function should return either true or a falsy value. This can be either false or nothing at all. It will receive the same arguments as the callback in <each>.
            thisArg - An optional object that the this keyword should be set to within the loop.

        Returns:

            True if your checker function returned true for any, false if all returned falsy value such as null or undefined.

        Requires:

            - <each>
            - <type>
    */
    function some(list, checker, thisArg) {
        // Use the native method if found
        if(type(list) === 'array' && type(list.some) === 'function') {
            // Return the result of the native method
            return list.some(function(value, key) {
                // Return the result of the checker
                return checker.call(thisArg || null, value, key, list, key);
            });
        }

        // Loop over all in the list
        // Return the result and default to false
        return each(list, function() {
            // If the checker returns true then break out with true
            if(checker.apply(null, arguments)) {
                return true;
            }
        }, thisArg) || false;
    }

    return some;
});
define([
    './each',
    './type'
], function(each, type) {
    /*
        Function: filter

        Returns an array containing all items from an object or array that caused your check function to return true.

        The filter function will leverage <Array.prototype.filter at https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter> if it is present in your browser.

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

        filter(list, checker); // ['foo', 'foo', 'foo']
        (end)

        Parameters:

            list - Your object or array to loop over.
            checker - Your function that all values and keys should be passed to. This function should return either true or a falsy value. This can be either false or nothing at all. It will receive the same arguments as the callback in <each>.
            thisArg - An optional object that the this keyword should be set to within the loop.

        Returns:

            An array of items that caused your checker to return true.

        Requires:

            - <each>
            - <type>
    */
    function filter(list, checker, thisArg) {
        // Use the native method if found
        if(type(list) === 'array' && type(list.filter) === 'function') {
            // Return the result of the native method
            return list.filter(function(value, key) {
                // Return the result of the checker
                return checker.call(thisArg || null, value, key, list, key);
            });
        }

        // Set up the array to return
        var filtered = [];

        // Loop over all in the list
        each(list, function(value) {
            // If the checker returns true, add the item to the filtered array
            if(checker.apply(this, arguments)) {
                filtered.push(value);
            }
        }, thisArg);

        return filtered;
    }

    return filter;
});
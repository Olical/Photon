define([
    './each',
    './type'
], function(each, type) {
    /*
        Function: keys
        
        Returns an array of keys from the passed array or object.

        The keys function will leverage <Object.keys at https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys> if it is present in your browser.

        (start code)
        var someObj = {
            foo: true,
            bar: false
        };

        keys(someObj)[1]; // bar
        (end)
        
        Parameters:
        
            list - The array or object to get the keys from.
        
        Returns:
        
            An array of keys from the passed object or array.

        Requires:

            - <each>
            - <type>
    */
    function keys(list) {
        // Use the native method
        if(type(list) === 'object' && type(Object.keys) === 'function') {
            // Return the result of the native method
            return Object.keys(list);
        }

        // Build the list of keys and return them
        var keyList = [];

        each(list, function(value, key) {
            keyList.push(key);
        });

        // Return the finished list
        return keyList;
    }

    return keys;
});
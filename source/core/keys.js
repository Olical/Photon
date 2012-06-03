define([
    './each'
], function(each) {
    /*
        Function: keys
        
        Returns an array of keys from the passed array or object.

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
    */
    function keys(list) {
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
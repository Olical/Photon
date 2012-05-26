define([
    './each',
    './index'
], function(each, index) {
    /*
        Function: contains
        
        Checks if the object, string or array contains an item. This item would be a sub string if you are searching a string.

        (start code)
        var str = 'photon';
        contains(str, 'pho'); // true
        contains(str, 'foo'); // false

        var arr = [1, 2, 3];
        contains(arr, 2); // true
        contains(arr, 5); // false

        var obj = {
            foo: 1,
            bar: 2
        };
        contains(obj, 2); // true
        contains(obj, 5); // false
        (end)
        
        Parameters:
        
            list - The list to check.
            item - The item (or substring) to check for.
        
        Returns:
        
            True if the item was found, false if not.

        Requires:

            - <each>
            - <index>
    */
    function contains(list, item) {
        // Initialise variables
        var res = false;
        
        // If the list is indexable
        if(index(list)) {
            return index(list, item) !== -1;
        }
        
        // This means it is an object, so do it the manual way
        each(list, function(value, key) {
            if(value === item) {
                res = true;
            }
        });
        
        // Return the result which will default to false
        return res;
    }
    
    return contains;
});
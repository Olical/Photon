define([
    './type',
    './each'
], function(type, each) {
    /*
        Function: index
        
        Returns the index of the item within the string or array. It will return -1 if not found.
        
        If you only pass a list and no item then it will return true or false depending on whether the list is indexable.

        (start code)
        var str = 'photon';
        index(str, 'ton'); // 3
        index(str, 'foo'); // -1

        var arr = [1, 2, 3];
        index(arr, 2); // 1
        index(arr, 5); // -1
        (end)
        
        Parameters:
        
            list - Array or string to search in.
            item - Item of sub string to search for.
        
        Returns:
        
            The location of the item in the list or -1 if not found.
            If you only pass a list then true or false depending on whether it is indexable or not.

        Requires:

            - <type>
            - <each>
    */
    function index(list, item) {
        // If the item is undefined then check if the list is indexable
        if(type(item) === 'undefined') {
            var listType = type(list);
            return (listType === 'string' || listType === 'array');
        }

        // Initialise the index count
        // Used for finding without the native indexOf
        var i = -1;
        
        // Use the native indexOf if available
        if(type(list.indexOf) === 'function') {
            return list.indexOf(item);
        }
        
        // If we reach here then native indexOf does not exists
        // Instead to a manual one
        each(list, function(value, index) {
            // If the value matches the item and the current index is -1
            // Store the new index
            if(value === item && i === -1) {
                i = index;
            }
        });
        
        // Return the index
        return i;
    }
    
    return index;
});
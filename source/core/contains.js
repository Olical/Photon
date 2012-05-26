define([
    './each',
    './type',
    './index'
], function(each, type, index) {
    /*
        Function: contains
        
        Checks if the object, string or array contains an item.
        This item would be a sub string if you are searching a string.
        
        Parameters:
        
            list - The list to check.
            item - The item (or substring) to check for.
        
        Returns:
        
            True if the item was found, false if not.
    */
    function contains(list, item) {
        // Initialise variables
        var res = false,
            listType = type(list);
        
        // If the list is a string, array or arguments list then use index
        if(listType === 'string' || listType === 'array' || listType === 'arguments') {
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
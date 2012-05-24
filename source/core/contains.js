define([
    './each',
    './type'
], function(each, type) {
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
        var res = false;
        
        // If the list is a string then check for the sub string
        if(type(list) === 'string') {
            return list.indexOf(item) !== -1;
        }
        
        // Loop over the list
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
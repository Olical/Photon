define([
    './type',
    './each'
], function(type, each) {
    /*
        Function: index
        
        Returns the index of the item within the string or array.
        It will return -1 if not found.
        
        Parameters:
        
            list - Array or string to search in.
            item - Item of sub string to search for.
        
        Returns:
        
            The location of the item in the list or -1 if not found.
    */
    function index(list, item) {
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
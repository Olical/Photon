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
        // Get the types and initialise the index count
        // Used for finding within an array
        var listType = type(list),
            itemType = type(item),
            i = -1;
        
        // If the list and item are strings then perform an indexOf
        if(listType === itemType && listType === 'string') {
            return list.indexOf(item);
        }
        else if(listType === 'array') {
            // It is an array, loop over searching for the item
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
    }
    
    return index;
});
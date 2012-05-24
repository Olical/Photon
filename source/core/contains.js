define('contains', ['./each'], function(each) {
    /*
        Function: contains
        
        Checks if the object or array contains an item.
        
        Parameters:
        
            list - The list to check.
            item - The item to check for.
        
        Returns:
        
            True if the item was found, false if not.
    */
    function contains(list, item) {
        // Initialise variables
        var res = false;
        
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
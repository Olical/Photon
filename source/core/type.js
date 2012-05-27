define(function() {
    /*
        Function: type
        
        Returns the type of the variable. It is an improved version of the typeof statement.

        (start code)
        var arr = [1, 2, 3];
        
        // The default JavaScript typeof is silly
        typeof arr; // object

        // This method is better
        type(arr); // array
        (end)
        
        Parameters:
        
            item - The variable to get the type of.
        
        Returns:
        
            A lowercase string of the variables type.
    */
    function type(item) {
        var itemType = typeof item;

        if(itemType === 'object') {
            if(item) {
                if(item instanceof Array || (typeof item.length === 'number' && item.callee)) {
                    itemType = 'array';
                }
            }
            else {
                itemType = 'null';
            }
        }
        
        return itemType;
    }
    
    return type;
});
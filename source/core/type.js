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
        // Get the base type using the native method
        var itemType = typeof item;

        // If native says it is an object, it probably isn't
        // Let's work out what it actually is
        if(itemType === 'object') {
            // First check if truthy
            if(item) {
                // Now if it has a nodeName it is an element of some kind
                // If not we check if it is an array
                if(item.nodeName) {
                    // Depending on the node type it is a different type of element
                    if(item.nodeType === 1) {
                        itemType = 'element';
                    }
                    else if(item.nodeType === 3) {
                        itemType = (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
                    }
                }
                else if(Object.prototype.toString.call(item) === '[object Array]') {
                    itemType = 'array';
                }
            }
            else {
                // It is a falsy object, therefore it is null
                itemType = 'null';
            }
        }

        // Return the correct type
        return itemType;
    }
    
    return type;
});
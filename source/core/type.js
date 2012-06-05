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
                if(item.nodeName) {
                    // Depending on the node type it is a different type of element
                    if(item.nodeType === 1) {
                        return 'element';
                    }

                    if(item.nodeType === 3) {
                        return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
                    }
                }

                // If not we check if it is an array
                if(Object.prototype.toString.call(item) === '[object Array]') {
                    return 'array';
                }
            }
            else {
                // It is a falsy object, therefore it is null
                return 'null';
            }
        }

        // Return the native type
        // This happens if nothing above matched and returned
        return itemType;
    }
    
    return type;
});
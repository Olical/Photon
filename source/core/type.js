define('type', function() {
    /*
        Function: type
        
        Returns the real type of the variable.
        
        Parameters:
        
            item - The variable to get the type of.
        
        Returns:
        
            A lowercase string of the real type.
    */
    function type(item) {
        // Get the raw type string
        // Split by spaces and get the second part
        // Remove the last character
        // Convert to lowercase
        // Return it
        return  Object.prototype.toString.call(item)
                .split(' ')[1]
                .slice(0, -1)
                .toLowerCase();
    }
    
    return type;
});
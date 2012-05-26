define(function() {
    /*
        Function: type
        
        Returns the real type of the variable. It is basically an improved version of the typeof statement.

        (start code)
        var arr = [1, 2, 3];
        
        // The default JavaScript typeof is silly
        typeof arr; // object

        // This method is better
        type(arr); // array
        (end)

        Be careful though. This method will also pick up argument arrays separate to arrays.

        (start code)
        function test(arr) {
            type(arguments); // arguments
            type(arr); // array
        }
        test([]);
        (end)

        So please remember to check for both.
        
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
        return Object.prototype.toString.call(item)
                .split(' ')[1]
                .slice(0, -1)
                .toLowerCase();
    }
    
    return type;
});
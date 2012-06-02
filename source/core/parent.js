define([
    './scope'
], function(scope) {
    /*
        Function: parent
        
        Allows you to call an overridden method from a parent class. It will also allow you to access variables such as strings from the parent.
        
        Parameters:
        
            host - The current class you are calling this from.
            scopeObj - The `this` from your current class.
        
        Returns:
        
            A copy of the inherited values that have not been overridden by the child class. All functions are wrapped in the scope of your current class instance.

        Requires:
        
            - <scope>
    */
    function parent(host, scopeObj) {
        // Recursively scope the object
        var inherits = scope(host._inherits, scopeObj);
        
        // Return the scoped object
        return inherits;
    }
    
    return parent;
});
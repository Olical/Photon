define(['./clone', './scope'], function(clone, scope) {
    /*
        Function: parent
        
        Allows you to call an overridden method from a parent class.
        It will also allow you to access variables such as strings from the parent.
        
        Parameters:
        
            host - The current class you are calling this from.
            scopeObj - The `this` from your current class.
        
        Returns:
        
            A copy of the inherited values that have not been override by the child class.
            All functions are wrapped in the scope of your current class instance.
    */
    function parent(host, scopeObj) {
        // Make another clone of the hosts inherited values
        // Also initialise the vt (value type) variable
        var inherits = clone(host._inherits),
            vt = null;
        
        // Recurse down this tree setting the scope of all functions
        function scopeLoop(list) {
            each(list, function(value, key) {
                // Get the values type
                vt = type(value);
                
                // If it is an object or array then recurse
                // Otherwise, if it is a function then set it's scope
                if(vt === 'object' || vt === 'array') {
                    scopeLoop(value);
                }
                else if(vt === 'function') {
                    value = scope(value, scopeObj);
                }
            });
        }
        scopeLoop(inherits);
        
        // Return the scoped object
        return inherits;
    }
    
    return parent;
});
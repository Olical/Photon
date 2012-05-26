define([
    './clone',
    './scope',
    './each',
    './type'
], function(clone, scope, each, type) {
    /*
        Function: parent
        
        Allows you to call an overridden method from a parent class.
        It will also allow you to access variables such as strings from the parent.
        Please bear in mind that this is shallow. It will not work for nested methods.
        
        Parameters:
        
            host - The current class you are calling this from.
            scopeObj - The `this` from your current class.
        
        Returns:
        
            A copy of the inherited values that have not been overridden by the child class. All functions are wrapped in the scope of your current class instance.
    */
    function parent(host, scopeObj) {
        // Make another clone of the hosts inherited values
        var inherits = clone(host._inherits);
        
        each(inherits, function(value, key) {
            // If it is a function then set it's scope
            if(type(value) === 'function') {
                inherits[key] = scope(value, scopeObj);
            }
        });
        
        // Return the scoped object
        return inherits;
    }
    
    return parent;
});
define([
    './clone',
    './scope',
    './each',
    './type'
], function(clone, scope, each, type) {
    /*
        Function: parent
        
        Allows you to call an overridden method from a parent class. It will also allow you to access variables such as strings from the parent.

        Please bear in mind that this is shallow. It will not work for nested methods. If you try to access a nested method with this then it will be called in the wrong context, you can fix that by manually running the method through <scope>. For an example of parent check the <Class> page.
        
        Parameters:
        
            host - The current class you are calling this from.
            scopeObj - The `this` from your current class.
        
        Returns:
        
            A copy of the inherited values that have not been overridden by the child class. All functions are wrapped in the scope of your current class instance.

        Requires:

            - <clone>
            - <scope>
            - <each>
            - <type>
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
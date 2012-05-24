define(function() {
    /*
        Function: scope
        
        Returns the function wrapped in another function that calls with the correct scope.
        
        Parameters:
        
            fn - Function to wrap in a scope.
            scopeObj - The scope object you wish to use. It will become `this` for the function.
        
        Returns:
        
            A copy of the function with the set scope.
    */
    function scope(fn, scopeObj) {
        return function() {
            return fn.apply(scopeObj, arguments);
        };
    }
    
    return scope;
});
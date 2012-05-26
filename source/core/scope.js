define(function() {
    /*
        Function: scope
        
        Returns the function wrapped in another function that calls with the correct scope. This means that if you have to call a function with a set scope you can create a copy of that function with your specified scope.

        (start code)
        // Create a basic function
        function noScope() {
            return this.foo;
        }

        // Create a scoped version
        var withScope = scope(noScope, {
            foo: true
        });

        // The default will be undefined
        noScope(); // undefined

        // But the one with the specified scope will be true
        withScope(); // true
        (end)
        
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
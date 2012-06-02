define([
    './each',
    './type',
    './clone'
], function(each, type, clone) {
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

        If you pass an object or array as the third argument then it will set the scope recursively. It will return the object or array with all functions scoped correctly.

        (start code)
        var before = {
            foo: function() {
                return this.scoped;
            },
            bar: {
                baz: function() {
                    return this.scoped;
                },
                test: 'hello'
            }
        };

        var after = scope(before, {scoped:true});

        before.bar.baz(); // undefined
        after.bar.baz(); // true
        (end)
        
        Parameters:
        
            fn - Function to wrap in a scope. If you pass an object then it will wrap any found functions recursively.
            scopeObj - The scope object you wish to use. It will become `this` for the function.
            recurse - Internal flag that stops multiple clones on recursion.
        
        Returns:
        
            A copy of the function with the set scope.

        Requires:

            - <each>
            - <type>
            - <clone>
    */
    function scope(fn, scopeObj, recurse) {
        // Recurse if required
        if(each(fn)) {
            var target = (recurse) ? fn : clone(fn);

            // Loop over all values in the fn iterable
            each(target, function(value, key) {
                // Recurse
                // Will either go deeper or wrap the function
                // It all depends on what it is
                target[key] = scope(value, scopeObj, true);
            });

            // Return the current variable
            return target;
        }

        return function() {
            return fn.apply(scopeObj, arguments);
        };
    }
    
    return scope;
});
define([
    './merge',
    './each',
    './clone',
    './type'
], function(merge, each, clone, type) {
    /*
        Class: Class

        The base class that all other classes should be created with. It is very similar to the Python style of classes. It can also inherit normal JavaScript classes, they do not have to be an instance of Class.

        You can use the inherits object to access untouched methods from the inherited classes. This means you can call methods you have just overridden. Here is a little example.
        
        (start code)
        var Foo = new Class();
        Foo.prototype.run = function() {
            // Original code
            ...
        };

        var Bar = new Class(Foo);
        Bar.prototype.run = function() {
            // Extra code
            ...
            
            // Execute the original code
            Bar.inherits.run.apply(this);
        };

        var test = new Bar();
        test.run();
        (end)

        As you can see, all methods are added via the prototype. This keeps with JavaScripts prototypical inheritance.

        If you need to check what class your instance came from you can use the parentClass attribute.

        (start code)
        var Foo = new Class();
        Foo.prototype.bar = function() {
            // Some code
        };

        var test = new Foo();
        if(test.parentClass === Foo) {
            console.log('Test is an instance of foo.');
        }
        (end)
        
        Parameters:
        
            Each parameter corresponds to another class to inherit from.

        Returns:

            Your built class for you to instantiate.

        Requires:

            - <merge>
            - <each>
            - <clone>
            - <type>
    */
    function Class() {
        // Initialise variables
        var cl = null,
            inherits = {};
        
        // Start the new class
        // This will call the constructor when initialized
        cl = function() {
            // Make sure we actually have a construct method
            if(type(this.construct) === 'function') {
                this.construct.apply(this, arguments);
            }

            // Set the instanceOf attribute
            // This contains a copy of the constructor class
            // Can be used to tell what something is
            this.parentClass = cl;
        };
        
        // Merge all passed classes into one object
        each(Array.prototype.slice.call(arguments), function(value, key) {
            inherits = merge(inherits, value.prototype);
        });
        
        // Replace the prototype with the inherited methods
        cl.prototype = inherits;
        
        // And make a clone of inherits
        // This is for use by the parent function
        cl.inherits = clone(inherits);
        
        // Return the finished class
        // You can now add your own methods
        return cl;
    }
    
    return Class;
});
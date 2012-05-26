define([
    './merge',
    './each',
    './clone',
    './type'
], function(merge, each, clone, type) {
    /*
        Class: Class
        
        The king of classes that everything else should extend.
        It is very similar to the Python style of classes.
        It can also extend normal JavaScript classes, they do not have to be an instance of Class.
        You can use the parent module to call untouched methods from the inherited classes.
        This means you can call methods you have just overridden.

        Here is a little example.

            var Foo = new Class();
            Foo.prototype.something = ...

            var Bar = new Class(Foo);
            Bar.prototype.somethingElse = ...

            var test = new Bar();
            test.something();
            test.somethingElse();
        
        Parameters:
        
            Each parameter corresponds to another class to inherit from.

        Returns:

            Your built class for you to instantiate.
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
        };
        
        // Merge all passed classes into one object
        each(arguments, function(value, key) {
            inherits = merge(inherits, value.prototype);
        });
        
        // Replace the prototype with the inherited methods
        cl.prototype = inherits;
        
        // And make a clone of inherits
        // This is for use by the parent function
        cl._inherits = clone(inherits);
        
        // Return the finished class
        // You can now add your own methods
        return cl;
    }
    
    return Class;
});
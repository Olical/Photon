define([
    './merge',
    './each',
    './clone',
    './type'
], function(merge, each, clone, type) {
    /*
        Class: Class

        The base class that all other classes should be created with. It is very similar to the Python style of classes. It can also inherit normal JavaScript classes, they do not have to be an instance of Class.

        You have to run methods you have overridden by calling the parent classes method. It may seem manual but it gives you so much more control than how other libraries such as MooTools implement it.
        
        (start code)
        var Foo = Class();
        Foo.fn.run = function() {
            // Original code
            ...
        };

        var Bar = Class(Foo);
        Bar.fn.run = function() {
            // Extra code
            ...
            
            // Execute the original code
            // Passing the arguments is optional, you decide what you want to pass
            Bar.fn.run.apply(this, arguments);
        };

        var test = new Bar();
        test.run();
        (end)

        As you can see, all methods are added via the fn object. fn is actually pointing at prototype, it is just a shortcut. Use prototype if you want. This keeps with JavaScripts prototypical inheritance.

        If you need to check what class your instance came from you can use the constructor attribute. Also note my lack of the new keyword when instantiating classes. You can use it if you want but it is not required.

        (start code)
        var Foo = Class();
        Foo.fn.bar = function() {
            // Some code
        };

        var test = new Foo();
        if(test.constructor === Foo) {
            console.log('Test is an instance of foo.');
        }
        (end)
        
        Parameters:
        
            Each parameter corresponds to another class to inherit from.

        Returns:

            Your built class for you to instantiate. If your construct method returns a value other than undefined then that value will be returned instead.

        Requires:

            - <merge>
            - <each>
            - <clone>
            - <type>
    */
    function Class() {
        // Setup the new class and any required variables
        var cl = function() {
                // Call the construct method if there is one
                if(type(this.construct) === 'function') {
                    this.construct.apply(this, arguments);
                }
            },
            protos = [];

        // Create the list of prototype from the passed classes
        each(arguments, function(parent) {
            protos.push(clone(parent.prototype));
        });

        // Create the new classes prototype from the inherited classes
        // Don't bother if there are no classes to inherit from
        if(protos.length > 0) {
            // By reversing the protos array the first class takes priority
            protos.reverse();

            // Now flatten the protos array down to a new prototype object
            cl.prototype = merge.apply(null, protos);
        }

        // Add a shortcut to the prototype
        cl.fn = cl.prototype;

        // Return the new class
        return cl;
    }
    
    return Class;
});
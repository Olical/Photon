define(['./merge', './each', './clone'], function(merge, each, clone) {
    /*
        Class: Class
        
        The king of classes that everything else should extend.
        
        Parameters:
        
            Each parameter corresponds to another class to inherit from.
    */
    function Class() {
        // Initialise variables
        var cl = null,
            inherits = {};
        
        // Start the new class
        // This will call the constructor when initialized
        cl = function() {
            // Make sure we actually have a construct method
            if(this.hasOwnProperty('construct')) {
                this.construct.apply(this, arguments);
            }
        };
        
        // Merge all passed classes into one object
        each(arguments, function(value, key) {
            inherits = merge(cl.prototype, value.prototype);
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
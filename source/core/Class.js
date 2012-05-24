define(['./merge', './each'], function(merge, each) {
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
        // Also clone it into _super, this will allow the super function to work
        cl.prototype = inherits;
        cl._super = clone(inherits);
        
        // Return the finished class
        // You can now add your own methods
        return cl;
    }
    
    return Class;
});
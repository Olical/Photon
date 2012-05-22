define(['./merge', './each'], function(merge, each) {
    /*
        Class: Class
        
        The king of classes that everything else should extend.
        
        Parameters:
        
            Each parameter corresponds to another class to inherit from.
    */
    function Class() {
        // Initialise the new class
        // This will call the constructor when initialized
        var cl = function() {
            this.construct.apply(this, arguments);
        };
        
        // Inherit from all passed classes
        each(arguments, function(value, key) {
            cl.prototype = merge(cl.prototype, value.prototype);
        });
        
        // Return the finished class
        // You can now add your own methods
        return cl;
    }
    
    return Class;
});
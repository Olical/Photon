define([
    './clone',
    './each',
    './type',
    './pick'
], function(clone, each, type) {
    /*
        Function: merge
        
        Returns an object containing all properties from the passed objects. The objects are first cloned to prevent horrible unforeseen consequences such as death and / or Armageddon. Then they are recursively merged.

        (start code)
        var baseSettings = {
            width: 100,
            height: 100,
            speed: 1
        };

        var passedSettings = {
            height: 150,
            speed: 0.8
        };

        var merged = merge(baseSettings, passedSettings);

        // You will end up with the following:
        // {
        //     width: 100,
        //     height: 150,
        //     speed: 0.8
        // }
        (end)

        Parameters:
        
            Each argument corresponds to an object to merge. The further right the argument the more priority it has. So the one of the left will be overridden if the property appears in an object to the right.
        
        Returns:
        
            A new object containing properties from both the base and extra objects.

        Requires:

            - <clone>
            - <each>
            - <type>
            - <pick>
    */
    function merge() {
        // Initialise variables
        var merged = {},
            previous = null;

        // Loop over all passed objects
        each(arguments, function(obj) {
            // Loop over all values found in this object
            each(clone(obj), function(value, key) {
                // If this and the previous objects version are both objects then recurse
                if(type(value) === 'object' && previous && type(previous[key]) === 'object') {
                    merged[key] = merge(value, previous[key]);
                }
                else {
                    // Otherwise, just dump it in
                    merged[key] = value;
                }
            });

            // Set up the previous object to be used in the next iteration
            previous = obj;
        });

        return merged;
    }
    
    return merge;
});
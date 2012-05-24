define(['./type', './contains', './each'], function(type, contains, each) {
    /*
        Function: clone
        
        Returns a deep copy of the passed object or array.
        It will recurse on arrays and objects.
        
        Parameters:
        
            orig - Object or array to clone.
            shallow - If true it will not recurse. This is faster for one level deep lists.
        
        Returns:
        
            A clone of the passed object or array.
    */
    function clone(orig, shallow) {
        // Initialise variables
        var copy = null,
            origType = type(orig);
        
        // The copy can be an array of object, depends on the originals type
        // The originals type can be an array on recursion
        if(origType === 'object') {
            copy = {};
        }
        else if(origType === 'array') {
            copy = [];
        }
        
        // Loop over all the lists properties
        each(orig, function(value, key) {
            // If the current item is an object or array then recurse
            // Store the recursed item in the place of the current item
            // Only do this if shallow is not true
            if(shallow !== true && contains(['object', 'array'], type(value))) {
                copy[key] = clone(value);
            }
            else {
                // It is not an object or array, just store it
                // This could also mean that shallow is true
                copy[key] = value;
            }
        });
        
        return copy;
    }
    
    return clone;
});
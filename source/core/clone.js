define([
    './type',
    './contains',
    './each'
], function(type, contains, each) {
    /*
        Function: clone
        
        Returns a deep copy of the passed object or array. It will recurse on what <each> deems iterable. So things like arrays and objects.

        Without cloning an array or object then two variables can actually point to the same object. Here is an example and how cloning fixes it.

        (start code)
        // Create an array and copy it
        var a = [1, 2, 3];
        var b = a;

        // When pushing to b it is also pushed to a because it is a copy
        b.push(4);
        b[3]; // is 4
        a[3]; // is 4, should ideally be undefined

        // A clone will not do this
        a = [1, 2, 3];
        b = clone(a);

        b.push(4);
        b[3]; // is 4
        a[3]; // is undefined
        (end)
        
        Parameters:
        
            orig - Object or array to clone.
            shallow - If true it will not recurse. This is faster for one level deep lists.
        
        Returns:
        
            A clone of the passed object or array.

        Requires:

            - <type>
            - <contains>
            - <each>
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
            // If the current item is iterable then recurse
            // Store the recursed item in the place of the current item
            // Only do this if shallow is not true
            if(shallow !== true && each(value)) {
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
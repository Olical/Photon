define([
    './clone',
    './each',
    './type'
], function(clone, each, type) {
    /*
        Function: merge
        
        Returns an object containing all properties from the two passed objects. The objects are first cloned to prevent horrible unforeseen consequences such as death and / or Armageddon. Then they are recursively merged unless shallow is specified as true.

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
        
            base - Base object to merge with.
            extra - Object of new properties to add, will override existing ones in base under the same name.
            shallow - Only merge the first level. Faster for shallow objects.
        
        Returns:
        
            A new object containing properties from both the base and extra objects.

        Requires:

            - <clone>
            - <each>
            - <type>
    */
    function merge(base, extra, shallow) {
        // First clone both objects
        // This is so it does not kill the original objects
        var baseClone = clone(base),
            extraClone = clone(extra);
        
        // Now loop over extra dropping each property into base
        each(extraClone, function(value, key) {
            // If the value and base value are objects and shallow is not true then recurse down it
            if(shallow !== true && type(value) === 'object' && type(baseClone[key] === 'object')) {
                // Initialise the current item as an object if required
                baseClone[key] = baseClone[key] || {};

                // Now perform the recursive merge
                baseClone[key] = merge(baseClone[key], value);
            }
            else {
                // Otherwise just copy the value into the base
                baseClone[key] = value;
            }
        });
        
        // Now return the merged object
        return baseClone;
    }
    
    return merge;
});
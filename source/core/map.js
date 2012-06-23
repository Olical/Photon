define([
    './each',
    './type'
], function(each, type) {
    /*
        Function: map
        
        Creates a new object or array with the results of calling a provided function on every element in the passed variable. You can pass it an object or array to map with.

        (start code)
        var a = [1, 2, 3];

        var b = map(a, function(value) {
            return value + 1;
        });

        // b = [2, 3, 4]
        (end)
        
        Parameters:
        
            list - An array or object to run over.
            mapper - The method to pass each value to. It will be passed the value, key and index. Just like <each>.
            thisArg - An optional object that the this keyword should be set to within the loop.
        
        Returns:
        
            Either an object or an array, depending on what type of list you passed, containing everything returned from your mapper function.

        Requires:

            - <each>
            - <type>
    */
    function map(list, mapper, thisArg) {
        // Set up the value to return
        // It's type copies the lists type
        var isArray = type(list) === 'array';
            mapped = isArray ? [] : {},
            result = null;

        // Loop over the list adding to the mapped list
        each(list, function(value, key, index) {
            // Get the result from the mapper
            result = mapper.apply(null, arguments);

            // If it is an array then push, if not use a key
            if(isArray) {
                mapped.push(result);
            }
            else {
                mapped[key] = result;
            }
        }, thisArg);

        return mapped;
    }

    return map;
});
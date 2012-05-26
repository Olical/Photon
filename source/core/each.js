define([
    './type'
], function(type) {
    /*
        Function: each
        
        Loops over the passed object, string or array and passes each value and key to the callback.
        If you only pass a list and no callback then it will return true or false depending on whether the list is iterable.
        A string is actually iterable, as in you can pass it to each. But the iterable check will deny strings.
        This is because iterating over strings is so rare and causes a lot of problems in internal loops.
        The iterable check should be used to see if the item can contains other items.
        If the recurse parameter is true then it will recurse down the passed tree. It will recurse on anything each deems iterable.
        
        Parameters:
        
            list - Object, string or array to loop over.
            callback - Function for the value and key to be passed to. For an array the key would be the index.
            recurse - If true then it will recurse down the tree on anything that each deems iterable.

        Returns:

            If you only pass a list then true or false depending on whether it is iterable or not.
    */
    function each(list, callback, recurse) {
        // Initialise variables
        var key = null,
            listType = type(list);
        
        // If the item is undefined then check if the list is iterable
        if(type(callback) === 'undefined') {
            return (listType === 'array' || listType === 'arguments' || listType === 'object');
        }

        // Loop over the list in different ways depending on what it is
        if(listType === 'object') {
            for(key in list) {
                // Make sure it is not from the prototype
                if(list.hasOwnProperty(key)) {
                    // Recurse if required
                    if(recurse && each(list[key])) {
                        each(list[key], callback, recurse);
                    }
                    else {
                        callback.call(null, list[key], key);
                    }
                }
            }
        }
        else if(listType === 'array' || listType === 'string' || listType === 'arguments') {
            for(key = 0; key < list.length; key += 1) {
                // Recurse if required
                if(recurse && each(list[key])) {
                    each(list[key], callback, recurse);
                }
                else {
                    callback.call(null, list[key], key);
                }
            }
        }
    }
    
    return each;
});
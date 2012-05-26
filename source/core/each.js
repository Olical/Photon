define([
    './type'
], function(type) {
    /*
        Function: each
        
        Loops over the passed object, string or array and passes each value and key to the callback.
        If you only pass a list and no callback then it will return true or false depending on whether the list is iterable.
        
        Parameters:
        
            list - Object, string or array to loop over.
            callback - Function for the value and key to be passed to. For an array the key would be the index.

        Returns:

            If you only pass a list then true or false depending on whether it is iterable or not.
    */
    function each(list, callback) {
        // Initialise variables
        var key = null,
            listType = type(list);
        
        // If the item is undefined then check if the list is indexable
        if(type(callback) === 'undefined') {
            return (listType === 'array' || listType === 'arguments' || listType === 'object');
        }

        // Loop over the list in different ways depending on what it is
        if(listType === 'object') {
            for(key in list) {
                // Make sure it is not from the prototype
                if(list.hasOwnProperty(key)) {
                    callback.call(null, list[key], key);
                }
            }
        }
        else if(listType === 'array' || listType === 'string' || listType === 'arguments') {
            for(key = 0; key < list.length; key += 1) {
                callback.call(null, list[key], key);
            }
        }
    }
    
    return each;
});
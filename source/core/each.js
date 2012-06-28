define([
    './type'
], function(type) {
    /*
        Function: each
        
        Loops over the passed object or array and passes each value, key, original iterable and iteration count to the callback.
        
        If you only pass a list and no callback then it will return true or false depending on whether the list is iterable. The iterable check should be used to see if the item can contain other items.

        The each function with leverage <Array.prototype.forEach at https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach> if it is present in your browser.

        (start code)
        // Get some example data
        var users = getUsers();

        // Lets pretend it contained something like this:
        // {
        //     'Joe Blogs': {
        //         age: 20
        //     }
        // }
        
        // Loop over the data
        each(users, function(value, key, arr, iteration) {
            // Do stuff with it
            console.log(key + ' is ' + value.age + ' years old. Iteration: ' + iteration + ' of ' (arr.length - 1));
        });
        
        // Loop with thisArg set
        each(someArray, function() {
            this.foo = true;
        }, aScopeObject);
        
        // aScopeObject.foo === true
        (end)

        If an iteration returns something other than undefined then each will break out of the loop and return that value.
        
        Parameters:
        
            list - Object or array to loop over.
            callback - Function for the value, key, original iterable and iteration to be passed to. For an array the key would be the same as the iteration.
            thisArg - An optional object that the this keyword should be set to within the loop.

        Returns:

            If you only pass a list then true or false depending on whether it is iterable or not. If your iterator returns something other than undefined then it will return that value and break out of the loop.

        Requires:

            - <type>
    */
    function each(list, callback, thisArg) {
        // Initialise variables
        var key = null,
            listType = type(list),
            res = null,
            iter = 0;
        
        // If the item is undefined then check if the list is iterable
        if(type(callback) === 'undefined') {
            return (listType === 'array' || listType === 'object');
        }

        // Loop over the list in different ways depending on what it is
        if(listType === 'object') {
            for(key in list) {
                // Make sure it is not from the prototype
                if(list.hasOwnProperty(key)) {
                    res = callback.call(thisArg || null, list[key], key, list, iter);
                    iter += 1;

                    if(type(res) !== 'undefined') {
                        return res;
                    }
                }
            }
        }
        else if(listType === 'array') {
            // Use the native method if it is there
            if(type(list.forEach) === 'function') {
                // Loop with the native method
                list.forEach(function(value, key) {
                    // Pass the values through to the callback
                    res = res || callback.call(thisArg || null, value, key, list, key);
                });

                // Return the result if not undefined
                if(type(res) !== 'undefined') {
                    return res;
                }
            }
            else {
                for(key = 0; key < list.length; key += 1) {
                    res = callback.call(thisArg || null, list[key], key, list, key);

                    if(type(res) !== 'undefined') {
                        return res;
                    }
                }
            }
        }
    }
    
    return each;
});
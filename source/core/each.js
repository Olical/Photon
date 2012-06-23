define([
    './type'
], function(type) {
    /*
        Function: each
        
        Loops over the passed object, string or array and passes each value, key and iteration count to the callback.
        
        If you only pass a list and no callback then it will return true or false depending on whether the list is iterable. A string is actually iterable, as in you can pass it to each. But the iterable check will deny strings.
        
        This is because iterating over strings is so rare and causes a lot of problems in internal loops. The iterable check should be used to see if the item can contains other items.

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
        each(users, function(value, key, iteration) {
            // Do stuff with it
            console.log(key + ' is ' + value.age + ' years old. Iteration: ' + iteration);
        });
        (end)

        If an iteration returns something other than undefined then each will break out of the loop and return that value.
        
        Parameters:
        
            list - Object, string or array to loop over.
            callback - Function for the value, key and iteration to be passed to. For an array the key would be the same as the iteration.

        Returns:

            If you only pass a list then true or false depending on whether it is iterable or not. If your iterator returns something other than undefined then it will return that value and break out of the loop.

        Requires:

            - <type>
    */
    function each(list, callback) {
        // Initialise variables
        var key = null,
            listType = type(list),
            str = listType === 'string',
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
                    res = callback(list[key], key, iter);
                    iter += 1;

                    if(type(res) !== 'undefined') {
                        return res;
                    }
                }
            }
        }
        else if(listType === 'array' || str) {
            for(key = 0; key < list.length; key += 1) {
                res = callback((str) ? list.charAt(key) : list[key], key, key);

                if(type(res) !== 'undefined') {
                    return res;
                }
            }
        }
    }
    
    return each;
});
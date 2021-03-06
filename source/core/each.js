define([
    './type'
], function(type) {
    /*
        Function: each
        
        Loops over the passed object, string or array and passes each value and key to the callback.
        
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
        each(users, function(value, key) {
            // Do stuff with it
            console.log(key + ' is ' + value.age + ' years old.');
        });
        (end)

        Be careful, if you pass an arguments array then it will break. This is because arguments is not really an array but an object with a length. If you need to pass it then please convert it to a real array like so.

        (start code)
        function someFunc() {
            var safeArgs = Array.prototype.slice.call(arguments);

            each(safeArgs, function() {
                // ...
            });
        }
        (end)
        
        Parameters:
        
            list - Object, string or array to loop over.
            callback - Function for the value and key to be passed to. For an array the key would be the index.

        Returns:

            If you only pass a list then true or false depending on whether it is iterable or not.

        Requires:

            - <type>
    */
    function each(list, callback) {
        // Initialise variables
        var key = null,
            listType = type(list),
            str = listType === 'string';
        
        // If the item is undefined then check if the list is iterable
        if(type(callback) === 'undefined') {
            return (listType === 'array' || listType === 'object');
        }

        // Loop over the list in different ways depending on what it is
        if(listType === 'object') {
            for(key in list) {
                // Make sure it is not from the prototype
                if(list.hasOwnProperty(key)) {
                    callback(list[key], key);
                }
            }
        }
        else if(listType === 'array' || str) {
            for(key = 0; key < list.length; key += 1) {
                callback((str) ? list.charAt(key) : list[key], key);
            }
        }
    }
    
    return each;
});
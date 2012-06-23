define([
    '../core/Class',
    '../core/type',
    '../core/each',
    '../core/index'
], function(Class, type, each, index) {
    /*
        Class: Events

        An event managing class that can be extended by your classes. It allows you to add, remove and fire your own custom events.

        (start code)
        // Create a class which extends events
        var MyClass = Class(Events);

        // Fire an event when foo is called
        MyClass.fn.foo = function() {
            this.fireEvent('bar', [200, 320]);
        };

        // Create an instance of your class
        var test = new MyClass();

        // Register a method into the event
        test.addEvent('bar', function(a, b) {
            console.log('Bar event fired, it passed the following: ' + a + ' and ' + b);
        });

        // Call foo which will cause the event to fire
        test.foo();

        // Remove all listeners for the event
        test.removeEvent('foo');
        (end)

        Requires:

            - <Class>
            - <type>
            - <each>
            - <index>
    */
    var Events = Class();

    /*
        Function: getEvents

        Retrieves the events object for this instance. It will create it if it does not already exist.

        If you pass it a key then it will get that specific event array out of the events storage object. It will create the array if it does not exist already.

        This function is mainly for internal use.

        Parameters:

            key - An optional event name. If you do not pass it the whole storage object is returned. If you do pass it then the correct storage array is returned.

        Returns:

            The object that contains all events. It will create it if it does not exist yet.
    */
    Events.fn.getEvents = function(key) {
        // If a key is passed then we need to get the specific array
        // If not, fall past this and just get the storage object
        if(key) {
            // First fetch the storage object
            var events = this.getEvents();

            // Create the storage array if it is not present
            if(!events[key]) {
                events[key] = [];
            }

            return events[key];
        }
        
        // Create the event storage object if not already created
        if(!this._photonEvents) {
            this._photonEvents = {};
        }

        return this._photonEvents;
    };

    /*
        Function: addEvent

        Registers your passed function to the provided event. You can place an object in place of an event name to add multiple events at once.

        Parameters:

            key - Either a event name string to register to or an object of names and functions to register.
            fn - If the key is a string then this is the function that will be registered to the event. It will be ignored if key is an object.

        Returns:

            This class instance.
    */
    Events.fn.addEvent = function(key, fn) {
        // Initialise variables
        var self = this,
            events = self.getEvents();

        // If event is an object then recursively add events
        if(type(key) === 'object') {
            each(key, function(fn, key) {
                self.addEvent(key, fn);
            });
        }
        else {
            // So we need to add the event to the storage
            // Fetch the storage array and add the method
            self.getEvents(key).push(fn);
        }

        return self;
    };

    /*
        Function: removeEvent

        Removes specified events from the instance. If you pass nothing then all events will be removed. If you pass just a key then all for that key will be removed. If a key and function are passed then that specific event is removed.

        You can also pass an object as the first argument where the key is the event and the value is your optional function parameter.

        Parameters:

            key - The event to remove. If this is a string and no function is passed then all listeners for this event will be removed. If this is undefined then ALL events will be removed from the instance. You can also pass an object of key value pairs to remove multiple at once.
            fn - If the key is a string then this will be the listener to look for and remove in your specified event. It has to be a reference to your original function used.

        Returns:

            This class instance.
    */
    Events.fn.removeEvent = function(key, fn) {
        // Initialise variables
        var self = this,
            events = self.getEvents(),
            eventList = null,
            toDelete = null;

        // If event is an object then recursively remove events
        if(type(key) === 'object') {
            each(key, function(fn, key) {
                self.removeEvent(key, fn);
            });
        }
        else if(key) {
            // Check for a passed function
            if(fn) {
                // This means a string and function have been passed
                // We need to remove the correct one

                // Get the events storage array
                eventList = self.getEvents(key);

                // Get the index of the event
                toDelete = index(eventList, fn);

                // If it was found then splice it out
                if(toDelete !== -1) {
                    eventList.splice(toDelete, 1);
                }

                // If there is nothing left, just delete the array
                if(eventList.length === 0) {
                    delete events[key];
                }
            }
            else {
                // This means just a key has been passed
                // Remove all events for that string
                delete events[key];
            }
        }
        else {
            // Nothing was passed, remove everything
            self._photonEvents = {};
        }

        return self;
    };

    /*
        Function: fireEvent

        Executes all listeners for a specified event. You can also pass an array of arguments to be passed to every listener. Just like the other methods, you can pass an object as the first argument to fire multiple events. So the keys of the objects would represent the event name and the values would be the arrays of arguments.

        Parameters:

            key - The name of the event to fire. You can also pass an object with events as keys and optional argument arrays as values.
            args - An optional array of arguments to pass to the listeners. Will be ignored if you use an object for the first argument.

        Returns:

            This class instance.
    */
    Events.fn.fireEvent = function(key, args) {
        // Initialise variables
        var self = this;

        // If event is an object then recursively fire events
        if(type(key) === 'object') {
            each(key, function(args, key) {
                self.fireEvent(key, args);
            });
        }
        else {
            // Loop over all of the listeners
            each(self.getEvents(key), function(e) {
                // Execute the listener
                if(args) {
                    e.apply(null, args);
                }
                else {
                    e();
                }
            });
        }

        return self;
    };

    return Events;
});
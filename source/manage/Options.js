define([
    '../core/Class',
    '../core/merge'
], function(Class, merge) {
    /*
        Class: Options

        A class you can extend to add options to your class. It stores it's options in the options object. You can merge more options with the options object by calling <setOptions>.

        (start code)
        // Create your class that extends Options
        var MyClass = Class(Options);
        
        // Optionally set some default options
        MyClass.fn.options = {
            color: '#FF0000',
            size: 16
        };

        // Store the options when your constructor is called
        MyClass.fn.construct = function(options) {
            this.setOptions(options);
        };

        // Use your options in a method
        MyClass.fn.foo = function(bar) {
            bar.doStuff(this.options.size, this.options.color);
        };

        // Then when initializing...
        var test = new MyClass({
            color: '#0000FF'
        });

        // Size will default to 16, color with be overridden
        (end)

        Requires:

            - <Class>
            - <merge>
    */
    var Options = Class();

    /*
        Function: setOptions

        Merges the passed options object with this.options. It will create the options object if it is not already there.

        Parameters:

            options - An options object to merge with the existing one.

        Returns:

            The current class instance.
    */
    Options.fn.setOptions = function(options) {
        // Create the options object if not already
        // Try to use the passed options, default to a blank object
        if(!this.options) {
            this.options = options || {};
        }
        else if(options) {
            // It already exists and options were passed, merge them
            this.options = merge(this.options, options);
        }

        return this;
    };

    return Options;
});
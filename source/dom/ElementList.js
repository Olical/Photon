define([
    '../core/Class',
    '../core/each',
    './Element'
], function(Class, each, Element) {
    /*
        Class: ElementList

        A wrapper to contain an array of elements. It maps methods from the <Element> class to a version that will be run on all items like this.

        (start code)
        var list = new ElementList([el, ...]);
        list.addClass('foo'); // foo added to all elements
        (end)

        If you wish to edit the actual array inside it to add or remove elements then you must access the `items` attribute.

        (start code)
        // Need to loop over all? Use list.items.
        var list = new ElementList([el, ...]);

        each(list.items, function() {
            // ...
        });

        // All array methods are found here
        list.items.push(new Element('div'));
        (end)

        All elements within this array are instances of <Element>.

        Requires:

            - <Class>
            - <each>
            - <Element>
    */
    var ElementList = new Class();

    /*
        Function: construct

        Initialises the storage array and places any passed elements inside it.

        Parameters:

            els - An array of native DOM elements or instances of <Element>. You do not have to pass it. You can add more later with: `yourList.items.push(...)`.
    */
    ElementList.prototype.construct = function(els) {
        // Create a reference to this to be used in the loop
        var self = this;

        // Initialise the storage array
        self.items = [];

        // If any elements were passed then loop over them
        // Wrap every element in an instance of Element and dump it in the storage array
        if(els) {
            each(els, function(el) {

            });
        }
    };

    ElementList.prototype.contains = function() {

    };

    return ElementList;
});
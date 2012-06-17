define([
    '../core/Class',
    '../core/each',
    '../core/contains',
    './Element'
], function(Class, each, contains, Element) {
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

        An element list has one main method, matches. It checks if any elements in the list match the passed element. As well as this there are mappings to run many of the element method on all elements in the list, the available methods are as follows.

            - <Element.setAttribute>
            - <Element.removeAttribute>
            - <Element.insertBefore>
            - <Element.insertLast>
            - <Element.insertAfter>
            - <Element.insertFirst>
            - <Element.remove>
            - <Element.setClasses>
            - <Element.addClass>
            - <Element.removeClass>
            - <Element.toggleClass>
            - <Element.setHtml>
            - <Element.setText>
            - <Element.setStyle>

        Requires:

            - <Class>
            - <each>
            - <contains>
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
        // Only add if it is not already in
        if(els) {
            // If els is an ElementList then it will extract it's elements
            each((els.parentClass === ElementList) ? els.items : els, function(el) {
                if(!self.matches(el)) {
                    self.items.push(new Element(el));
                }
            });
        }
    };

    /*
        Function: matches

        Returns true if any of the stored elements match the passed one.

        Parameters:

            el - The element to look for.

        Returns:

            True if any matched, false if not.
    */
    ElementList.prototype.matches = function(el) {
        var target = new Element(el);
        return each(this.items, function(value) {
            if(target.matches(value)) {
                return true;
            }
        }) || false;
    };

    // Add all basic looping methods
    var methods = [
        'setAttribute',
        'removeAttribute',
        'insertBefore',
        'insertLast',
        'insertAfter',
        'insertFirst',
        'remove',
        'setClasses',
        'addClass',
        'removeClass',
        'toggleClass',
        'setHtml',
        'setText',
        'setStyle'
    ];
    each(Element.prototype, function(fn, key) {
        // If the function is found in the array
        if(contains(methods, key)) {
            // Add a new method to the list prototype under the same name
            ElementList.prototype[key] = function() {
                // Put the arguments in scope
                var args = arguments;

                // Call the matched method with all arguments and the scope set to each element
                each(this.items, function(item) {
                    fn.apply(item, args);
                });

                // Return the list
                return this;
            };
        }
    });

    return ElementList;
});
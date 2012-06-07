define([
    '../core/Class',
    '../core/type'
], function(Class, type) {
    /*
        Class: Element
        
        Base element class. It is a container for native DOM elements that provides a normalised API for the DOM.

        All methods that should be passed an element can either be passed a native DOM element or an instance of this class. All elements returned by these methods will be wrapped in an instance of this class.

        Requires:

            - <Class>
            - <type>
    */
    var Element = new Class();

    /*
        Function: construct

        Called when you initialise a new Element. It will adopt the passed native DOM element as well as any passed instance of this class.

        If you pass a string then a new element will be created using the string as it's tag name.

        Parameters:

            el - Either a string to create an element with, an existing native DOM element or another instance of this class.
    */
    Element.prototype.construct = function(el) {
        // Check what el is
        if(type(el) === 'string') {
            // If it is a string then create a new element
            this.element = document.createElement(el);
        }
        else {
            // It is not a string, must be an existing element
            // If the element is an instance of the element class then adopt it's element
            // Otherwise adopt el as it is
            if(el.parentClass === Element) {
                // It is, adopt it
                this.element = el.element;
            }
            else {
                // Otherwise it is a native DOM element
                // Adopt it
                this.element = el;
            }
        }

        // Store information about the element
        this.tag = this.element.tagName.toLowerCase();
        this.type = this.element.nodeType;
    };

    /*
        Function: getParent
        
        Retrieves the parent of the current element.

        Returns:

            The parent of the current element. If there is no parent then it will return false.
    */
    Element.prototype.getParent = function() {
        // Get the parent
        var parent = this.element.parentElement || this.element.parentNode;

        // If it is truthy then return the element, otherwise return false
        if(parent) {
            return new Element(parent);
        }

        return false;
    };

    /*
        Function: getParents

        Retrieves all parents of the current element by recursing up the DOM tree.

        Returns:

            An array of parent elements for the current element. The first is the first parent, the last is the last parent, this should be the html tag in most cases.
    */
    Element.prototype.getParents = function() {
        // Set up the variables
        var parents = [],
            parent = null;

        // Keep looping up the tree getting parents until it is false
        while((parent = parent.getParent())) {
            parents.push(parent);
        }

        // Return the list
        return parents;
    };

    return Element;
});
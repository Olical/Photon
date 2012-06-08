define([
    '../core/Class',
    '../core/type',
    '../core/each'
], function(Class, type, each) {
    /*
        Class: Element
        
        Base element class. It is a container for native DOM elements that provides a normalised API for the DOM.

        All methods that should be passed an element can either be passed a native DOM element or an instance of this class. All elements returned by these methods will be wrapped in an instance of this class.

        Requires:

            - <Class>
            - <type>
            - <each>
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
        Function: setAttribute

        Sets the specified attribute to the specified value. Also accepts an object of keys and values.

        Parameters:

            key - Either the attribute key as a string or an object of keys and values.
            value - If the key is a string then this string will be set as the attributes value.

        Returns:

            The current element.
    */
    Element.prototype.setAttribute = function(key, value) {
        // Initialise variables
        var self = this;

        // If the key is an object then set each one
        if(type(key) === 'object') {
            each(key, function(value, key) {
                self.setAttribute(key, value);
            });
        }
        else {
            // If it is not an object then simply set the attribute
            self.element.setAttribute(key, value);
        }

        return this;
    };

    /*
        Function: hasAttribute
        
        Checks if the element has the specified attribute.

        Parameters:

            key - The name of the attribute to check for.

        Returns:

            Either true or false. It will return true if the element has the attribute and false if not.
    */
    Element.prototype.hasAttribute = function(key) {
        return this.element.hasAttribute(key);
    };

    /*
        Function: getAttribute

        Retrieves the named attribute from the element. If no key is passed then all attributes will be returned in an object.

        Parameters:

            key - The name of the value you wish to retrieve, such as `title`. If not passed then you will be given all attributes in an object.

        Returns:

            The found value or null if there was none. If there is no key then an object will be returned containing all of the attributes.

            If there are no attributes a blank object will be returned.
    */
    Element.prototype.getAttribute = function(key) {
        // Check for the key
        if(key) {
            // We have one, check if it exits
            if(this.hasAttribute(key)) {
                // It does, return it
                return this.element.getAttribute(key);
            }
        }
        else {
            // There is no key, return the attribute object
            return this.element.attributes;
        }

        // Default to null, this will only happen if a key was passed and no value was found
        return null;
    };

    /*
        Function: removeAttribute
        
        Removes the specified attribute or array of attributes.

        Parameters:

            key - The name of the attribute to remove or an array of names to remove.

        Returns:

            The current element.
    */
    Element.prototype.removeAttribute = function(key) {
        // Initialise variables
        var self = this;

        // If the key is an array then remove each one
        if(type(key) === 'array') {
            each(key, function(value) {
                self.removeAttribute(value);
            });
        }
        else {
            // If it is not an array then simply remove the attribute
            self.element.removeAttribute(key);
        }

        return self;
    };

    /*
        Function: getParent
        
        Retrieves the parent of the current element.

        Returns:

            The parent of the current element. If there is no parent then it will return null.
    */
    Element.prototype.getParent = function() {
        // Get the parent
        var parent = this.element.parentElement || this.element.parentNode;

        // If it is truthy then return the element, otherwise return null
        if(parent && parent !== document) {
            return new Element(parent);
        }

        return null;
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
            parent = this;

        // Keep looping up the tree getting parents until it is null
        while((parent = parent.getParent())) {
            parents.push(parent);
        }

        // Return the list
        return parents;
    };

    /*
        Function: getNext

        Gets the next sibling element of this element.

        Returns:

            The next sibling element. If there is no next element then it will return null.
    */
    Element.prototype.getNext = function() {
        var res = this.element.nextElementSibling;

        // Return the wrapped version if not null
        if(res) {
            return new Element(res);
        }

        // If not, default to null
        return res;
    };

    /*
        Function: getPrevious

        Gets the previous sibling element of this element.

        Returns:

            The previous sibling element. If there is no previous element then it will return null.
    */
    Element.prototype.getPrevious = function() {
        var res = this.element.previousElementSibling;

        // Return the wrapped version if not null
        if(res) {
            return new Element(res);
        }

        // If not, default to null
        return res;
    };

    /*
        Function: insertBefore

        Inserts the element before the specified element.

        Parameters:

            el - The element to insert the current element before.

        Returns:

            The current element.
    */
    Element.prototype.insertBefore = function(el) {
        var target = new Element(el);

        // Insert this element before the passed one
        target.getParent().element.insertBefore(this.element, target.element);

        return this;
    };

    return Element;
});
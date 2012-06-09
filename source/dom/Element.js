define([
    '../core/Class',
    '../core/type',
    '../core/each',
    '../core/contains',
    '../core/index',
    '../core/every'
], function(Class, type, each, contains, index, every) {
    /*
        Class: Element
        
        Base element class. It is a container for native DOM elements that provides a normalised API for the DOM.

        All methods that should be passed an element can either be passed a native DOM element or an instance of this class. All elements returned by these methods will be wrapped in an instance of this class.

        Requires:

            - <Class>
            - <type>
            - <each>
            - <contains>
            - <index>
            - <every>
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
        this.tag = this.element.nodeName.toLowerCase();
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
        var res = null;

        // Use hasAttribute if possible
        if(this.element.hasAttribute) {
            res = this.element.hasAttribute(key);
        }
        else {
            // Otherwise use getAttribute with a null check
            res = (this.element.getAttribute('key') !== null);
        }

        return res;
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
            // There is no key, build and return the attribute object
            var attrs = {};

            each(this.element.attributes, function(value) {
                attrs[value.name] = value.value;
            });

            return attrs;
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
        var parent = this.element.parentNode;

        // If it is truthy then return the element, otherwise return null
        if(parent) {
            return new Element(parent);
        }

        return null;
    };

    /*
        Function: getParents

        Retrieves all parents of the current element by recursing up the DOM tree.

        Returns:

            An array of parent elements for the current element. The first is the first parent, the last is the last parent.
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
        var res = this.element.nextSibling,
            el = null;

        // Return the wrapped version if not null
        if(res) {
            el = new Element(res);

            // Before we do this we check if it is a real element
            if(el.type !== 1) {
                // Not a real element
                // Recurse
                return el.getNext();
            }

            return el;
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
        var res = this.element.previousSibling,
            el = null;

        // Return the wrapped version if not null
        if(res) {
            el = new Element(res);

            // Before we do this we check if it is a real element
            if(el.type !== 1) {
                // Not a real element
                // Recurse
                return el.getPrevious();
            }

            return el;
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

    /*
        Function: insertLast

        Inserts this element into the passed one. It will be inserted as the last element.

        Parameters:

            el - The element to insert into.

        Returns:

            The current element.
    */
    Element.prototype.insertLast = function(el) {
        var target = new Element(el);

        // Append this as the child
        target.element.appendChild(this.element);

        return this;
    };

    /*
        Function: insertAfter

        Inserts this element after the one specified.

        Parameters:

            el - The element to insert the current element after.

        Returns:

            The current element.
    */
    Element.prototype.insertAfter = function(el) {
        var target = new Element(el),
            next = target.getNext();

        // If there is a next element then insert before it
        // If not then add to the bottom it's parent
        if(next) {
            this.insertBefore(next);
        }
        else {
            this.insertLast(target.getParent());
        }

        return this;
    };

    /*
        Function: getFirst

        Gets the first direct child of this element.

        Returns:

            The first child element. If there is no first child then it will return null.
    */
    Element.prototype.getFirst = function() {
        // Get the first node
        var firstEl = this.element.firstChild,
            first = null;

        // Make sure there is an element there
        if(firstEl) {
            // Convert it to a Photon element
            first = new Element(firstEl);

            // If it is not a full element then return the next real element
            if(first.type !== 1) {
                return first.getNext();
            }
        }

        return first;
    };

    /*
        Function: getLast

        Gets the last direct child of this element.

        Returns:

            The last child element. If there is no last child then it will return null.
    */
    Element.prototype.getLast = function() {
        // Get the last node
        var lastEl = this.element.firstChild,
            last = null;

        // Make sure there is an element there
        if(lastEl) {
            // Convert it to a Photon element
            last = new Element(lastEl);

            // If it is not a full element then return the previous real element
            if(last.type !== 1) {
                return last.getPrevious();
            }
        }

        return last;
    };

    /*
        Function: insertFirst

        Inserts this element as the first child of the one provided.

        Parameters:

            el - The element to insert into.

        Returns:

            The current element.
    */
    Element.prototype.insertFirst = function(el) {
        // Attempt to to get the first element
        var first = new Element(el).getFirst();

        // If there is a first, insert before it
        if(first) {
            this.insertBefore(first);
        }

        return this;
    };

    /*
        Function: replace

        Replaces the provided element with the current one.

        Parameters:

            el - The element to replace.

        Returns:

            The current element.
    */
    Element.prototype.replace = function(el) {
        var target = new Element(el);

        // Replace the target
        target.getParent().element.replaceChild(this.element, el);

        return this;
    };

    /*
        Function: remove

        Removes the current element from it's parent.

        Returns:

            The current element.
    */
    Element.prototype.remove = function() {
        this.getParent().element.removeChild(this.element);

        return this;
    };

    /*
        Function: clone

        Creates a clone of the current element.

        Parameters:

            recursive - Defaults to false. If true then the node, as well as it's whole tree below it, will be cloned. If false, only this actual element will be cloned.

        Returns:

            The cloned version of this element.
    */
    Element.prototype.clone = function(recursive) {
        return new Element(this.element.cloneNode(recursive || false));
    };

    /*
        Function: getChildren

        Fetches this elements direct children.

        Returns:

            An array of child elements.
    */
    Element.prototype.getChildren = function() {
        // Initialise the variables
        var children = [];

        // Loop over the raw elements storing ones that are real elements
        each(this.element.childNodes, function(el) {
            if(el.nodeType === 1) {
                children.push(new Element(el));
            }
        });

        return children;
    };

    /*
        Function: getDescendants

        Recursively fetches all children of the current element and returns them in one flat array.

        Parameters:

            current - You do not need to touch this. The current element in the recursive tree. Used internally.

        Returns:

            An array containing all descendants of the current element.
    */
    Element.prototype.getDescendants = function(current) {
        // Initialise the variables
        var descendants = [],
            direct = null;

        // If there is no current then set it to this
        if(!current) {
            current = this;
        }

        // Get the direct children and push them to the descendants array
        descendants.push(direct = current.getChildren());

        // Loop over the current items children recursively
        each(direct, function(el) {
            descendants.push(el.getDescendants());
        });

        // Return all of the arrays concatenated together
        // I am so proud of this line...
        return Array.prototype.concat.apply([], descendants);
    };

    /*
        Function: getAllNext

        Finds all siblings that come after this element.

        Returns:

            An array of the next siblings.
    */
    Element.prototype.getAllNext = function() {
        // Initialise the variables
        var sibs = [],
            cur = this;

        // Keep adding the next siblings until we hit a null
        while((cur = cur.getNext())) {
            sibs.push(cur);
        }

        return sibs;
    };

    /*
        Function: getAllPrevious

        Finds all siblings that come before this element.

        Returns:

            An array of the previous siblings.
    */
    Element.prototype.getAllPrevious = function() {
        // Initialise the variables
        var sibs = [],
            cur = this;

        // Keep adding the previous siblings until we hit a null
        while((cur = cur.getPrevious())) {
            sibs.push(cur);
        }

        return sibs;
    };

    /*
        Function: getSiblings

        Gets all siblings of this element.

        Returns:

            An array of the elements siblings. This does not include the current element.
    */
    Element.prototype.getSiblings = function() {
        return this.getAllPrevious().concat(this.getAllNext());
    };

    /*
        Function: matches

        Compares this element to another.

        Parameters:

            el - The element to compare to.

        Returns:

            True if this and the passed element match, false if not.
    */
    Element.prototype.matches = function(el) {
        var target = new Element(el);

        return this.element === target.element;
    };

    /*
        Function: contains

        Checks if this element contains the passed element anywhere in it's descendants.

        Parameters:

            el - The element to look for.

        Returns:

            True if the element is found, false if not.
    */
    Element.prototype.contains = function(el) {
        // Loop over all of the descendants looking for the element
        // Set the result to true if found
        var res = false;

        each(this.getDescendants(), function(desc) {
            if(desc.matches(el)) {
                res = true;
            }
        });

        return res;
    };

    /*
        Function: getClasses

        Gets all of an elements classes.

        Returns:

            An array of CSS classes.
    */
    Element.prototype.getClasses = function() {
        return this.element.className.split(/\s+/);
    };

    /*
        Function: setClasses

        Writes an array of classes back to the elements className attribute. This will override all present classes.

        Parameters:

            cls - An array of classes to write.

        Returns:

            The current element.
    */
    Element.prototype.setClasses = function(cls) {
        this.element.className = cls.join(' ');
        return this;
    };

    /*
        Function: hasClass

        Checks if the element has the specified class or not.

        Parameters:

            cl - The class to check for. You can also pass an array of classes, it will then check if it has all of them.
            classes - An array of classes to check. Useful if you have already run getClasses and you don't want to run the regex twice.

        Returns:

            True if the class is found, false if not.
    */
    Element.prototype.hasClass = function(cl, classes) {
        // Get the current list of classes
        var cls = classes || this.getClasses();

        // Allow for an array of classes
        if(type(cl) === 'array') {
            return every(cl, function(cur) {
                return contains(cls, cur);
            });
        }

        return contains(cls, cl);
    };

    /*
        Function: addClass

        Adds your specified class to the element if it is not already there.

        Parameters:

            cl - The class to add if not already present. If you pass an array of classes then all will be added.
            classes - An array of classes to check. Useful if you have already run getClasses and you don't want to run the regex twice.

        Returns:

            The current element.
    */
    Element.prototype.addClass = function(cl, classes) {
        // Get the current list of classes
        var cls = classes || this.getClasses();

        // Allow for an array of classes
        if(type(cl) === 'array') {
            // Add every class
            each(cl, function(cur) {
                this.addClass(cl, cls);

                // Also have to add to cls to stop duplicates
                cls.push(cl);
            });
        }
        else {
            // If it does not currently contain this class then add it to the array and write it back
            if(!this.hasClass(cl, cls)) {
                cls.push(cl);
                this.setClasses(cls);
            }
        }

        return this;
    };

    /*
        Function: removeClass

        Removes the specified class from the element if found.

        Parameters:

            cl - The class to remove.
            classes - An array of classes to check. Useful if you have already run getClasses and you don't want to run the regex twice.

        Returns:

            The current element.
    */
    Element.prototype.removeClass = function(cl, classes) {
        // Get the current list of classes and initialise any required variables
        var cls = classes || this.getClasses(),
            pos = null;

        // Get the index of the class in the class list
        pos = index(cls, cl);

        // If it was found then remove it and write back
        if(pos !== -1) {
            cls.splice(pos, 1);
            this.setClasses(cls);
        }

        return this;
    };

    /*
        Function: toggleClass

        If the passed class is found on the element then it will be removed. If it is not found then it will be added.

        Parameters:

            cl - The class to add or remove.
            classes - An array of classes to check. Useful if you have already run getClasses and you don't want to run the regex twice.

        Returns:

            The current element.
    */
    Element.prototype.toggleClass = function(cl, classes) {
        // Get the current list of classes
        var cls = classes || this.getClasses();

        // If found then remove, if not then add
        if(this.hasClass(cl, cls)) {
            this.removeClass(cl, cls);
        }
        else {
            this.addClass(cl, cls);
        }

        return this;
    };

    Element.prototype.setStyle = function() {

    };

    Element.prototype.getStyle = function() {

    };

    Element.prototype.setHtml = function() {

    };

    Element.prototype.getHtml = function() {

    };

    Element.prototype.setText = function() {

    };

    Element.prototype.getText = function() {

    };

    return Element;
});
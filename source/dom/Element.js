define([
    '../core/Class',
    '../core/type',
    '../core/each',
    '../core/contains',
    '../core/index',
    '../core/every',
    '../manage/Events'
], function(Class, type, each, contains, index, every, Events) {
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
            - <Events>
    */
    var Element = Class(Events);

    /*
        Function: construct

        Called when you initialise a new Element. It will adopt the passed native DOM element as well as any passed instance of this class.

        If you pass a string then a new element will be created using the string as it's tag name.

        You can also pass an object as the second argument to be set when the element is initialised. Here is an example of what you can set.

        (start code)
        var el = new Element('div', {
            text: 'Set the text',
            html: 'Set the HTML',
            style: {
                color: '#FF0000'
            },
            attributes: {
                title: 'Some title attribute',
                href: 'Some href attribute'
            },
            classes: ['foo', 'bar'],
            events: {
                click: function(e) {
                    console.log('Clicked!');
                }
            }

            // Only set one of the following...
            replace: target,
            insertAfter: target,
            insertBefore: target,
            insertFirst: target,
            insertLast: target
        });
        (end)

        Parameters:

            el - Either a string to create an element with, an existing native DOM element or another instance of this class.
            config - Optional object of settings to be set on creation. The possible values can be found above.
    */
    Element.fn.construct = function(el, config) {
        // Create a shortcut to this
        var self = this;

        // Check what el is
        if(type(el) === 'string') {
            // If it is a string then create a new element
            self.element = document.createElement(el);
        }
        else {
            // It is not a string, must be an existing element
            // If the element is an instance of the element class then adopt it's element
            // Otherwise adopt el as it is
            if(el.constructor === Element) {
                // It is, adopt it
                self.element = el.element;
            }
            else {
                // Otherwise it is a native DOM element
                // Adopt it
                self.element = el;
            }
        }

        // Store information about the element

        /*
            Variable: element

            The native DOM element.
        */

        /*
            Variable: tag

            The current element's tag name as a lower case string.
        */
        self.tag = self.element.nodeName.toLowerCase();

        /*
            Variable: type

            The current element's node type.

            Values:

                ELEMENT_NODE - 1
                ATTRIBUTE_NODE - 2
                TEXT_NODE - 3
                CDATA_SECTION_NODE - 4
                ENTITY_REFERENCE_NODE - 5
                ENTITY_NODE - 6
                PROCESSING_INSTRUCTION_NODE - 7
                COMMENT_NODE - 8
                DOCUMENT_NODE - 9
                DOCUMENT_TYPE_NODE - 10
                DOCUMENT_FRAGMENT_NODE - 11
                NOTATION_NODE - 12
        */
        self.type = self.element.nodeType;

        /*
            Variable: textAttribute

            The key to be used when accessing the elements text. This can either be textContent or innerText.

            This is used internally by the <getText> and <setText> methods.
        */
        self.textAttribute = (type(self.element.textContent) === 'string') ? 'textContent' : 'innerText';

        // Now everything is set up we can apply any passed config
        if(config) {
            if(config.text) {
                self.setText(config.text);
            }

            if(config.html) {
                self.setHtml(config.html);
            }

            if(config.style) {
                self.setStyle(config.style);
            }

            if(config.attributes) {
                self.setAttribute(config.attributes);
            }

            if(config.classes) {
                self.addClass(config.classes);
            }

            if(config.replace) {
                self.replace(config.replace);
            }
            else if(config.insertAfter) {
                self.insertAfter(config.insertAfter);
            }
            else if(config.insertBefore) {
                self.insertBefore(config.insertBefore);
            }
            else if(config.insertFirst) {
                self.insertFirst(config.insertFirst);
            }
            else if(config.insertLast) {
                self.insertLast(config.insertLast);
            }

            if(config.events) {
                self.setEvent(config.events);
            }
        }

        // Set the events scope so events are stored in the DOM element and not this instance
        self._photonEventsScope = self.element;
    };

    /*
        Function: createList

        Copies your passed array and integrates a set of methods into it's clone. These methods are adapted versions of <setStyle> and other function that can be called on the elements. The adapted methods will be called on all children of the array. So you can call <remove> on a list and all will be removed.

        The methods that will be integrated into the array are as follows.

            - <addClass>
            - <insertAfter>
            - <insertBefore>
            - <insertFirst>
            - <insertLast>
            - <remove>
            - <removeAttribute>
            - <removeClass>
            - <setAttribute>
            - <setClasses>
            - <setHtml>
            - <setStyle>
            - <setText>
            - <toggleClass>
            - <empty>

        The array also has a contains method. It does not work like the <contains> method on elements, it is more like contains function from the core directory. So it will return true if your passed element matches any of the elements in the array.

        Parameters:

            orig - The original array of elements to be built into a list.

        Returns:

            An array of elements that contains the methods listed above. Each method will be run on all elements in the array.
    */
    Element.fn.createList = function(orig) {
        var arr = [],
            methods = [
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
                'setStyle',
                'empty'
            ];

        // Convert all to Photon elements
        each(orig, function(value) {
            arr.push(new Element(value));
        });

        // Add the contains method
        // Checks if the array contains the passed element
        arr.contains = function(el) {
            var target = new Element(el);
            return each(this, function(value) {
                if(target.matches(value)) {
                    return true;
                }
            }) || false;
        };

        // Add all basic looping methods
        each(Element.fn, function(fn, key) {
            // If the function is found in the array
            if(contains(methods, key)) {
                // Add a new method to the list prototype under the same name
                arr[key] = function() {
                    // Put the arguments in scope
                    var args = arguments;

                    // Call the matched method with all arguments and the scope set to each element
                    each(this, function(item) {
                        fn.apply(item, args);
                    });

                    // Return the list
                    return this;
                };
            }
        });

        return arr;
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
    Element.fn.setAttribute = function(key, value) {
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
    Element.fn.hasAttribute = function(key) {
        var res = null;

        // Use hasAttribute if possible
        if(this.element.hasAttribute) {
            res = this.element.hasAttribute(key);
        }
        else {
            // Otherwise use getAttribute with a null check
            res = (this.element.getAttribute(key) !== null);
        }

        return res;
    };

    /*
        Function: getAttribute

        Retrieves the named attribute from the element.

        Parameters:

            key - The name of the value you wish to retrieve, such as `title`.

        Returns:

            The found value or null if there was none.
    */
    Element.fn.getAttribute = function(key) {
        // We have one, check if it exits
        if(this.hasAttribute(key)) {
            // It does, return it
            return this.element.getAttribute(key);
        }

        // Default to null, this will only happen if no value was found
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
    Element.fn.removeAttribute = function(key) {
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
    Element.fn.getParent = function() {
        // Get the parent
        var parent = this.element.parentNode;

        // If it is truthy then return the element, otherwise return null
        // Also make sure it is not a document fragment, which is what IE sets when there is none after removal
        if(parent && parent.nodeType !== 11) {
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
    Element.fn.getParents = function() {
        // Set up the variables
        var parents = [],
            parent = this;

        // Keep looping up the tree getting parents until it is null
        while((parent = parent.getParent())) {
            parents.push(parent);
        }

        // Return the list
        return this.createList(parents);
    };

    /*
        Function: getNext

        Gets the next sibling element of this element.

        Returns:

            The next sibling element. If there is no next element then it will return null.
    */
    Element.fn.getNext = function() {
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
    Element.fn.getPrevious = function() {
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
    Element.fn.insertBefore = function(el) {
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
    Element.fn.insertLast = function(el) {
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
    Element.fn.insertAfter = function(el) {
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
    Element.fn.getFirst = function() {
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
    Element.fn.getLast = function() {
        // Get the last node
        var lastEl = this.element.lastChild,
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
    Element.fn.insertFirst = function(el) {
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
    Element.fn.replace = function(el) {
        var target = new Element(el);

        // Replace the target
        target.getParent().element.replaceChild(this.element, el.element);

        return this;
    };

    /*
        Function: remove

        Removes the current element from it's parent.

        Returns:

            The current element.
    */
    Element.fn.remove = function() {
        // Get the parent
        var parent = this.getParent();

        // If there is one, remove it
        if(parent) {
            parent.element.removeChild(this.element);
        }

        return this;
    };

    /*
        Function: empty

        Removes all of an elements children from the DOM.

        Returns:

            The current element.
    */
    Element.fn.empty = function() {
        each(this.getChildren(), function(child) {
            child.remove();
        });

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
    Element.fn.clone = function(recursive) {
        return new Element(this.element.cloneNode(recursive || false));
    };

    /*
        Function: getChildren

        Fetches this elements direct children.

        Returns:

            An array of child elements.
    */
    Element.fn.getChildren = function() {
        // Initialise the variables
        var children = [],
            rawChildren = this.element.childNodes,
            nodes = null,
            i = null;

        // Fix for Safari. If the value returned by childNodes is a function then build an array.
        // Otherwise use the returned value in all other browsers.
        // http://reference.sitepoint.com/javascript/Node/childNodes
        if(type(rawChildren) === 'function') {
            nodes = [];
            for(i = 0; i < rawChildren.length; i += 1) {
                nodes.push(rawChildren[i]);
            }
        }
        else {
            nodes = rawChildren;
        }

        // Loop over the raw elements storing ones that are real elements
        each(nodes, function(el) {
            if(el.nodeType === 1) {
                children.push(new Element(el));
            }
        });

        return this.createList(children);
    };

    /*
        Function: getDescendants

        Recursively fetches all children of the current element and returns them in one flat array.

        Parameters:

            current - You do not need to touch this. The current element in the recursive tree. Used internally.

        Returns:

            An array containing all descendants of the current element.
    */
    Element.fn.getDescendants = function(current) {
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
        return this.createList(Array.prototype.concat.apply([], descendants));
    };

    /*
        Function: getAllNext

        Finds all siblings that come after this element.

        Returns:

            An array of the next siblings.
    */
    Element.fn.getAllNext = function() {
        // Initialise the variables
        var sibs = [],
            cur = this;

        // Keep adding the next siblings until we hit a null
        while((cur = cur.getNext())) {
            sibs.push(cur);
        }

        return this.createList(sibs);
    };

    /*
        Function: getAllPrevious

        Finds all siblings that come before this element.

        Returns:

            An array of the previous siblings.
    */
    Element.fn.getAllPrevious = function() {
        // Initialise the variables
        var sibs = [],
            cur = this;

        // Keep adding the previous siblings until we hit a null
        while((cur = cur.getPrevious())) {
            sibs.push(cur);
        }

        return this.createList(sibs);
    };

    /*
        Function: getSiblings

        Gets all siblings of this element.

        Returns:

            An array of the elements siblings. This does not include the current element.
    */
    Element.fn.getSiblings = function() {
        return this.createList(this.getAllPrevious().concat(this.getAllNext()));
    };

    /*
        Function: matches

        Compares this element to another.

        Parameters:

            el - The element to compare to.

        Returns:

            True if this and the passed element match, false if not.
    */
    Element.fn.matches = function(el) {
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
    Element.fn.contains = function(el) {
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
    Element.fn.getClasses = function() {
        return (this.element.className) ? this.element.className.split(/\s+/) : [];
    };

    /*
        Function: setClasses

        Writes an array of classes back to the elements className attribute. This will override all present classes.

        Parameters:

            cls - An array of classes to write.

        Returns:

            The current element.
    */
    Element.fn.setClasses = function(cls) {
        this.element.className = cls.join(' ');
        return this;
    };

    /*
        Function: hasClass

        Checks if the element has the specified class or not.

        Parameters:

            cl - The class to check for. You can also pass an array of classes, it will then check if it has all of them.
            classes - An array of classes to check. Useful if you have already run <getClasses> and you don't want to run the regex twice.

        Returns:

            True if the class is found, false if not.
    */
    Element.fn.hasClass = function(cl, classes) {
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
            classes - An array of classes to check. Useful if you have already run <getClasses> and you don't want to run the regex twice.

        Returns:

            The current element.
    */
    Element.fn.addClass = function(cl, classes) {
        // Get the current list of classes
        var self = this,
            cls = classes || self.getClasses();

        // Allow for an array of classes
        if(type(cl) === 'array') {
            // Add every class
            each(cl, function(cur) {
                self.addClass(cur, cls);
            });
        }
        else {
            // If it does not currently contain this class then add it to the array and write it back
            if(!self.hasClass(cl, cls)) {
                cls.push(cl);
                self.setClasses(cls);
            }
        }

        return self;
    };

    /*
        Function: removeClass

        Removes the specified class from the element if found.

        Parameters:

            cl - The class to remove. If you pass an array of classes then all of them will be removed.
            classes - An array of classes to check. Useful if you have already run <getClasses> and you don't want to run the regex twice.

        Returns:

            The current element.
    */
    Element.fn.removeClass = function(cl, classes) {
        // Get the current list of classes and initialise any required variables
        var self = this,
            cls = classes || self.getClasses(),
            pos = null;

        // Allow for an array of classes
        if(type(cl) === 'array') {
            // Remove every class
            each(cl, function(cur) {
                self.removeClass(cur, cls);
            });
        }
        else {
            // Get the index of the class in the class list
            pos = index(cls, cl);

            // If it was found then remove it and write back
            if(pos !== -1) {
                cls.splice(pos, 1);
                self.setClasses(cls);
            }
        }

        return self;
    };

    /*
        Function: toggleClass

        If the passed class is found on the element then it will be removed. If it is not found then it will be added.

        Parameters:

            cl - The class to add or remove. If you pass an array of classes then all of them will be toggled.
            classes - An array of classes to check. Useful if you have already run <getClasses> and you don't want to run the regex twice.

        Returns:

            The current element.
    */
    Element.fn.toggleClass = function(cl, classes) {
        // Get the current list of classes
        var self = this,
            cls = classes || self.getClasses();

        // Allow for an array of classes
        if(type(cl) === 'array') {
            // Toggle every class
            each(cl, function(cur) {
                self.toggleClass(cur, cls);
            });
        }
        else {
            // If found then remove, if not then add
            if(self.hasClass(cl, cls)) {
                self.removeClass(cl, cls);
            }
            else {
                self.addClass(cl, cls);
            }
        }

        return self;
    };

    /*
        Function: setHtml

        Sets the inner HTML for the element.

        Parameters:

            content - The string to set the HTML to.

        Returns:

            The current element.
    */
    Element.fn.setHtml = function(content) {
        this.element.innerHTML = content;
        return this;
    };

    /*
        Function: getHtml

        Gets the current inner HTML for the element.

        Returns:

            The elements current inner HTML string.
    */
    Element.fn.getHtml = function() {
        return this.element.innerHTML;
    };

    /*
        Function: setText

        Sets the inner text for the element.

        Parameters:

            content - The string to set the text to.

        Returns:

            The current element.
    */
    Element.fn.setText = function(content) {
        this.element[this.textAttribute] = content;
        return this;
    };

    /*
        Function: getText

        Gets the current inner text for the element.

        Returns:

            The elements current inner text string.
    */
    Element.fn.getText = function() {
        return this.element[this.textAttribute];
    };

    /*
        Function: getStyleKey

        Normalizes passed keys into the camel case format. So if you pass "border-radius" you will get "borderRadius".

        It will also check for a vendor prefixed version of the style and return that instead if found.

        Parameters:

            key - The key to convert to camel case and return the potentially vendor prefixed version of.

        Returns:

            The camel case version of the key with the potential to have a vendor prefix.
    */
    Element.fn.getStyleKey = function(key) {
        // Convert to camel case and create the variables
        var camel = key.replace(/-([a-z])/g, function(str, ch) {
                return ch.toUpperCase();
            }),
            prefixCheck = new RegExp('^[A-Z][a-z]*' + camel.charAt(0).toUpperCase() + camel.slice(1) + '$'),
            i = null;

        // Return the prefixed version if there is one
        for(i in this.element.style) {
            if(i.match(prefixCheck)) {
                return i;
            }
        }

        return camel;
    };

    /*
        Function: setStyle

        Sets style attributes for the element. This can either be a key and value as two separate arguments or an object of key value pairs.

        The key is passed through <getStyleKey>.

        Parameters:

            key - Either the style to set (camel case or hyphenated) or an object of key value pairs.
            value - If the key is a string then this value will be assigned to the attribute named in the key. This is not needed if you pass an object as a key.

        Returns:

            The current element.
    */
    Element.fn.setStyle = function(key, value) {
        // Initialise variables
        var self = this;

        // If the key is an object then loop over them
        if(type(key) === 'object') {
            each(key, function(value, key) {
                self.setStyle(key, value);
            });
        }
        else {
            // Otherwise, just set the value
            // If the value is a number then it is converted to pixels
            this.element.style[this.getStyleKey(key)] = (type(value) === 'number') ? value + 'px' : value;
        }

        return self;
    };

    /*
        Function: getStyle

        Fetches the current style for the passed key. The key is passed through <getStyleKey>.

        You can also pass multiple keys as separate arguments and have them all returned in one object. The object also contains an array attribute which is an array version of the results in the order you requested them. Never trust the order of an object. Chrome is the first browser to do it, but it sorts your object's items without you asking it to.

        Parameters:

            key - The style you wish to retrieve.

        Returns:

            The current value for the style. If multiple keys were passed then it will return an object of values.
    */
    Element.fn.getStyle = function(key) {
        // Get the correct key
        var self = this,
            style = self.getStyleKey(key),
            inline = self.element.style[style],
            results = {},

            // These map short cuts to their full style to get
            directionsStyles = [
                '$Top',
                '$Right',
                '$Bottom',
                '$Left'
            ],
            borderStyles = [
                '$Width',
                '$Style',
                '$Color'
            ],
            getters = {
                margin: directionsStyles,
                padding: directionsStyles,
                border: directionsStyles,
                    borderLeft: borderStyles,
                    borderTop: borderStyles,
                    borderRight: borderStyles,
                    borderBottom: borderStyles
            },
            prefixedGetters = [];

        // If there are multiple keys then recurse and get all of them
        if(arguments.length > 1) {
            results.array = [];
            each(arguments, function(key) {
                results[key] = self.getStyle(key);
                results.array.push(results[key]);
            });

            return results;
        }

        // If there is a map for this style then get the values for them
        // It may recurse down the getter tree
        // When done, return the joined result
        if(getters[style]) {
            // Apply the prefix to the getters
            each(getters[style], function(getter) {
                prefixedGetters.push(getter.replace('$', style));
            });

            // Make the call for the values
            results = self.getStyle.apply(self, prefixedGetters).array;

            // If all are the same, return the first
            if(results[0] && every(results, function(check) {
                return check === results[0];
            })) {
                return results[0];
            }

            return results.join(' ');
        }

        // Try element.style first
        if(inline) {
            return inline;
        }

        // Use getComputedStyle if available.
        if(window.getComputedStyle) {
            return document.defaultView.getComputedStyle(self.element, null)[style];
        }

        // There is no getComputedStyle, fall back to currentStyle
        return self.element.currentStyle[style];
    };

    return Element;
});
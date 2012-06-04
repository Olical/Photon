define([
    '../core/Class',
    '../core/type'
], function(Class, type) {
    /*
        Class: Element
        
        Base element class. It is a container for native DOM elements that provides a normalised API for the DOM.

        Requires:

            - <Class>
            - <type>
    */
    var Element = new Class();

    /*
        Function: construct

        Called when you initialise a new Element. It will adopt the passed native DOM element as well as any passed instance of this class.

        If you pass a string then a new element will be created using the string as it's tag name.
    */
    Element.prototype.construct = function(el) {
        // Check what el is
        if(type(el) === 'string') {
            // If it is a string then create a new element
            this._element = document.createElement(el);
        }
        else {
            // It is not a string, must be an existing element
            // If the element is an instance of the element class then adopt it's element
            // Otherwise adopt el as it is

            // TODO: Check that the element is a native DOM element before adopting it - It is assumed at the moment
            
            if(el.parentClass === Element) {
                // It is, adopt it
                this._element = el._element;
            }
            else {
                // Otherwise it is a native DOM element
                // Adopt it
                this._element = el;
            }
        }
    };

    return Element;
});
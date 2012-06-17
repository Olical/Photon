define([
    './Element'
], function(Element) {
    /*
        Function: getById
        
        Finds an element with an id that matches your specified id. The element is then returned as an instance of <Element>. You can also pass a context element to search within as the second argument.

        (start code)
        var el = getById('foo');
        var childEl = getById('bar', el);
        (end)
        
        Parameters:
        
            id - The id to look for.
            context - An optional element to limit your search to.
        
        Returns:
        
            An element with the specified id as an instance of <Element> or null if not found.

        Requires:

            - <Element>
    */
    function getById(id, context) {
        return new Element(document.getElementById(id));
    }
    
    return getById;
});
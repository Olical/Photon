define([
    '../core/Class',
    './Element'
], function(Class, Element) {
    /*
        Class: ElementList

        A wrapper array to contain a list of elements. It creates a native array and then inserts extra methods to be used, so <addClass> will be run on all contained elements.

        All elements within this array are instances of <Element>.

        Requires:

            - <Class>
            - <Element>
    */
    var ElementList = new Class();

    return ElementList;
});
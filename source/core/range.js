define([
    './type'
], function(type) {
    /*
        Function: range
        
        Returns an array of numbers starting and ending with your passed values.

        (start code)
        var myRange = range(1, 5);

        // [1, 2, 3, 4, 5]
        (end)

        You can also set a gap to have a spaced out list. For example.

        (start code)
        var myRange = range(1, 5, 2);

        // [1, 3, 5]
        (end)
        
        Parameters:
        
            from - The beginning of the range.
            to - The end of the range.
            gap - The gap between each value. Defaults to 1.
        
        Returns:
        
            An array of numbers ranging between your passed limits.

        Requires:
            - <type>
    */
    function range(from, to, gap) {
        // First thing to do is work out the increment
        // This block also initialises some required variables
        var direction = ((from <= to) ? 1 : -1),
            increment = direction,
            cur = from,
            list = [];

        // If there is a gap then multiply the increment with it
        if(type(gap) === 'number') {
            increment = increment * gap;
        }

        // Keep looping and adding to the list until we pass the end
        do {
            list.push(cur);
            cur += increment;
        } while((direction === 1 && cur <= to) || (direction === -1 && cur >= to));

        // Return the finished array
        return list;
    }

    return range;
});
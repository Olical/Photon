define(function() {
    /*
        Function: limit
        
        Limits a passed number within a pair of upper and lower boundaries.

        (start code)
        var high = 32;
        var low = 3;
        var good = 15;

        limit(high, 10, 20); // 20
        limit(low, 10, 20); // 10
        limit(good, 10, 20); // 15
        (end)
        
        Parameters:
        
            target - The number to limit.
            lower - The lower bound that the target must be above.
            upper - The upper bound that the target must be below.
        
        Returns:
        
            The passed number restricted within your two supplied boundaries.
    */
    function limit(target, lower, upper) {
        // Too big, limit to upper
        if(target > upper) {
            return upper;
        }

        // Too small, limit to lower
        if(target < lower) {
            return lower;
        }

        // Within the bounds, just return it.
        return target;
    }
    
    return limit;
});
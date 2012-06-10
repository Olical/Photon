define(['photon/core/some'], function(some) {
    function checker(value, key) {
        if(value === 'baz') {
            return true;
        }

        return false;
    }

    describe('photon/core/some', function() {
        it('return false if none are correct', function() {
            var bad = [
                'foo',
                'bar',
                'foo',
                'bar'
            ];

            expect(some(bad, checker)).toEqual(false);
        });

        it('return true if one is correct', function() {
            var good = [
                'foo',
                'bar',
                'baz',
                'bar'
            ];

            expect(some(good, checker)).toEqual(true);
        });
    });
});
define(['photon/core/every'], function(every) {
    function checker(value, key) {
        if(value === 'foo' || value === 'bar') {
            return true;
        }

        return false;
    }

    describe('photon/core/every', function() {
        it('return true if all are correct', function() {
            var good = [
                'foo',
                'bar',
                'foo',
                'bar'
            ];

            expect(every(good, checker)).toEqual(true);
        });

        it('return false if all are wrong', function() {
            var bad = [
                'foo',
                'bar',
                'baz',
                'bar'
            ];

            expect(every(bad, checker)).toEqual(false);
        });
    });
});
define(['photon/core/filter'], function(filter) {
    describe('photon/core/filter', function() {
        it('return an array of items that passed the checker', function() {
            var list = [
                'foo',
                'foo',
                'bar',
                'foo'
            ];

            function checker(value, key) {
                if(value === 'foo') {
                    return true;
                }

                return false;
            }

            expect(filter(list, checker)).toEqual(['foo', 'foo', 'foo']);
        });
    });
});
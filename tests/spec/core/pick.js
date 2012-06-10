define(['photon/core/pick'], function(pick) {
    describe('photon/core/pick', function() {
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

            expect(pick(list, checker)).toEqual(['foo', 'foo', 'foo']);
        });
    });
});
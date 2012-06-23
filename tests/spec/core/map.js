define(['photon/core/map'], function(map) {
    describe('photon/core/map', function() {
        it('map an array', function() {
            var a = [1, 2, 3];

            var b = map(a, function(value) {
                return value + 1;
            });

            expect(a).toEqual([1, 2, 3]);
            expect(b).toEqual([2, 3, 4]);
        });

        it('map an object', function() {
            var a = { 'foo': false, 'bar': false };

            var b = map(a, function(value, key) {
                if(key === 'foo') {
                    return true;
                }

                return false;
            });

            expect(a).toEqual({ 'foo': false, 'bar': false });
            expect(b).toEqual({ 'foo': true, 'bar': false });
        });
    });
});
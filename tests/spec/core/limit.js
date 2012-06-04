define(['photon/core/limit'], function(limit) {
    describe('photon/core/limit', function() {
        it('should limit within the upper boundary', function() {
            var num = 32;
            expect(limit(num, 10, 20)).toEqual(20);
        });

        it('should limit within the lower boundary', function() {
            var num = 4;
            expect(limit(num, 10, 20)).toEqual(10);
        });

        it('should do nothing if the number is fine', function() {
            var num = 16;
            expect(limit(num, 10, 20)).toEqual(num);
        });
    });
});
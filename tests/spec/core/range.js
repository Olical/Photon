define(['photon/core/range'], function(range) {
    describe('photon/core/range', function() {
        it('generate a positive range', function() {
            var a = range(1, 5);
            expect(a).toEqual([1, 2, 3, 4, 5]);
        });

        it('generate a negative range', function() {
            var a = range(5, 1);
            expect(a).toEqual([5, 4, 3, 2, 1]);
        });

        it('generate a positive range with a gap', function() {
            var a = range(1, 5, 2);
            expect(a).toEqual([1, 3, 5]);
        });

        it('generate a negative range with a gap', function() {
            var a = range(5, 1, 2);
            expect(a).toEqual([5, 3, 1]);
        });

        it('generate a positive range in negative numbers', function() {
            var a = range(-1, -5);
            expect(a).toEqual([-1, -2, -3, -4, -5]);
        });

        it('generate a negative range in negative numbers', function() {
            var a = range(-5, -1);
            expect(a).toEqual([-5, -4, -3, -2, -1]);
        });

        it('allow decimal ranges (like a baus)', function() {
            var a = range(0, 1, 0.5);
            expect(a).toEqual([0, 0.5, 1]);
        });
    });
});
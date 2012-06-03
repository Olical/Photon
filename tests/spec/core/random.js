define(['photon/core/random'], function(random) {
    describe('photon/core/random', function() {
        it('should select a random item from a array', function() {
            var a = random([5, 6, 7, 8, 9, 10]);
            expect(a).toBeLessThan(11);
            expect(a).toBeGreaterThan(4);
        });

        it('should select a random item from an object', function() {
            var a = random({
                a: 5,
                b: 6,
                c: 7,
                d: 8,
                e: 9,
                f: 10
            });
            expect(a).toBeLessThan(11);
            expect(a).toBeGreaterThan(4);
        });

        it('should generate random numbers', function() {
            var a = random(1, 10);
            expect(a).toBeLessThan(11);
            expect(a).toBeGreaterThan(0);
        });

        it('should generate random numbers with a scale', function() {
            var a = random(1, 10, 5);
            expect([1, 6, 10]).toContain(a);
        });
    });
});
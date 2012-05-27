require(['photon/core/index'], function(index) {
    describe('photon/core/index', function() {
        it('should search strings', function() {
            var a = 'photon';
            expect(index(a, 'ton')).toEqual(3);
            expect(index(a, 'pho')).toEqual(0);
            expect(index(a, 'foo')).toEqual(-1);
        });

        it('should search arrays', function() {
            var a = [
                'foo',
                'bar',
                'baz'
            ];
            expect(index(a, 'bar')).toEqual(1);
            expect(index(a, 'foo')).toEqual(0);
            expect(index(a, 'gone')).toEqual(-1);
        });

        it('should check if a list is indexable', function() {
            expect(index('')).toEqual(true);
            expect(index([])).toEqual(true);
            expect(index(arguments)).toEqual(false);
            expect(index({})).toEqual(false);
        });
    });
});
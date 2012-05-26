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

        it('should search argument lists', function() {
            function test() {
                var a = arguments;
                expect(index(a, 'bar')).toEqual(1);
                expect(index(a, 'foo')).toEqual(0);
                expect(index(a, 'gone')).toEqual(-1);
            }
            test('foo', 'bar', 'baz');
        });
    });
});
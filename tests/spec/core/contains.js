require(['photon/core/contains'], function(contains) {
    describe('photon/core/contains', function() {
        it('should find a string in an array that is present', function() {
            var a = ['foo', 'bar', 'baz'];
            expect(contains(a, 'foo')).toEqual(true);
        });
        
        it('should not find a string in an array that is not present', function() {
            var a = ['foo', 'bar', 'baz'];
            expect(contains(a, 'gone')).toEqual(false);
        });
        
        it('should find a string in an object that is present', function() {
            var a = {
                'one': 'foo',
                'two': 'bar',
                'three': 'baz'
            };
            expect(contains(a, 'foo')).toEqual(true);
        });
        
        it('should not find a string in an object that is not present', function() {
            var a = {
                'one': 'foo',
                'two': 'bar',
                'three': 'baz'
            };
            expect(contains(a, 'gone')).toEqual(false);
        });
        
        it('should find a array in an array that is present', function() {
            var b = ['one', 'two'];
            var a = ['foo', 'bar', b];
            expect(contains(a, b)).toEqual(true);
        });
        
        it('should not find a array in an array that is not present', function() {
            var c = ['three', 'four'];
            var b = ['one', 'two'];
            var a = ['foo', 'bar', b];
            expect(contains(a, c)).toEqual(false);
        });
        
        it('should find a object in an array that is present', function() {
            var b = {
                'a': 'one',
                'b': 'two'
            };
            var a = ['foo', 'bar', b];
            expect(contains(a, b)).toEqual(true);
        });
        
        it('should not find a object in an array that is not present', function() {
            var c = {
                'c': 'three',
                'd': 'four'
            };
            var b = {
                'a': 'one',
                'b': 'two'
            };
            var a = ['foo', 'bar', b];
            expect(contains(a, c)).toEqual(false);
        });
        
        it('should find a object in an object that is present', function() {
            var b = {
                'a': 'one',
                'b': 'two'
            };
            var a = {
                'x': 'foo',
                'y': 'bar',
                'z': b
            };
            expect(contains(a, b)).toEqual(true);
        });
        
        it('should not find a object in an object that is not present', function() {
            var c = {
                'c': 'three',
                'd': 'four'
            };
            var b = {
                'a': 'one',
                'b': 'two'
            };
            var a = {
                'x': 'foo',
                'y': 'bar',
                'z': b
            };
            expect(contains(a, c)).toEqual(false);
        });
    });
});
define(['photon/core/each'], function(each) {
    describe('photon/core/each', function() {
        it('pass all values from an array', function() {
            var b = ['a', 'b', 'c'];
            var a = '';
            each(b, function(value) {
                a += value;
            });
            expect(a).toEqual('abc');
        });
        
        it('pass all values from an object', function() {
            var b = {
                'one': 'a',
                'two': 'b',
                'three': 'c'
            };
            var a = '';
            each(b, function(value) {
                a += value;
            });
            expect(a).toEqual('abc');
        });
        
        it('pass all keys from an array', function() {
            var b = ['a', 'b', 'c'];
            var a = '';
            each(b, function(value, key) {
                a += key;
            });
            expect(a).toEqual('012');
        });
        
        it('pass all keys from an object (not always the same order)', function() {
            var b = {
                'x': 'a',
                'y': 'b',
                'z': 'c'
            };
            var a = '';
            each(b, function(value, key) {
                a += key;
            });
            expect(a).toContain('x');
            expect(a).toContain('y');
            expect(a).toContain('z');
        });
        
        it('pass all characters from a string', function() {
            var b = 'abc';
            var a = '';
            each(b, function(value) {
                a += value + '-';
            });
            expect(a).toEqual('a-b-c-');
        });

        it('check if a list is iterable', function() {
            expect(each('')).toEqual(false);
            expect(each([])).toEqual(true);
            expect(each(arguments)).toEqual(true);
            expect(each({})).toEqual(true);
            expect(each(function(){})).toEqual(false);
        });
    });
});
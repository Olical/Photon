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

        it('check if a list is iterable', function() {
            expect(each('')).toEqual(false);
            expect(each([])).toEqual(true);
            expect(each(arguments)).toEqual(true);
            expect(each({})).toEqual(true);
            expect(each(function(){})).toEqual(false);
        });

        it('pass the iteration', function() {
            var a = [
                'foo',
                'bar',
                'baz'
            ];
            each(a, function(value, key, arr, iteration) {
                expect(key).toEqual(iteration);
            });

            var b = {
                '1': true,
                '2': true,
                '3': true
            };
            each(a, function(value, key, obj, iteration) {
                expect(parseInt(key, 10)).toEqual(iteration);
            });
        });

        it('allow breaking out with a return', function() {
            var a = [
                'foo',
                'bar',
                'baz'
            ];
            expect(each(a, function(value, key, arr, iteration) {
                if(value === 'bar') {
                    return iteration;
                }
            })).toEqual(1);
        });

        it('set the thisArg value', function() {
            var obj = {};
            var a = { foo: true, bar: false };
            each(a, function(value, key) {
                this[key] = value;
            }, obj);

            expect(obj).toEqual({ foo: true, bar: false });
        });
    });
});
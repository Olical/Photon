define(['photon/core/type'], function(type) {
    describe('photon/core/type', function() {
        it('identify arrays', function() {
            var a = [];
            expect(type(a)).toEqual('array');
        });
        
        it('identify objects', function() {
            var a = {};
            expect(type(a)).toEqual('object');
        });
        
        it('identify undefined', function() {
            function test(a) {
                expect(type(a)).toEqual('undefined');
            }
            test();
        });
        
        it('identify numbers', function() {
            var a = 50;
            expect(type(a)).toEqual('number');
        });
        
        it('identify strings', function() {
            var a = 'photon';
            expect(type(a)).toEqual('string');
        });
        
        it('identify functions', function() {
            var a = function() {};
            expect(type(a)).toEqual('function');
        });
        
        it('identify booleans', function() {
            var a = true;
            expect(type(a)).toEqual('boolean');
        });
        
        it('identify a class instance as an object', function() {
            var b = function() {};
            var a = new b();
            expect(type(a)).toEqual('object');
        });

        it('identify null', function() {
            var a = null;
            expect(type(a)).toEqual('null');
        });
    });
});
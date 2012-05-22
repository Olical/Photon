require(['photon/type'], function(type) {
    describe('type', function() {
        it('should identify arrays', function() {
            var a = [];
            expect(type(a)).toEqual('array');
        });
        
        it('should identify objects', function() {
            var a = {};
            expect(type(a)).toEqual('object');
        });
        
        it('should identify dates', function() {
            var a = new Date();
            expect(type(a)).toEqual('date');
        });
        
        it('should identify numbers', function() {
            var a = 50;
            expect(type(a)).toEqual('number');
        });
        
        it('should identify strings', function() {
            var a = 'photon';
            expect(type(a)).toEqual('string');
        });
        
        it('should identify regular expressions', function() {
            var a = /pho(t|T)on/;
            expect(type(a)).toEqual('regexp');
        });
        
        it('should identify functions', function() {
            var a = function() {};
            expect(type(a)).toEqual('function');
        });
        
        it('should identify booleans', function() {
            var a = true;
            expect(type(a)).toEqual('boolean');
        });
        
        it('should identify a class instance as an object', function() {
            var b = function() {};
            var a = new b();
            expect(type(a)).toEqual('object');
        });
    });
});
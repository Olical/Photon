require(['photon/core/Class'], function(Class) {
    describe('photon/core/Class', function() {
        it('should create an instance', function() {
            var a = new Class();
            expect(a).toBeTruthy();
        });
        
        it('should allow methods', function() {
            var Test = new Class();
            Test.prototype.foo = function() {
                return true;
            };
            var a = new Test();
            expect(a.foo()).toEqual(true);
        });
        
        it('should allow extension', function() {
            var Test = new Class();
            Test.prototype.foo = function() {
                return true;
            };
            var Test2 = new Class(Test);
            Test2.prototype.bar = function() {
                return false;
            };
            var a = new Test2();
            expect(a.foo()).toEqual(true);
            expect(a.bar()).toEqual(false);
        });
    });
});
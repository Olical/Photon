define(['photon/core/Class', 'photon/core/parent'], function(Class, parent) {
    describe('photon/core/parent', function() {
        it('should let you call a parent method', function() {
            var Test = new Class();
            Test.prototype.foo = function() {
                return 'parent';
            };
            
            var Test2 = new Class(Test);
            Test2.prototype.foo = function() {
                return 'child -> ' + parent(Test2, this).foo();
            };
            
            var a = new Test2();
            expect(a.foo()).toEqual('child -> parent');
        });
        
        it('should let you call a parent method with the right scope', function() {
            var Test = new Class();
            Test.prototype.foo = function() {
                expect(this.bar).toEqual(true);
                return 'parent';
            };
            
            var Test2 = new Class(Test);
            Test2.prototype.construct = function() {
                this.bar = true;
            };
            Test2.prototype.foo = function() {
                return 'child -> ' + parent(Test2, this).foo();
            };
            
            var a = new Test2();
            expect(a.foo()).toEqual('child -> parent');
        });

        it('should let you call a nested parent method with the right scope', function() {
            var Test = new Class();
            Test.prototype.nest = {
                foo: function() {
                    expect(this.bar).toEqual(true);
                    return 'parent';
                }
            };
            
            var Test2 = new Class(Test);
            Test2.prototype.construct = function() {
                this.bar = true;
            };
            Test2.prototype.nest.foo = function() {
                return 'child -> ' + parent(Test2, this).nest.foo();
            };
            
            var a = new Test2();
            expect(a.nest.foo()).toEqual('child -> parent');
        });
    });
});
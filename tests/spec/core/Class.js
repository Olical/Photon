define(['photon/core/Class'], function(Class) {
    describe('photon/core/Class', function() {
        it('create an instance', function() {
            var a = new Class();
            expect(a).toBeTruthy();
        });
        
        it('allow methods', function() {
            var Test = new Class();
            Test.fn.foo = function() {
                return true;
            };
            var a = new Test();
            expect(a.foo()).toEqual(true);
        });
        
        it('allow extension of normal classes', function() {
            function Vanilla() {}
            Vanilla.prototype.foo = function() {
                return 'this is foo';
            };
            
            Photon = new Class(Vanilla);
            Photon.fn.bar = function() {
                return 'this is bar';
            };
            
            var a = new Photon();
            expect(a.foo()).toEqual('this is foo');
            expect(a.bar()).toEqual('this is bar');
        });
        
        it('allow extension', function() {
            var Test = new Class();
            Test.fn.foo = function() {
                return true;
            };
            
            var Test2 = new Class(Test);
            Test2.fn.bar = function() {
                return false;
            };
            
            var Test3 = new Class();
            Test3.fn.baz = function() {
                return 'javascript';
            };
            
            var Test4 = new Class(Test2, Test3);
            Test4.fn.boo = function() {
                return 'test';
            };
            Test4.fn.bar = function() {
                return true;
            };
            
            var a = new Test4();
            var b = new Test2();
            expect(a.foo()).toEqual(true);
            expect(a.bar()).toEqual(true);
            expect(a.baz()).toEqual('javascript');
            expect(a.boo()).toEqual('test');
            expect(b.bar()).toEqual(false);
        });
        
        it('run the constructor', function() {
            var a = false;
            var Test = new Class();
            Test.fn.construct = function() {
                a = true;
            };
            var b = new Test();
            expect(a).toEqual(true);
        });

        it('allow inherited method calls', function() {
            var Foo = new Class();
            Foo.fn.run = function() {
                // Original code
                expect(this.check).toEqual(true);
            };

            var Bar = new Class(Foo);
            Bar.fn.run = function() {
                // Extra code
                this.check = true;
                
                // Execute the original code
                Foo.fn.run.apply(this);
            };

            var test = new Bar();
            test.run();
        });

        it('allow you to check where it came from', function() {
            var Foo = new Class();
            Foo.fn.baz = function() {
                // Some code
            };
            var Bar = new Class();
            Bar.fn.baz = function() {
                // Some code
            };

            var test = new Foo();
            expect(test.constructor).toEqual(Foo);
            expect(test.constructor).not.toEqual(Bar);
        });
    });
});
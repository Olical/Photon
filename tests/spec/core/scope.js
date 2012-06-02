define(['photon/core/scope'], function(scope) {
    describe('photon/core/scope', function() {
        it('should set the scope of a function', function() {
            function fn() {
                expect(this.foo).toBeUndefined();
            }
            function fn2() {
                expect(this.foo).toEqual(true);
            }
            var fnScoped = scope(fn2, {
                foo: true
            });
            fn();
            fnScoped();
        });

        it('should set the scope of a function recursively', function() {
            var res;

            var before = {
                foo: function() {
                    return this.scoped;
                },
                bar: {
                    baz: function() {
                        expect(this.scoped).toEqual(res);
                    },
                    test: 'hello'
                }
            };

            var after = scope(before, {scoped:true});

            before.bar.baz();
            res = true;
            after.bar.baz();
        });
    });
});
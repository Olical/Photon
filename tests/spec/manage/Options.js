define(['photon/manage/Options', 'photon/core/Class'], function(Options, Class) {
    describe('photon/manage/Options', function() {
        it('setting of options', function() {
            var Test = Class(Options);
            Test.fn.construct = function(options) {
                this.setOptions(options);
            };

            var t = new Test({
                foo: true
            });
            expect(t.options).toEqual({ foo: true });
        });

        it('setting of options with defaults', function() {
            var Test = Class(Options);
            Test.fn.options = {
                foo: false,
                bar: false
            };
            Test.fn.construct = function(options) {
                this.setOptions(options);
            };

            var t = new Test({
                foo: true
            });
            expect(t.options).toEqual({ foo: true, bar: false });
        });
    });
});
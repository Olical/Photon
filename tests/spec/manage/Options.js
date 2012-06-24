define(['photon/manage/Options', 'photon/core/Class', 'photon/manage/Events'], function(Options, Class, Events) {
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

        it('add events with options', function() {
            var Test = Class(Options, Events);
            Test.fn.construct = function(options) {
                this.setOptions(options);
            };

            var res = false;
            var t = new Test({
                events: {
                    foo: function() {
                        res = true;
                    }
                }
            });
            t.fireEvent('foo');

            expect(res).toEqual(true);
        });
    });
});
define(['photon/manage/Events', 'photon/core/Class'], function(Events, Class) {
    describe('photon/manage/Events', function() {
        it('get events', function() {
            var Test = Class(Events);
            var a = new Test();

            expect(a.getEvents()).toEqual({});
            expect(a.getEvents('foo')).toEqual([]);
        });

        // it('register events', function() {

        // });
    });
});
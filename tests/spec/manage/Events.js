define(['photon/manage/Events', 'photon/core/Class'], function(Events, Class) {
    describe('photon/manage/Events', function() {
        it('', function() {
            var Test = Class(Events);
            var a = new Test();
        });

        it('get events', function() {
            var Test = Class(Events);
            var a = new Test();

            expect(a.getEvents()).toEqual({});
            expect(a.getEvents('foo')).toEqual([]);
        });

        it('add events', function() {
            var Test = Class(Events);
            var a = new Test();
            function t1() { return true; }
            function t2() { return true; }

            expect(a.getEvents('foo')).toEqual([]);
            a.addEvent('foo', t1);
            expect(a.getEvents('foo')).toEqual([t1]);

            a.addEvent({
                foo: t2,
                bar: t1
            });

            expect(a.getEvents('foo')).toEqual([t1, t2]);
            expect(a.getEvents('bar')).toEqual([t1]);
        });

        it('remove events', function() {
            var Test = Class(Events);
            var a = new Test();
            function t1() { return true; }
            function t2() { return true; }

            expect(a.getEvents('foo')).toEqual([]);
            a.addEvent('foo', t1);
            expect(a.getEvents('foo')).toEqual([t1]);

            a.addEvent({
                foo: t2,
                bar: t1
            });

            expect(a.getEvents('foo')).toEqual([t1, t2]);
            expect(a.getEvents('bar')).toEqual([t1]);

            a.removeEvent('bar');
            expect(a.getEvents('bar')).toEqual([]);

            a.removeEvent('foo', t2);
            expect(a.getEvents('foo')).toEqual([t1]);

            a.removeEvent();
            expect(a.getEvents('foo')).toEqual([]);

            a.addEvent('foo', t1);
            a.addEvent({
                foo: t2,
                bar: t1
            });

            a.removeEvent({
                foo: t1,
                bar: t1
            });

            expect(a.getEvents('foo')).toEqual([t2]);
            expect(a.getEvents('bar')).toEqual([]);

            a.removeEvent();

            expect(a.getEvents()).toEqual({});
            expect(a.getEvents('foo')).toEqual([]);
            expect(a.getEvents('bar')).toEqual([]);
        });

        it('fire events', function() {
            var Test = Class(Events);
            var a = new Test();

            var res1 = null;
            var res2 = null;

            function t1() {
                res1 = arguments;
            }

            function t2() {
                res2 = arguments;
            }

            a.addEvent('foo', t1);
            a.addEvent('bar', t2);

            a.fireEvent('foo');
            a.fireEvent('bar', [true, false]);

            expect(res1).toEqual([]);
            expect(res2).toEqual([true, false]);

            a.addEvent('foo', t1);
            a.addEvent('bar', t2);

            a.fireEvent({
                foo: [1, 2],
                bar: [3, 4]
            });

            expect(res1).toEqual([1, 2]);
            expect(res2).toEqual([3, 4]);
        });
    });
});
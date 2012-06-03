define(['photon/core/keys'], function(keys) {
    describe('photon/core/keys', function() {
        it('should return the keys of an array', function() {
            var a = ['foo', 'bar'];
            expect(keys(a)).toEqual([0, 1]);
        });

        it('should return the keys of an object', function() {
            var a = {
                foo: true,
                bar: false
            };
            var list = keys(a);
            expect(list).toContain('foo');
            expect(list).toContain('bar');
        });
    });
});
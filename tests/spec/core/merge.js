define(['photon/core/merge'], function(merge) {
    describe('photon/core/merge', function() {
        it('merge two simple objects', function() {
            var c = {
                one: 'foo'
            };
            var b = {
                two: 'bar'
            };
            var a = merge(b, c);
            expect(a.one).toEqual('foo');
            expect(a.two).toEqual('bar');
            expect(c.two).toBeUndefined();
            expect(b.one).toBeUndefined();
        });
        
        it('merge two deeper objects', function() {
            var c = {
                one: {
                    one: 'foo'
                }
            };
            var b = {
                one: {
                    two: 'bar'
                }
            };
            var a = merge(b, c);
            expect(a.one.one).toEqual('foo');
            expect(a.one.two).toEqual('bar');
            expect(c.one.two).toBeUndefined();
            expect(b.one.one).toBeUndefined();
        });
        
        it('override arrays', function() {
            var c = {
                one: ['a', 'b']
            };
            var b = {
                one: ['1', '2']
            };
            var a = merge(b, c);
            expect(a.one[0]).toEqual('a');
            expect(a.one[1]).toEqual('b');
            expect(a.one[2]).toBeUndefined();
        });
    });
});
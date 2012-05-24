require(['photon/core/clone'], function(clone) {
    describe('photon/core/clone', function() {
        it('should clone an array', function() {
            var b = ['foo', 'bar', 'baz'];
            var a = clone(b);
            a[1] = 'rab';
            expect(a[1]).toEqual('rab');
            expect(b[1]).toEqual('bar');
        });
        
        it('should clone a nested array', function() {
            var b = ['foo', ['boo', 'bar'], 'baz'];
            var a = clone(b);
            a[1][1] = 'rab';
            expect(a[1][1]).toEqual('rab');
            expect(b[1][1]).toEqual('bar');
        });
        
        it('should clone a object', function() {
            var b = {
                'one': 'foo',
                'two': 'bar',
                'three': 'baz'
            };
            var a = clone(b);
            a.two = 'rab';
            expect(a.two).toEqual('rab');
            expect(b.two).toEqual('bar');
        });
        
        it('should clone a nested object', function() {
            var b = {
                'one': 'foo',
                'two': {
                    'n1': 'boo',
                    'n2': 'bar'
                },
                'three': 'baz'
            };
            var a = clone(b);
            a.two.n2 = 'rab';
            expect(a.two.n2).toEqual('rab');
            expect(b.two.n2).toEqual('bar');
        });
        
        it('should fail without using it', function() {
            var b = ['foo', 'bar', 'baz'];
            var a = b;
            a[1] = 'rab';
            expect(a[1]).toEqual('rab');
            expect(b[1]).toEqual('rab');
        });
        
        it('should clone a mix of object, array and variable', function() {
            var b = {
                'one': 'foo',
                'two': {
                    'n1': 'boo',
                    'n2': 'bar',
                    'n3': [
                        true,
                        false,
                        {
                            'x': 'y'
                        }
                    ]
                },
                'three': 'baz'
            };
            
            var a = clone(b);
            
            a.two.n2 = 'rab';
            expect(a.two.n2).toEqual('rab');
            expect(b.two.n2).toEqual('bar');
            
            a.two.n3[0] = false;
            a.two.n3[1] = true;
            expect(a.two.n3[0]).toEqual(false);
            expect(a.two.n3[1]).toEqual(true);
            expect(b.two.n3[0]).toEqual(true);
            expect(b.two.n3[1]).toEqual(false);
            
            a.two.n3[2].x = 'changed';
            expect(a.two.n3[2].x).toEqual('changed');
            expect(b.two.n3[2].x).toEqual('y');
        });
    });
});
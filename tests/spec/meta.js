define(['photon/meta', 'photon/core/type'], function(meta, type) {
    describe('photon/meta', function() {
        it('should contain a version number', function() {
            expect(type(meta.version)).toEqual('string');
        });
    });
});
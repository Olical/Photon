define(['photon/meta', 'photon/core/contains'], function(meta, contains) {
    describe('photon/meta', function() {
        it('should contain a version number', function() {
            expect(contains(meta.version, '.')).toEqual(true);
        });
    });
});
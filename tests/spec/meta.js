define(['photon/meta', 'photon/core/type'], function(meta, type) {
    describe('photon/meta', function() {
        it('should contain a version number', function() {
            expect(type(meta.version)).toEqual('string');
        });

        it('should contain a repository URL', function() {
            expect(type(meta.repository)).toEqual('string');
        });

        it('should contain a list of authors', function() {
            expect(type(meta.authors)).toEqual('array');
            expect(type(meta.authors[0].name)).toEqual('string');
            expect(type(meta.authors[0].url)).toEqual('string');
        });

        it('should contain a license', function() {
            expect(type(meta.license)).toEqual('object');
            expect(type(meta.license.type)).toEqual('string');
            expect(type(meta.license.url)).toEqual('string');
        });
    });
});
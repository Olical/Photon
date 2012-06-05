define(['photon/dom/Element'], function(Element) {
    describe('photon/dom/Element', function() {
        it('should create elements', function() {
            var a = new Element('p');
            expect(a.element.nodeType).toEqual(1);
            expect(a.element.tagName).toEqual('P');
        });

        it('should adopt Photon elements', function() {
            var b = new Element('a');
            var a = new Element(b);
            expect(a.element.nodeType).toEqual(1);
            expect(a.element.tagName).toEqual('A');
        });

        it('should adopt native elements', function() {
            var b = new Element('div');
            var a = new Element(b.element);
            expect(a.element.nodeType).toEqual(1);
            expect(a.element.tagName).toEqual('DIV');
        });
    });
});
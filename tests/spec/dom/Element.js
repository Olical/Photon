define(['photon/dom/Element'], function(Element) {
    var elParent = document.getElementById('test-el-parent'),
        el = document.getElementById('test-el');

    describe('photon/dom/Element', function() {
        it('should create elements', function() {
            var a = new Element('p');
            expect(a.type).toEqual(1);
            expect(a.tag).toEqual('p');
        });

        it('should adopt Photon elements', function() {
            var b = new Element('a');
            var a = new Element(b);
            expect(a.type).toEqual(1);
            expect(a.tag).toEqual('a');
        });

        it('should adopt native elements', function() {
            var b = new Element('div');
            var a = new Element(b.element);
            expect(a.type).toEqual(1);
            expect(a.tag).toEqual('div');
        });

        it('should access an elements parent', function() {
            var a = new Element(el);
            expect(a.getParent().element).toEqual(elParent);
            expect(a.getParent().getParent().getParent().getParent()).toEqual(null);
        });

        it('should access an elements parents', function() {
            var a = new Element(el);
            var parents = a.getParents();
            expect(parents.length).toEqual(3);
            expect(parents[0].getParents().length).toEqual(2);
        });
    });
});
define(['photon/dom/Element'], function(Element) {
    var elParent = document.getElementById('test-el-parent'),
        elOutside = document.getElementById('test-el-outside'),
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

        it('should get the next element', function() {
            var a = new Element(el);
            var b = new Element(elParent);

            expect(a.getNext()).toEqual(null);
            expect(b.getNext().tag).toEqual('p');
        });

        it('should get the previous element', function() {
            var a = new Element(el);
            var b = new Element(elParent);

            expect(a.getPrevious()).toEqual(null);
            expect(b.getPrevious().tag).toEqual('ul');
        });

        it('should allow adding elements before another', function() {
            var a = new Element(elOutside);
            var b = new Element('ol');
            b.insertBefore(a);
            expect(a.getPrevious().tag).toEqual('ol');
        });
    });
});
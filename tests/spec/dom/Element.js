define(['photon/dom/Element'], function(Element) {
    var elParent = document.getElementById('test-el-parent'),
        elOutside = document.getElementById('test-el-outside'),
        el = document.getElementById('test-el');

    describe('photon/dom/Element', function() {
        it('create elements', function() {
            var a = new Element('p');
            expect(a.type).toEqual(1);
            expect(a.tag).toEqual('p');
        });

        it('adopt Photon elements', function() {
            var b = new Element('a');
            var a = new Element(b);
            expect(a.type).toEqual(1);
            expect(a.tag).toEqual('a');
        });

        it('adopt native elements', function() {
            var b = new Element('div');
            var a = new Element(b.element);
            expect(a.type).toEqual(1);
            expect(a.tag).toEqual('div');
        });

        it('access an elements parent', function() {
            var a = new Element(el);
            expect(a.getParent().matches(elParent)).toEqual(true);
            expect(a.getParent().getParent().getParent().getParent().getParent()).toEqual(null);
        });

        it('access an elements parents', function() {
            var a = new Element(el);
            var parents = a.getParents();
            expect(parents.length).toEqual(4);
            expect(parents[0].getParents().length).toEqual(3);
        });

        it('get the next element', function() {
            var a = new Element(el);
            var b = new Element(elParent);

            expect(a.getNext()).toEqual(null);
            expect(b.getNext().tag).toEqual('p');
        });

        it('get the previous element', function() {
            var a = new Element(el);
            var b = new Element(elParent);

            expect(a.getPrevious()).toEqual(null);
            expect(b.getPrevious().tag).toEqual('ul');
        });

        it('allow adding elements before another', function() {
            var a = new Element(elOutside);
            var b = new Element('ol');
            b.insertBefore(a);
            expect(a.getPrevious().tag).toEqual('ol');
            b.remove();
        });

        it('set and get attributes', function() {
            var a = new Element(el);
            a.setAttribute('title', 'Photon element');
            expect(a.getAttribute('title')).toEqual('Photon element');
            expect(a.getAttribute().title).toEqual('Photon element');
            expect(a.getAttribute('foo')).toEqual(null);
        });

        it('check for an attributes existence', function() {
            var a = new Element(el);
            a.setAttribute('data-exists', 'test');
            expect(a.hasAttribute('data-exists')).toEqual(true);
            expect(a.hasAttribute('data-does-not-exist')).toEqual(false);
        });

        it('remove attributes', function() {
            var a = new Element('div');
            a.setAttribute('data-test', 'foo');
            expect(a.getAttribute('data-test')).toEqual('foo');
            a.removeAttribute('data-test');
            expect(a.getAttribute('data-test')).toEqual(null);
        });

        it('insert after elements', function() {
            var a = new Element('strong');
            a.insertAfter(elOutside);
            expect(a.getPrevious().matches(elOutside)).toEqual(true);
            a.remove();
        });

        it('insert first', function() {
            var a = new Element('strong');
            a.insertFirst(document.body);
            expect(a.getParent().matches(document.body)).toEqual(true);
            expect(a.getPrevious()).toEqual(null);
            expect(a.getNext()).not.toEqual(null);
            a.remove();
        });

        it('insert last', function() {
            var a = new Element('strong');
            a.insertLast(document.body);
            expect(a.getParent().matches(document.body)).toEqual(true);
            expect(a.getNext()).toEqual(null);
            expect(a.getPrevious()).not.toEqual(null);
            a.remove();
        });

        it('replace elements', function() {
            var a = new Element('strong');
            var b = new Element('em');
            var body = new Element(document.body);
            a.insertFirst(body);
            expect(body.getChildren()[0].matches(a)).toEqual(true);
            expect(a.getParent()).not.toEqual(null);
            expect(b.getParent()).toEqual(null);
            b.replace(a);
            expect(body.getChildren()[0].matches(b)).toEqual(true);
            expect(a.getParent()).toEqual(null);
            expect(b.getParent()).not.toEqual(null);
            b.remove();
        });

        it('remove elements', function() {
            var a = new Element('strong');
            a.insertFirst(document.body);
            expect(a.getParent().matches(document.body)).toEqual(true);
            a.remove();
            expect(a.getParent()).toEqual(null);
        });

        it('clone elements', function() {
            var a = new Element('strong');
            var ins = new Element('em');
            ins.insertLast(a);
            expect(a.contains(ins)).toEqual(true);
            expect(a.matches(a)).toEqual(true);
            var b = a.clone();
            expect(b.getChildren().length).toEqual(0);
            expect(a.matches(b)).toEqual(false);
            var c = a.clone(true);
            expect(c.getChildren().length).toEqual(1);
            expect(a.tag).toEqual(b.tag);
        });

        it('get children', function() {
            var a = new Element('div');
            var b = new Element('strong');
            var c = new Element('em');
            expect(a.getChildren().length).toEqual(0);
            b.insertLast(a);
            expect(a.getChildren().length).toEqual(1);
            c.insertLast(a);
            expect(a.getChildren().length).toEqual(2);
            b.remove();
            expect(a.getChildren().length).toEqual(1);
            c.remove();
            expect(a.getChildren().length).toEqual(0);
        });
    });
});
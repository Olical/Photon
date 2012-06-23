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

        it('get all next', function() {
            var a = new Element('div');
            var b = new Element('p');
            var c = new Element('p');
            var d = new Element('p');
            b.insertLast(a);
            c.insertLast(a);
            d.insertLast(a);

            expect(d.getAllNext().length).toEqual(0);
            expect(c.getAllNext().length).toEqual(1);
            expect(b.getAllNext().length).toEqual(2);
        });

        it('get all previous', function() {
            var a = new Element('div');
            var b = new Element('p');
            var c = new Element('p');
            var d = new Element('p');
            b.insertLast(a);
            c.insertLast(a);
            d.insertLast(a);

            expect(d.getAllPrevious().length).toEqual(2);
            expect(c.getAllPrevious().length).toEqual(1);
            expect(b.getAllPrevious().length).toEqual(0);
        });

        it('match elements', function() {
            var a = new Element('strong');
            var b = new Element('em');

            expect(a.matches(b)).toEqual(false);
            expect(a.matches(a)).toEqual(true);
            expect(a.matches(a.element)).toEqual(true);
            expect(a.matches(a.clone())).toEqual(false);
        });

        it('get all siblings', function() {
            var a = new Element('div');
            var b = new Element('p');
            var c = new Element('p');
            var d = new Element('p');

            expect(b.getSiblings().length).toEqual(0);

            b.insertLast(a);

            expect(b.getSiblings().length).toEqual(0);

            c.insertLast(a);

            expect(b.getSiblings().length).toEqual(1);

            d.insertLast(a);

            expect(b.getSiblings().length).toEqual(2);
        });

        it('allow the setting and getting of class arrays', function() {
            var a = new Element('div');
            var cls = ['foo', 'bar', 'baz'];
            expect(a.getClasses()).toEqual([]);
            a.setClasses(cls);
            expect(a.getClasses()).toEqual(cls);
        });

        it('add classes', function() {
            var a = new Element('div');

            a.addClass('foo');
            expect(a.getClasses()).toEqual(['foo']);

            a.addClass('bar');
            expect(a.getClasses()).toEqual(['foo', 'bar']);

            a.addClass('baz');
            expect(a.getClasses()).toEqual(['foo', 'bar', 'baz']);

            a.addClass(['x', 'y']);
            expect(a.getClasses()).toEqual(['foo', 'bar', 'baz', 'x', 'y']);
        });

        it('remove classes', function() {
            var a = new Element('div');
            a.addClass(['foo', 'bar', 'baz', 'x', 'y']);
            expect(a.getClasses()).toEqual(['foo', 'bar', 'baz', 'x', 'y']);
            a.removeClass('bar');
            expect(a.getClasses()).toEqual(['foo', 'baz', 'x', 'y']);
            a.removeClass(['baz', 'y']);
            expect(a.getClasses()).toEqual(['foo', 'x']);
            a.removeClass(['foo', 'x']);
            expect(a.getClasses()).toEqual([]);
        });

        it('check for classes', function() {
            var a = new Element('div');
            expect(a.hasClass('foo')).toEqual(false);
            a.addClass(['foo', 'bar', 'baz']);
            expect(a.hasClass('x')).toEqual(false);
            expect(a.hasClass('bar')).toEqual(true);
            expect(a.hasClass(['baz', 'x'])).toEqual(false);
            expect(a.hasClass(['bar', 'baz'])).toEqual(true);
        });

        it('toggle classes', function() {
            var a = new Element('div');
            expect(a.hasClass('foo')).toEqual(false);
            a.toggleClass('foo');
            expect(a.hasClass('foo')).toEqual(true);
            a.toggleClass('bar');
            expect(a.hasClass(['foo', 'bar'])).toEqual(true);
            a.toggleClass('foo');
            expect(a.hasClass('foo')).toEqual(false);
            a.toggleClass(['foo', 'baz']);
            expect(a.hasClass(['foo', 'bar', 'baz'])).toEqual(true);
        });

        it('manipulate inner html', function() {
            var a = new Element('div');
            expect(a.getHtml()).toEqual('');
            a.setHtml('<p>Hello.</p>');
            expect(a.getHtml().toLowerCase()).toEqual('<p>hello.</p>');
            expect(a.getChildren()[0].getHtml()).toEqual('Hello.');
            a.setHtml('');
            expect(a.getHtml()).toEqual('');
        });

        it('manipulate inner text', function() {
            var a = new Element('div');
            expect(a.getText()).toEqual('');
            a.setText('<p>Hello.</p>');
            expect(a.getText()).toEqual('<p>Hello.</p>');
            a.setText('');
            expect(a.getText()).toEqual('');
        });

        it('get the first element', function() {
            var a = new Element('div');
            var b = new Element('p');
            var c = new Element('p');
            var d = new Element('p');

            b.insertLast(a);
            c.insertLast(a);
            d.insertLast(a);

            expect(a.getFirst().matches(b)).toEqual(true);
            expect(a.getFirst().matches(c)).toEqual(false);
            expect(a.getFirst().matches(d)).toEqual(false);
        });

        it('get the last element', function() {
            var a = new Element('div');
            var b = new Element('p');
            var c = new Element('p');
            var d = new Element('p');

            b.insertLast(a);
            c.insertLast(a);
            d.insertLast(a);

            expect(a.getLast().matches(b)).toEqual(false);
            expect(a.getLast().matches(c)).toEqual(false);
            expect(a.getLast().matches(d)).toEqual(true);
        });

        it('get all descendants', function() {
            var a = new Element('div');
            var b = new Element('p');
            var c = new Element('p');
            var d = new Element('p');
            var e = new Element('strong');

            expect(a.getDescendants().length).toEqual([].length);

            b.insertLast(a);
            c.insertLast(a);
            d.insertLast(a);

            var decs1 = a.getDescendants();
            expect(decs1.length).toEqual([b, c, d].length);
            expect(decs1[0]).toEqual(b);
            expect(decs1[2]).toEqual(d);

            e.insertLast(d);

            var decs2 = a.getDescendants();
            expect(decs2.length).toEqual([b, c, d, e].length);
            expect(decs2[0]).toEqual(b);
            expect(decs2[3]).toEqual(e);
        });

        it('contains another element', function() {
            var a = new Element('div');
            var b = new Element('p');
            var c = new Element('p');
            var d = new Element('p');
            var e = new Element('strong');

            b.insertLast(a);
            c.insertLast(a);

            expect(a.contains(d)).toEqual(false);

            d.insertLast(a);

            expect(a.contains(d)).toEqual(true);
            expect(a.contains(e)).toEqual(false);

            e.insertLast(d);

            expect(a.contains(e)).toEqual(true);
        });

        it('normalize style key', function() {
            var a = new Element('div');
            expect(a.getStyleKey('color')).toEqual('color');
            expect(a.getStyleKey('border-width')).toEqual('borderWidth');
            expect(a.getStyleKey('background-color')).toEqual('backgroundColor');
        });

        it('set and get styles', function() {
            var a = new Element('div');
            a.setStyle('width', 10);
            a.setStyle({
                height: '20px',
                margin: '30px'
            });

            expect(a.getStyle('width')).toEqual('10px');
            expect(a.getStyle('height')).toEqual('20px');
            expect(a.getStyle('margin')).toContain('30px');
        });

        it('allow passing of a config object', function() {
            var a = new Element('div', {
                text: 'foo-text',
                html: 'foo-html',
                style: {
                    color: '#FF0000'
                },
                attributes: {
                    title: 'bar-title',
                    href: '#bar-href'
                },
                classes: ['foo', 'bar'],
                insertLast: document.body
            });

            expect(a.getText()).toEqual('foo-html');
            expect(a.getHtml()).toEqual('foo-html');
            expect(typeof a.getStyle('color')).toEqual('string');
            expect(a.getStyle('color').length > 0).toEqual(true);
            expect(a.getAttribute('title')).toEqual('bar-title');
            expect(a.getAttribute('href')).toEqual('#bar-href');
            expect(a.hasClass('bar')).toEqual(true);
            expect(a.getParent().matches(document.body)).toEqual(true);

            a.remove();
        });

        it('allow calling of looped methods on element lists', function() {
            var a = new Element('div');

            var ca = new Element('p', { insertLast: a, style: { color: '#FF0000' } });
            var cb = new Element('p', { insertLast: a });
            var cc = new Element('p', { insertLast: a });

            var children = a.getChildren();

            children.setText('Photon rocks');
            expect(children[2].getText()).toEqual('Photon rocks');

            expect(children.contains(children[1])).toEqual(true);
            expect(children.contains(a)).toEqual(false);
        });

        it('get multiple style values', function() {
            var a = new Element('div', {
                style: {
                    width: 50,
                    height: 100
                }
            });

            var styles = a.getStyle('width', 'height');

            expect(styles.width).toEqual('50px');
            expect(styles.height).toEqual('100px');

            expect(styles.array.length).toEqual(2);
        });
    });
});
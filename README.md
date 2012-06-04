# Photon - Lightweight, fast and modular JavaScript library

Photon is a JavaScript library made up of [AMD modules](https://github.com/amdjs/amdjs-api/wiki/AMD) that are geared towards frontend web development. It includes a robust class system that attempts to mimic [Python](http://docs.python.org/tutorial/classes.html). It is thoroughly tested and documented and is written under the standards laid down by [JSHint](http://www.jshint.com/).

The library is still in development but some parts should be usable.

## Compatibility

My goal is to have Photon working perfectly in IE6+ as well as all modern browsers. I may also end up adding modules that only work in modern browsers, such as a canvas library, but those modules will be littered with warnings.

### What about other JavaScript libraries?

Because Photon is 100% AMD it does not pollute any global namespaces. This means that it will work with **any** other JavaScript library. The only time it would not would be if the JavaScript library broke `Array.prototype.push` or something that Photon relies on.

## Testing

Every module is thoroughly tested using [Jasmine](http://pivotal.github.com/jasmine/). You can run the tests by opening `tests/SpecRunner.html` in a browser of your choice. You can also execute it via the version hosted on [GitHub pages](http://oli.me.uk/Photon/tests/SpecRunner.html).

## Documentation

I have provided large comments in the source matching the [NaturalDocs](http://www.naturaldocs.org/) format. The documentation site can be generated from these comments by running `make documentation`. Once done you can open `docs/html/index.html` in your browser to see every modules documentation. You can also load the documentation from the [GitHub pages site](http://oli.me.uk/Photon/docs/html/files/core/Class-js.html).

## Loading

To load any of Photon's modules you will need [RequireJS](http://requirejs.org/). It is a asynchronous module loader that was designed for browsers. It works in IE6+ and also provides an optimiser ([r.js](http://requirejs.org/docs/optimization.html)). So when you are done with development you can flatten your code and it's loaded modules down to one file and minify it with [UglifyJS](https://github.com/mishoo/UglifyJS).

### Setting up

The following code is making some assumptions as to where your your main source file and `require.js` is located, but you get the idea.

    <script type='text/javascript' src='scripts/require.js' data-main='scripts/main'></script>

This will first load RequireJS and then instruct it to fetch your main module in `scripts/main.js`. This will also set the path to main as the base path for all other requests. This means you can load files relative to `main.js` and not your HTML file.

You will need a copy of Photon for your script to load from. You can get a release archive from the [downloads page](https://github.com/Wolfy87/Photon/downloads) which you should store next to your main script under the name `photon`. If it has to be stored somewhere else then you can copy and edit this config to tell RequireJS where Photon is located.

    require.config({
        paths: {
            photon: './path/to/photon'
        },
    });

**Do not load from this repository.** This repository is for development. You can use it if you really want but you would need to point RequireJS at the source directory within it and it is not guaranteed to be stable. The [downloads page](https://github.com/Wolfy87/Photon/downloads) houses finished versions which do not contain things such as documentation tools or testing frameworks.

### Loading modules

When you are all set up you can load and use any of Photon's modules by placing code like this in your main module or any of your own sub modules.

    require([
        'photon/core/Class',
        'photon/core/each',
        'your/own'
    ], function(Class, each, own) {
        // Do things with the loaded modules...
        // Own is anything you want it to be.
        // While you have RequireJS on the page you may as well make the most of it and split up your code.
    });

## Example

After you have learnt how to [load RequireJS and Photon's modules](#loading) you can do anything you want. Here is a little example to give you an idea. This code would be placed in your main module as discussed in [the loading section](#loading).

    require([
        'photon/core/Class'
    ], function(Class) {
        // Create a base class
        var Animal = new Class();

        // And give it a method
        Animal.prototype.makeNoise = function() {
            alert('The animal made a noise.');
        };

        // Inherit from the base class
        var Dog = new Class(Animal);

        // Override the method
        Dog.prototype.makeNoise = function() {
            // Call the original parent method
            Dog.inherits.makeNoise.apply(this);

            // Add our own bit on the end
            alert('It was a bark.');
        };

        // Run the class
        var myDog = new Dog();
        myDog.makeNoise();

        // Will show "The animal made a noise."
        // And then "It was a bark."
    });

## Compiling

Obviously you will not want to load my heavily commented code and many separate files while in production. Luckily you can use RequireJS to optimise your code into one minified file including only the modules you are actually using. That means no bloated scripts (I am looking at you jQuery...), just the functions and classes you are currently using.

You will need either Java or node to execute r.js, the optimising script. For more information on how you run and configure it head over to [the r.js repository](https://github.com/jrburke/r.js). For now, here is a little example as to how you would compile the previous examples.

    r.js -o name=main out=main-built.js baseUrl=scripts

Now by altering your loading of RequireJS slightly you can load the fully concatenated and minified version.

    <script type='text/javascript' src='scripts/require.js' data-main='scripts/main-built'></script>

All I have done is changed `scripts/main` to `scripts/main-built`.

If you are specifying where Photon is located in your code then you will also need to do so in the build command.

    r.js -o name=main out=main-built.js baseUrl=scripts paths.photon=./path/to/photon

You can also include [Almond](https://github.com/jrburke/almond) in your build. If you do this you will not need to load `require.js` to load your code. Instead you have a standalone fully compiled script. That means one script on your page that contains only the parts of Photon you need.

    r.js -o name=main out=main-built.js baseUrl=scripts paths.photon=./path/to/photon include=./almond/almond.js

## License

[![Creative Commons License](http://i.creativecommons.org/l/by/3.0/88x31.png)](http://creativecommons.org/licenses/by/3.0/)

Photon by [Oliver Caldwell](http://oli.me.uk) is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).
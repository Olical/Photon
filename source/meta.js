/*
    File: Meta

    This module simply returns an object containing information about photon.

    Within this object you will find a version string, repository URL, author array (containing names and URLs) and a license object (containing a type and URL).

    Here is the current data.
    
    (start code)
    {
        version: '0.0.1',
        repository: 'https://github.com/Wolfy87/Photon',
        authors: [
            {
                name: 'Oliver Caldwell',
                url: 'http://oli.me.uk/'
            }
        ],
        license: {
            type: 'Creative Commons Attribution 3.0 Unported License',
            url: 'http://creativecommons.org/licenses/by/3.0/'
        }
    }
    (end)
*/

define({
    version: '0.0.1',
    repository: 'https://github.com/Wolfy87/Photon',
    authors: [
        {
            name: 'Oliver Caldwell',
            url: 'http://oli.me.uk/'
        }
    ],
    license: {
        type: 'Creative Commons Attribution 3.0 Unported License',
        url: 'http://creativecommons.org/licenses/by/3.0/'
    }
});
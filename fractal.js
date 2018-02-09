'use strict';
const pkg = require('./package.json');
const path = require('path');
const fractal = require('@frctl/fractal').create();

const context = {
    'package': {
        name: pkg.name,
        version: pkg.version
    },
    lawds: {
        path: '../../dist'
    }
};

fractal.set('project.title', 'State of Louisiana - Web Design System');

const components = fractal.components;
components.set('ext', '.njk');
components.set('path', 'src/components');
components.set('default.preview', '@lawds');
components.set('default.context', context);

// Setup Nunjucks
components.engine(require('@frctl/nunjucks')({
    filters: {
        jsonify: d => JSON.stringify(d, null, '  '),
        dataurl: (d, type) => 'data:${type},${encodeURIComponent(d)}'
    },
    paths: [
        'src/components'
    ]
}));

const docs = fractal.docs;
docs.set('path', 'src/docs');

const web = fractal.web;

web.set('static.path', 'dist');
web.set('static.mount', 'dist');

module.exports = fractal;
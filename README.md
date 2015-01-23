# mediawiki-js

Ultra-light, vanilla JavaScript wrapper of Mediawiki API for use in the browser.

Simple one-shot usage:

```js
MediaWikiJS('https://en.wikipedia.org', {action: 'query', prop: 'revisions', titles: 'Main Page'}, function (data) {
    var pages = data.query.pages;
    alert('Last edited by: ' + pages[Object.keys(pages)[0]].revisions[0].user);
});
```

Simple reusable usage:

```js
var mwjs = MediaWikiJS('https://en.wikipedia.org');
mwjs.send({action: 'query', prop: 'revisions', titles: 'Main Page'}, function (data) {
    var pages = data.query.pages;
    alert('Last edited by: ' + pages[Object.keys(pages)[0]].revisions[0].user);
});
```

Configuration object:

```js
var mwjs = MediaWikiJS({baseURL: 'https://en.wikipedia.org', apiPath: '/w/api.php'});
mwjs.send({action: 'query', prop: 'revisions', titles: 'Main Page'}, function (data) {
    var pages = data.query.pages;
    alert('Last edited by: ' + pages[Object.keys(pages)[0]].revisions[0].user);
});
```

# To-dos

1. Node support and publish

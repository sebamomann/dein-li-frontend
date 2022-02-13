const replace = require('gulp-replace');
const { src, dest } = require('gulp');

function replaceTemplate() {
  return src(['./dist/dein-li-frontend/ngsw-worker.js'])
    .pipe(replace('onFetch(event) {', 'onFetch(event) { const r = event.request; const s = this.scope.registration.scope; const ruo = this.adapter.parseUrl(r.url, s); if (/^\\/([a-zA-Z0-9-_]+)\\/?$/.test(ruo.path)) { return; }'))
    .pipe(dest('./dist/dein-li-frontend'));
};

replaceTemplate();

exports.replaceTemplate = replaceTemplate;

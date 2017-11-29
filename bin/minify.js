const fs = require('fs');
const globby = require('globby');
const csso = require('csso');
const uglify = require('uglify-es');

const cssFiles = globby.sync(['public/css/*.css']);
const jsFiles = globby.sync(['public/js/*.js']);

for (const cssFile of cssFiles) {
  const css = fs.readFileSync(cssFile).toString();
  fs.writeFileSync(cssFile, csso.minify(css).css);
}

for (const jsFile of jsFiles) {
  const js = fs.readFileSync(jsFile).toString();
  fs.writeFileSync(jsFile, uglify.minify(js).code);
}

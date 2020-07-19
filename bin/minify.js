const fs = require('fs');
const globby = require('globby');
const csso = require('csso');

const cssFiles = globby.sync(['public/css/*.css']);

for (const cssFile of cssFiles) {
  const css = fs.readFileSync(cssFile).toString();
  fs.writeFileSync(cssFile, csso.minify(css).css);
}

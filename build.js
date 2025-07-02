const fs = require('fs')


require('esbuild').buildSync({
  entryPoints: ['src/client/index.jsx'],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  bundle: true,
  minify: true,
  outfile: 'dist/main.js',
})


fs.copyFileSync('src/index.html', 'dist/index.html')
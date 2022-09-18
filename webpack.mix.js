require('dotenv').config();
const env = require('./server/core/helpers/env');

const mix = require('laravel-mix');
require('laravel-mix-njk');

const isDev = (process.env.NODE_ENV === 'development') ? true : false;
const basePath = process.cwd();

const nunjucksContext = require('./resources/data/index');
const nunjucksDevConfig = require('./resources/html/config.dev.json');
const nunjucksProdConfig = require('./resources/html/config.prod.json');

nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = {
  searchPaths: basePath + '/resources/html/',
  context: nunjucksContext
};

mix
  .njk('./resources/html/', nunjucksOptions)
  .js('./resources/assets/js/index.js', 'assets/js/bundle.js')
  .sass('./resources/assets/scss/main.scss', 'assets/css')
  .options({
    processCssUrls: false
  })
  .copyDirectory('./resources/assets/images', 'public/assets/images')
  .browserSync(`http://${env('SERVER_HOST')}:${env('SERVER_PORT')}/`)
  .webpackConfig(webpack => {
    return {
      resolve: {
        fallback: {
          "crypto": require.resolve('crypto-browserify'),
          "http": require.resolve('stream-http'),
          "https": require.resolve('https-browserify'),
          "path": require.resolve('path-browserify'),
          "stream": require.resolve('stream-browserify'),
          "zlib": require.resolve('zlib-browserify')
        }
      }
    };
  })
  .setPublicPath('public');
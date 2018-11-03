const mix = require('laravel-mix');
var SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |{
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      }
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/index.scss', 'public/css')
    .babelConfig({
        "plugins":["transform-vue-jsx", "transform-runtime"]
    })
    .webpackConfig({ plugins: [

            new SVGSpritemapPlugin({
                src: 'resources/js/icons/svg/*.svg',
                filename : 'img/icons.svg',
                prefix : 'icon-',
                svgo : {removeTitle : true}
                // path: './resources/assets/svg/**/*.svg'
            })
        ]} );

# Todo

## Setup NodeJS
**NodeJS and NPM**
Download [NodeJS with NPM](https://nodejs.org/en/download/).
**Installing modules**
Run the following command in `/the_root_of_your_todo_dir`
```bash
$ npm install
```
## Run & build SlackSafe
Minify the css to `/public/dist/css/styles.min.css`
```bash
$ npm run css:minify
```
Convert css/sass to `./public/dist/css/styles.css`
```bash
$ npm run css:compress
```
Rebuild css on filechange (*.css)
```bash
$ npm run css:watch
```
Minify js to `/public/dist/js/bundle.min.js`
```bash
$ npm run js:minify
```
Bundle js to `/public/dist/js/bundle.js`
```bash
$ npm run js:browserify
```
Bundle and minify js
```bash
$ npm run js:compress
```
Watch js on filechange (*.js) bundle and minify
```bash
$ npm run js:watch
```
Watch js and css on filechange bundle and minify
```bash
$ npm run client:watch
```
Watch server js on filechange restart app.js *(nodemon)*
```bash
$ npm run server:watch
```
Watch all server js, client js and css. Bundle, minify and restart on filechange
```bash
$ npm run all:watch
```
Minify all client js and css
```bash
$ npm run build
```
Watch server js on filechange restart app.js *(nodemon)*
```bash
$ npm run start
```

## Functionality

Simple todo application where you can add your tasks. Keep track of your activities! Everywhere, anywhere! Tested on the following browsers:
- IE 5+
- Chrome
- Firefox
- Edge
- Opera
- Opera mini



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

## CORE Functionality & Accessibility

Simple todo application where you can add your tasks. Keep track of your activities! Everywhere, anywhere! Tested on the following browsers:
- IE 5+
- Chrome
- Firefox
- Edge
- Opera
- Opera mini

The website is very accessible, the autofocus is on the only input. On enter the input is submitted. The user can tab trough all up's, down's, inputs in **every** browser!

**IMPORTANT**
In IE+9 `Drag and drop` is disabled. Enable this in a few simple steps:
- Go to **Internet Options**
- Go to **Security**
- Go to **Custom level**
- Go to **Drag and drop**
- **Enable** this options
- **Apply** changes
- **Restart** IE / computer

## Colour tests
This todo list only makes use of colours with a high contrast. Black - White. Simple, clean and highly effective. The way todo likes it.

## Features

### Serverside rendering (flash)
There is no JS validating. Only HTML5 validation and serverside validation trough posts and get reqeusts.

HTML5 validation with `required`. This HTML attribute is almost compatible with every browser. See [CANIUSE](http://caniuse.com/#search=required) (97.52%). But not for Opera mini and the older IE browsers. That is where the serverside validation kicks in! All the command are dubbelcheckked serverside.

If there is something wrong, there is an flash message displayed. This works for one page view after the initial command.

###  Drag and Drop
If there are browsers that aren't compatible with the JS funcionality will decrese and the fallbacks will take over. The `drag and drop` functionality is in the most desktop browsers supported (44.2%) [CANIUSE](http://caniuse.com/#search=drag%20and%20drop). If the funcionality doesn't work, the tasks will me movable trough up and down links!

### Form validation
The form is validated in different stadia:
- The input regex `pattern=".{4,}"` and `required` with an HTML5 message as feedback
- The JS form `e.preventDefault()` and submit if `value.length > 3` with an alert as feedback
- The serverside validation with an flash message as feedback

**Examples:**
- Drag and drop -> will fallback to simple `<a>` anchors with an command in the `href`.
- AJAX call -> will fallback to an form post
- EM -> will fallback to pixel
- CSS child selectors -> will fallback to cascading CSS rules
- `required` -> will fallback to serverside validation
- Input regex fallback to -> JS to -> serverside

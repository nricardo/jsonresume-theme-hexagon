# Hexagon [![npm](https://img.shields.io/npm/v/jsonresume-theme-hexagon.svg)](https://www.npmjs.com/package/jsonresume-theme-hexagon)

💥 Another JSON Resume theme...

The difference this time, is that now it's AWESOME! 💫

This is my little contribution to the awesome JSON Resume project and community. As they say "For developers, by developers."

Made with ❤️ using just the best tools on the net !!! 😜

<br>

![Theme screenshot](theme-screenshot.png)

## Features

* Keep your resume offline if you want to: the theme is self-contained.
* Great Font Awesome icons.
* Gorgeous Open Sans web font.
* Optimized for print and screen readers.
* Contains Schema.org markup to make the most of your content.
* All fields are optional, pick what you need!

> Notes: some fields are mapped to achieve some other features that needed support on this theme:
>
> - _highlights_ under work section is used to describe the code stack, e.g. React, express.js, etc...
> - _skills_ section, level is a number from 1 to 5 as a string, e.g. for a skill on React with level 3 you should write:
>
>   ```json
>   ...
>   skills: [{
>     "name": "React",
>     "level": "3",
>     "keywords": []
>   },
>   ...
>   ]
>   ...
>   ```

## Usage

Install the theme,

```sh
npm install --save jsonresume-theme-hexagon
```

Then use it:

```js
'use strict';

var theme = require('jsonresume-theme-hexagon');

var resume = require('./resume.json');
process.stdout.write(theme.render(resume));
```

## Contributing

Install the project with:

```sh
git clone https://github.com/nricardo/jsonresume-theme-hexagon.git
cd jsonresume-theme-hexagon
npm install
./.githooks/deploy
# To actively work on the theme.
npm run start
```

To run the tests locally:

```sh
# To create a reference resume export.
npm run test
cp test/resume.html test/old-resume.html
# To compare the result of your changes against the reference.
npm run test
diff -u test/old-resume.html test/resume.html
```

To release a new version:

```sh
npm version minor -m "Release %s"
git push origin master
git push --tags
npm publish
```

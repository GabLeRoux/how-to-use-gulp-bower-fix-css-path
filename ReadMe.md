# How to use [gulp-bower-fix-css-path](https://www.npmjs.com/package/gulp-bower-fix-css-path)

Attempt to fix fonts path in vendor css files when all fonts are moved to a different folder. (all fonts in the same place).

## Install requirements

```bash
npm install -g gulp bower yarn
yarn install
bower install
```

## See it in action

```bash
gulp fake-compile-vendor
cd dist/vendor
git init
git add .
git commit -m "initial commit"
cd ../..
gulp bowerFixCssWithConfig
cd dist/vendor
git diff
```

Note: This is not working yet, I may have done something wrong ;) Feel free send a PR ;)
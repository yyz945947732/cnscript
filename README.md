# CnScript

CnScript is language (actually don't) that transpiles to JavaScript.
This code is created with the help of [your-script](https://github.com/iamfrontender/your-script) module.

The source files in CnScript have `.cns` extension.

## Disclaimer

This module is created just for enormous incredible fun, nothing more. I can't even imagine someone really writing programms on this subset.

## Usage

This module is distributed via npm, it requires global installation, run `npm i -g cnscript` just where you want this code.
CnScript provides minimal console tool to translate source files to JavaScript and vice versa.
After installed globally it availble in your wd as `cnscript`

Run `cnscript yourFile.js` or `cnscript yourFile.cns` to translate it to opposite subset.

## Example

Lets imagine, your JS file, `programm.js` contains following code:

```javascript
let x = 10;

function createFunction1() {
  const x = 20;
  return new Function("return x;");
}

function createFunction2() {
  const x = 20;
  function f() {
    return x;
  }
  return f;
}

const f1 = createFunction1();
console.log(f1());
const f2 = createFunction2();
console.log(f2());
```

After launching `cnscript programm.js` in directory with this file, parser will create transpiled source file, `programm.cns`, translated in CnScript and look as following:

```javascript
变量 x = 10;

函数 createFunction1() {
  常量 x = 20;
  返回 实例化 Function("return x;");
}

函数 createFunction2() {
  常量 x = 20;
  函数 f() {
    返回 x;
  }
  返回 f;
}

常量 f1 = createFunction1();
console.log(f1());
常量 f2 = createFunction2();
console.log(f2());
```

## What it is and what isn't

Since CnScript is based on your-scipt, this subset is limited by modifying the language keywords. So, any global object properties, like `document.body` or `HTMLElement.prototype.nextElementSibling` are untouched, though it's definetely possible :)

## Under the hood

[your-script](https://github.com/iamfrontender/your-script)
[esprima-custom-keywords](https://github.com/iamfrontender/esprima-custom-keywords)
[keywords-provider](https://github.com/iamfrontender/keywords-provider)

Cheers!

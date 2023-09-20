#!/usr/bin/env node

/**
 * Simple wrapper over your-script,
 * bundled with chinese subset.
 *
 * @see https://github.com/iamfrontender/your-script
 */

const fs = require("fs/promises");
const path = require("path");
const translator = require("your-script");

const files = process.argv.slice(2);

const mainDir = path.dirname(module.filename);
const lexemsFolder = path.join(mainDir, "lexems");

const customScript = new translator({
  lexemsFolder,
});

const JS_TYPE = "javascript";
const JS_EXT = "js";
const CUSTOM_TYPE = "cnscript";
const CUSTOM_EXT = "cns";

/**
 * Get the module config before source parsing.
 * Simply choses a correct extension based on input file.
 *
 * @param {String} inputFile path to input file.
 * @returns {{ inputExt: string, outputExt: string, inputType: string, outputType: string }} options
 */
function getOptions(inputFile) {
  let inputExt;
  let outputExt;
  let inputType;
  let outputType;

  inputExt = path.extname(inputFile).substring(1);

  if (inputExt === JS_EXT) {
    inputType = JS_TYPE;
    outputType = CUSTOM_TYPE;
    outputExt = CUSTOM_EXT;
  } else if (inputExt === CUSTOM_EXT) {
    inputType = CUSTOM_TYPE;
    outputType = JS_TYPE;
    outputExt = JS_EXT;
  }

  return {
    inputExt,
    outputExt,
    inputType,
    outputType,
  };
}

/**
 * Launches parsing process in both directions and stores received result
 */
async function parse(inputFile) {
  const { inputExt, outputExt, inputType, outputType } = getOptions(inputFile);
  const filename = inputFile.replace(`.${inputExt}`, `.${outputExt}`);

  try {
    const stat = await fs.stat(inputFile);
    if (stat.isFile()) {
      const data = await fs.readFile(inputFile, "utf-8");
      await fs.writeFile(
        filename,
        customScript.parse(data, {
          from: inputType,
          to: outputType,
        })
      );
      console.log(`${inputFile} done`);
    } else {
      console.warn(`${inputFile} is not a file`);
    }
  } catch (err) {
    console.err(err);
  }
}

// Entry -----------------------------------------------
files.forEach(function (file) {
  try {
    parse(file);
  } catch (e) {
    console.err(e);
  }
});

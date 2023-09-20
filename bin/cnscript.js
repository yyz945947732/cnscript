#!/usr/bin/env node

/**
 * Simple wrapper over your-script,
 * bundled with chinese subset.
 *
 * @see https://github.com/iamfrontender/your-script
 */

// Natives ----------------------------------------------
const fs = require("fs/promises");
const path = require("path");

// Modules ----------------------------------------------
const translator = require("your-script");

// Allocations ------------------------------------------
const files = process.argv.slice(2);

const mainDir = path.dirname(module.filename);

const customScript = new translator({
  lexemsFolder: path.join(mainDir, "lexems"),
});

/**
 * Abstract logger wrapper over global console.
 *
 * @param {String} logger Logger to wrap
 * @param {String[]} messages array of strings, or arguments array of strings
 * @private
 */
function _logger(logger, messages) {
  messages = ["[CNSCRIPT] -"].concat(Array.prototype.slice.call(messages));
  console[logger].apply(console, messages);
}

/**
 * Plain output logger
 */
function log() {
  _logger("log", arguments);
}

/**
 * Error logger
 */
function error() {
  _logger("error", arguments);
}

/**
 * Get the module config before source parsing.
 * Simply choses a correct extension based on input file.
 *
 * @param {String} inputFile path to input file.
 */
function getOptions(inputFile) {
  let inputExt;
  let outputExt;
  let inputType;
  let outputType;

  inputExt = path.extname(inputFile).substring(1);

  if (inputExt === "js") {
    inputType = "javascript";
    outputType = "cnscript";
    outputExt = "cns";
  } else if (inputExt === "cns") {
    inputType = "cnscript";
    outputType = "javascript";
    outputExt = "js";
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
      log(inputFile, "done");
    } else {
      error("Seems", inputFile, "is not a file, skipping.");
    }
  } catch (err) {
    error(err);
  }
}

// Entry -----------------------------------------------
files.forEach(function (file) {
  try {
    parse(file);
  } catch (e) {
    error(e);
  }
});

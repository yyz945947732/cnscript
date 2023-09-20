const test = require("ava");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

test("js => cns", (t) => {
  execSync("npm run js");
  const targetFile = path.join(__dirname, "./example/javascript.cns");
  const targetContent = fs.readFileSync(targetFile, "utf-8");
  const compareFile = path.join(__dirname, "./example/cnscript.cns");
  const compareContent = fs.readFileSync(compareFile, "utf-8");
  t.is(targetContent, compareContent);
});

test("cns => js", (t) => {
  execSync("npm run cns");
  const targetFile = path.join(__dirname, "./example/cnscript.js");
  const targetContent = fs.readFileSync(targetFile, "utf-8");
  const compareFile = path.join(__dirname, "./example/javascript.js");
  const compareContent = fs.readFileSync(compareFile, "utf-8");
  t.is(targetContent, compareContent);
});

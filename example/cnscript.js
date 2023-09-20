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

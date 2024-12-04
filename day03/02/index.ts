const input = await Deno.readTextFile(Deno.args[0]);
const regex = new RegExp(/((?:do|don\'t)\(\))?\s*.*?\s*mul\((\d+),(\d+)\)/g);
const matches = input.matchAll(regex);
let sum = 0;
let shouldMultiply = true;
for (const match of matches) {
  const [fullMatch, _, num1, num2] = match;
  if (fullMatch.includes("don't()")) {
    shouldMultiply = false;
  } else if (fullMatch.includes("do()")) {
    shouldMultiply = true;
  }

  if (shouldMultiply) {
    const product = Number(num1) * Number(num2);
    sum += product;
  }
}

console.log(sum);

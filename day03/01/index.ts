const input = await Deno.readTextFile(Deno.args[0]);
const regex = new RegExp(/mul\((\d+),(\d+)\)/g);
const matches = input.matchAll(regex);
let sum = 0;
for (const match of matches) {
  const firstNumber = Number(match[1]);
  const secondNumber = Number(match[2]);
  const product = firstNumber * secondNumber;
  sum += product;
}

console.log(sum);

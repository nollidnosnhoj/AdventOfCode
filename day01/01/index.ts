const inputText = await Deno.readTextFile("./input.txt");
const entries = inputText.split("\n");
const delimeter = "   ";
let sum = 0;
let firstArr = [];
let secondArr = [];

for (const entry of entries) {
  if (!entry) continue;
  const [first, second] = entry.split(delimeter);
  const firstNum = parseInt(first, 10);
  const secondNum = parseInt(second, 10);
  firstArr.push(firstNum);
  secondArr.push(secondNum);
}

firstArr = firstArr.sort((a, b) => a - b);
secondArr = secondArr.sort((a, b) => a - b);

for (let i = 0; i < firstArr.length; i++) {
  sum += Math.abs(firstArr[i] - secondArr[i]);
}
console.log(sum);

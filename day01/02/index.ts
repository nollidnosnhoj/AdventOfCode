const inputText = await Deno.readTextFile("./input.txt");
const numbersInFirstList: string[] = [];
const ocurrenceInSecondList = new Map<string, number>();

for (const entry of inputText.split("\n")) {
  if (!entry.trim()) continue;
  const [first, second] = entry.split("   ");
  numbersInFirstList.push(first);
  const ocurrence = ocurrenceInSecondList.get(second);
  if (ocurrence === undefined) {
    ocurrenceInSecondList.set(second, 1);
  } else {
    ocurrenceInSecondList.set(second, ocurrence + 1);
  }
}

let sum = 0;

for (const num of numbersInFirstList) {
  const occurrence = ocurrenceInSecondList.get(num) ?? 0;
  const score = parseInt(num, 10) * occurrence;
  sum += score;
}

console.log(sum);

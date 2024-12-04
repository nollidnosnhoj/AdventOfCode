type Flow = "increasing" | "decreasing";
const inputText = await Deno.readTextFile(Deno.args[0]);
let numberOfSafeReports = 0;

for (let report of inputText.split("\n")) {
  report = report.trim();
  if (!report) continue;
  const levels = report.split(" ");

  let currentFlow: Flow | undefined;
  let isReportSafe = false;
  for (let i = 0; i < levels.length - 1; i++) {
    const level = parseInt(levels[i], 10);
    const nextLevel = parseInt(levels[i + 1], 10);
    const [isSafe, flow] = checkIfLevelsAreSafe(level, nextLevel, currentFlow);
    if (!isSafe) {
      isReportSafe = false;
      break;
    } else {
      isReportSafe = true;
    }
    currentFlow = flow;
  }

  if (isReportSafe) {
    numberOfSafeReports++;
  }
}

console.log(numberOfSafeReports);

function checkIfLevelsAreSafe(
  levelOne: number,
  levelTwo: number,
  currentFlow?: Flow,
): [boolean, Flow] {
  const difference = levelTwo - levelOne;
  const flow: Flow = difference < 0 ? "decreasing" : "increasing";
  const absDiff = Math.abs(difference);
  const isSafeLevel = absDiff > 0 && absDiff < 4;
  if (currentFlow) {
    return [currentFlow === flow && isSafeLevel, currentFlow];
  }
  return [isSafeLevel, flow];
}

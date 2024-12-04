const inputText = await Deno.readTextFile(Deno.args[0]);
let numberOfSafeReports = 0;

for (let report of inputText.split("\n")) {
  report = report.trim();
  if (!report) continue;
  const levels = report.split(" ");

  let isSafe = isReportSafe(levels);

  if (!isSafe) {
    isSafe = isReportSafeAgain(levels);
  }

  if (isSafe) {
    numberOfSafeReports++;
  }
}

console.log(numberOfSafeReports);

function isReportSafe(levels: string[]): boolean {
  let increasing = false;
  let decreasing = false;
  for (let i = 0; i < levels.length - 1; ++i) {
    const [isSafe, diff] = areLevelsSafe(
      levels[i],
      levels[i + 1],
    );

    if (!isSafe) {
      return false;
    }

    if (diff < 0) decreasing = true;
    else increasing = true;
  }

  return increasing !== decreasing;
}

function isReportSafeAgain(levels: string[]) {
  for (let i = 0; i < levels.length; i++) {
    const modifiedLevels = levels.filter((_, idx) => idx !== i);
    if (isReportSafe(modifiedLevels)) {
      return true;
    }
  }
  return false;
}

function areLevelsSafe(
  level1Input: string,
  level2Input: string,
): [boolean, number] {
  if (level1Input === level2Input) return [false, 0];
  const level = Number(level1Input);
  const level2 = Number(level2Input);
  const diff = level2 - level;
  const absDiff = Math.abs(diff);
  return [absDiff > 0 && absDiff < 4, diff];
}

console.log("This is part 1 solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const rawText = await readFile();

const input = rawText.split("\n").map((line) => line.split(" ").map(Number));
console.log({ input });

const areAllValuesSame = (newLine) => [...new Set(newLine)].length === 1;

let extrapolatedValue = [];
for (const line of input) {
  let curLine = line;
  let lastValuesArr = [line[line.length - 1]];
  while (!areAllValuesSame(curLine)) {
    let newLine = [];
    for (
      let i = 0, j = 1;
      i < curLine.length - 1, j < curLine.length;
      i++, j++
    ) {
      newLine.push(curLine[j] - curLine[i]);
    }
    curLine = newLine;
    lastValuesArr.unshift(curLine[curLine.length - 1]);
  }
  console.log({ lastValuesArr });
  extrapolatedValue.push(lastValuesArr.reduce((acc, cur) => acc + cur));
}
console.log({ sum: extrapolatedValue.reduce((acc, cur) => acc + cur) });

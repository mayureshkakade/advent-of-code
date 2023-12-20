console.log("This is part 2 solution");

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
  let firstValuesArr = [line[0]];
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
    firstValuesArr.unshift(curLine[0]);
  }
  extrapolatedValue.push(firstValuesArr.reduce((acc, cur) => cur - acc));
}
console.log({ sum: extrapolatedValue.reduce((acc, cur) => acc + cur) });

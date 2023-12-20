console.log("This is part 1 solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const rawText = await readFile();

const rawinput = rawText.split("\n")[0];
const directions = rawinput
  .replaceAll("L", "0")
  .replaceAll("R", "1")
  .split("")
  .map(Number);
console.log({ directions });

const lines = rawText.split("\n\n")[1].split("\n");
const inputMap = {};

for (const line of lines) {
  const key = line.split(" = ")[0];
  const value = line
    .split(" = ")[1]
    .replace("(", "")
    .replace(")", "")
    .split(", ");
  inputMap[key] = value;
}
console.log({ inputMap });

let steps = 0;
let inputIndex = 0;
let inputLength = directions.length;
let destination;
let curLine = inputMap["AAA"];

while (destination !== "ZZZ") {
  const curDirection = directions[inputIndex % inputLength];
  destination = curLine[curDirection];
  curLine = inputMap[destination];
  steps += 1;
  inputIndex += 1;
}

console.log({ steps });

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

const startingNodes = [];
const endingNodes = [];
for (const line of lines) {
  const key = line.split(" = ")[0];
  const value = line
    .split(" = ")[1]
    .replace("(", "")
    .replace(")", "")
    .split(", ");
  inputMap[key] = value;
  if (key.endsWith("A")) {
    startingNodes.push(key);
  }
  if (key.endsWith("Z")) {
    endingNodes.push(key);
  }
}
console.log({ inputMap, startingNodes, endingNodes });

const isValidDestination = (dest) => endingNodes.includes(dest);
const areValidDestinations = (destinations) =>
  destinations.length && destinations.every(isValidDestination);

// let curLines = startingNodes.map((node) => inputMap[node]);

const steps = startingNodes.map((node) => {
  let curLine = inputMap[node];
  let steps = 0;
  let inputIndex = 0;
  let inputLength = directions.length;
  let destination;

  while (!isValidDestination(destination)) {
    const curDirection = directions[inputIndex % inputLength];
    destination = curLine[curDirection];
    curLine = inputMap[destination];
    steps += 1;
    inputIndex += 1;
  }
  return steps;
});

const gcd = (a, b) => {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

console.log({ steps: steps.reduce((acc, cur) => (acc * cur) / gcd(acc, cur)) });

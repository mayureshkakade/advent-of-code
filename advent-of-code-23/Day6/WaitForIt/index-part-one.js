console.log("This is part 1 solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const rawText = await readFile();

const lines = rawText.split("\n");
const distances = lines[1]
  .split(":")[1]
  .trim()
  .split(" ")
  .filter(Boolean)
  .map(Number);
const times = lines[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .filter(Boolean)
  .map(Number);

console.log({ times, distances });

const input = distances.map((d, i) => {
  return {
    time: times[i],
    distance: d,
    possibilities: [],
  };
});

input.forEach((curInput) => {
  const T = curInput.time;
  const D = curInput.distance;
  for (let t = 1; t <= T; t++) {
    const d = (T - t) * t;
    if (d > D) {
      curInput.possibilities.push(d);
    }
  }
});

console.log({ input });

const product = input
  .map((i) => i.possibilities.length)
  .reduce((acc, cur) => {
    console.log({ acc, cur });
    return acc * cur;
  });

console.log({ product });

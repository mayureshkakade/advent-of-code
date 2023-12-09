console.log("This is part 2 solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const rawText = await readFile();

const lines = rawText.split("\n");
const distance = parseInt(
  lines[1].split(":")[1].trim().split(" ").filter(Boolean).join("")
);
const time = parseInt(
  lines[0].split(":")[1].trim().split(" ").filter(Boolean).join("")
);

console.log({ time, distance });

const input = {
  time,
  distance,
  possibilities: [],
};

const T = input.time;
const D = input.distance;
for (let t = 1; t <= T; t++) {
  const d = (T - t) * t;
  if (d > D) {
    input.possibilities.push(d);
  }
}

console.log({ input });

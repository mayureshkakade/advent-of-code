console.log("This is Part two solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const convertToArray = (rawText) => {
  return rawText.split("\n").map((rawLine) => {
    return rawLine.split(": ")[1];
  });
};

const rawText = await readFile();
const allLines = convertToArray(rawText);
console.log({ allLines });

const getAllMatches = (winningStr, currentLineNumbers) => {
  let matchCount = 0;
  for (const num of currentLineNumbers) {
    const pattern = `\\D${num}\\D`;
    const re = new RegExp(pattern, "g");
    const matches = [...winningStr.matchAll(re)];
    matchCount += matches.length;
  }
  return matchCount;
};

const cardCountMap = [];
allLines.forEach((l, i) => {
  cardCountMap[i] = 1;
});

for (let k = 0; k < allLines.length; k++) {
  const line = allLines[k];
  const value = cardCountMap[k];
  console.log({ k, value });

  const winningStr = " " + line.split("|")[0].trim() + " ";
  const currentLineNumbers = line
    .split("|")[1]
    .trim()
    .split(" ")
    .filter(Boolean);
  const matchCount = getAllMatches(winningStr, currentLineNumbers);

  console.log({ cardCountMap, matchCount });
  if (matchCount) {
    for (let j = 0; j < matchCount; j++) {
      let idx = k + j + 1;
      cardCountMap[idx] += value;
      console.log({ k, j, idx });
    }
  }
}

console.log({ score: cardCountMap.reduce((a, b) => a + b) });

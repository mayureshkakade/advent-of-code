console.log("This is Part one solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const convertToArray = (rawText) => {
  return rawText.split("\n").map((rawLine) => {
    return rawLine.split(": ")[1];
  });
};

/*
    1. read the text input.
    2. conver raw text to array.
    3. extract all numbers from each line and store in array.
    4. create a array of arrays of the above extracted numbers.
    5. iterate through the above array
        6. get the index of the numbers in first array 
           inside the first line. 
        7. verify if symbol exists adjacent to the numbers.
        8. if true then push the current number in result set.
        9. continue the operation for every number in the array line by line.
    10. return sum of result set.
*/

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
    console.log({ num, matches });
  }
  return matchCount;
};

let score = 0;
for (const line of allLines) {
  const winningStr = " " + line.split("|")[0].trim() + " ";
  const currentLineNumbers = line
    .split("|")[1]
    .trim()
    .split(" ")
    .filter(Boolean);
  const matchCount = getAllMatches(winningStr, currentLineNumbers);
  if (matchCount) {
    const cardScore = 2 ** (matchCount - 1);
    score += cardScore;
    console.log({ winningStr, currentLineNumbers, matchCount, cardScore });
  }
}
console.log({ score });

console.log("This is Part one solution");

/*
    1. read the text input
    2. conver raw text to array
    3. define maxRed, maxGreen, maxBlue values
    3. for each line in lines
        return the max value of each color from all subsets.
        if the max values of each color is greater than the defined max values
         continue with the next line
        else push the current line game id to result array
        caclulate the sum of result array
*/

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const convertToArray = (rawText) => {
  return rawText.split("\n");
};

const rawText = await readFile();
const allGames = convertToArray(rawText);

const getCurrentGameAndSubsets = (game) => {
  const splittedGame = game.split(": ");
  const currentGameNo = parseInt(splittedGame[0].trim().split(" ")[1].trim());
  const subsets = splittedGame[1].trim().split("; ");
  console.log({ game, subsets, currentGameNo });
  return [parseInt(currentGameNo), subsets];
};

const getCurrentSubsetValues = (currentSubset) => {
  let red = 0,
    green = 0,
    blue = 0;
  const matchRed = currentSubset.match(/(\d+) red/);
  const matchGreen = currentSubset.match(/(\d+) green/);
  const matchBlue = currentSubset.match(/(\d+) blue/);
  if (matchRed) {
    red = matchRed[1];
  }

  if (matchGreen) {
    green = matchGreen[1];
  }

  if (matchBlue) {
    blue = matchBlue[1];
  }

  return [parseInt(red), parseInt(green), parseInt(blue)];
};

const getTotalRedAndGreenAndBlue = (subsets) => {
  return subsets.reduce(
    (acc, currentSubset) => {
      const [red, green, blue] = getCurrentSubsetValues(currentSubset);
      return [
        Math.max(acc[0], red),
        Math.max(acc[1], green),
        Math.max(acc[2], blue),
      ];
    },
    [0, 0, 0]
  );
};

const calculateTotalValidGames = (allGames) => {
  let result = [];
  for (const game of allGames) {
    let maxRed = 12,
      maxGreen = 13,
      maxBlue = 14;
    const [currentGameNo, subsets] = getCurrentGameAndSubsets(game);
    const [totalRed, totalGreen, totalBlue] =
      getTotalRedAndGreenAndBlue(subsets);
    console.log({ totalRed, totalGreen, totalBlue });
    if (
      maxRed - totalRed < 0 ||
      maxGreen - totalGreen < 0 ||
      maxBlue - totalBlue < 0
    ) {
      continue;
    }
    result.push(currentGameNo);
  }
  console.log({ result });
  return result.reduce((acc, curr) => acc + curr);
};

const result = calculateTotalValidGames(allGames);
console.log({ result });

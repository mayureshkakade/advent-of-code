console.log("This is Part two solution");

/*
    1. read the text input
    2. conver raw text to array
    3. define maxRed, maxGreen, maxBlue values
    3. for each line in lines
        for each subset
         get the value of max red, max green, and max blue cubes.
         multiply the above values to obtain the power.
         push the power to result array
    4. return the sum of result array
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
    const [, subsets] = getCurrentGameAndSubsets(game);
    const [totalRed, totalGreen, totalBlue] =
      getTotalRedAndGreenAndBlue(subsets);
    console.log({ totalRed, totalGreen, totalBlue });
    result.push(totalRed * totalGreen * totalBlue);
  }
  console.log({ result });
  return result.reduce((acc, curr) => acc + curr);
};

const result = calculateTotalValidGames(allGames);
console.log({ result });

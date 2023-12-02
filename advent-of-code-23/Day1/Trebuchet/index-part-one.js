console.log("This is Part one solution");

// read the file line by line
// store each line in an string array
// apply calculation logic on each item of array
// calculation logic:
// 1. filter out the numbers from string item
// 2. if the len === 1 then concatenate the value of the number twice
//      else  concatenate the 1st and last values
// 3. store this result in intermediate variable

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const convertToArray = (rawText) => {
  return rawText.split("\n");
};

const calculateNumSum = (lineList) => {
  return lineList.reduce((acc, currentLine) => {
    const numList = getNumList(currentLine);
    console.log({ numList });
    const currentSum = getNumSum(numList);
    console.log({ currentSum, acc });
    return currentSum + acc;
  }, 0);
};

const getNumList = (line) => {
  return Array.from(line).filter(Number);
};

const getNumSum = (numList) => {
  const length = numList.length;
  if (length === 0) {
    return 0;
  }
  if (length === 1) {
    return parseInt(numList[0] + numList[0] + "");
  }

  return parseInt(numList[0] + numList[length - 1] + "");
};

const rawText = await readFile();
const lineList = convertToArray(rawText);

const total = calculateNumSum(lineList);
console.log({ total });

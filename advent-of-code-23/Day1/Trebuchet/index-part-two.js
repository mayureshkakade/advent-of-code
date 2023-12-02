console.log("This is Part two solution");

// read the file line by line
// store each line in an string array
// apply calculation logic on each item of array
// calculation logic:
// 1. maintain a list of letteredNums and nums. => X
// 2. create a DS to maintain following info
//      {
//        text: "four",
//        index: 7,
//        value: 4
//      }
// 3. For a given line, check the index of each item of X in given line and prepare above DS data.
// 4. if the len === 1 then concatenate the value of the number twice
//      else  concatenate the values of the smallest index and largest index
// 3. store this result in intermediate variable

const referenceList = [
  { text: "one", value: 1 },
  { text: "two", value: 2 },
  { text: "three", value: 3 },
  { text: "four", value: 4 },
  { text: "five", value: 5 },
  { text: "six", value: 6 },
  { text: "seven", value: 7 },
  { text: "eight", value: 8 },
  { text: "nine", value: 9 },
  { text: "1", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 },
  { text: "6", value: 6 },
  { text: "7", value: 7 },
  { text: "8", value: 8 },
  { text: "9", value: 9 },
];

const getReverseString = (str) => {
  return str.split("").reverse().join("");
};

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const convertToArray = (rawText) => {
  return rawText.split("\n");
};

const getMinMaxValues = (line) => {
  const data = [];
  let minIndexFromLeft = Number.MAX_SAFE_INTEGER;
  let minIndexFromReverse = Number.MAX_SAFE_INTEGER;
  for (const ref of referenceList) {
    const indexFromLeft = line.indexOf(ref.text);
    const indexFromReverse = getReverseString(line).indexOf(
      getReverseString(ref.text)
    );
    if (indexFromLeft >= 0 || indexFromReverse >= 0) {
      data.push({
        text: ref.text,
        indexFromLeft,
        indexFromReverse,
        value: ref.value,
      });
    }
  }

  if (data.length === 1) {
    console.log({ line, minmax: data[0].value });
    return [data[0].value.toString(), data[0].value.toString()];
  }

  // let minIndex = Number.MAX_SAFE_INTEGER,
  //   maxIndex = Number.MIN_SAFE_INTEGER;
  const res = {};

  for (const obj of data) {
    if (obj.indexFromLeft < minIndexFromLeft) {
      minIndexFromLeft = obj.indexFromLeft;
      res.lefVal = obj.value;
    }
    if (obj.indexFromReverse < minIndexFromReverse) {
      minIndexFromReverse = obj.indexFromReverse;
      res.rightVal = obj.value;
    }
  }

  const min = res.lefVal;
  const max = res.rightVal;
  console.log({ line, min, max });
  return [min.toString(), max.toString()];
};

const getNumFromLine = (line) => {
  const [min, max] = getMinMaxValues(line);
  if (!min || !max) {
    return 0;
  }
  return parseInt(min + max + "");
};

const calculateNumSum = (lineList) => {
  return lineList.reduce((acc, currentLine) => {
    const num = getNumFromLine(currentLine);
    console.log({ currentNum: num, acc });
    return acc + num;
  }, 0);
};

const rawText = await readFile();
const lineList = convertToArray(rawText);

const total = calculateNumSum(lineList);
console.log({ total });

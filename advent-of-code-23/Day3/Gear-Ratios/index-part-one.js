console.log("This is Part one solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const convertToArray = (rawText) => {
  return rawText.split("\n").map((l) => "." + l + ".");
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

const getAllNumbers = (allLines) => {
  const allNumArr = [];
  for (const line of allLines) {
    allNumArr.push(getNumbersAndIndexFromCurrentLine(line));
  }
  return allNumArr;
};

const getNumbersAndIndexFromCurrentLine = (line) => {
  let matches = [...line.matchAll(/(\d+)/g)];
  return matches.map((match) => {
    return {
      num: match[1],
      numIndex: match.index,
    };
  });
};

const isValidSymbol = (char) => {
  if (char === ".") {
    return false;
  }
  return isNaN(char);
};

const hasAdjascentSymbol = (i, currentNum, currentLine, currentLineIndex) => {
  const allAdjacentChars = [];
  const nextLine = allLines[currentLineIndex + 1];
  const prevLine = allLines[currentLineIndex - 1];
  // check in currentLine
  allAdjacentChars.push(currentLine[i + currentNum.length]);
  allAdjacentChars.push(currentLine[i - 1]);

  for (let index = -1; index <= currentNum.length; index++) {
    allAdjacentChars.push(prevLine?.[i + index]);
  }

  for (let index = -1; index <= currentNum.length; index++) {
    allAdjacentChars.push(nextLine?.[i + index]);
  }
  console.log({ allAdjacentChars, currentNum });
  return allAdjacentChars.some(isValidSymbol);
};

const getCurrentLinePartNumbers = (
  currentLine,
  currentLineNumsAndIndex,
  currentLineIndex
) => {
  const result = [];
  for (const { num, numIndex } of currentLineNumsAndIndex) {
    if (hasAdjascentSymbol(numIndex, num, currentLine, currentLineIndex)) {
      result.push(parseInt(num));
    }
  }
  return result;
};

const calculateSum = (allLines) => {
  const allNumArr = getAllNumbers(allLines);
  const resultArrayOfArrays = [];
  console.log({ allNumArr, allLines });
  for (let i = 1; i < allLines.length - 1; i++) {
    const currentLine = allLines[i];
    resultArrayOfArrays.push(
      getCurrentLinePartNumbers(currentLine, allNumArr[i], i)
    );
  }
  return resultArrayOfArrays.reduce((acc, cur) => {
    return acc + cur.reduce((a, b) => a + b);
  }, 0);
};

const rawText = await readFile();
const allLines = convertToArray(rawText);

const emptyLine = Array.from(allLines[0]).reduce((acc, curr) => acc + ".");

allLines.push(emptyLine);
allLines.unshift(emptyLine);

const result = calculateSum(allLines);

console.log({ result });

console.log("This is Part two solution");

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
    3. extract all numbers with their from each line and store in array.
    4. create a array of arrays of the above extracted numbers and indexes.
    5. iterate through the above array
        6. get the index of the numbers in first array 
           inside the first line. 
        7. if a gear is found adjacent to current number then store its x,y coordinates 
           along with the current number in a map
           <{x,y}, [part_nums]>
    8. check the gears in the map with only two nums. len == 2.
    9. calculate the gear ratio of all such gears and return the sum of gear ratios.
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

const getGearCoordsAroundNum = (
  currentNum,
  currentNumIndex,
  currentLine,
  currentLineIndex
) => {
  const foundGearsCoords = [];
  const nextLine = allLines[currentLineIndex + 1];
  const nextLineIndex = currentLineIndex + 1;
  const prevLine = allLines[currentLineIndex - 1];
  const prevLineIndex = currentLineIndex - 1;
  // check in currentLine
  if (currentLine[currentNumIndex + currentNum.length] === "*") {
    foundGearsCoords.push({
      x: currentLineIndex,
      y: currentNumIndex + currentNum.length,
    });
  }
  if (currentLine[currentNumIndex - 1] === "*") {
    foundGearsCoords.push({
      x: currentLineIndex,
      y: currentNumIndex - 1,
    });
  }

  for (let index = -1; index <= currentNum.length; index++) {
    if (prevLine?.[currentNumIndex + index] === "*") {
      foundGearsCoords.push({
        x: prevLineIndex,
        y: currentNumIndex + index,
      });
    }
  }

  for (let index = -1; index <= currentNum.length; index++) {
    if (nextLine?.[currentNumIndex + index] === "*") {
      foundGearsCoords.push({
        x: nextLineIndex,
        y: currentNumIndex + index,
      });
    }
  }
  console.log({ foundGearsCoords, currentNum, currentNumIndex });
  return foundGearsCoords;
};

const createGearToNumsMap = (
  currentLine,
  currentLineNumsAndIndex,
  currentLineIndex,
  gearToNumsMap
) => {
  for (const { num, numIndex } of currentLineNumsAndIndex) {
    const gearCoords = getGearCoordsAroundNum(
      num,
      numIndex,
      currentLine,
      currentLineIndex
    );
    if (gearCoords.length > 0) {
      for (const gear of gearCoords) {
        const stringifyGear = JSON.stringify(gear);
        if (gearToNumsMap.has(stringifyGear)) {
          gearToNumsMap.get(stringifyGear).push(num);
        } else {
          gearToNumsMap.set(stringifyGear, [num]);
        }
      }
    }
  }
  console.log({ gearToNumsMap });
};

const getGearRatios = (gearToNumsMap) => {
  const ratios = [];
  for (const [key, value] of gearToNumsMap.entries()) {
    if (value.length === 2) {
      ratios.push(parseInt(value[0]) * parseInt(value[1]));
    }
  }
  return ratios;
};

const calculateSum = (allLines) => {
  const allNumArr = getAllNumbers(allLines);
  const gearToNumsMap = new Map();
  console.log({ allNumArr, allLines });
  for (let i = 1; i < allLines.length - 1; i++) {
    const currentLine = allLines[i];
    createGearToNumsMap(currentLine, allNumArr[i], i, gearToNumsMap);
  }

  const gearRatios = getGearRatios(gearToNumsMap);
  return gearRatios.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
};

const rawText = await readFile();
const allLines = convertToArray(rawText);

const emptyLine = Array.from(allLines[0]).reduce((acc, curr) => acc + ".");

allLines.push(emptyLine);
allLines.unshift(emptyLine);

const result = calculateSum(allLines);

console.log({ result });

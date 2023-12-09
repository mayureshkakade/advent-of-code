console.log("This is part 2 solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const rawText = await readFile();

const lines = rawText.split("\n");

const input = lines.map((line) => {
  const hand = line.split(" ")[0].trim();
  const bid = parseInt(line.split(" ")[1]);
  return {
    hand,
    bid,
    order: -1,
  };
});

console.log({ input });
const HAND_TYPES = {
  FIVE: "five",
  FOUR: "four",
  FULL: "full",
  THREE: "three",
  TWO: "two",
  ONE: "one",
  HIGH: "high",
};
const weightMap = {
  A: 13,
  K: 12,
  Q: 11,
  J: -1,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};

console.log({ weightMap });

const handTypesMap = {}; // fill this out dynamically

const getHandType = (hand) => {
  if (hand.includes("J")) {
    // logic when j is present
    const cMap = {};
    for (const char of Array.from(hand)) {
      if (cMap[char]) {
        cMap[char] += 1;
      } else {
        cMap[char] = 1;
      }
    }

    if (Object.keys(cMap).length === 1) {
      return HAND_TYPES.FIVE;
    }

    const jCount = cMap["J"];
    let maxkey = Number.MIN_VALUE;
    let maxVal = Number.MIN_VALUE;
    for (const [key, value] of Object.entries(cMap)) {
      if (value > maxVal && key !== "J") {
        maxVal = value;
        maxkey = key;
      }
    }
    cMap[maxkey] += jCount;
    delete cMap["J"];

    const keys = Object.keys(cMap);
    const len = keys.length;

    if (len === 1) {
      return HAND_TYPES.FIVE;
    } else if (len === 2) {
      if (keys.some((k) => cMap[k] === 4)) {
        return HAND_TYPES.FOUR;
      } else {
        return HAND_TYPES.FULL;
      }
    } else if (len === 3) {
      if (keys.some((k) => cMap[k] === 3)) {
        return HAND_TYPES.THREE;
      } else {
        return HAND_TYPES.TWO;
      }
    } else if (len === 4) {
      return HAND_TYPES.ONE;
    } else {
      return HAND_TYPES.HIGH;
    }
  } else {
    const cMap = {};
    for (const char of Array.from(hand)) {
      if (cMap[char]) {
        cMap[char] += 1;
      } else {
        cMap[char] = 1;
      }
    }

    const keys = Object.keys(cMap);
    const len = keys.length;

    if (len === 1) {
      return HAND_TYPES.FIVE;
    } else if (len === 2) {
      if (keys.some((k) => cMap[k] === 4)) {
        return HAND_TYPES.FOUR;
      } else {
        return HAND_TYPES.FULL;
      }
    } else if (len === 3) {
      if (keys.some((k) => cMap[k] === 3)) {
        return HAND_TYPES.THREE;
      } else {
        return HAND_TYPES.TWO;
      }
    } else if (len === 4) {
      return HAND_TYPES.ONE;
    } else {
      return HAND_TYPES.HIGH;
    }
  }
};

input.forEach((hand) => {
  const handType = getHandType(hand.hand);
  switch (handType) {
    case HAND_TYPES.FIVE:
      if (handTypesMap[HAND_TYPES.FIVE]) {
        handTypesMap[HAND_TYPES.FIVE].push(hand);
      } else {
        handTypesMap[HAND_TYPES.FIVE] = [hand];
      }

      break;
    case HAND_TYPES.FOUR:
      if (handTypesMap[HAND_TYPES.FOUR]) {
        handTypesMap[HAND_TYPES.FOUR].push(hand);
      } else {
        handTypesMap[HAND_TYPES.FOUR] = [hand];
      }

      break;
    case HAND_TYPES.FULL:
      if (handTypesMap[HAND_TYPES.FULL]) {
        handTypesMap[HAND_TYPES.FULL].push(hand);
      } else {
        handTypesMap[HAND_TYPES.FULL] = [hand];
      }

      break;
    case HAND_TYPES.THREE:
      if (handTypesMap[HAND_TYPES.THREE]) {
        handTypesMap[HAND_TYPES.THREE].push(hand);
      } else {
        handTypesMap[HAND_TYPES.THREE] = [hand];
      }

      break;
    case HAND_TYPES.TWO:
      if (handTypesMap[HAND_TYPES.TWO]) {
        handTypesMap[HAND_TYPES.TWO].push(hand);
      } else {
        handTypesMap[HAND_TYPES.TWO] = [hand];
      }

      break;
    case HAND_TYPES.ONE:
      if (handTypesMap[HAND_TYPES.ONE]) {
        handTypesMap[HAND_TYPES.ONE].push(hand);
      } else {
        handTypesMap[HAND_TYPES.ONE] = [hand];
      }

      break;
    case HAND_TYPES.HIGH:
      if (handTypesMap[HAND_TYPES.HIGH]) {
        handTypesMap[HAND_TYPES.HIGH].push(hand);
      } else {
        handTypesMap[HAND_TYPES.HIGH] = [hand];
      }

      break;
    default:
      break;
  }
});

console.log({ handTypesMap });

const getSortedHands = (hands) => {
  return hands.sort((h1, h2) => {
    const c1 = h1.hand;
    const c2 = h2.hand;
    for (let index = 0; index < 5; index++) {
      const w1 = weightMap[c1[index]];
      const w2 = weightMap[c2[index]];
      if (w1 > w2) {
        return 1;
      } else if (w1 < w2) {
        return -1;
      } else continue;
    }
  });
};

// Sort the HandTypes internally
let result = [];
for (let index = 0; index < 7; index++) {
  switch (index) {
    case 0:
      result.push(getSortedHands(handTypesMap[HAND_TYPES.HIGH]));
      break;
    case 1:
      result.push(getSortedHands(handTypesMap[HAND_TYPES.ONE]));
      break;
    case 2:
      result.push(getSortedHands(handTypesMap[HAND_TYPES.TWO]));
      break;
    case 3:
      result.push(getSortedHands(handTypesMap[HAND_TYPES.THREE]));
      break;
    case 4:
      result.push(getSortedHands(handTypesMap[HAND_TYPES.FULL]));
      break;
    case 5:
      result.push(getSortedHands(handTypesMap[HAND_TYPES.FOUR]));
      break;
    case 6:
      result.push(getSortedHands(handTypesMap[HAND_TYPES.FIVE]));
      break;
    default:
      break;
  }
}

console.log({ result });
const res = result
  .flat()
  .map((h, index) => {
    return (index + 1) * h.bid;
  })
  .reduce((a, b) => a + b);
console.log({ res });

console.log("This is Part one solution");

const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};

const convertToArray = (rawText) => {
  const toArr = rawText.split("\n");
  const inputSeeds = toArr[0].split(": ")[1].trim().split(" ").map(Number);
  const allMaps = [];

  console.log({ toArr });
  let currMapCategory = 0;
  for (let i = 0; i < toArr.length; i++) {
    if (i === 0) {
      continue;
    }

    if (toArr[i - 1] === "") {
      allMaps[currMapCategory] = [];
      currMapCategory += 1;
      continue;
    }
    if (allMaps[currMapCategory - 1]) {
      if (toArr[i] !== "") {
        allMaps[currMapCategory - 1].push(toArr[i]);
      }
    }
  }

  let seedSoilMap,
    soilFertilizerMap,
    fertWaterMap,
    waterLightMap,
    lightTempMap,
    tempHumidMap,
    humidLocMap;

  allMaps.forEach((m, i) => {
    console.log({ m });
    if (i === 0) {
      seedSoilMap = getMap(m);
    }
    if (i === 1) {
      soilFertilizerMap = getMap(m);
    }
    if (i === 2) {
      fertWaterMap = getMap(m);
    }
    if (i === 3) {
      waterLightMap = getMap(m);
    }
    if (i === 4) {
      lightTempMap = getMap(m);
    }
    if (i === 5) {
      tempHumidMap = getMap(m);
    }
    if (i === 6) {
      humidLocMap = getMap(m);
    }
  });

  console.log({ allMaps });

  return {
    inputSeeds,
    seedSoilMap,
    soilFertilizerMap,
    fertWaterMap,
    waterLightMap,
    lightTempMap,
    tempHumidMap,
    humidLocMap,
  };
};

const getMap = (m) => {
  return m.map((str) => {
    return str.split(" ").map(Number);
  });
};

const rawText = await readFile();

const {
  inputSeeds,
  seedSoilMap,
  soilFertilizerMap,
  fertWaterMap,
  waterLightMap,
  lightTempMap,
  tempHumidMap,
  humidLocMap,
} = convertToArray(rawText);

console.log({
  inputSeeds,
  seedSoilMap,
  soilFertilizerMap,
  fertWaterMap,
  waterLightMap,
  lightTempMap,
  tempHumidMap,
  humidLocMap,
});

const getMappedValue = (inputVal, map) => {
  let mappedValue = -1;
  for (const m of map) {
    const sourceStart = m[1];
    const sourceEnd = sourceStart + m[2];
    const destStart = m[0];
    console.log({ sourceStart, sourceEnd, destStart });
    if (inputVal >= sourceStart && inputVal < sourceEnd) {
      const diff = inputVal - sourceStart;
      mappedValue = destStart + diff;
      break;
    }
  }
  if (mappedValue < 0) {
    mappedValue = inputVal;
  }
  return mappedValue;
};

const getSeedLoc = (inputSeed) => {
  const inputSoil = getMappedValue(inputSeed, seedSoilMap);
  const inputFert = getMappedValue(inputSoil, soilFertilizerMap);
  const inputWater = getMappedValue(inputFert, fertWaterMap);
  const inputLight = getMappedValue(inputWater, waterLightMap);
  const inputTemp = getMappedValue(inputLight, lightTempMap);
  const inputHumid = getMappedValue(inputTemp, tempHumidMap);
  const loc = getMappedValue(inputHumid, humidLocMap);
  return loc;
};

const allLocs = [];

for (const seed of inputSeeds) {
  const seedLoc = getSeedLoc(seed);
  allLocs.push(seedLoc);
}

console.log({ allLocs, min: Math.min(...allLocs) });

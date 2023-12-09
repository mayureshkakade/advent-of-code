const readFile = async () => {
  const fileName = "input.txt";
  return fetch(fileName).then((res) => res.text());
};
const input = await readFile();

const lines = input.split("\n");
let values = lines[0]
  .substring(7)
  .split(" ")
  .map((v) => parseInt(v, 10));

const groups = input.split("\n\n").slice(1);

console.log({ groups });

groups.forEach((g) => {
  const map = g
    .split("\n")
    .slice(1)
    .map((l) => {
      const parts = l.split(" ");
      return {
        destStart: parseInt(parts[0], 10),
        sourceStart: parseInt(parts[1], 10),
        range: parseInt(parts[2], 10),
      };
    });

  console.log({ map });

  values = values.map((v) => {
    const range = map.find(
      (m) => m.sourceStart <= v && m.sourceStart + m.range > v
    );
    return range ? v - range.sourceStart + range.destStart : v;
  });
});
console.log(
  `Part 1: ${values.reduce((min, v) => Math.min(min, v), Number.MAX_VALUE)}`
);

values = lines[0]
  .substring(7)
  .split(" ")
  .map((v) => parseInt(v, 10));
let values2 = values
  .reduce((ranges, v, index) => {
    const newIndex = Math.floor(index / 2);
    ranges[newIndex] = [...ranges[newIndex], v];
    return ranges;
  }, Array.from({ length: values.length / 2 }).fill([]))
  .map((v) => [v[0], v[0] + v[1] - 1]);

console.log({ values2 });

const overlap = (mapStart, mapEnd, valueStart, valueEnd) =>
  valueStart < mapEnd && valueEnd >= mapStart;

const rangeSplit = (mapStart, mapEnd, valueStart, valueEnd) => {
  if (!overlap(mapStart, mapEnd, valueStart, valueEnd))
    return [[valueStart, valueEnd]];

  return [
    valueStart < mapStart ? [valueStart, mapStart - 1] : [],
    [Math.max(valueStart, mapStart), Math.min(valueEnd, mapEnd)],
    valueEnd >= mapEnd ? [mapEnd + 1, valueEnd] : [],
  ].filter((a) => a.length === 2);
};

groups.forEach((g) => {
  const map = g
    .split("\n")
    .slice(1)
    .map((l) => {
      const parts = l.split(" ");
      return {
        destStart: parseInt(parts[0], 10),
        sourceStart: parseInt(parts[1], 10),
        range: parseInt(parts[2], 10),
      };
    });

  let newValues2 = [];
  for (const element of values2) {
    const v = element;
    let valueRanges = [v];
    const ranges = map.filter((m) =>
      overlap(m.sourceStart, m.sourceStart + m.range, v[0], v[1])
    );
    for (const element of ranges) {
      let range = element;
      let newRanges = [];
      for (const element of valueRanges)
        newRanges.push(
          rangeSplit(
            range.sourceStart,
            range.sourceStart + range.range,
            element[0],
            element[1]
          )
        );
      valueRanges = newRanges.flat();
    }
    newValues2 = [...newValues2, ...valueRanges];
  }

  console.log({ newValues2 });

  values2 = newValues2.map((v) => {
    const range = map.find(
      (m) => m.sourceStart <= v[0] && m.sourceStart + m.range > v[1]
    );
    return range
      ? [
          v[0] - range.sourceStart + range.destStart,
          v[1] - range.sourceStart + range.destStart,
        ]
      : v;
  });
});

console.log(
  `Part 2: ${values2.reduce(
    (min, v) => Math.min(min, Math.min(v[0], v[1])),
    Number.MAX_VALUE
  )}`
);

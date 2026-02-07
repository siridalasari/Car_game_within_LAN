import { chunk } from "@std/collections";
import {
  BLACK_DIV,
  CEMENT_BLOCK,
  PLAYER_CAR,
  YELLOW_DIV,
} from "./materials.js";

export const constructSlab = (cways_segments, dividers) => {
  const slab = [];
  const materials = [cways_segments, dividers];
  const count = cways_segments.length + dividers.length;

  for (let i = 0; i < count; i++) {
    const chunk = materials[i % materials.length][0];
    slab.push(chunk);
    materials[i % materials.length].shift();
  }
  return slab.flatMap((x) => x);
};

const DIVIDERS = [BLACK_DIV, YELLOW_DIV];
const chooseDivider = (dividerNo) => DIVIDERS[dividerNo];

const resourcesForSlab = () => {};
//carriageway
const constructHighway = (
  cway_width = 3,
  cway_height = 12,
  cways_count = 3,
) => {
  const slabsCount = cway_height;
  const highway = [];

  for (let count = 0; count < slabsCount; count++) {
    const cway_segment = Array.from({ length: cway_width }, () => CEMENT_BLOCK);
    const cways_segments = Array.from(
      { length: cways_count },
      () => cway_segment,
    );
    const divider = chooseDivider(count % DIVIDERS.length);
    const dividersCount = cways_count - 1;
    const dividers = Array.from({ length: dividersCount }, () => divider);
    const slab = constructSlab(cways_segments, dividers);
    highway.push(slab);
  }

  return highway;
};

const highway = constructHighway();

const display = (highway) =>
  console.log(highway.map((x) => x.join("")).join("\n"));

const startGame = (highway) => {
  console.clear();
  const highway_positions = [0, 1, 2, 4, 5, 6, 8, 9, 10];
  const car_positions = [4, 4, 5, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0];
  highway[highway.length - 1][highway_positions[4]] = PLAYER_CAR;

  display(highway);
  let i = 0;
  setInterval(() => {
    console.clear();
    const prePos = highway[highway.length - 1].indexOf(PLAYER_CAR);
    highway[highway.length - 1][prePos] = CEMENT_BLOCK;
    highway[highway.length - 1][highway_positions[car_positions[i++]]] =
      PLAYER_CAR;
    display(highway);
  }, 500);
};
startGame(highway);

const moveForward = (highway) => {
  const car_curr_pos = highway[highway.length - 1].indexOf(PLAYER_CAR);
  highway.pop();
  highway[highway.length - 1][car_curr_pos] = PLAYER_CAR;
  const slab = constructSlab();
  highway.unshift();
};

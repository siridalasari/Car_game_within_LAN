import { constructHighway } from "./construct_highway.js";
import { CEMENT_BLOCK, PLAYER_CAR } from "./materials.js";

const display = (highway) =>
  console.log(highway.map((x) => x.join("")).join("\n"));

const startGame = (highway) => {
  console.clear();
  const highway_positions = [0, 1, 2, 4, 5, 6, 8, 9, 10];
  highway[highway.length - 1][highway_positions[4]] = PLAYER_CAR;
  display(highway);

  setInterval(() => {
    console.clear();
    const prePos = highway[highway.length - 1].indexOf(PLAYER_CAR);
    highway[highway.length - 1][prePos] = CEMENT_BLOCK;
    highway[highway.length - 1][highway_positions[4]] = PLAYER_CAR;
    display(highway);
  }, 500);
};

export const mmm = (details, materials) => {
  const highway = constructHighway();
};

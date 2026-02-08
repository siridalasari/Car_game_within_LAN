import { constructHighway } from "./construct_highway.js";
import { CEMENT_BLOCK, PLAYER_CAR } from "./materials.js";
import { constructSlab } from "./construct_highway.js";

const display = (highway) =>
  console.log(highway.map((x) => x.join("")).join("\n"));

const placeCar = (highway, x_pos, y_pos, car) => {
  highway[x_pos][y_pos] = car;
  return highway;
};

const carCurrPos = (highway, x_pos, car) => {
  return highway[x_pos].indexOf(car);
};

const removeCar = (highway, x_pos, y_pos) => {
  highway[x_pos][y_pos] = CEMENT_BLOCK;
};

const extendHighWay = (highway, materials) => {
  const cways_segments = materials.getSegments();
  const dividers = materials.getDividers();
  highway.unshift(constructSlab(cways_segments, dividers));
};

const moveCar = (highway, materials, x_pos, y_pos, car) => {
  const curr_y_pos = carCurrPos(highway, x_pos, car);
  removeCar(highway, x_pos, curr_y_pos);
  highway.pop();
  extendHighWay(highway, materials);
  placeCar(highway, x_pos, y_pos, car);
};

const startGame = async (highway, materials) => {
  console.clear();
  const x_pos = highway.length - 1;
  const HIGH_WAY_Y_POSITIONS = [0, 1, 2, 4, 5, 6, 7, 9, 10];
  const y_pos = HIGH_WAY_Y_POSITIONS[4];

  placeCar(highway, x_pos, y_pos, PLAYER_CAR);
  display(highway);
  materials.getDividers();
  await Deno.writeTextFile("./data/position.txt", "5");
  setInterval(async () => {
    const y_pos = await Deno.readTextFile("./data/position.txt");
    console.log({ y_pos });
    console.clear();
    moveCar(highway, materials, x_pos, y_pos, PLAYER_CAR);
    display(highway);
  }, 100);
};

export const mmm = (details, materials) => {
  const highway = constructHighway(details, materials);
  startGame(highway, materials);
};

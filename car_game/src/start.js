import { constructHighway } from "./construct_highway.js";
import { CAR1, CAR2, CAR3, CEMENT_BLOCK, PLAYER_CAR } from "./materials.js";
import { constructSlab } from "./construct_highway.js";
const HIGH_WAY_Y_POSITIONS = [0, 1, 2, 4, 5, 6, 8, 9, 10];

const gameOver = (highway, materials) => {
  console.log("🥱 YOU LOSS THE GAME")
  if(prompt("Again?(y/n)") === "y"){
    startGame(highway, materials)
  }
};

const display = (highway) =>
  console.log(highway.map((x) => x.join("")).join("\n"));

const placeCar = (highway, x_pos, y_pos, car) => {
  highway[x_pos][y_pos] = car;
  return highway;
};

const carCurrPos = (highway, x_pos, car) => highway[x_pos].indexOf(car);

const removeCar = (highway, x_pos, y_pos) => {
  highway[x_pos][y_pos] = CEMENT_BLOCK;
};

const extendHighWay = (highway, materials) => {
  const cways_segments = materials.getSegments();
  const dividers = materials.getDividers();
  highway.unshift(constructSlab(cways_segments, dividers));
};

const random = (max = 40) => Math.floor(Math.random() * max);

const addRandomCar = (highway) => {
  const cars = [CAR1, CAR2, CAR3];

  const highway_pos = [0, 1, 2, 4, 5, 6, 8, 9, 10];
  const x = 0;
  const y = highway_pos[random()];
  placeCar(highway, x, y, cars[random(3)]);
};

const moveCar = (highway, materials, xPos, yPos, car) => {
  console.log({highway});
  removeCar(highway, xPos, yPos);
  console.log({highway})
  highway.pop();
  console.log({highway})

  addRandomCar(highway);
  console.log({highway})

  extendHighWay(highway, materials);
  console.log({highway})

  
  placeCar(highway, xPos, yPos, car);
  console.log({highway})
};

const DEC = new TextDecoder();
const controller = await Deno.connect({ port: 8000 });
const buffer = new Uint8Array(1000);
const carPosition = { x: 8, y: 5 };

const readInp = async () => {
  const n = await controller.read(buffer);
  const response = DEC.decode(buffer.slice(0, n)).trim();

  console.log(response, "INPUT CAME");

  const [x, y] = response.split(",");

  carPosition.x = x;
  carPosition.y = y;
};


async function looper(highway, materials) {
  materials.getDividers();
  while (true) {
    readInp();
    moveCar(highway, materials, carPosition.x, carPosition.y, PLAYER_CAR);
    console.clear();
    display(highway);
    if (highway[carPosition.x - 1][carPosition.y] !== CEMENT_BLOCK) {
      console.clear();
      gameOver(highway, materials);
      return true;
    }
    await delay(300);
  }
}

const delay = (time = 100) => {
  return new Promise((res) => {
    return setInterval(() => {
      res(1);
    }, time);
  });
};

const initCar = (highway) => {
  const x_pos = highway.length - 1;
  const y_pos = HIGH_WAY_Y_POSITIONS[4];
  placeCar(highway, x_pos, y_pos, PLAYER_CAR);
  return highway
}

const startGame = async (highway, materials) => {
  console.clear();
  initCar(highway)
  display(highway);
  return await looper(highway, materials);
};

export const initialSetup = (details, materials) => {
  const highway = constructHighway(details, materials);
  startGame(highway, materials);
};

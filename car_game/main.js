import { getHighwayBluePrint } from "./src/highway_details.js";
import { highwayMaterials } from "./src/materials.js";
import { initialSetup as initialSetup } from "./src/start.js";

const main = () => {
  const highwayBluePrint = getHighwayBluePrint();
  const materials = highwayMaterials(highwayBluePrint);
  initialSetup(highwayBluePrint, materials);
};

main();

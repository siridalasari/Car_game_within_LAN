import { highway_details } from "./src/highway_details.js";
import { highwayMaterials } from "./src/materials.js";
import { mmm } from "./src/start.js";

const main = () => {
  const details = highway_details();
  const materials = highwayMaterials(details);
  mmm(details, materials);
};

main();

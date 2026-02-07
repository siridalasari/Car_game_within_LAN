import { BLACK_DIV, CEMENT_BLOCK, YELLOW_DIV } from "./materials.js";

const DIVIDERS = [BLACK_DIV, YELLOW_DIV];

const chooseDivider = (dividerNo) => DIVIDERS[dividerNo];

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

//carriageway
export const constructHighway = (highway_materials) => {
  const slabsCount = cway_height;
  const highway = [];

  for (let count = 0; count < slabsCount; count++) {
    const slab = constructSlab(cways_segments, dividers);
    highway.push(slab);
  }

  return highway;
};

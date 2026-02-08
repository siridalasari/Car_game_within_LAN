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
export const constructHighway = (details, materials) => {
  const slabsCount = details.cwayHeight();
  const highway = [];

  for (let count = 0; count < slabsCount; count++) {
    const cways_segments = materials.getSegments();
    const dividers = materials.getDividers();
    const slab = constructSlab(cways_segments, dividers);
    highway.push(slab);
  }

  return highway;
};

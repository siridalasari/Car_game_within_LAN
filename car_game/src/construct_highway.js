//Strip
export const constructSlab = (cways_segments, dividers) => {
  const slab = [];
  const materials = [cways_segments, dividers];
  const count = cways_segments.length + dividers.length;

  for (let i = 0; i < count; i++) {
    const chunk = materials[i % materials.length].shift();
    slab.push(chunk);
  }

  return slab.flatMap((x) => x);
};

//carriage way

export const constructHighway = (details, materials) => {
  const slabsCount = details.trackHeight();
  const highway = [];

  for (let count = 0; count < slabsCount; count++) {
    const cways_segments = materials.getSegments();
    const dividers = materials.getDividers();
    const slab = constructSlab(cways_segments, dividers);
    highway.push(slab);
  }

  return highway;
};

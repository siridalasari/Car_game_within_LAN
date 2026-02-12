export const handleRequest = async (request, positions, steering) => {
  const req = {
    "right": (positions) => steering[operation](positions),
    "left": (positions) => steering[operation](positions),
    "carPosition": () => positions.carPosition,
  };

  console.log({ request });
  const operation = (await request.json()).operation;
  console.log({ operation });
  const newPos = req[operation](positions);
  return new Response(JSON.stringify(newPos), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};

const t = (positions) => {
  console.log("before index", positions.carPosition.i);
  console.log("before", positions.carPosition.y);
  positions.carPosition.i -= 1;
  const index = positions.carPosition.i;
  console.log("after index", positions.carPosition.i);
  positions.carPosition.y = positions.highwayPos[index];
  console.log("new pos", positions.carPosition.y);
  return positions.carPosition;
};

export const createHandleRequest = () => {
  const positions = {
    "carPosition": { x: 8, y: 5, i: 4 },
    "highwayPos": [0, 1, 2, 4, 5, 6, 8, 9, 10],
  };
  const steering = {
    "left": (positions) => {
      positions.carPosition.i -= 1;
      const index = positions.carPosition.i;
      positions.carPosition.y = positions.highwayPos[index];
      return positions.carPosition;
    },
    "right": (positions) => {
      positions.carPosition.i += 1;
      const index = positions.carPosition.i;
      positions.carPosition.y = positions.highwayPos[index];
      return positions.carPosition;
    },
  };
  return (request) => handleRequest(request, positions, steering);
};

const listener = Deno.listen({
  port: 8000,
  transport: "tcp",
});

const movements = () => {
  let current = 4;
  const HIGH_WAY_Y_POSITIONS = [0, 1, 2, 4, 5, 6, 8, 9, 10];
  return ({
    "moveLeft": async () => {
      await Deno.writeTextFile(
        "./data/position.txt",
        HIGH_WAY_Y_POSITIONS[--current],
      );
      console.log({ current, "x_pos": HIGH_WAY_Y_POSITIONS[current] });
    },

    "moveRight": async () => {
      await Deno.writeTextFile(
        "./data/position.txt",
        HIGH_WAY_Y_POSITIONS[++current],
      );
      console.log({ current, "x_pos": HIGH_WAY_Y_POSITIONS[current] });
    },
  });
};

const changePostion = (movement, response) => {
  console.log({ response });
  response.trim() === "l" ? movement.moveLeft() : movement.moveRight();
};

const buff = new Uint8Array(1024);

for await (const conn of listener) {
  console.log("Client connected");

  const movement = movements();

  while (true) {
    const size = await conn.read(buff);

    // 🔑 THIS IS REQUIRED
    if (size === null) {
      console.log("Client disconnected");
      conn.close();
      break;
    }

    const response = buff.slice(0, size);
    const text = new TextDecoder().decode(response);

    changePostion(movement, text);
  }
}

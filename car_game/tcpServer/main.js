import { Clients, handler, playerCarState } from "./src/handler.js";
const listener = Deno.listen({
  transport: "tcp",
  port: 8000,
});

const main = async () => {
  const clients = new Clients();
  const {positions, steering} = playerCarState();
  console.log({positions, steering})
  for await (const conn of listener) {
    console.log("SOMETHING CAME");
    handler(conn, clients, positions, steering);
  }
};

main();

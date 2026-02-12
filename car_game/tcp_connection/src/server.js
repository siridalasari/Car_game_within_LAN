const listener = Deno.listen({
  port: 8000,
  transport: "tcp",
});

const handleRequest = (command, counter) => {
  console.log(command);
  const commands = {
    "increment": () => {
      counter.i += 1;
      return counter;
    },
  };
  return commands[command]();
};

const decode = (value) => new TextDecoder().decode(value);

const startCommunication = async (listener, in_memory) => {
  const buffer = new Uint8Array(1024);
  const clients = [];

  for await (const conn of listener) {
    clients.push(conn);
    await handler(conn, buffer, in_memory, clients);
  }
};
async function handler(conn, buffer, in_memory, clients) {
  while (true) {
    const bytes = await conn.read(buffer);
    const request = decode(buffer.slice(0, bytes));
    if (bytes === null) {
      console.log("Connection broke ");
      conn.close();
      break;
    }
    console.log(request);
    const { com } = JSON.parse(request);
    console.log({ com });

    const response = handleRequest(com, in_memory);
    clients.forEach((client) => {
      client.write(new TextEncoder().encode(JSON.stringify(response)));
    });
  }
}

await startCommunication(listener, { i: 0 });

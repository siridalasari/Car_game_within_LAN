const connection = await Deno.connect({
  port: 8000,
  transport: "tcp",
});

const decode = (value) => new TextDecoder().decode(value);
const encode = (value) => new TextEncoder().encode(value);

const startCommunication = async () => {
  const buffer = new Uint8Array(1024);
  await connection.write(
    new TextEncoder().encode(JSON.stringify({ "com": prompt() })),
  );
  const size = await connection.read(buffer);
  const byteData = buffer.slice(0, size);
  const response = decode(byteData);
  Deno.stdout.write(encode(response));
};

startCommunication(connection);

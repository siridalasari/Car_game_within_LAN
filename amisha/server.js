const decode = (text) => new TextDecoder().decode(text);

const handleConnection = async (conn) => {
  console.log("hi");
  try {
    const buffer = new Uint8Array(1024);
    const nBytes = await conn.read(buffer);

    if (nBytes !== null) {
      const data = buffer.subarray(0, nBytes);
      const msg = decode(data);
      console.log("Received:", msg);
    }
  } catch (err) {
    console.error("Connection lost or reset:", err.message);
  } finally {
    conn.close();
  }
};

const startServer = async (port = 8000) => {
  const listener = Deno.listen({ port, hostname: "0.0.0.0" });
  console.log(`Server listening on 0.0.0.0:${port}`);

  for await (const conn of listener) {
    console.log("New connection attempt detected...");
    handleConnection(conn);
  }
};

await startServer();

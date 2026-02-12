const ENC = new TextEncoder();
// const hostname = "http://10.167.86.205";

const controller = await Deno.connect({
  port: 8000,
});

const delay = (t = 100) => {
  return new Promise((res) => {
    return setInterval(() => {
      res(1);
    }, t);
  });
};

Deno.stdin.setRaw(true, { cbreak: true });
const inputBuffer = new Uint8Array(2);
const KEYS = { a: 97, d: 100, w: 119, s: 115 };

const main = async () => {
  while (true) {
    await Deno.stdin.read(inputBuffer);
    const keystroke = inputBuffer[0];
    let command = "";

    if (KEYS.a === keystroke) {
      command ="left"
    } else if (KEYS.d === keystroke) {
      command ="right"
      
    } else if (KEYS.w === keystroke) {
      command = "front"
    } else if (KEYS.s === keystroke) {
      command = "back"
    } else {
      continue;
    }

    const encoded = await ENC.encode(command);


    await controller.write(encoded);

    await delay(10);
  }
};
main();

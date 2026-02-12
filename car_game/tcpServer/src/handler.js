const ENC = new TextEncoder();
const DEC = new TextDecoder();

export class Clients {
  constructor() {
    this.clients = [];
    this.ids = 0;
  }

  addClient(conn) {
    console.log("CLIENT ADDED");
    const id = this.generateId();
    const client = { conn, id };
    this.clients.push(client);
    return id;
  }

  // removeClient(conn, id){
  //   c
  // }

  broadcast(msg, clientID) {
    this.clients.forEach(async ({ conn, id }) => {
        await conn.write(ENC.encode(msg));
    });
  }

  generateId() {
    this.ids += 1;
    return this.ids;
  }
}

const buffer = new Uint8Array(1000);

export const playerCarState = () => {
  const positions = {
    "carPosition": { x: 8, y: 5, i: 4 },
    "highwayPos": [0, 1, 2, 4, 5, 6, 8, 9, 10],
  };
  const steering = {
    "left": (positions) => {

      if(positions.carPosition.i > 0){
        positions.carPosition.i -= 1;
        const index = positions.carPosition.i;
        positions.carPosition.y = positions.highwayPos[index];
      }
      return `${positions.carPosition.x},${positions.carPosition.y}`;
    },
    "right": (positions) => {
     
      if(positions.carPosition.i < 8){
        positions.carPosition.i += 1;
        const index = positions.carPosition.i;
        console.log(positions)
        positions.carPosition.y = positions.highwayPos[index];
      }

      return `${positions.carPosition.x},${positions.carPosition.y}`;

    },
    "front": () => {
      if(positions.carPosition.x > 0){
        positions.carPosition.x -= 1
      }
      return `${positions.carPosition.x},${positions.carPosition.y}`;
    },
     "back": () => {
      if(positions.carPosition.x < 11){
        positions.carPosition.x += 1
      }
      return `${positions.carPosition.x},${positions.carPosition.y}`;
    }
  };
  return {positions, steering}
}

export const handleRequest =(request, positions, steering) => {
  console.log({request, positions, steering})
  const commands = {
    "right": (positions, request) => steering[request](positions),
    "left": (positions, request) => steering[request](positions),
    "front":(positions, request) => steering[request](positions),
    "back":(positions, request) => steering[request](positions),
    "carPosition": () => positions.carPosition,
  };
  return commands[request](positions, request);
};

export const handler = async (conn, clients, positions, steering) => {

  const id = clients.addClient(conn);

  while (true) {
    const n = await conn.read(buffer);
    console.log({n})
    const str = buffer.slice(0, n);
    if(n === null){
      break;
    }
    const request = DEC.decode(str);
    const response = handleRequest(request, positions, steering)
    clients.broadcast(response, id);
  }
};

import { createHandleRequest } from "./src/handle_request.js";

const main = () => {
  const handleRequest = createHandleRequest();
  Deno.serve(handleRequest);
};

main();

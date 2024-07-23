import { createServer } from "node:http";

let n = 1e9;
const BATCH_SIZE = 1e5;

function calcAsync(i, n, cb) {
  const batchSize = Math.min(i + BATCH_SIZE, n);

  for (; i < batchSize; i++);

  if (i < n) {
    setImmediate(() => calcAsync(i, n, cb));
  } else {
    cb(i);
  }
}
const server = createServer();
server.listen(8082);

server.on("request", (_, res) => {
  console.log("serve request");
  // for (let i = 0; i < n; i++);
  // res.end("ok");

  calcAsync(0, n, (i) => {
    console.log("done", i);
    res.end("ok");
  });
});

server.on("listening", () => {
  console.log("server listening");
});

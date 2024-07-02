const conn = []
let cnt = 0

onconnect = (e) => {
  const port = e.ports[0]
  conn.push(port)

  port.onmessage = (e) => {
    cnt++;
    conn.forEach((con) => con.postMessage(cnt))
  }

}

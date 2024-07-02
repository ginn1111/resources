
const worker = new SharedWorker('./worker.js');

worker.port.onmessage = (e) => {
  console.log('from index.html receive from worker', e)
  msg.textContent = e.data
}

btn.onclick = () => {
  worker.port.postMessage("hello from main")
}

if(window.Worker) {
  console.log('main start ...')
  const worker = new Worker('./worker.js')

  const btnSendMsg = document.getElementById('btn-send')

  btnSendMsg.onclick = () => {
    worker.postMessage('hello')
  }

  worker.onmessage = (evt) => {
    console.log('receive from worker')
  }

  worker.onerror = (error) => {
    console.log('worker error', error)
  }

}

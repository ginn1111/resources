importScripts('http://thuanpv:8081/sub-workerr.js')
console.log('worker start ...')

onmessage = (event) => {
   processData();

  console.log('from main.js', event)
  postMessage('receive msg from main.js')
}

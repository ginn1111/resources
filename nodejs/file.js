import fs from 'node:fs'

fs.open('./isolate-0x6236850-5117-v8.log', 'a+', (err, fd) => {
  if(err) {
    console.log(err)
  } else {
    console.log(fd)
  }
})


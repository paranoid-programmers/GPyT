onmessage = ((message: any) => {
  if (message.type === 'message') {
    return `Worker reply: ${JSON.stringify(message)}`
  }
})
 export {}

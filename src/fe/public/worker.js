console.log("Worker started");

onmessage = (message) => {
  if (message.type === "message") {
    console.log("message received", message.data);
    return `Worker reply: ${JSON.stringify(message)}`;
  }
};

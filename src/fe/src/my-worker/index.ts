import PromiseWorker from "promise-worker";
// import Worker from "./worker?worker";

export const worker = new Worker("/public/worker.js");
const promiseWorker = new PromiseWorker(worker);



const send = (message: any) =>{
  console.log("hey")
  return promiseWorker.postMessage({
    type: "message",
    message,
  }); }

export default {
  send,
};

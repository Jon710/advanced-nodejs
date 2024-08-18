This is a POC solution to a problem I've solved in a different way (conversion in an AWS Lambda) in my SaaS app in production. Here, I've used Node.js Worker threads to convert video files.

# Worker threads aren't true threads

Worker threads operate in isolated contexts, exchanging information with the main process using message passing. This approach helps us avoid the race conditions problem regular threads have. At the same time, worker threads live in the same parent process as the main thread, so they use a lot less memory.

You can share memory with worker threads by passing ArrayBuffer or SharedArrayBuffer objects, which are specifically meant for this process. These objects allow you to avoid the need for data serialization, but you should only use them if you need to do CPU-intensive tasks with large amounts of data.

Truly multithreaded applications allow concurrently executing multiple threads that share the same state by default. In Node.js, memory updated in one thread will not be visible to the others, and implementing multithreaded code requires careful memory management to prevent race conditions. 
- If we don’t share memory, we don’t have race conditions, and we don’t need threads!

Node.js worker threads operate independently of the JavaScript code in the main process. They work by spawning an isolated instance of Node's V8 JavaScript runtime. The new runtime can then be used to execute a JavaScript file out of the main event loop.

Since the file is executed in this way, there's no implicit memory sharing between the main program and the worker "thread." Instead, an event-based messaging system is provided so values can be exchanged between the processes.

TODO:
  [] - worker pool (Piscina)

https://javascript.plainenglish.io/building-a-multithreaded-crypto-exchange-in-nodejs-part-2-c0375dabe114
import { isPlainObject } from "../utils/index.js";

let uid = 0;

class Interceptor {
  constructor () {
    this.handlers = [];
  }

  use (onFulfilled, onRejected) {
    this.handlers.push({
      id: uid ++,
      onFulfilled,
      onRejected 
    });

    return uid;
  }

  remove (id) {
    this.handlers = this.handlers.filter(c => c.id !== id);
  }

  exec (payload, isRequest) {
    let handler;
    for (let i = 0, l = this.handlers.length; i < l; i ++) {
      handler = this.handlers[i];

      if (handler.onFulfilled) {
        payload = handler.onFulfilled(payload);

        if (isRequest && !isPlainObject(payload)) {
          return false;
        }
      }
    }

    return payload;
  }

  clear () {
    this.handlers.length = 0;
  }
}

export { Interceptor };
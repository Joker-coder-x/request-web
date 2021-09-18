class Canceller {
  constructor () {
    this.promise = new Promise(resolve => {
      this.resolvePromise = resolve;
    });
  }

  cancel (message) {
    this.message = message;
    this.resolvePromise(message);
  }

  toString () {
    return 'Cancel' + (this.message ? ': ' + this.message : 'Request is canceled!');
  }
}

Object.defineProperty(Canceller.prototype, '__CANCELLER__', {
  enumerable: true,
  configurable: false,
  writable: false,
  value: true
});

function isCanceller (obj) {
  return obj instanceof Canceller && obj.__CANCELLER__;
}

export {
  Canceller,
  isCanceller
};
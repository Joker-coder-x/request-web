class RequestError {
  constructor (opts) {
    if (typeof(opts) === 'string') {
      this.message = opts;
      this.config = null;
      this.data = null
    } else {
      this.message = opts.message || 'Request Error!!!';
      this.config = opts.config || null;
      this.data = opts.data || null;
    }
  }

  toJSON () {
    const { message, config, data } = this;

    return {
      message,
      config,
      data
    };
  };

  toString () {
    return '' + JSON.stringify(this);
  }
};


function isRequestError (obj) {
  return obj instanceof RequestError;
}

export { RequestError, isRequestError };
import { Canceller, isCanceller } from "./core/Canceller.js";
import { mergeConfig } from "./core/merge.js";
import { Request } from "./core/Request.js";
import { isRequestError } from "./core/RequestError.js";
import defaultConfig from "./defaultConfig.js";
import { extend } from "./utils/index.js";

function createInstance (defaultConfig) {
  const context  = new Request(defaultConfig);
  const instance = Request.prototype.request.bind(context);

  /**
   * 让instance继承Request.prototype和Request的实例的属性和方法集合
   */
  extend(instance, Request.prototype, context);
  extend(instance, context);

  instance.create = function (instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  instance.all = function (promises) {
    return Promise.all(promises);
  };

  instance.race = function (promises) {
    return Promise.race(promises);
  };

  return instance;
}

const request = createInstance(defaultConfig);

request.Canceller = Canceller;
request.isCanceller = isCanceller;
request.isRequestError = isRequestError;

export default request;
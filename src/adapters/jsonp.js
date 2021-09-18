import { isCanceller } from "../core/Canceller.js";
import { RequestError } from "../core/RequestError.js";
import { genRandomStr } from "../utils/index.js";
import { buildJSONPResponseData } from "./helper.js";

function jsonpAdapter (config) {
  return new Promise((resolve, reject) => {
    var url = config.url,
        jsonpFlag = config.jsonpFlag || 'cb',
        jsonpCallback = 'Request' + '_' + genRandomStr(),
        timeout = config.timeout,
        validateStatus = config.validateStatus,
        isTimeout = false,
        t = null,
        canceller = config.canceller;

    var clearEffect =  () => {
      clearTimeout(t);
      t = null;
    };

    window[jsonpCallback] = function (data) {
        if (isTimeout) return;
        clearEffect();

        if (validateStatus(200)) { 
          resolve(buildJSONPResponseData(data, config));
        } else {
          reject(new RequestError({
            message: 'Request failed!',
            config: config,
            data: buildJSONPResponseData(data, config)
          }));
        }
        
        setTimeout(() => window[jsonpCallback] = null);
    };

    if (canceller && isCanceller(canceller)) {
      canceller.promise.then(
        () => {
          clearEffect();
          isTimeout = true;
          reject(canceller);
        },
        reject
      );
    };
    
    var oScript = document.createElement('script');
    oScript.src = url.indexOf('?') === -1 
                ? url + '?' + jsonpFlag + '=' + jsonpCallback
                : url + '&' + jsonpFlag + '=' + jsonpCallback;


    document.body.appendChild(oScript);
    document.body.removeChild(oScript);

    if (timeout !== 0) {
      setTimeout(() => {
        reject(new RequestError({
          message: 'Request timeout!!!',
          config: config
        }));

        isTimeout = true;
        clearEffect();
      }, timeout);
    }
  });
}

export default jsonpAdapter;
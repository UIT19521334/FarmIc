// @flow
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timer from 'react-timer-mixin';
import CONST from './const.js';
import log from './logger';

const defaultTokenUrl = 'https://login.microsoftonline.com/common/oauth2/token';

/**
 * Global static hash map which stores contexts of different ReactNativeAD context,
 * which hash key is  {ReactNativeAD.config#client_id}
 * @type {map<string, ReactNativeAD>}
 */
const _contexts = {};

export default class ReactNativeAD {
  config;

  credentials;

  static getContext(client_id) {
    return _contexts[client_id];
  }

  static removeContext(client_id) {
    delete _contexts[client_id];
  }

  static ResourceOwnerPasswordCredential(
    data,
  ) {
    const url = `https://login.windows.net/${data.tenant_id}/oauth2/token`;
    const {resource, client_id, username, password} = data;
    const urlencode = [
      `resource=${encodeURIComponent(resource)}`,
      'grant_type=password',
      `client_id=${client_id}`,
      `username=${username}`,
      `password=${password}`,
    ].join('$');

    fetch(url, {method: 'POST', body: urlencode});
  }

  constructor(config) {
    if (config === null || config === void 0) {
      throw new Error('Invalid ADConfig object', config);
    }
    if (typeof config.client_id !== 'string') {
      throw new Error('client_id is not provided.');
    }
    if (config.tenant != null) {
      config.token_uri = defaultTokenUrl.replace('common', config.tenant);
    }
    this.config = config;
    this.credentials = {};
    _contexts[config.client_id] = this;
  }

  getConfig() {
    log.verbose('getConfig', this.config);
    return this.config;
  }

  getCredentials() {
    log.verbose('getCredentials', this.credentials);
    return this.credentials;
  }

  /**
   * Save login credentials to async storage, with key = <client id>.<resource id>.
   * For example, client_id = abc-123 resource=http://graph.microsoft.com will
   * be stored in an entry with key `abc-123.http://graph.microsoft.com`.
   * @param  {ADCredentials} data  Credentials key-value pair,
   *         this object uses resource as its key and `ReactNativeADCredential`
   *         as its value.
   * @return {Promise} .
   */
  saveCredentials(data) {
    return new Promise((resolve, reject) => {
      const pairs = [];
      log.verbose('saveCredentials', data);
      for (const resource in data) {
        if (resource && data[resource]) {
          pairs.push([
            `${this.config.client_id}.${resource}`,
            JSON.stringify(data[resource]),
          ]);
        } else {
          console.warn(
            `could not save credential for ${resource}=${data[resource]} for its key/value is null/undefine.`,
          );
        }
      }
      Object.assign(this.credentials, data);
    });
  }

  /**
   * Get access token by given resource id, if no corresponding token exists,
   * returns null.
   * @param  {string} resource The resource ID.
   * @return {?string} Access token of the resource.
   */
  getAccessToken(resource) {
    let result = null;
    result = this.credentials ? this.credentials[resource] : null;
    log.debug('getAccessToken', resource, result);
    if (result !== null) {
      return result.access_token;
    }
    return null;
  }

  /**
   * Assure that access_token of a resource is valid, this when access token
   * is expired, this method refresh access token automatically and returns
   * renewed access token in promise.
   * @param  {string} resource  Resource Id.
   * @return {Promise<string>} A promise with access_token string.
   */
  assureToken(resource) {
    const context = this;
    // Check credential of the resource
    return this.checkCredential(resource).then(
      (cred) => {
        if (!cred) {
          return context.refreshToken(resource);
        }
        // Credentials found, check if token expired.

        const expires_on = cred.expires_on * 1000;
        // Token not expired, resolve token
        if (Date.now() - expires_on <= -60000) {
          return Promise.resolve(cred.access_token);
        }
        // Token expired, call refresh token

        log.debug('cached token expired, refresh token.');
        return context.refreshToken(resource);
      },
    );
  }

  /**
   * Refresh token of the resource, when credentials is empty or resource does
   * not have refresh token, it will try to grant access token for resource.
   * @param  {string} resource Resource id.
   * @return {Promise<string>} When success, promise resolves new `access_token`
   */
  refreshToken(resourceId) {
    return new Promise((resolve, reject) => {
      this.checkCredential(resourceId).then(
        (cred) => {
          const config = {
            refresh_token: cred ? cred.refresh_token : null,
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            resource: resourceId,
          };
          let grantType = CONST.GRANT_TYPE.REFRESH_TOKEN;
          if (!cred) {
            grantType = CONST.GRANT_TYPE.AUTHORIZATION_CODE;
          }
          log.debug(
            'refresh token with config=',
            config,
            `grant_type=${grantType}`,
          );
          this.grantAccessToken(grantType, config)
            .then((resp) => {
              resolve(resp.response.access_token);
            })
            .catch(err => {
              log.warn(err);
              reject(err);
            });
        },
      );
    });
  }

  /**
   * Check credentials of the resource exist or not.
   * @param  {string} resourceId The resource ID.
   * @return {Promise<ReactNativeADCredential | null>} When credential does not exist, resolve
   *                           `null`, otherwise resolve `ReactNativeADCredential`
   */
  checkCredential(resourceId) {
    const context = this;
    return new Promise((resolve, reject) => {
      const resourceKey = _getResourceKey(context.config, resourceId);
      // console.log('resourceKey: ');
      console.log(resourceKey);
      const cachedCred = context.credentials[resourceId];
      resolve(cachedCred);
    });
  }

  /**
   * Get access_token by `given grant_type` and params, when this process
   * success, it stores credentials in format of `ReactNativeADCredential`,
   * in both ReactNativeAD.credentials and AsyncStorage.
   * @param  {string {enum: authorization_code, refresh_token, password}} grantType
   * Response from ReactNativeAD#handleADToken.
   * @param  {object} params Urlencoded form data in hashmap format
   * @return {Promise<GrantTokenResp>}  .
   */
  grantAccessToken(grantType, params) {
    // If resource is null or undefined, use `common` by default
    params.resource = params.resource || 'common';
    if (grantType === 'password') {
      params.client_id = this.config.client_id;
    }
    return new Promise((resolve, reject) => {
      try {
        log.debug(`${grantType} access token for resource ${params.resource}`);
        const tm = Timer.setTimeout(() => {
          reject('time out');
        }, 15000);

        const body = `grant_type=${grantType}${_serialize(params)}`;
        fetch(this.config.token_uri ? this.config.token_uri : defaultTokenUrl, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        })
          .then(response => {
            Timer.clearTimeout(tm);
            return response.text();
          })
          .then(res => {
            const cred = {
              resource: params.resource,
              response: JSON.parse(res.replace('access_token=', '')),
            };
            // save to memory context
            this.credentials[params.resource] = cred.response;
            // save to persistent context
            const cacheKey = _getResourceKey(this.config, params.resource);
            if (cred.response.access_token) {
              log.debug(`save credential ${cacheKey} `, cred.response);
              AsyncStorage.setItem(cacheKey, JSON.stringify(cred.response));
              // truncate prefix
              resolve(cred);
            } else {
              log.debug(
                `failed to grant token for resource ${cacheKey}`,
                cred.response,
              );
              reject(cred);
            }
          })
          .catch(reject);
      } catch (err) {
        reject(err);
      }
    });
  }
}

/**
 * Helper function to combine cache resource hash key.
 * @param  {ADConfig} config   Configuration of ReactNativeAD Object.
 * @param  {string} resourceId The resource id.
 * @return {string} Result of hash key.
 */
function _getResourceKey(config, resourceId) {
  return `${config.client_id}.${resourceId}`;
}

/**
 * Helper function to serialize object into urlencoded form data string, properties
 * which value is either `null` or `undefined` will be ignored.
 * @param  {Object} params Object which contains props.
 * @return {string} Result form data string.
 */
function _serialize(params) {
  let paramStr = '';
  for (const prop in params) {
    if (
      params[prop] !== null &&
      params[prop] !== void 0 &&
      prop !== 'grant_type'
    ) {
      paramStr += `&${prop}=${encodeURIComponent(params[prop])}`;
    }
  }
  return paramStr;
}

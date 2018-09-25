import hash from 'hash.js';
import jwtDecode from 'jwt-decode';
import { saveDataInLocalStorage, getDataFromLocalStorage, deleteDataFromLocalStorage } from './LocalStorage';
/**
 * A wrapper around some basic crypto methods
 */

export class CryptoUtils {
    static genCryptographicRandomValue() {
        const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
        const result = [];
        window.crypto
            .getRandomValues(new Uint8Array(32))
            .forEach(c => result.push(charset[c % charset.length]));
        return result.join('');
    }

    static hashSHA256(value) {
        if (typeof value !== 'string') {
            throw new Error('Value must be of type String in order to hash');
          }
        return hash
        .sha256()
        .update(value)
        .digest('hex');
    }
    /**
     * hashes the value and checks against a hash to see if they match
     * @param {string} value 
     * @param {string} hash 
     * @returns {boolean} true if value matches hash
     */
    static checkAgainstHash(value, hash) {
        return this.hashSHA256(value) === hash;
    }
}
/**
 * Utility Class for Management of OCID Implicit Auth Flow
 */
// ImplicitAuthManager takes two names in the local storage space
// sso and auth. Please ensure these are not being overwritten by other functions.
export class ImplicitAuthManager {
    constructor(ssoEndPointConfig = {}) {
        //validate ssoEndPointConfig
        this.validateEndPointConfig(ssoEndPointConfig);
    }
    validateEndPointConfig(config) {
        console.log(config, typeof config !== 'object');
        if(typeof config !== 'object') {
            throw new Error('ssoEndPointConfig must be an object');
        }
        console.log(config, "config");
        if(!config.clientId || typeof config.clientId !== 'string') {
            throw new Error('client id in config must be present [string]');
        }
        if(!config.baseURL || typeof config.baseURL !== 'string') {
            throw new Error('base url in config must be present [string]');
        }
        if(!config.realmName || typeof config.realmName !== 'string') {
            throw new Error('realm name in config must be present [string]');
        }
    }

    createRequestKey() {
        return CryptoUtils.genCryptographicRandomValue();
    }

    createNonce() {
        const requestKey = this.createRequestKey();
        //save request key in local storage for reference on auth redirect
        saveDataInLocalStorage('sso', {requestKey});
        //hash requestKey and return as nonce
        return CryptoUtils.hash(requestKey);
    }

    isAReplayAttack(nonce) {
        //this could be a replay attack if the nonce contained with the jwt doesn't match
        //the hashed request key that SHOULD be in local storage
        const requestKey = getDataFromLocalStorage('sso');
        if(sso && sso.requestKey) {
            return !CryptoUtils.checkAgainstHash(sso.requestKey, nonce);
        } else {
            return true;
        }
    }
}

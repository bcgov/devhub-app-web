import { ImplicitAuthManager } from './implicitAuthManager';
import { getDataFromLocalStorage } from './localStorage';
//window.crypto stub
global.crypto = {
  getRandomValues: () => {
    return [
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000),
    ];
  },
};

describe('Implicit Auth Manager Class', () => {
  it('throws an error if ssoEndPoint config is not a valid object', () => {
    expect(() => {
      new ImplicitAuthManager(false);
    }).toThrow('ssoEndPointConfig must be an object');
    expect(() => {
      new ImplicitAuthManager('false');
    }).toThrow('ssoEndPointConfig must be an object');
    expect(() => {
      new ImplicitAuthManager(123);
    }).toThrow('ssoEndPointConfig must be an object');
    expect(() => {
      new ImplicitAuthManager(JSON.stringify({ a: true }));
    }).toThrow('ssoEndPointConfig must be an object');
    expect(() => {
      new ImplicitAuthManager([1, 2, 3]);
    }).toThrow('ssoEndPointConfig must be an object');
  });

  it('throws if client id is not passed in to config', () => {
    const config = {};
    expect(() => {
      new ImplicitAuthManager(config);
    }).toThrow('client id in config must be present and typeof [string]');
  });

  it('throws if base url is not passed in to config', () => {
    const config = {
      clientId: '123',
    };
    expect(() => {
      new ImplicitAuthManager(config);
    }).toThrow('base url in config must be present and typeof [string]');
  });

  it('throws if realm name is not passed in to config', () => {
    const config = {
      clientId: '123',
      baseURL: '12312',
    };
    expect(() => {
      new ImplicitAuthManager(config);
    }).toThrow('realm name in config must be present and typeof [string]');
  });

  test('creating request keys are relatively unique', () => {
    const config = {
      clientId: '123',
      baseURL: '1324',
      realmName: '432',
    };
    const iam = new ImplicitAuthManager(config);
    expect(iam.createRequestKey()).not.toBe(iam.createRequestKey());
  });

  test('when creating a nonce, the request key is stored in local storage', () => {
    const config = {
      clientId: '123',
      baseURL: '1324',
      realmName: '432',
    };
    const iam = new ImplicitAuthManager(config);
    const nonce = iam.createNonce();
    const sso = getDataFromLocalStorage('sso');
    expect(sso.requestKey).toBeDefined();
    expect(nonce).toBeDefined();
  });

  test('when checking for a replay attack, it returns true if no request key has been stored', () => {
    const config = {
      clientId: '123',
      baseURL: '1324',
      realmName: '432',
    };
    const iam = new ImplicitAuthManager(config);
    const nonce = iam.createNonce();
    //simulating that request key doesn't exist
    localStorage.clear();
    expect(iam.isAReplayAttack(nonce)).toBe(true);
  });

  test("when checking for replay attack, it returns true if request key doesn't match nonce", () => {
    const config = {
      clientId: '123',
      baseURL: '1324',
      realmName: '432',
    };
    const iam = new ImplicitAuthManager(config);
    const nonce = iam.createNonce();
    //request key has been stored by createNonce
    const fakeNonce = 'fakenonce';
    expect(iam.isAReplayAttack(fakeNonce)).toBe(true);
  });

  test('when checking for a replay attack, it returns false if nonce matches request key', () => {
    const config = {
      clientId: '123',
      baseURL: '1324',
      realmName: '432',
    };
    const iam = new ImplicitAuthManager(config);
    const nonce = iam.createNonce();
    //request key has been stored by createNonce
    expect(iam.isAReplayAttack(nonce)).toBe(false);
  });
});

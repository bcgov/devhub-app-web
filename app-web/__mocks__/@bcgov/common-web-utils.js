// eslint-disable-next-line
const { ImplicitAuthManager } = jest.requireActual('@bcgov/common-web-utils');

class ImplicitAuthManagerMocked {
  // eslint-disable-next-line
  getSSOLoginURI() {
    return 'LOGINURI';
  }
  // eslint-disable-next-line
  getSSOLogoutURI() {
    return 'LOGOUTURI';
  }
  // eslint-disable-next-line
  handleOnPageLoad() {
    return undefined;
  }
}

module.exports = { ImplicitAuthManager: ImplicitAuthManagerMocked };

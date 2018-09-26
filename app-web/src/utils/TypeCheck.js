/**
 * A dependable Type Checking Utility
 * Type checking using the native typeof or instanceof can cause issues at times
 * as explained by https://juhukinners.wordpress.com/2009/01/11/typeof-considered-useless-or-how-to-write-robust-type-checks/
 */
export class TypeCheck {
  static getClass(object) {
    return Object.prototype.toString.call(object).slice(8, -1);
  }

  static isArray(object) {
    return TypeCheck.getClass(object) === 'Array';
  }

  static isObject(object) {
    return TypeCheck.getClass(object) === 'Object';
  }

  static isBoolean(object) {
    return TypeCheck.getClass(object) === 'Boolean';
  }

  static isNumber(object) {
    return TypeCheck.getClass(object) === 'Number';
  }

  static isString(object) {
    return TypeCheck.getClass(object) === 'String';
  }

  static isDate(object) {
    return TypeCheck.getClass(object) === 'Date';
  }

  static isRegExp(object) {
    return TypeCheck.getClass(object) === 'RegExp';
  }
}

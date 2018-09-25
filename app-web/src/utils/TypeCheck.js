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

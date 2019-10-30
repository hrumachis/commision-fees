/**
 * Additional math functions that aren't included in Math Object
 */
class Maths {
  /**
   * Ceil to decimals
   * 
   * @param {number} value 
   * @param {number} exp
   * @return {number}
   */
  static ceil10(value, exp) {
    return Maths.decimalAdjust('ceil', value, exp);
  }

  /**
   * Adjust decimals
   * 
   * @param {string} type 
   * @param {number} value 
   * @param {number} exp
   * @return {number}
   */
  static decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    
    value = +value;
    exp = +exp;
    
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    
    // Shift back
    value = value.toString().split('e');

    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
}

export default Maths;

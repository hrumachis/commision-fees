import Time from '@modules/Time'

/**
 *  User base model
 */
class User {
  /**
   * @param {string | number} id 
   * @param {string} type 
   */
  constructor(id, type) {
    this.id = String(id);
    this.type = type;
  }

  /**
   * Get user id
   * 
   * @return {string}
   */
  getId() { return this.id; }

  /**
   * Get user type
   * 
   * @return {string}
   */
  getType() { return this.type; }


  /**
   * Set user id
   * 
   * @param {string} id 
   */
  setId(id) { this.id = id; }

  /**
   * Set user type
   * 
   * @param {string | number} type 
   */
  setType(type) { this.type = String(type); }
}

/**
 * User model for natural users.
 */
class UserNatural extends User {
  /**
   * @param {string | number} id 
   * @param {sring} type 
   * @param {string | Date} date 
   */
  constructor(id, type, date) {
    super(id, type);

    this.cashOutWeekAmount = 0;
    this.cashOutWeekMonDate = Time.calcCurrentWeekMonDate(date);
  }

  /**
   * Get user's current week cash out total amount
   * 
   * @return {number}
   */
  getCashOutWeekAmount() { return this.cashOutWeekAmount; }

  /**
   * Get user's current week Monday date
   * 
   * @return {Date}
   */
  getCashOutWeekMonDate() { return this.cashOutWeekMonDate; }

  /**
   * Set user's current week Monday date
   * 
   * @param {Date} date 
   */
  setCashOutWeekMonDate(date) { this.cashOutWeekMonDate = date; }

  /**
   * Reset current week cash out total amount to zero
   */
  resetCashOutWeekAmount() { this.cashOutWeekAmount = 0; }

  /**
   * Sum amount with current week cash out total amount
   * 
   * @param {number} amount 
   */
  addCashOutWeekAmount(amount) { this.cashOutWeekAmount += amount; }
}

export {User, UserNatural};

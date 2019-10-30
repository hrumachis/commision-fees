/**
 * Commision fees calculation formulas
 */
class CommisionFees {
  /**
   * Calculate user commisiog fee for cash in operation
   * 
   * @param {number} amount Operation amount
   * @param {number} perc Fee percantages
   * @param {number} feeMax Max available fee
   * @return {string}
   */
  static calcCashInFee(amount, perc, feeMax) {
    let fee = amount * perc / 100;
    fee = fee < feeMax ? fee : feeMax;

    return fee;
  }

  /**
   * Calculate natural users commision fee for cash out operation
   * 
   * @param {number} amount Operation amount
   * @param {number} perc Fee percantages
   * @param {number} totalWeekAmount Total cash out amount per week
   * @param {number} amountMax Max amount per week for no fees
   * @return {string}
   */
  static calcCashOutFeeNatural(amount, perc, weekLimitAmount, totalWeekAmount) {
    let fee = 0;

    if (totalWeekAmount > weekLimitAmount) {
      if (totalWeekAmount - amount - weekLimitAmount < 0)
        fee = totalWeekAmount - amount - weekLimitAmount;

      fee = (fee + amount) * perc / 100;
    }

    return fee;
  }

  /**
   * Calculate juridical users commision fee for cash out operation
   * 
   * @param {number} amount Operation amount
   * @param {number} perc Fee percantages
   * @param {number} feeMin Min available fee
   * @return {string}
   */
  static calcCashOutFeeJuridical(amount, perc, feeMin) {
    let fee = amount * perc / 100;
    fee = fee > feeMin ? fee : feeMin;

    return fee;
  }
}

export default CommisionFees;

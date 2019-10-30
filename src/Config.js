import Api from '@modules/Api'

/**
 * Configurations storing class
 */
class Config {
  constructor() {
    // TODO: Default value should be stored in config/*.json files
    this.commission = {
      cashIn: {
        percents: 0.03,
        max: {
          amount: 5,
          currency: 'EUR',
        }
      },
      cashOut: {
        natural: {
          percents: 0.3,
          week_limit: {
            amount: 1000,
            currency: 'EUR',
          },
        },
        juridical: {
          percents: 0.3,
          min: {
            amount: 0.5,
            currency: 'EUR',
          },
        },
      },
    }
  }

  /**
   * Get cash in commision fee percents
   * 
   * @return {number}
   */
  getCashInCommPerc() {
    return this.commission.cashIn.percents;
  }

  /**
   * Get cash in maximum commision fee
   * 
   * @return {number}
   */
  getCashInCommMax() {
    return this.commission.cashIn.max.amount;
  }

  /**
   * Get cash out commision fee percents for natural user
   * 
   * @return {number}
   */
  getCashOutNatCommPerc() {
    return this.commission.cashOut.natural.percents;
  }

  /**
   * Get cash out week amount limit for no fee for natural user
   * 
   * @return {number}
   */
  getCashOutNatCommWeekLimit() {
    return this.commission.cashOut.natural.week_limit.amount;
  }

  /**
   * Get cash out commision fee percents for juridical user
   * 
   * @return {number}
   */
  getCashOutJurCommPerc() {
    return this.commission.cashOut.juridical.percents;
  }

  /**
   * Get cash out minimal commision fee
   * 
   * @return {number}
   */
  getCashOutJurCommMin() {
    return this.commission.cashOut.juridical.min.amount;
  }

  /**
   * Set cash in configurations
   * 
   * @param {any} config 
   */
  setCashIn(config) {
    this.commission.cashIn = config;
  }

  /**
   * Set cash out configurations for natural user
   * 
   * @param {any} config 
   */
  setCashOutNatural(config) {
    this.commission.cashOut.natural = config;
  }

  /**
   * Set cash out configurations for juridical user
   */
  setCashOuJuridical(config) {
    this.commission.cashOut.juridical = config;
  }

  /**
   * get remote conifuration files
   */
  async getRemoteConfig() {
    await Api.getConfigCashIn().then(res => this.setCashIn(res));
    await Api.getConfigCashOutNatural().then(res => this.setCashOutNatural(res));
    await Api.getConfigCashOutJuridical().then(res => this.setCashOuJuridical(res));
  }
}

export default Config;

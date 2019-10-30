import Store from '@/Store'
import CommisionFees from '@modules/CommisionFees'
import Time from '@modules/Time'
import Maths from '@modules/Maths'

/**
 * Commision fees calculating application
 */
class App {
  constructor() {
    this.store = new Store();

    this.init();
  }

  /**
	 * Initialize app
	 */
  init() {
    this.store.init();
  }

  /**
	 * Wait for configurations data to be ready
	 */
  ready() {
    return this.store.initPromise;
  }
    
  /**
	 * Calculate commision fees from data array
	 * 
	 * @param {any[]} data 
	 * @return {Array.<string | NaN>}
	 */
  calcArrayCommisionFees(operations) {
    let fees = [];

    operations.forEach((operation) => {
      fees.push(this.calcCommisionFee(operation));
    });

    return fees;
  }

  /**
	 * Calculate operation commision fees
	 * Store necesery data for calculations
	 * 
	 * @param {any} operation
	 * @return {string | NaN}
	 */
  calcCommisionFee(data) {
    let {amount} = data.operation;
    let fee = 0;
    let user = this.store.users.getUser(data.user_id);

    // Store user data
    if (user === null)
      user = this.store.users.importUser(data);

    if (user === null)
      return NaN;

    if (data.type === 'cash_in') {
      fee = CommisionFees.calcCashInFee(amount, this.store.config.getCashInCommPerc(), this.store.config.getCashInCommMax());
    } else if (data.type === 'cash_out') {
      if (data.user_type === 'natural') {
        let currentWeekMonDate = Time.calcCurrentWeekMonDate(data.date);

        /**
				 * When operation was executed on different week
				 * then reset user's week cashout total amount
				 * and set current week monday's date to new one.
				 */
        if (currentWeekMonDate.getTime() !== user.getCashOutWeekMonDate().getTime()) {
          user.setCashOutWeekMonDate(currentWeekMonDate);
          user.resetCashOutWeekAmount();
        }

        // Store week cashout total amount
        user.addCashOutWeekAmount(amount);

        fee = CommisionFees.calcCashOutFeeNatural(amount, this.store.config.getCashOutNatCommPerc(), this.store.config.getCashOutNatCommWeekLimit(), user.getCashOutWeekAmount());
      } else if (data.user_type === 'juridical') {
        fee = CommisionFees.calcCashOutFeeJuridical(amount, this.store.config.getCashOutJurCommPerc(), this.store.config.getCashOutJurCommMin());
      }
    }

    return Maths.ceil10(fee, -2).toFixed(2);
  }
}

export default App;

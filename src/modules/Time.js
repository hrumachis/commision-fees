/**
 * Time calculations
 */
class Time {
  static DAY_IN_MILISECONDS() {
    return 1000 * 60 * 60 * 24;
  }

  /**
   * Calculate elapsed days 
   * 
   * @param {number} dateOldMiliseconds 
   * @param {number} dateFutureMiliseconds 
   * @return {number}
   */
  static calcDaysElapsed(dateOldMiliseconds, dateFutureMiliseconds) {
    return Math.floor((dateFutureMiliseconds - dateOldMiliseconds) / Time.DAY_IN_MILISECONDS());
  }

  /**
   * Parse days to miliseconds
   * 
   * @param {number} days 
   * @return {number}
   */
  static parseDaysToMiliseconds(days) {
    return days * Time.DAY_IN_MILISECONDS();
  }

  /**
   * Get week day, from monday - 0 to sunday - 6
   * 
   * @param {Date} date 
   * @return {number}
   */
  static getDayMonToSun(date) {
    let result = date.getDay()-1;

    return result !== -1 ? result : 6;
  }

  /**
   * Calculate current week monday date from given date
   * 
   * @param {string | Date} date 
   * @return {Date}
   */
  static calcCurrentWeekMonDate(date) {
    let formatedDate = new Date(date);

    return new Date(formatedDate.getTime() - Time.parseDaysToMiliseconds(Time.getDayMonToSun(formatedDate)));
  }   
}

export default Time;

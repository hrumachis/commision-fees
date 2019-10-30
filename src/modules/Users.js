import {User, UserNatural} from '@models/User'

/**
 * Handle users
 */
class Users {
  constructor() {
    this.list = {};
  }

  /**
   * Check if user exsist in list
   * 
   * @param {string} id
   * @return {boolean}
   */
  isUserExsist(id) {
    return this.list[id] !== undefined;
  }
    
  /**
   * Add user to list
   * 
   * @param {User | UserNatural} user 
   */
  addUser(user) {
    this.list[user.id] = user;
  }

  /**
   * Get user from list
   * 
   * @param {string} id 
   * @return {Object | null}
   */
  getUser(id) {
    if (this.isUserExsist(id) === false)
      return null;

    return this.list[id];
  }

  /**
   * Create User object
   * 
   * @param {any} param0 
   * @return {User}
   */
  createUser({user_id, user_type}) {
    return new User(user_id, user_type);
  }

  /**
   * Create UserNatural object
   * 
   * @param {any} param0 
   * @return {UserNatural}
   */
  createUserNatural({date, user_id, user_type}) {
    return new UserNatural(user_id, user_type, date);
  }

  /**
   * Verify data input
   * 
   * @param {any} param0
   * @return {boolean}
   */
  verifyData({user_id, date, user_type,}) {
    if (user_id === undefined || user_id === '')
      return false;

    if (date === undefined || date === '')
      return false;

    if (user_type === undefined || user_type === '')
      return false;

    return true;
  }

  /**
   * Import user
   * 
   * @param {any} data 
   * @return {boolean}
   */
  importUser(data) {
    let user = null;

    if (this.verifyData(data) === false)
      return user;
        
    if (data.user_type === 'natural')
      user = this.createUserNatural(data);
    else
      user = this.createUser(data);

    this.addUser(user);

    return user;
  }
}

export default Users;

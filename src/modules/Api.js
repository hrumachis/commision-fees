import axios from 'axios'

/**
 * Api calls
 */
class Api {
  static async getConfigCashIn() {
    return await Api.request('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in');
  }

  static async getConfigCashOutNatural() {
    return await Api.request('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural');
  }

  static async getConfigCashOutJuridical() {
    return await Api.request('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical');
  }

  static async request(path) {
    let result = null;

    await axios.get(path).then((res) => {
      if (res.data !== undefined)
        result = res.data;
        
    }).catch(() => {
      console.log("ERROR: Can't reach API server.");
    });

    return result
  }
}

export default Api;

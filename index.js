import File from '@modules/File'
import App from '@/App'

let argument = process.argv[2];

if (argument !== '' && argument !== undefined)
  File.readJSON(argument).then((res) => {
    const app = new App();
    
    // Use remote configurations
    app.ready().finally(() => {
      app.calcArrayCommisionFees(res).forEach(fee => {
        console.log(fee);
      });
    });
  });

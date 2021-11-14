const { TOKEN } = require('./util/config.js')
const ProtectClient = require('./structures/ProtectClient');

let client = new ProtectClient({
  prefix: '?'
});

client.login(process.env.TOKEN); 
const fs = require('fs')

const AnonymousVoting = artifacts.require("./AnonymousVoting")
const LocalCrypto = artifacts.require("./LocalCrypto")

let fd
let data = ''

module.exports = function (deployer, network, accounts) {

  try {

    deployer.deploy(AnonymousVoting, 10, accounts[0])
      .then(function () {
        return deployer.deploy(LocalCrypto)
      })
      .then(function () {
        fd = fs.openSync('postmigrate.js', 'w')

        let line1 = 'const AnonymousVoting_adr = "' + AnonymousVoting.address + '"'
        let line2 = 'const AnonymousVoting_abi = ' + JSON.stringify(AnonymousVoting.abi)

        let line3 = 'const LocalCrypto_adr = "' + LocalCrypto.address + '"'
        let line4 = 'const LocalCrypto_abi = ' + JSON.stringify(LocalCrypto.abi)
        const returnStr = "\r\n"
        fs.appendFileSync(fd,
          line1 + returnStr +
          line2 + returnStr +
          line3 + returnStr +
          line4 + returnStr, 'utf8')
      })

  } catch (err) {
    /* Handle the error */
  } finally {
    if (fd !== undefined)
      fs.closeSync(fd)
  }

  /*
  // deployment steps
  deployer.deploy(AnonymousVoting, 10, accounts[0])
    .then(() => {
      data = 'const AnonymousVoting_adr = "' + AnonymousVoting.address + '"'
      fs.writeFile('postmigrate.js', data, (err) => {
        if (err) throw err;
        // success case, the file was saved
        console.log('AnonymousVoting_adr writed!')
        return deployer.deploy(LocalCrypto)
          .then(() => {
            data = 'const LocalCrypto_adr = "' + LocalCrypto.address + '"'
            console.log('DATA 2: ', data)
            fs.appendFile('postmigrate.js', data, (err) => {
              if (err) throw err;
              // success case, the file was saved
              console.log('LocalCrypto_adr writed!')
              return
            })
          })
      })
    })
*/

  /*
    deployer.deploy(A).then(function() {
      return deployer.deploy(B, A.address);
    });
    */

//deployer.deploy(LocalCrypto);

}





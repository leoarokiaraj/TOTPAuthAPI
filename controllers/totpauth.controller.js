const fs = require('fs');
const QRCode = require('qrcode');
const { TOTPAuthService } = require('../services/totpauth.service')
const { registerTOTPService, validateTOTPService  } = TOTPAuthService


const registerTOTPController = async (req, res, next) => {
    try {
      var resp = null;
      await registerTOTPService(req.query.username).then((usersResp) => {
        resp = usersResp;
      }).catch((err) => {
        console.log(err)
        resp = err.error.message;
      })

      switch (true) {
        case (resp.StatusCode === 200):

          res.setHeader('Content-disposition', 'attachment; filename=QRFile.png');
          res.setHeader('Content-type', 'image/x-png');     
          let file = fs.createWriteStream("QRFile.png");

          await QRCode.toFileStream(file, resp.data, {
            type: 'png',
            errorCorrectionLevel: 'H'
          })

          let filestream = fs.createReadStream('QRFile.png');
          filestream.pipe(res);


          break;
        case (300 <= resp.StatusCode && 399 >= resp.StatusCode):
          res.status(resp.StatusCode).send(resp)
          break;
        case (resp.StatusCode === 503):
          res.status(503).send(resp)
          break;
        default:
          res.status(500).send(resp)
          break;
      }
      
    //next()

    } catch (e) {
      console.log(e.message)
      res.sendStatus(500) && next(error)
    }
}

const validateTOTPController = async (req, res, next) => {
  try {
    var resp = null;
    await validateTOTPService(req.query.username, req.query.token).then((usersResp) => {
      resp = usersResp;
    }).catch((err) => {
      console.log(err)
      resp = err.error.message;
    })

    switch (true) {
      case (resp.StatusCode === 200):
        res.status(200).send(resp)
        break;
      case (300 <= resp.StatusCode && 399 >= resp.StatusCode):
        res.status(resp.StatusCode).send(resp)
        break;
      case (resp.StatusCode === 503):
        res.status(503).send(resp)
        break;
      default:
        res.status(500).send(resp)
        break;
    }
    
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}


TOTPController= {
  registerTOTPController,
  validateTOTPController
    
}

module.exports = {
  TOTPController
}
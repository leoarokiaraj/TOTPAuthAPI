const OTPAuth  = require("otpauth")


const registerTOTPService = async (username) => {
    return new Promise((resp, rejp) => {
      _registerTOTP(username, resp, rejp)
    });
  }

  const validateTOTPService = async (username, token) => {
    return new Promise((resp, rejp) => {
      _validateTOTP(username, token, resp, rejp)
    });
  }


  const _registerTOTP = async(username,resp, rejp) => {
    try {  

      let totp = await generateTOTP(username)

      let data = totp.toString();
  
  
      resp({
        StatusCode: 200,
        Status: "Success",
        data
      })
  
      } catch (error) {
        rejp({
          StatusCode: 500,
          Status: "Internal server error",
          error
        })
      }
  }

  const _validateTOTP = async(username, token, resp, rejp) => {
    try {  

      let totp = await generateTOTP(username)

      let delta = totp.validate({ token , window: 1 });
  
      if (delta === null || delta === -1){
        resp({
          StatusCode: 401,
          Status: "Invalid",
          delta
        })
      }

      resp({
        StatusCode: 200,
        Status: "Success",
        delta
      })
      
  
      } catch (error) {
        rejp({
          StatusCode: 500,
          Status: "Internal server error",
          error
        })
      }
  }
  

  const generateTOTP = async(username) => {

    let totp = new OTPAuth.TOTP({
      issuer: "Leo",
      label: username,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: process.env.TOTP_SECRET+username,
    });

    return totp
    

  }


TOTPAuthService = {
  registerTOTPService,
  validateTOTPService
}

module.exports = {
  TOTPAuthService
  }
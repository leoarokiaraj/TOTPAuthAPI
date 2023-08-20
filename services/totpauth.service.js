const speakeasy  = require("speakeasy")

const totpOpts = {
  window: 2,
  issuer: 'Leo',
  algorithm: 'sha1' 
}

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

      let totp = speakeasy.otpauthURL({ 
                    secret: process.env.TOTP_SECRET+username.toUpperCase(), 
                    label: username,
                    ...totpOpts
                  });

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

      let delta = speakeasy.totp.verifyDelta({ 
                    secret: process.env.TOTP_SECRET+username.toUpperCase(),
                    token: token,
                    ...totpOpts 
                  });
  
      if (delta === null || typeof  delta === 'undefined'){
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
  


TOTPAuthService = {
  registerTOTPService,
  validateTOTPService
}

module.exports = {
  TOTPAuthService
  }
# TOTPAuthAPI

This is a simple API app to register and validate TOTP 

---

The entire app is in nodejs

## Requirements

For development, you will only need Node.js and a Node global package, installed in your environment.

### Node
- #### Node installation on Windows

  Just go to [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.15.0

    $ npm --version
    9.5.0

## Development server

* Create `config\dev.env` with the following environment properties
  * PORT={local_port_number}
  * DOMAIN={domain_to_restrict_api}
  * TOTP_SECRET={secret_for_otpauth}
* Run `npm run dev` for a dev server. Navigate to `http://localhost:3001/`.


## REST API

The REST API to the TOTPAuthAPI app is described below.

## Register an app for TOTP

### Request

`GET api/register-totp?username={username}`
```bash
  curl http://localhost:3001/api/register-totp?username=test --output "D:\QRImage.png"
```

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: image/x-png
    Content-disposition: attachment; filename=QRImage.png
    

## Validate TOTP

### Request

`GET api/validate-totp?username={username}&token={token}`
```bash
  curl http://localhost:3001/api/validate-totp?username=test&token=123456
```
### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json; charset=utf-8
    {
      "StatusCode": 200,
      "Status": "Success",
      "delta": {
        "delta": 0
      }
    }
    

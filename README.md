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
    v8.11.3

    $ npm --version
    6.1.0

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:3001/`.


## REST API

The REST API to the TOTPAuthAPI app is described below.

## Register an app for TOTP

### Request

`GET api/register-totp?username:{username}`

  curl http://localhost:7000/api/register-totp?username:test --output "D:\QRImage.png"

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: image/x-png
    Content-disposition: attachment; filename=QRImage.png
    

## Validate TOTP

### Request

`GET api/validate-totp?username:{username}&token={token}`

  curl http://localhost:7000/api/validate-totp?username=test&token=123456

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json; charset=utf-8
    

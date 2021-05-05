## Idemeum javascript SDK


## Installation

Import idemeum JavaScript SDK.

```
<script src="https://asset.idemeum.com/webapp/SDK/idemeum.js"></script>
```

## Usage

## Initialize idemeum SDK

Initialize idemeum SDK instance. 
Use your clientId that you obtained from [idemeum developer portal]().

``` 
var idemeum = new IdemeumManager(
  // Replace clientId with the the one you get from idemeum developer portal
  (clientId = "00000000-0000-0000-000000000000")
);
```

## Manage user authentication state

```
idemeum.isLoggedIn().then(
   function (data) {
     // user is logged in
   },
   function (errorData) {
     // user is NOT logged in
   }
);
```

## Login 

```
idemeum.login()
  .then(function (data) {
      /*
       data returned here is the OIDC Token JSON object
      {
       "accessToken": "string",
       "expires_in": 0,
       "idToken": "string"
      }
      */
  })
  .catch(function (err) {
      // login fail
  })
```

## Get and validate user claims

```
idemeum.userClaims().then(function (userClaimsResponse) {
    //fetch user approved claims from JSON response
    
   }).catch(function (errorResponse) {
   
   });
```

## Logout

```
idemeum.logout()
```


## Complete documentation guide

You can checkout the complete documentation guide [here](https://docs.idemeum.com/reference/js-guide/)


## Contact

You can reach us at <support@idemeum.com>

## Licence

This project uses the following license: [MIT License](https://github.com/idemeum/idemeum-js-sdk/blob/main/LICENSE)

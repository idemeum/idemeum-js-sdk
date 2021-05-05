// "use strict";
// // export class login {
// exports.__esModule = true;
// // import { HttpClient } from "@angular/common/http";
// // import { Observable } from "rxjs/internal/Observable";
// // import { HttpClient } from "@angular/common/http";
// // import { Observable } from "rxjs/internal/Observable";
// var jquery_3_2_1_slim_min_js_1 = require("https://code.jquery.com/jquery-3.2.1.slim.min.js");
// //import { environment } from "src/environments/environment";
// //     public hello(name: string) {
// //         alert("hello : " + name);
// //     }
// // }


var script = document.createElement('script');
var clientId;
var clientLogin;
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var IdemeumManager = /** @class */ (function () {
    function IdemeumManager(_clientId) {
        clientId = _clientId;
    }

    IdemeumManager.prototype.login = function () {
        var promise = new Promise(function (resolve, reject) {
            // Fixes dual-screen position Most browsers Firefox
            var popupWidth = 786;
            var popupHeight = screen.height//500;
            var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
            var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
            var systemZoom = width / window.screen.availWidth;
            var left = (width - popupWidth) / 2 / systemZoom + dualScreenLeft;
            var top = (height - popupHeight) / 2 / systemZoom + dualScreenTop;
            
            window.addEventListener('message', function (e) {
                console.log(e);
                var jsonData = JSON.parse(e.data)
                if (jsonData.status) {
                    //store OIDC Token at localStorage
                    localStorage.setItem("oidc_token", JSON.stringify(jsonData.oidc))
                    resolve(jsonData);
                } else {
                    reject(jsonData);
                }
            }, false);
            var loginwindow = window.open("https://ciam.idemeum.com/api/consumer/authorize?clientId=" + clientId, "LoginScreen");
            
        });
        return promise;

    },
        IdemeumManager.prototype.userClaims = function () {
            //Fetch OIDC Token from localStorage
            var oidc = localStorage.getItem("oidc_token")
            var promise = new Promise(function (resolve, reject) {
                if (oidc != undefined && oidc != "" && JSON.stringify(oidc) != "{}") {
                    $.ajax({
                        url: "https://ciam.idemeum.com/api/consumer/token/validation",
                        type: 'POST',
                        data: oidc,
                        headers: { "accept": "application/json", "Content-Type": "application/json" },
                        success: function (data) {
                            resolve(data);
                            console.log(data.d)
                        },
                        error: function (jqXhr, textStatus, errorMessage) {
                            reject(errorMessage);
                        }
                    });
                } else {
                    reject("Login first and then validate token.");
                }
            });
            return promise;
        },
        IdemeumManager.prototype.logout = function () {
            localStorage.removeItem("oidc_token")
        },
        IdemeumManager.prototype.isLoggedIn = function () {
            var oidc = localStorage.getItem("oidc_token")
            var promise = new Promise(function (resolve, reject) {
                if (oidc != undefined && oidc != "" && JSON.stringify(oidc) != "{}") {
                    $.ajax({
                        url: "https://ciam.idemeum.com/api/consumer/token/validation/accessToken",
                        type: 'POST',
                        data: oidc,
                        headers: { "accept": "application/json", "Content-Type": "application/json" },
                        success: function (data) {
                            resolve(true);
                            console.log(data.d)
                        },
                        error: function (jqXhr, textStatus, errorMessage) {
                            reject(false);
                        }
                    });
                } else {
                    reject(false);
                }
            });
            return promise;
        }

    return IdemeumManager;
}());




$(document).ready(function () {
    $("#btnSignin").css({
        "background-color": "white",
        "border-radius": "5px",
        "color": "black",
        "font-weight": "bold",
        "width": "270px",
        "height": "54px",
        "font-size": "16px",
        "border": "1.5px solid #9E9E9E"
    }).html("<img style='height: 16px;' src='https://asset.idemeum.com/webapp/assets/images/idemeum-logo-black.png'> Sign in with Idemeum");

})


/**
 * Created by fitzpatt on 2/8/2017.
 */
"use strict";
var _this = this;
var mdl = {
    layout: document.querySelector('.mdl-layout'),
    notification: document.querySelector('.mdl-js-snackbar'),
    snackbar: function (message) {
        _this.notification.MaterialSnackbar.showSnackbar({
            message: message
        });
    },
    toggleDrawer: function () {
        _this.layout.MaterialLayout.toggleDrawer();
    }
};
exports.__esModule = true;
exports["default"] = mdl;

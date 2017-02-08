"use strict";
/**
 * Created by fitzpatt on 2/8/2017.
 */
function snackbar(message) {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar({
        message: message
    });
}
exports.snackbar = snackbar;

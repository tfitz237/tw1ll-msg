/**
 * Created by fitzpatt on 2/8/2017.
 */
function snackbar(message) {
    var notification = document.querySelector('.mdl-js-snackbar') as any;
    notification.MaterialSnackbar.showSnackbar(
        {
            message: message
        }
    );
}


export {snackbar}
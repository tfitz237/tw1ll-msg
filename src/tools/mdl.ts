/**
 * Created by fitzpatt on 2/8/2017.
 */

let mdl = {
    layout: document.querySelector('.mdl-layout') as any,
    notification: document.querySelector('.mdl-js-snackbar') as any,
    snackbar: (message) => {
        this.notification.MaterialSnackbar.showSnackbar(
            {
                message: message
            }
        );
    },
    toggleDrawer: () => {
        this.layout.MaterialLayout.toggleDrawer();
    }
};
export default mdl;
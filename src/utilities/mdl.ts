/**
 * Created by fitzpatt on 2/8/2017.
 */

let mdl = {


    snackbar: (message) => {
        let notification = document.querySelector('.mdl-js-snackbar') as any;
        notification.MaterialSnackbar.showSnackbar(
            {
                message: message
            }
        );
    },
    toggleDrawer: () => {
        let layout = document.querySelector('.mdl-layout') as any;
        layout.MaterialLayout.toggleDrawer();
    },

    scroll: () => {
        let content = document.querySelector('.mdl-layout__content') as any;
        content.scrollTop = content.scrollHeight;
    }
};
export default mdl;
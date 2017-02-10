/**
 * Created by fitzpatt on 2/8/2017.
 */
class mdl {

    upgradeDom = () => {
        componentHandler.upgradeDom();
    };

    snackbar = (message) => {
        let notification = document.querySelector('.mdl-js-snackbar') as any;
        notification.MaterialSnackbar.showSnackbar(
            {
                message: message
            }
        );
    };
    toggleDrawer = () => {
        let layout = document.querySelector('.mdl-layout') as any;
        layout.MaterialLayout.toggleDrawer();
    };

    scrollBottom = () => {
        let content = document.querySelector('.mdl-layout__content') as any;
        content.scrollTop = content.scrollHeight;
    };

    dialog = (id, method) => {
        console.log("dialog#"+id);
        let dialogElement = document.querySelector('dialog#'+id) as any;
        switch(method) {
            case "open":
            default:
                dialogElement.showModal();
                break;
            case "close":
                dialogElement.close();
                break;
            case "event":
                dialogElement.querySelector('.close').addEventListener('click', () => {
                    dialogElement.close();
                });
                break;
        }

    };

};
let mdlObj = new mdl();
export default mdlObj;
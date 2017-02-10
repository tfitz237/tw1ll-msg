import * as React from "react";
import fire from "../utilities/firebase";


class DrawerHeader extends React.Component<any,any> {

    render() {
        return (
            <header className="drawer-header">
                <i className="material-icons mdl-list__item-avatar">person</i>
                <div className="drawer-header-user-dropdown">
                    <span>{this.props.user.email}</span>
                    <div className="mdl-layout-spacer"></div>
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="drawer-user-menu">
                        <i className="material-icons">arrow_drop_down</i>
                    </button>
                    <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" htmlFor="drawer-user-menu">
                        <li className="mdl-menu__item" onClick={fire.sign.out}>LogOut</li>
                    </ul>

                </div>
            </header>
        );
    }
}

export default DrawerHeader;
import * as React from "react";
import fire from "../utilities/firebase";
class Header extends React.Component<any,any> {

    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <div className="mdl-layout-icon"></div>
                    <span className="mdl-layout-title">{this.props.title}</span>
                    <div className="mdl-divider">
                        {this.props.user != null &&
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={fire.sign.out}>
                            <i className="material-icons">exit_to_app</i>
                        </button>
                        }
                    </div>
                </div>
            </header>
        );


    }
}

export default Header;
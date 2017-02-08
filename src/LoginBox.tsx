import * as React from "react";
import fire from "./tools/firebase";

interface ILoginBox {
    email: string,
    pass: string,

}

class LoginBox extends React.Component<any,ILoginBox> {
    constructor(props) {
        super(props);
    }

    login = () => {
        fire.sign.in(this.state.email, this.state.pass);
    };
    signUp = () => {
        fire.sign.up(this.state.email, this.state.pass);
    };
    setEmailState = (e) => {
        this.setState({email: e.target.value});
    };

    setPassState = (e) => {
        this.setState({pass: e.target.value});
    };


    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__tile mdl-card--expand">
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" type="text" id="email" onChange={this.setEmailState} />
                            <label className="mdl-textfield__label" htmlFor="email">Email</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" type="password" id="pass" onChange={this.setPassState} />
                        <label className="mdl-textfield__label" htmlFor="pass">Password</label>
                    </div>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <a className="mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect" onClick={this.login}>Login</a>
                    <a className="mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect" onClick={this.signUp}>Sign Up</a>
                </div>
            </div>
        );
    }
}

export default LoginBox;
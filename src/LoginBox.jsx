"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("./tools/firebase");
var LoginBox = (function (_super) {
    __extends(LoginBox, _super);
    function LoginBox(props) {
        var _this = _super.call(this, props) || this;
        _this.login = function () {
            firebase_1.default.sign.in(_this.state.email, _this.state.pass);
        };
        _this.signUp = function () {
            firebase_1.default.sign.up(_this.state.email, _this.state.pass);
        };
        _this.setEmailState = function (e) {
            _this.setState({ email: e.target.value });
        };
        _this.setPassState = function (e) {
            _this.setState({ pass: e.target.value });
        };
        return _this;
    }
    LoginBox.prototype.render = function () {
        return (<div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__tile mdl-card--expand">
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" type="text" id="email" onChange={this.setEmailState}/>
                            <label className="mdl-textfield__label" htmlFor="email">Email</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" type="password" id="pass" onChange={this.setPassState}/>
                        <label className="mdl-textfield__label" htmlFor="pass">Password</label>
                    </div>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <a className="mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect" onClick={this.login}>Login</a>
                    <a className="mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect" onClick={this.signUp}>Sign Up</a>
                </div>
            </div>);
    };
    return LoginBox;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginBox;

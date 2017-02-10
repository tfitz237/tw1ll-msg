"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("../tools/firebase");
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return (<header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <div className="mdl-layout-icon"></div>
                    <span className="mdl-layout-title">{this.props.title}</span>
                    <div className="mdl-divider">
                        {this.props.user != null &&
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={firebase_1.default.sign.out}>
                            <i className="material-icons">exit_to_app</i>
                        </button>}
                    </div>
                </div>
            </header>);
    };
    return Header;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;

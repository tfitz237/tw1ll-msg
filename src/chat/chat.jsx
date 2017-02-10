"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ChatNav_1 = require("./ChatNav");
var ChatContent_1 = require("./ChatContent");
var LoginBox_1 = require("../LoginBox");
var firebase_1 = require("../tools/firebase");
var Header_1 = require("../Layout/Header");
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat(props) {
        var _this = _super.call(this, props) || this;
        _this.updateContent = function (id) {
            _this.setState({ roomId: id });
        };
        _this.state = { title: 'Chat', user: firebase_1.default.user() };
        firebase_1.default.auth.onAuthStateChanged(function (user) {
            _this.setState({ user: user });
        });
        return _this;
    }
    Chat.prototype.render = function () {
        return (<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Header_1.default title={this.state.title} user={this.state.user}/>
                <ChatNav_1.ChatNav title={this.state.title} user={this.state.user} updateContent={this.updateContent}/>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        {this.state.user ? (<ChatContent_1.default roomId={this.state.roomId}/>) : (<LoginBox_1.default />)}
                    </div>
                </main>
            </div>);
    };
    return Chat;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Chat;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ChatMessage = (function (_super) {
    __extends(ChatMessage, _super);
    function ChatMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatMessage.prototype.render = function () {
        return (<li>{new Date(this.props.timestamp).toLocaleTimeString()}
            [{this.props.userInfo.email}]&nbsp;&nbsp;{this.props.message}
        </li>);
    };
    return ChatMessage;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatMessage;

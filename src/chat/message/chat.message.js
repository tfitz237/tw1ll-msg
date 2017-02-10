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
        return (React.createElement("li", null,
            new Date(this.props.timestamp).toLocaleTimeString(),
            "[",
            this.props.userInfo.email,
            "]\u00A0\u00A0",
            this.props.message));
    };
    return ChatMessage;
}(React.Component));
exports.__esModule = true;
exports["default"] = ChatMessage;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Model_1 = require("./MessageModel");
var ChatContent = (function (_super) {
    __extends(ChatContent, _super);
    function ChatContent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            room: null,
            messages: {}
        };
        return _this;
    }
    ChatContent.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.roomId != this.props.roomId) {
            Model_1["default"].updateMessages(this, newProps.roomId);
        }
    };
    ChatContent.prototype.render = function () {
        var list = Model_1["default"].createMessageList(this.state.messages);
        if (this.state.messages != null && this.state.room != null) {
            return (React.createElement("div", null,
                React.createElement("h1", null, this.state.room.topic),
                React.createElement("ul", null, list)));
        }
        else
            return (React.createElement("div", null));
    };
    return ChatContent;
}(React.Component));
exports.__esModule = true;
exports["default"] = ChatContent;

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
        return _super.call(this, props) || this;
    }
    ChatContent.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.roomId != this.props.roomId) {
            Model_1.default.updateMessages(this, newProps.roomId);
        }
    };
    ChatContent.prototype.render = function () {
        var list = Model_1.default.createMessageList(this.state.messages);
        if (this.state.messages != null && this.state.room != null) {
            return (<div>
                    <h1>{this.state.room.topic}</h1>
                    <ul>
                        {list}
                    </ul>
                </div>);
        }
        else
            return (<div></div>);
    };
    return ChatContent;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatContent;

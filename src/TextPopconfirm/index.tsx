import React, { Component } from "react";
import { Popconfirm } from "antd";

interface Iprops {
  onConfirm: () => void;
  title?: string;
  text?: string;
  placement?: any;
  disabled?: boolean;
}

export default class DletePopconfirm extends Component<Iprops, any> {
  render() {
    const {
      onConfirm,
      title = "确定删除吗？",
      text = "删除",
      placement = "top"
    } = this.props;
    return (
      <Popconfirm placement={placement} title={title} onConfirm={onConfirm}>
        {this.props.children ? (
          this.props.children
        ) : (
          <a disabled={this.props.disabled} {...this.props}>
            {text}
          </a>
        )}
      </Popconfirm>
    );
  }
}

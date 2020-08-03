import React, { Component } from 'react';
import { Button } from 'antd';

export default class ToolbarButton extends Component {
    render() {
        const { getValue, onClick, ...props } = this.props;
        return <Button {...props}
            style={Object.assign({
                fontSize: 13,
                height: 32
            }, this.props.style || {})}
            onClick={this.onClick}></Button>
    }

    onClick = () => {
        const getValue = this.props.getValue || function () { };
        if (this.props.onClick) {
            this.props.onClick(getValue(), {
                validate: this.props.validate
            });
        }
    }
}
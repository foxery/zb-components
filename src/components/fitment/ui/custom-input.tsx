import React, { Component } from 'react';
import { Input, Col } from 'antd';
const InputGroup = Input.Group;
export default class CustomInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            length: (props.value || props.defaultValue || '').length
        }
    }

    componentWillReceiveProps(nextProps) {
        let length = (nextProps.value || nextProps.defaultValue || '').length;
        if (length > nextProps.maxLength) {
            length = nextProps.maxLength;
        }
        this.setState({ length: length})
    }

    render() {

        const { style, inputStyle, ...otherProps } = this.props;
        let height = inputStyle.hieght ? inputStyle.height : 32;
        if (typeof height == 'number') {
            height += 'px';
        }
        const tipsStyle = { height: height, lineHeight: height };
        // if (this.state.length == this.props.maxLength) {
        //     Object.assign(tipsStyle, { color: 'red' });
        // }
        return <InputGroup size="large" style={style}>
            <Col span={this.props.maxLength ? 20 : 24}>
                <Input style={inputStyle} {...otherProps} onChange={(event) => { this.onChange(event) }} />
            </Col>
            {
                this.props.maxLength ? <Col span={4} style={tipsStyle}>
                    {this.state.length} / {this.props.maxLength}
                </Col> : null
            }
        </InputGroup>
    }

    onChange = (event) => {
        let length = (event.target.value || '').length;
        if (length > this.props.maxLength) {
            length = this.props.maxLength;
        }
        this.setState({ length: length });
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }
}
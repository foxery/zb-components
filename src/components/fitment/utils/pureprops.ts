
import React, { Component } from 'react';

export default function pureprops(target) {
    return class extends Component {
        render() {
            const props = {};
            Object.keys(this.props).forEach(key => {
                if (!key.startsWith('ryu') || key == 'ryu' || key == 'ryu_onChange' || key == 'ryuMode') {
                    props[key] = this.props[key];
                }
            });
            return React.createElement(target, props);
        }
    }
}
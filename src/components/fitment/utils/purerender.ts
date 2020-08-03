
import React, { Component } from 'react';

export default function purerender(target) {
    return class extends Component {
        isShalldowEqual = (objectA, objectB) => {
            if (objectA == objectB) {
                return true;
            }

            if (Object.keys(objectA).length != Object.keys(objectB).length) {
                return false;
            }

            return Object.keys(objectA).every((key) => {
                return objectA[key] == objectB[key];
            });
        }

        shouldComponentUpdate(nextProps, nextState, nextContext) {
            if (!this.isShalldowEqual(this.props, nextProps)) {
                return true;
            }
            if (!this.isShalldowEqual(this.state, nextState)) {
                return true;
            }
            return false;
        }

        render() {
            return React.createElement(target, this.props);
        }
    }
}
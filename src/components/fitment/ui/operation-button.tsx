import React, { Component } from 'react';
import { Tooltip } from 'antd';

interface Iprops {
    type: 'top' | 'bottom' | 'up' | 'down' | 'delete'
    style?: any
    onClick: () => void
}

export default class OperationButton extends Component<Iprops> {
    render() {
        const { type, style = {}, ...props } = this.props;

        let src = '', text = '';

        switch (type) {
            case 'top':
                src = 'https://img.dianjia.io/vpc/1/spu/top1502353797378.png';
                text = '置顶';
                break;
            case 'bottom':
                src = 'https://img.dianjia.io/vpc/1/spu/bottom1502353796504.png';
                text = '置底';
                break;
            case 'up':
                src = 'https://img.dianjia.io/vpc/1/spu/up1502353797543.png';
                text = '上移';
                break;
            case 'down':
                src = 'https://img.dianjia.io/vpc/1/spu/down1502353796893.png';
                text = '下移';
                break;
            case 'delete':
                src = 'https://img.dianjia.io/vpc/1/spu/delete1502353796682.png';
                text = '删除';
                break;
        }

        return <Tooltip placement="bottom" title={text}>
            <img {...props}
                src={src}
                width={24}
                height={24}
                style={Object.assign({
                    borderRadius: 10000,
                    background: '#4990E2',
                    cursor: 'pointer'
                }, style)} />
        </Tooltip>
    }
}
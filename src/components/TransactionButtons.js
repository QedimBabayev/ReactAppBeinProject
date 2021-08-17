import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menuPaymentIn = (
    <Menu>
        <Menu.Item key="0">
            <a href="/createPaymentIn">Cash</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <a href="/createInvoiceIn">Transfer</a>
        </Menu.Item>
    </Menu>
);


const menuPaymentOut = (
    <Menu>
        <Menu.Item key="0">
            <a href="/createPaymentOut">Cash</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <a href="/createInvoiceOut">Transfer</a>
        </Menu.Item>
    </Menu>
);

class TransactionButtons extends Component {
    render() {
        return (
            <>
                <Dropdown overlay={menuPaymentIn} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Click me <DownOutlined />
                    </a>
                </Dropdown>
                <Dropdown overlay={menuPaymentOut} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Click me <DownOutlined />
                    </a>
                </Dropdown>
            </>
        )
    }
}

export default TransactionButtons
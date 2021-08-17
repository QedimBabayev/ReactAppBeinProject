import React, { Component } from 'react'
import { connect } from 'react-redux'
import Trans from '../usetranslation/Trans';
import { deleteResponseService } from '../actions/putAactions/deleteResponseService';
import { putLocalStates } from '../actions/modalActions/putModalInputs-action';
import { getCustomers, getCustomersFast } from '../actions/getCustomerGroups-action';
import getMarks from '../actions/getMarks-action'
import { getGroups } from '../actions/getGroups-action';
import { getCustomerGroupsModal, getStocksGroupsModal,productModalFilter,getProductsModal,getProductsGroupModal } from '../actions/modalActions/getCustomerGroupsModal-action';
import CreateCustomerModal from '../modal/CreateCustomerModal';
import CreateStockModal from '../modal/CreateStockModal';
import filterObject from '../config/filterObject';
import { poistionArray,description } from './DocTable';
import LoaderDocHOC from '../components/LoaderDocHOC';
import putData from '../actions/putAactions/putData-action';


import moment from 'moment';
import {
    Form, Input, Button, InputNumber, TreeSelect, Checkbox, Dropdown, DatePicker, Switch, Select, Spin, Tag, Divider, Menu, Col, Row, Collapse
} from 'antd';

import {
    PrinterOutlined,
    UserAddOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Null_Content } from '../config/env';
import AddStockModal from '../modal/AddStockModal';
import './ButtonsWrapper.css'
import './DocForm.css'
const { Option, OptGroup } = Select;

var newArrStocks = []
var customCascaderStock = [];
var customCascaderCustomer = [];
var newArrStocks = []
var newArrCustomers = []
var lowerCaseMarks = []
var lowerCaseCustomers = []
var pid;
function convert(array) {
    var map = {}
    for (var i = 0; i < array.length; i++) {
        var obj = array[i]
        if (!(obj.id in map)) {
            map[obj.id] = obj
            map[obj.id].children = []
        }

        if (typeof map[obj.id].name == 'undefined') {
            map[obj.id].id = obj.id
            map[obj.id].name = obj.name
            map[obj.id].parent = obj.parent
            map[obj.id].value = obj.value
            map[obj.id].label = obj.label
        }

        var parent = obj.parent || '-';
        if (!(parent in map)) {
            map[parent] = {}
            map[parent].children = []
        }

        map[parent].children.push(map[obj.id])
    }
    return map['-']
}

class DemandFormComponent extends Component {

    state = {
        visibleCustomer: false,
        visibleStock: false,
        visibleCatalog: false,

    }
    showDrawer = () => {
        this.setState({
            visibleCustomer: true,
        });
        this.props.deleteResponseService()
        this.props.getCustomerGroupsModal()
        this.props.putLocalStates('')
    };

    showStockDrawer = () => {
        this.setState({
            visibleStock: true,
        });
        this.props.deleteResponseService()
        this.props.getStocksGroupsModal()
        this.props.putLocalStates('')
    };

    onClose = () => {
        this.setState({
            visibleCustomer: false,
        });
        this.props.getCustomers()
    };


    onCloseStock = () => {
        this.setState({
            visibleStock: false,
        });
        this.props.getGroups('stocks')
    };

    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
        this.props.getCustomerGroupsModal()
    };


 
    doSearch = (value) => {
        this.props.getCustomersFast(value)
    }
    getMark = () => {
        lowerCaseMarks = []
        this.props.getMarks()
    }

    onFinish = (values) => {
        var sendObject = {}
        sendObject = values;
        sendObject.positions = poistionArray
        sendObject.moment = values.moment._i
        sendObject.modify = values.modify._i
        sendObject.description = description
        console.log(description)
        console.log(sendObject)

        // this.props.putData('demands', values)
    };

    render() {

        lowerCaseMarks = []
        Object.values(this.props.state.marks.marks).map(m => {
            lowerCaseMarks.push({
                label: m.Name,
                value: m.Id,
                color: m.Color
            })
        })

        lowerCaseMarks.push({
            label: 'Status yarat',
            value: 'createStatus',
        })

        newArrStocks = []
        newArrCustomers = []
        customCascaderStock = []
        customCascaderCustomer = []
        Object.values(this.props.datas).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascaderStock.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })
        const markOptions =
            Object.values(this.props.state.marks.marks).map(item =>
                <Option key={item.Id} value={item.Id}>
                    {item.Name}
                </Option>
            )

        const customerOptions = Object.values(this.props.state.groups.customers).map(customer =>

            <Option key={customer.Id} value={customer.Id}>{customer.Name}</Option>
        )
        newArrStocks = convert(customCascaderStock)
        console.log(this.props.doc)
        return (

            <>
                <Form id='myForm' className='doc_forms' ref={this.formRef}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    name="basic"
                    initialValues={
                        {
                            name: this.props.doc ? this.props.doc.Name : '',
                            stockid: Object.keys(this.props.doc).length > 0 ? this.props.doc.StockId
                                : this.props.state.putdatas.responseStockId ? this.props.state.putdatas.responseStockId.ResponseService
                                    : '',
                            customerid: Object.keys(this.props.doc).length > 0 ? this.props.doc.CustomerId
                                : this.props.state.putdatas.responseCustomerId ? this.props.state.putdatas.responseCustomerId.ResponseService
                                    : '',
                            status: this.props.doc ? this.props.doc.Status : '',
                            modify: this.props.doc ? moment(this.props.doc.Modify) : '',
                            moment: this.props.doc ? moment(this.props.doc.Moment) : '',
                            id: this.props.doc ? this.props.doc.Id : '',
                            mark: this.props.doc ? this.props.doc.Mark : '',
                        }
                    }
                    layout="horizontal"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >


                    <Row className='doc_form_field_wrapper'>
                        <Col xs={24} md={18} xl={8}>
                            <Row>
                                <Col xs={24} md={18} xl={12}>
                                    <Form.Item
                                        label={<Trans word={'Demand Number'} />}
                                        name="name"
                                    >
                                        <Input allowClear />
                                    </Form.Item>
                                </Col>
                                <Col className='doc_status_formitem_wrapper_col' xs={24} md={18} xl={12}>
                                    <Form.Item
                                        label=''
                                        name='mark'
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Status"
                                            notFoundContent={<span>{Null_Content}</span>}
                                            loading={this.props.state.marks.markLoading}
                                        >
                                            {markOptions}
                                            <Option style={{ fontStyle: 'italic' }} value='Status yarat'>
                                            </Option>
                                        </Select>


                                    </Form.Item>
                                </Col>
                            </Row>


                        </Col>
                        <Col xs={24} md={18} xl={10}>

                            <div className='form_item_with_icon'>
                                <Form.Item
                                    label={'Müştəri'}
                                    name="customerid"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Zəhmət olmasa, müştəri seçin',
                                        },
                                    ]}
                                >

                                    <Select
                                        showSearch
                                        placeholder=""
                                        onSearch={this.doSearch}
                                        filterOption={false}
                                        notFoundContent={<span>{Null_Content}</span>}
                                        loading={this.props.state.groups.fastFetching ? <Spin size="small" /> : ''}
                                    >

                                        {customerOptions}
                                    </Select>
                                </Form.Item>
                                <UserAddOutlined onClick={this.showDrawer} className='add_elements' />

                            </div>




                        </Col>
                        <Col xs={24} md={18} xl={4}>
                            <Form.Item label="Keçirilib" name='status' valuePropName="checked">
                                <Checkbox name='status' onChange={this.handleBarcodeSelect}  ></Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={18} xl={8}>
                            <Form.Item
                                label={<Trans word={'Created Moment'} />}
                                name="moment"
                            >
                                <DatePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={18} xl={10}>
                            <div className='form_item_with_icon'>
                                <Form.Item

                                    label={<Trans word={'Stock Groups'} />}
                                    name='stockid'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Zəhmət olmasa, anbar qrupunu seçin',
                                        },
                                    ]}
                                >
                                    <TreeSelect
                                        className='doc_status_formitem_wrapper_col'
                                        allowClear
                                        treeData={newArrStocks.children}
                                    />

                                </Form.Item>
                                <HomeOutlined onClick={this.showStockDrawer} className='add_elements' />

                            </div>
                        </Col>
                        <Col xs={24} md={18} xl={4}></Col>
                        <Col style={{ display: this.props.docid != '' ? 'block' : 'none' }} xs={24} md={18} xl={8}>
                            <Form.Item
                                label="Dəyişmə tarixi"
                                name="modify"

                            >
                                <DatePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={18} xl={10}></Col>
                        <Col xs={24} md={18} xl={4}></Col>
                    </Row>
                    <Form.Item hidden={true}
                        label="id"
                        name="id"
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <CreateCustomerModal visible={this.state.visibleCustomer} childrenDrawer={this.state.childrenDrawer} onClose={this.onClose} showChildrenDrawer={this.showChildrenDrawer} onChildrenDrawerClose={this.onChildrenDrawerClose} />
                <CreateStockModal visible={this.state.visibleStock} onClose={this.onCloseStock} />
              
            </>



        )
    }
}

const mapStateToProps = (state) => ({
    state

})

const mapDispatchToProps = {
    putData,getMarks, deleteResponseService,getProductsModal,getProductsGroupModal, getGroups, getStocksGroupsModal, getCustomers, getCustomersFast, putLocalStates, getCustomerGroupsModal
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderDocHOC(DemandFormComponent, 'fetching'))

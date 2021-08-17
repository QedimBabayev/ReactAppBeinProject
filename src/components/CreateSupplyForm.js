import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import SelectCustomer from './SelectCustomer'
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import putData from '../actions/putAactions/putData-action';
import { fetchData } from '../actions/getData-action';
import DocTable from './DocTable';
import filterObject from '../config/filterObject';
import Trans from '../usetranslation/Trans';
import moment from 'moment';
import './ButtonsWrapper.css'
import { getGroupsFast } from '../actions/getGroups-action';
import { poistionArray } from './DocTable';
import debounce from 'lodash/debounce';
import CustomerSelect from './CustomerSelect';
import WithPromises from './SelectDefaultCustomer';
import CreateCustomerAndCustomerGroup from '../modal/CreateCustomerAndCustomerGroup';

import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    List,
    Typography,
    Divider
} from 'antd';
const { Option, OptGroup } = Select;
var customCascaderStock = [];
var customCascaderCustomer = [];
var newArrStocks = []
var newArrCustomers = []
var pid;


const { Search } = Input;
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


class CreateSupplyForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            docid: this.props.selectedDoc ? this.props.selectedDoc.Id : '',
            positions: this.props.selectedDoc ? this.props.selectedDoc.Positions : [],
            status: false,
            dataList: [''],
            customerLoading: false
        }
        this.debouncedEvent = React.createRef();
    }

    debounceEvent(_fn, timer = 500, options = null) {
        this.debouncedEvent.current = debounce(_fn, timer, options);
        return e => {
            e.persist();
            return this.debouncedEvent.current(e);
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDoc && nextProps.selectedDoc.Id !== this.state.docid) {
            this.setState({
                doc: nextProps.selectedDoc.Id,
                positions: this.props.selectedDoc.Positions
            })
        }
    }

    handleChange = (value) => {
        console.log(value)
    }




    onBlur = () => {
        this.setState({
            dataList: ['']
        })

    }


    onFinish = (values) => {
        var sendObject = {}
        sendObject = values;
        sendObject.positions = poistionArray
        sendObject.moment = values.moment._i
        sendObject.modify = values.modify._i
        // this.props.putData('enters', values)
    };
    handleStatusSelect = (checked, event) => {
        this.setState({
            status: checked
        })
    }
    render() {
        newArrStocks = []
        newArrCustomers = []
        customCascaderStock = []
        customCascaderCustomer = []
        this.props.datas.map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascaderStock.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })


        var dataForList = ['']
        this.state.dataList != '' ?
            this.state.dataList.map(d =>
                dataForList.push(`${d.Name} - ${d.GroupName}`)
            )
            : dataForList = ['']

        newArrStocks = convert(customCascaderStock)
        return (
            <>
                <Form ref={this.formRef}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    name="basic"
                    initialValues={
                        {
                            name: this.props.selectedDoc ? this.props.selectedDoc.Name : '',
                            stockid: this.props.selectedDoc ? this.props.selectedDoc.StockId : '',
                            customerid: this.props.selectedDoc ? this.props.selectedDoc.CustomerId : '',
                            status: this.props.selectedDoc ? this.props.selectedDoc.Status : '',
                            modify: this.props.selectedDoc ? moment(this.props.selectedDoc.Modify) : '',
                            moment: this.props.selectedDoc ? moment(this.props.selectedDoc.Moment) : '',
                            id: this.props.selectedDoc ? this.props.selectedDoc.Id : '',
                        }
                    }
                    layout="horizontal"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label={<Trans word={'editdocname'} />}
                        name="name"
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        label="Modify Moment"
                        name="modify"
                    >
                        <DatePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>

                    <Form.Item
                        label="Created Moment"
                        name="moment"
                    >
                        <DatePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item hidden={true}
                        label="id"
                        name="id"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Stock Groups"
                        name='stockid'
                        rules={[
                            {
                                required: true,
                                message: 'Please, fill the stock group name',
                            },
                        ]}
                    >
                        <TreeSelect
                            allowClear
                            treeData={newArrStocks.children}
                        />
                    </Form.Item>


                    <Form.Item
                        label="Customers"
                        name='customerid'
                    >
                        <WithPromises selectedCustomerName={this.props.selectedDoc.CustomerName} selectedCustomerId={this.props.selectedDoc.CustomerId} />
                        <CreateCustomerAndCustomerGroup />
                    </Form.Item>


                    <Form.Item label="status" name='status' valuePropName="checked">
                        <Switch name='status' onChange={this.handleBarcodeSelect} />
                    </Form.Item>
                    <Form.Item label="Button">
                        <Button htmlType="submit">Button</Button>
                    </Form.Item>
                </Form>
                <DocTable from='supplies' handleProduct={this.props.state.handleProduct.selectedProduct} datasource={this.state.positions} />
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    state,
})
const mapDispatchToProps = {
    putData, fetchData, getGroupsFast
}
export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(CreateSupplyForm, 'datas'))
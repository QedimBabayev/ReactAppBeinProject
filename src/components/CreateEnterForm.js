import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import putData from '../actions/putAactions/putData-action';
import { fetchData } from '../actions/getData-action';
import DocTable from './DocTable';
import Trans from '../usetranslation/Trans';

import moment from 'moment';
import './ButtonsWrapper.css'
import { poistionArray } from './DocTable';

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
} from 'antd';
var customCascader = [];
var newArr = []
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

class CreateEnterForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            docid: this.props.selectedDoc ? this.props.selectedDoc.Id : '',
            positions: this.props.selectedDoc ? this.props.selectedDoc.Positions : [],
            status: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDoc && nextProps.selectedDoc.Id !== this.state.docid) {
            this.setState({
                doc: this.props.selectedDoc.Id,
                positions:  this.props.selectedDoc.Positions
            })
        }
    }

    onFinish = (values) => {
        var sendObject = {}
        sendObject = values;
        sendObject.positions = poistionArray
        sendObject.moment = moment(values.moment._d).format('DD.MM.YYYY HH:mm:ss')
        sendObject.modify =  moment(values.moment._d).format('DD.MM.YYYY HH:mm:ss')
        this.props.putData('enters', sendObject)
    };
    handleStatusSelect = (checked, event) => {
        this.setState({
            status: checked
        })
    }
    render() {
        newArr = []
        customCascader = []
        this.props.datas.map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascader.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })
        newArr = convert(customCascader)
        return (
            <div className='table_holder'>
                <Form id='myForm' ref={this.formRef}
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
                            stockid: this.props.selectedDoc ? this.props.selectedDoc.StockName : '',
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
                            treeData={newArr.children}
                        />
                    </Form.Item>

                    <Form.Item label="status" name='status' valuePropName="checked">
                        <Switch name='status' onChange={this.handleBarcodeSelect} />
                    </Form.Item>

                </Form>
                <DocTable from='enters' handleProduct={this.props.state.handleProduct.selectedProduct} datasource={this.state.positions} />
            </div>
        );
    }
}

const mapStateToProps = (state,props) => ({
    state,
})
const mapDispatchToProps = {
    putData, fetchData,
}
export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(CreateEnterForm, 'datas'))
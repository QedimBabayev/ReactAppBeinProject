import React, { Component } from 'react';
import { connect } from 'react-redux'
import getCard from '../actions/getCard-action'
import putData from '../actions/putAactions/putData-action';
import { updateStatesCreate } from '../actions/updateStates-action';
import '../components/ButtonsWrapper.css'
import Trans from '../usetranslation/Trans';
import { Col, Row, Collapse } from 'antd';
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

const { TextArea } = Input
var customCascader = [];
var newArr = []
var pid;
var suffixed

class CreateCustomerGroupForm extends Component {
    formRef = React.createRef();

    onFinish = (values) => {
        console.log('Success:', values);
        this.props.putData('customergroups', values)
    };


    render() {

        return (
            <div className='table_holder'>

                <Row>
                    <Col xs={24} md={9} xl={24}>

                        <Form className='docModal' ref={this.formRef}
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            name="basic"
                            initialValues={{


                            }}
                            layout="horizontal"
                            onFinish={this.onFinish}

                        >



                            <Row className='main_form_side'>
                                <Col xs={24} md={9} xl={24} className='left_form_wrapper' >


                                    <Form.Item
                                        label="Müştəri adı"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Zəhmət olmasa, müştəri adını qeyd edin..',

                                            },
                                        ]}
                                    >
                                        <Input allowClear />
                                    </Form.Item>


                                    <Form.Item
                                        label={<Trans word={'Description'} />}
                                        name="description"
                                    >
                                        <TextArea rows={3} />
                                    </Form.Item>


                                    <Form.Item label="">
                                        <Button className='customsavebtn' htmlType="submit">Yadda saxla</Button>
                                    </Form.Item>

                                </Col>
                            </Row>
                        </Form>

                    </Col>
                </Row>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    getCard, putData, updateStatesCreate
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerGroupForm)
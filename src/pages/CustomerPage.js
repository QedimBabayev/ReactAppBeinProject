import React, { Component, createRef } from 'react'
import ProductFolder from './ProductFolder'
import cols from '../ColNames/Customers/colNames'
import { Col, Row } from 'antd';
import './Page.css'
import { connect } from 'react-redux'
import ResponsiveTable from '../components/ResponsiveTable';
import {
    Rail,
    Ref,
    Segment,
    Sticky,
} from 'semantic-ui-react'
class GridExampleContainer extends Component {

    contextRef = createRef()

    constructor(props) {
        super(props)
        this.state = {
            cols: cols
        }
    }



    render() {
        return (

            <Row className={'table_holder_section'}>
                <Col xs={24} md={12} xl={4}>

                    <ProductFolder from={'customers'} groups={this.props.groups} />

                </Col>
                <Col xs={24} md={12} xl={20}>
                    <ResponsiveTable cols={cols} redirectTo={'editCustomer'} from={'customers'} editPage={'editCustomer'} foredit={'customers'} />

                </Col>


            </Row>


        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)

import React, { Component,createRef } from 'react'
import { connect } from 'react-redux'
import cols from '../ColNames/Settlements/colNames'
import { Col, Row } from 'antd';
import './Page.css'
import ResponsiveTable from '../components/ResponsiveTable';


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
               
                <Col xs={24} md={24} xl={24}>
                    <ResponsiveTable cols={cols} redirectTo={''} from={'settlements'} editPage={''} foredit={'settlements'} />
                </Col>


            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)

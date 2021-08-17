import React, { Component,createRef } from 'react'
import { connect } from 'react-redux'
import cols from '../ColNames/Enters/colNames'
import { persistConfig } from '../reducers/rootReducer'
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
                    <ResponsiveTable cols={cols} columns={cols.filter(c => c.hidden == false)}  redirectTo={'editEnter'} from={'enters'} editPage={'editEnter'} foredit={'enters'} />
                </Col>


            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)

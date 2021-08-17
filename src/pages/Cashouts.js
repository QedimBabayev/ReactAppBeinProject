import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchData} from '../actions/getData-action'
import GridExampleContainer from './CashoutsPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Cashouts/buttonsNames'
import filterObject from '../config/filterObject'


class Cashout extends Component {


    componentDidMount() {
        filterObject.pg = 0
        filterObject.id = ''
        filterObject.gp = ''
        this.props.fetchData('cashouts')

    }

    render() {
        return (
            <div className='table_holder'>
            <ButtonsWrapper from={'normal'} fetchFast={'cashouts'} buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
            <GridExampleContainer groups={this.props.state.groups.groups} />
        </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData
}
export default connect(mapStateToProps, mapDispatchToProps)(Cashout)

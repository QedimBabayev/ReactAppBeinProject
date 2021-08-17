import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import GridExampleContainer from './EnterPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Enters/buttonsNames'
import filterObject from '../config/filterObject'
import { updateColName } from '../actions/updateColName'



class Enter extends Component {


    componentDidMount() {
        filterObject.pg = 0
        filterObject.id = ''
        filterObject.gp = ''
        this.props.fetchData('enters')
    }

    render() {
        return (
            <div className='table_holder'>

                <ButtonsWrapper from={'normal'}  fetchFast = {'enters'} buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <GridExampleContainer groups={this.props.state.groups.groups} />

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, updateColName
}
export default connect(mapStateToProps, mapDispatchToProps)(Enter)

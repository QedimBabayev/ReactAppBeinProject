import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateDemandForm from '../components/CreateDemandForm'
import { getGroups, getOwners, getDepartments } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'

import { fetchPage, fetchData } from '../actions/getData-action'
import { deleteProduct } from '../actions/updateProduct'
import getMarks from '../actions/getMarks-action'
import { getCustomers } from '../actions/getCustomerGroups-action'
class CreateDemand extends Component {

    componentWillMount() {
        this.props.getGroups('stocks')
        this.props.getMarks()
        this.props.getCustomers()
    }
    componentDidMount() {
        filterObject.id = ''
        this.props.deleteProduct('')
        this.props.getOwners('owners')
        this.props.getDepartments('departments')
        const { match } = this.props
        if (match.params.id != '') {
            filterObject.id = match.params.id
            this.props.fetchPage('demands')
        }
    }




    render() {
        const { match } = this.props
        const returnElementId = (
            match.params.id ?
            this.props.state.datas.fetchingEdit ? <div>Loading...</div> :
                <div>
                    <CreateDemandForm datas={this.props.state.groups.groups}  owners={this.props.state.owdep.owners} departments={this.props.state.owdep.departments}  selectedDoc={this.props.state.datas.pagePositions} />
                </div>
                :
                <div>
                    <CreateDemandForm datas={this.props.state.groups.groups}  owners={this.props.state.owdep.owners} departments={this.props.state.owdep.departments}  />
                </div>

        )

        return (
            returnElementId

        )
    }
}
const mapStateToProps = (state, props) => ({
    state,
})
const mapDispatchToProps = {
    getGroups, fetchPage, deleteProduct, getCustomers, getOwners, getDepartments, fetchData,getMarks
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateDemand)

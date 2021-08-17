import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import { getGroups } from '../actions/getGroups-action'
import GridExampleContainer from './ProductPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Products/buttonsNames'
import { fetchAttributes, fetchRefList } from '../actions/getAttributes-action'
import filterObject from '../config/filterObject'

import '../components/ButtonsWrapper.css'


class Product extends Component {
    state={
        attributes : []
    }
    componentDidMount() {
        filterObject.id = ''
        filterObject.gp = ''
        this.props.getGroups('productfolders')
        this.props.fetchAttributes('attributes', 'product')
        filterObject.pg = 0
    }


    componentWillReceiveProps(nextProps){

        if(nextProps.state.attributes.attributes !=this.props.state.attributes.attributes){
                this.setState({
                    attributes:nextProps.state.attributes.attributes
                })
        }       
    }


    render() {
        return (
            <div className='table_holder'>
                <ButtonsWrapper from={'fast'} fetchFast={'products'} buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <GridExampleContainer attributes={this.state.attributes} groups={this.props.state.groups.groups} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, getGroups, fetchRefList, fetchAttributes
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)

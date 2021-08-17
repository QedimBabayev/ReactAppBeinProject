import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocButtons from '../components/DocButtons'
import buttonsNames from '../ButtonsNames/NotDocs/buttonsNames'
import CreateProductGroupForm from '../components/CreateProductGroupForm'
import { getGroups } from '../actions/getGroups-action'



class CreateProductGroup extends Component {

    componentWillMount() {
        this.props.getGroups('productfolders')
    }


    render() {
   
  
        return (
                        <div>
                             <DocButtons buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                            <CreateProductGroupForm datas={this.props.state.groups.groups} />
                        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state

})
const mapDispatchToProps = {
    getGroups
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductGroup)

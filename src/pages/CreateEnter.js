import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocButtons from '../components/DocButtons'
import buttonsNames from '../ButtonsNames/NotDocs/buttonsNames'
import CreateEnterForm from '../components/CreateEnterForm'
import { getGroups } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import { fetchPage } from '../actions/getData-action'
import { deleteProduct } from '../actions/updateProduct'
class CreateEnter extends Component {


    state = {
        doc: '',
        stocks:[]
    }



    componentWillMount() {
        this.props.getGroups('stocks')
    }
    

    componentDidMount() {
        this.props.deleteProduct('')
        const { match } = this.props
        if (!this.props.product && match.params.id) {
            filterObject.id = match.params.id
            this.props.fetchPage('enters')
        }
    }


    shouldComponentUpdate(nextProps) {
        return (nextProps.state.datas.pagePositions && nextProps.state.datas.pagePositions != this.props.state.datas.pagePositions)
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.state.datas.pagePositions) {
            this.setState({
                doc: nextProps.state.datas.pagePositions[0]
            })
        }
    }
    render() {
        const { match } = this.props
        const returnElementId = (
            this.state.doc != '' ?
                <div>
                    <DocButtons buttonsName={buttonsNames} from='p=enter' activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                    <CreateEnterForm datas={this.props.state.groups.groups} selectedDoc={this.state.doc} />
                </div>
                : <div>Loading..</div>
        )
        const returnElement = (
            <div>
                <DocButtons buttonsName={buttonsNames }  from='p=enter' activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <CreateEnterForm datas={this.props.state.groups.groups} selectedDoc={this.state.doc} />

            </div>

        )

        return (
            match.params.id ? returnElementId : returnElement

        )
    }
}

const mapStateToProps = (state, props) => ({
    state,
})
const mapDispatchToProps = {
    getGroups, fetchPage, deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEnter)

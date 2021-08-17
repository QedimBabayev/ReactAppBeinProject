import React, { Component } from 'react'

const ModalHOC = (WrappedComponent, field) => {
    return class LoaderHOC extends Component {
        render() {
            
            return this.props[field] === true ? <div>Yüklənir...</div> : <WrappedComponent {...this.props} />
        }
    }
}


export default ModalHOC
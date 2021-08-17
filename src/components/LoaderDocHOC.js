import React, { Component } from 'react'

const LoaderDocHOC = (WrappedComponent, field) => {
    return class LoaderDoc extends Component {
        render() {
            
            return this.props[field] === true ? <div>Yüklənir...</div> : <WrappedComponent {...this.props} />
        }
    }
}


export default LoaderDocHOC
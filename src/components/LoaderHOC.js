import React, { Component } from 'react'

const LoaderHOC = (WrappedComponent, field) => {
    return class LoaderHOC extends Component {
        render() {
            
            return this.props[field].length === 0 ? <div>Yüklənir...</div> : <WrappedComponent {...this.props} />
        }
    }
}


export default LoaderHOC
import React from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd';
const key = 'updatable';


export const SuccessAlert = (props) => {

    props.send ? message.loading({ content: 'Yüklənilir...', key }) : message.success({ content: 'Saxlanıldı!', key, duration: 2 })
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlert)


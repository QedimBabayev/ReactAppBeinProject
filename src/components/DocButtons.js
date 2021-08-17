import React, { Component } from 'react'
import { Button, message, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import updateChanged from '../actions/updateChanged-action'
import { updateSelectProductMultiConfirm, updateSendObject, submitForm } from '../actions/updateStates-action';
import Sound from 'react-sound';
import Ok from '../audio/ok.mp3'
import { duration } from 'moment';
import './Doc.css'
const key = 'updatable';


class DocButtons extends React.Component {


    state = {
        redirect: false,
        send: false,
        isPlaying: false,
        visible: false,
        from: this.props.from,
        returnPage: false


    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.state.putdatas.send != this.props.state.putdatas.send) {
            this.setState({
                send: nextProps.state.putdatas.send,
                isPlaying: nextProps.state.putdatas.send
            })
            this.props.updateChanged(this.state.send)


        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleReturnPage = () => {
        this.setState({
            redirect: true
        });
    }
    handleCloseAlert = () => {
        message.destroy();
    }

    componentDidUpdate() {
        if (this.state.send == true) {
            message.destroy();

            if (this.state.returnPage == true) {
                message.success({ content: 'Saxlanıldı', duration: 0.9, onClick: this.handleCloseAlert })
                this.setState({
                    redirect: true
                })
            }
            else {

                message.success({ content: 'Saxlanıldı', duration: 0, onClick: this.handleCloseAlert })
            }

        }
        else {
            message.destroy()
        }
    }
    openMessage = () => {
        // message.loading('Saxlanılır..', 0);
    }


    handleClearChanged = (e) => {
        if (e.target.parentNode.id === 'closeBtn' || e.target.id === 'closeBtn') {
            message.destroy()
            this.setState({
                returnPage: false,
                send:false,
            })
            if (this.props.state.changed.changed) {
                // this.showModal()
            }
            else {
                this.setState({
                    redirect: true
                });
            }
        }
        else if (e.target.parentNode.id === 'saveBtn' || e.target.id === 'saveBtn') {
            // if (this.props.errorFields.length > 0) {
            //     this.openMessage()
            // }
            this.setState({
                returnPage: false
            })
        }
    }

    handleeSaveDocModal = () => {
        this.setState({
            returnPage: true
        })
    }
    onChangeText = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/${this.props.from}`} />;
        }
        return (
            <div className='doc_header_buttons '>
                {
                    Object.values(this.props.buttonsName).map(p =>
                        <Button onClick={this.handleClearChanged} form={p.form} htmlType={p.type} key={p.id} className={p.className} id={p.id}>{p.title}</Button>
                    )
                }
                {/* <Sound
                    url={Ok}
                    playStatus={this.state.isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
                /> */}

                <Modal
                    title='Diqqət'
                    closable={false}
                    className='close_doc_modal_wrapper'
                    visible={this.state.visible}
                    footer={[

                        <Button key="back" onClick={this.handleCancel}>
                            Geri qayıt
                        </Button>,
                        <div className='close_doc_modal_right_side'>
                            <Button form="myForm" key="submit" htmlType="submit" onClick={this.handleeSaveDocModal} >
                                Bəli
                            </Button>
                            <Button
                                key="link"
                                href="#"
                                type="primary"
                                onClick={this.handleReturnPage}
                            >
                                Xeyr
                            </Button>
                        </div>

                    ]}
                >
                    <p>Dəyişikliklər yadda saxlanılsın</p>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    updateChanged, updateSelectProductMultiConfirm, updateSendObject, submitForm
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocButtons))

import React, { Component } from 'react'
import { DownloadOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import updateChanged from '../actions/updateChanged-action'
import TransactionButtons from './TransactionButtons';
import { Button, Icon } from 'semantic-ui-react'
import SearchInput from './SearchInput';

class ButtonSize extends React.Component {

    handleClearChnaged = () => {
        this.props.updateChanged(false, '')
    }
    onChangeText = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    render() {

        const buttons = (
            Object.values(this.props.items).map(p =>
                <Button animated='fade' onClick={this.handleClearChnaged} as={Link} key={p.id} to={p.url} className={p.className} id={p.id}>
                    <Button.Content visible> <Icon disabled name='add' /> {p.title}</Button.Content>
                    <Button.Content hidden>{p.animated}</Button.Content>
                </Button>
            )
        )
        const transactionbuttons = (
            <TransactionButtons />
        )

        const buttonsWrapper = (
            <>
                {
                    this.props.fetchFast === 'transactions' ? transactionbuttons : buttons

                }
                < SearchInput from={this.props.searchFrom} fetchFast={this.props.searchFast} />
            </>

        )

        const modalButtonsWrapper = (
            < SearchInput from={this.props.searchFrom} fetchFast={this.props.searchFast} />

        )
        return (
            <>
                {
                    this.props.searchFrom === 'modal' ? modalButtonsWrapper : buttonsWrapper
                }
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    updateChanged
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonSize))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css'
import Trans from '../usetranslation/Trans';
import { Redirect, Link } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react'
import { fetchData } from '../actions/getData-action';
import filterObject from '../config/filterObject';
import { updateSelectedRows } from '../actions/updateStates-action';
import TableLoader from './TableLoader';
import { Button, Dropdown, Menu, Checkbox } from 'antd';
import {
    SettingOutlined
} from '@ant-design/icons';




var translatedCols = []
var translatedColsWrapper = []
var addedSortFunctionCols = []
var settlementsDatas = []
var menutranslatedCols = []
var menutranslatedColsWrapper = []

const defaultSorted = [{
    dataField: 'Name',
    order: 'desc'
}];
var footerName;
var tableRowEvents;
var selectRow;
class ResponsiveTable extends Component {


    constructor(props) {
        super(props)
    }


    state = {
        activePage: 1,
        pageChange: false,
        selected: [],
        from: this.props.from,
        initialcols: this.props.initialcols ? this.props.initialcols : this.props.cols,
        attributes: this.props.attributes ? this.props.attributes : '',
        redirect: false,
        selectedRowId: '',
        visibleMenuSettings: false,
        columns: this.props.columns,
        redirectto: this.props.editPage,

    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected != this.state.selected) {
            this.props.updateSelectedRows(this.state.selected)
        }
    }

    componentWillReceiveProps(nextState) {
        if (this.props.columns != nextState.columns) {
            this.setState({
                columns: this.props.columns,
                initialcols: this.props.initialcols
            })
        }
    }

    handleSort = (field, order) => {
        filterObject.id = ''
        filterObject.sr = field
        order === 'asc' ? filterObject.dr = 1 : filterObject.dr = 0
        this.props.fetchData(this.state.from)
    }

    handleFooter = (column, colIndex, { text }) => {
        if (column.dataField === 'PaymentIn') {
            footerName = this.props.state.datas.additionalInfo.InSum
        }
        else if (column.dataField === 'PaymentOut') {
            footerName = this.props.state.datas.additionalInfo.OutSum
        }

        else if (column.dataField === 'Amount') {
            footerName = this.props.state.datas.additionalInfo.AllSum
        }
        else if (column.dataField === 'Bank') {
            footerName = this.props.state.datas.additionalInfo.BankSum
        }
        else if (column.dataField === 'Sum') {
            footerName = this.props.state.datas.additionalInfo.AllSum
        }
        else if (column.dataField === 'Profit') {
            footerName = this.props.state.datas.additionalInfo.ProfitSum
        }
        else if (column.dataField === 'UseBonus') {
            footerName = this.props.state.datas.additionalInfo.BonusSum
        }
        else if (column.dataField === 'SumCost') {
            footerName = this.props.state.datas.additionalInfo.AllCost
        }
        else if (column.dataField === 'SumPrice') {
            footerName = this.props.state.datas.additionalInfo.AllAmount
        }
        else if (column.dataField === 'RetSumCost') {
            footerName = this.props.state.datas.additionalInfo.RetAllCost
        }
        else if (column.dataField === 'RetSumPrice') {
            footerName = this.props.state.datas.additionalInfo.RetAllAmount
        }

        else if (column.dataField === 'ProfitPercent') {
            footerName = parseFloat(this.props.state.datas.additionalInfo.AllProfit).toFixed(2) * 100 / parseFloat(this.props.state.datas.additionalInfo.AllCost - this.props.state.datas.additionalInfo.RetAllCost).toFixed(2)
        }
        if (column.footerName === 'ProfitSumReports') {

            footerName = this.props.state.datas.additionalInfo.AllProfit
        }
        return (
            <span>{footerName}</span>
        )
    }
    handlePaginationChange = (e, { activePage, from }) => {
        filterObject.pg = activePage - 1;
        this.setState({
            activePage,
            pageChange: true
        },
            this.props.fetchData(from),
        )
    }
    handleVisibleChange = flag => {
        this.setState({ visibleMenuSettings: flag });
    };

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState({
                selected: [...this.state.selected, row]
            });

        }
        else {
            this.setState({
                selected: this.state.selected.filter(x => x.Id !== row.Id)
            });


        }


    }
    onChange = (e) => {

        var initialCols = this.state.initialcols
        var findelement;
        var findelementindex;
        var replacedElement
        findelement = initialCols.find(c => c.dataField === e.target.id)
        findelementindex = initialCols.findIndex(c => c.dataField === e.target.id)
        findelement.hidden = !e.target.checked
        replacedElement = findelement
        initialCols.splice(findelementindex, 1, { ...findelement, ...replacedElement });
        var filtered = initialCols.filter(c => c.hidden == false)
        this.setState({
            columns: filtered
        })
    }
    render() {
        console.log(this.state.selected)

        translatedCols = []
        translatedColsWrapper = []
        menutranslatedCols = []
        menutranslatedColsWrapper = []
        addedSortFunctionCols = []
        tableRowEvents = {
            onClick: (e, row, rowIndex) => {
                this.setState({
                    redirect: true,
                    selectedRowId: row.Id,
                    redirectname: this.props.redirectTo
                })
            },
        }

        selectRow = {
            mode: 'checkbox',
            onSelect: this.handleOnSelect,

        };
        if (this.state.redirectname != '') {
            if (this.state.redirect) {
                return <Redirect push to={`/${this.state.redirectto}/${this.state.selectedRowId}`} />;
            }
        }
        Object.values(this.state.columns).map(c => {
            c.onSort = this.handleSort

            if (c.showFooter === true) {
                c.footer = c.text
                c.footerName = c.footerName
                c.footerFormatter = this.handleFooter
            }
            else {
                c.footer = ''

            }
        })

        Object.values(this.state.columns).map(c => translatedCols.push({ text: <Trans word={c.text} />, dataField: c.dataField, sort: c.sort, onSort: c.onSort, hidden: c.hidden, footer: c.footer, footerFormatter: c.footerFormatter, footerName: c.footerName ? c.footerName : '' }))
        if (this.props.from === 'products') {
            Object.values(this.props.cols.concat(this.props.attributes)).map(c => menutranslatedCols.push({ text: <Trans word={c.text} />, dataField: c.dataField, sort: c.sort, onSort: c.onSort, hidden: c.hidden }))


        }
        else {
            Object.values(this.props.cols).map(c => menutranslatedCols.push({ text: <Trans word={c.text} />, dataField: c.dataField, sort: c.sort, onSort: c.onSort, hidden: c.hidden }))

        }
        if (this.props.from === 'settlements') {

            Object.values(this.props.state.datas.datas).map(c => {
                if (c.Amount > 0) {
                    c.AmountProfit = c.Amount
                }
                else {
                    c.AmountBorrow = c.Amount
                }
            })
        }

        if (this.props.from === 'transactions') {

            Object.values(this.props.state.datas.datas).map(c => {
                if (c.Type === 'p') {
                    c.CashOrInvoice = <Trans word={'cash'} />
                }
                else if (c.Type === 'i') {
                    c.CashOrInvoice = <Trans word={'invoice'} />
                }
                if (c.Direct === 'i') {
                    c.PaymentIn = c.Amount
                }
                else if (c.Direct === 'o') {
                    c.PaymentOut = c.Amount
                }
            })
        }

        if (this.props.from === 'sales' || this.props.from === 'returns') {
            Object.values(this.props.state.datas.datas).map(c => {
                c.Sum = c.Amount
            })
        }
        if (this.props.from === 'salepoints') {


            Object.values(this.props.state.datas.datas).map(c => {

                for (let a = 0; a < Object.keys(this.props.secDatas).length; a++) {
                    if (this.props.secDatas[a].Id == c.StockId) {
                        c.Stock = this.props.secDatas[a].Name
                    }
                }
            })


        }

        if (this.props.from === 'salereports') {


            Object.values(this.props.state.datas.datas).map(c => {
                if (parseFloat(c.SumCost - c.RetSumCost) === 0) {
                    c.ProfitPercent = '0 %'
                }
                else {
                    c.ProfitPercent = parseFloat(c.Profit).toFixed(2) * 100 / parseFloat(c.SumCost - c.RetSumCost).toFixed(2)
                }
            })


        }


        translatedColsWrapper = translatedCols
        menutranslatedColsWrapper = menutranslatedCols

        const { activePage, from } = this.state;
        const menu = (
            <Menu>
                <Menu.ItemGroup title={<Trans word={'columns'} />} >
                    {
                        Object.values(menutranslatedColsWrapper).map(d => (
                            <Menu.Item key={d.dataField}><Checkbox id={d.dataField} hidden={d.hidden} onChange={this.onChange} defaultChecked={!d.hidden} >{d.text}</Checkbox></Menu.Item>
                        ))
                    }
                </Menu.ItemGroup>
            </Menu>
        );

        return (

            <div className='table-container'>
                <div className='tableButtonsWrapper'>
                    <Dropdown
                        overlay={menu}
                        onVisibleChange={this.handleVisibleChange}
                        visible={this.state.visibleMenuSettings}
                    >
                        <Button className='flex_directon_col_center'> <SettingOutlined /></Button>
                    </Dropdown>
                    {
                        this.props.state.datas.loading ? <TableLoader className='custom_table_loader show' /> : <TableLoader className='custom_table_loader hidden' />
                    }
                </div>

                <BootstrapTable
                    parentClassName={'custom_body'}
                    keyField='BarCode'
                    data={this.props.state.datas.datas}
                    columns={translatedColsWrapper}
                    selectRow={selectRow}
                    striped
                    hover
                    condensed
                    loading={true}
                    rowEvents={tableRowEvents}
                    bordered={false}
                    defaultSorted={defaultSorted}
                    wrapperClasses="table-responsive" />
                <Pagination
                    activePage={activePage}
                    from={from}
                    onClick={this.changePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={Math.ceil(this.props.state.datas.totalDatas / this.props.state.datas.totalLimit)}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, updateSelectedRows
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveTable)

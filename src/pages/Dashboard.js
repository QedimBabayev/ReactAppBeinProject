import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import GridExampleContainer from './DashboardPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Dashboard/buttonsNames'
import { updateColName } from '../actions/updateColName'
import { fetchDashboard } from '../actions/getDashboard'



const style = { background: '#0092ff', padding: '8px 0' };
class Dashboard extends Component {

    constructor(props) {
        super(props)
 

    }
    componentDidMount() {
        this.props.fetchDashboard()
    }


    render() {
   
        return (
            <div className='pageWrapper dashboardPage'>
                <ButtonsWrapper buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <GridExampleContainer cardIndicators={this.props.state.dashboard.dashboardMenu} chartIndicators = {this.props.state.dashboard.dashboardChart} />
                
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    updateColName, fetchDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

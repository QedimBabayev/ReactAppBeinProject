import React, { Component } from 'react'
import { connect } from 'react-redux'
import getNavbar from '../actions/getNavbar-action'
import { Segment } from 'semantic-ui-react'
import SubmenuList from './SubmenuList'
import HeaderList from './HeaderList'
import 'semantic-ui-css/semantic.min.css'
import './header.css'
import getSetting from '../actions/getSettings'
var md5 = require('md5');

class Navbar extends Component {
  componentDidMount() {
    this.props.getNavbar()
    if (this.props.state.settings.getsetting) {
      this.props.getSetting(md5(JSON.stringify(this.props.state.settings.getsetting)))
    }
    else {
      this.props.getSetting('1')

    }

  }


  render() {
    return (
      <div className='position_fixed my_header'>

        <HeaderList menus={this.props.state.navbar.navbar} activeItem={this.props.state.navbar.activeItem} />
        <Segment>
          <SubmenuList submenu={this.props.state.navbar} activeItem={this.props.state.navbar.activeSubItem} />
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = {
  getNavbar, getSetting
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)








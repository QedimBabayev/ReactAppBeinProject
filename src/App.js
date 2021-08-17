import 'antd/dist/antd.css';
import './App.css'
import { Trans, useTranslation } from "react-i18next";
import Product from './pages/Product';
import Customer from './pages/Customer';
import Enter from './pages/Enter';
import Download from './pages/Download';
import Settlement from './pages/Settlements';
import Supply from './pages/Supply';
import Demand from './pages/Demand';
import SalePoint from './pages/SalePoint'
import Loss from './pages/Loss';
import Move from './pages/Move';
import Transaction from './pages/Transaction';
import Sale from './pages/Sales';
import Cashin from './pages/Cashins';
import Cashout from './pages/Cashouts';
import Return from './pages/Returns';
import StockBalance from './pages/StockBalance';
import CreateProduct from './pages/CreateProduct';
import CreateCustomer from './pages/CreateCustomer';
import CreateEnter from './pages/CreateEnter'
import CreateSupply from './pages/CreateSupply'
import CreateDemand from './pages/CreateDemand'
import CreateLoss from './pages/CreateLoss'
import CreateMove from './pages/CreateMove'
import SaleReport from './pages/SaleReport'
import CreateProductGroup from './pages/CreateProductGroup';
import CreateCustomerGroup from './pages/CreateCustomerGroup';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Navbar from './pages/Navbar'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import store from './store/store'
import { updateLanguage } from './actions/getLang-action'
import CreateTransaction from './pages/CreateTransaction';
import Dashboard from './pages/Dashboard';


function App(props) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    props.updateLanguage(language)
    i18n.changeLanguage(language);
  };


  const body = (
    <Switch>
    <Route exact path="/p=dashboard" component={Dashboard} />
    <Route exact path="/p=product" component={Product} />
    <Route exact path="/createProducts/" component={CreateProduct} />
    <Route exact path="/editProduct/:id" component={CreateProduct} />
    <Route exact path="/createGroup" component={CreateProductGroup} />
    <Route exact path="/p=customer" component={Customer} />
    <Route exact path="/createCustomers/" component={CreateCustomer} />
    <Route exact path="/editCustomer/:id" component={CreateCustomer} />
    <Route exact path="/createCustomerGroup" component={CreateCustomerGroup} />

    <Route path="/p=enter" component={Enter} />
    <Route exact path="/createEnter/" component={CreateEnter} />
    <Route exact path="/editEnter/:id" component={CreateEnter} />

    <Route path="/p=loss" component={Loss} />
    <Route exact path="/createLoss/" component={CreateLoss} />
    <Route exact path="/editLoss/:id" component={CreateLoss} />

    <Route path="/p=move" component={Move} />
    <Route exact path="/createMove/" component={CreateMove} />
    <Route exact path="/editMove/:id" component={CreateMove} />

    <Route path="/p=supply" component={Supply} />
    <Route exact path="/createSupply/" component={CreateSupply} />
    <Route exact path="/editSupply/:id" component={CreateSupply} />

    <Route path="/p=demand" component={Demand} />
    <Route exact path="/createDemand/" component={CreateDemand} />
    <Route exact path="/editDemand/:id" component={CreateDemand} />

    <Route path="/p=settlements" component={Settlement} />
    <Route path="/p=salereports" component={SaleReport} />
    <Route path="/p=sales" component={Sale} />
    <Route path="/p=returns" component={Return} />
    <Route path="/p=cashins" component={Cashin} />
    <Route path="/p=cashouts" component={Cashout} />
    <Route path="/p=stockbalance" component={StockBalance} />
    <Route path="/p=transactions" component={Transaction} />
    <Route exact path="/createTransaction/" component={CreateTransaction} />
    <Route exact path="/editTransaction/:id" component={CreateTransaction} />
    <Route path="/p=salepoints" component={SalePoint} />
    <Route path="/p=download" component={Download} />

  </Switch>
  )


  return (
    <Router>
      <div className='mainDiv'>
        <Navbar />


        {
          props.state.settings.setting === true ? body : ''
        }
       

        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("aze")}>aze</button>
        <button onClick={() => changeLanguage("ru")}>rus</button>
      </div>
    </Router>

  );
}

const mapStateToProps = (state) => ({
  state
})
const mapDispatchToProps = {
  updateLanguage
}
export default connect(mapStateToProps, mapDispatchToProps)(App)




import React, { Component } from 'react'
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import NavBar from '../tools/nav.js';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/register.css';
const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;

import FastRegPage1 from './fast/reg1.js';
import FastRegPage2 from './fast/reg2.js';
import FastRegPage3 from './fast/reg3.js';
import ReplaceRegPage1 from './replace/reg1.js';
import ReplaceRegPage2 from './replace/reg2.js';
import TaxiRegPage1 from './taxi/reg1.js';
import TaxiRegPage2 from './taxi/reg2.js';
import TaxiRegPage3 from './taxi/reg3.js';

import {
  ui_registerfillwizard,
  fillrealnameprofile_request
} from '../../actions';

class RegisterFillWizardForm extends Component {

  componentWillMount () {//刚进页面，重置为第一页
    this.props.dispatch(ui_registerfillwizard({curpage:0}));
  }

  nextPage = ()=> {
    this.props.dispatch(ui_registerfillwizard({
      curpage:this.props.curpage+1
    }));
  }

  previousPage = ()=> {
    this.props.dispatch(ui_registerfillwizard({
      curpage:this.props.curpage-1
    }));
  }

  setcurPage =(registertype)=>{
    this.props.dispatch(ui_registerfillwizard({
      registertype,
      curpage:1
    }));
  }

  onSubmit =(values)=>{
    //alert(`注册类型:${registertype},数据:${JSON.stringify(values)}`);
    // idcard:String,//身份证号<---
    // bankname:String,//银行名字<---
    // bankaccount:String,//银行账号<---
    // huji:String,//户籍
    // PhotoandCarmanURL:String,//人车合影
    // PhotoJiandukaURL:String,//监督卡照片
    // PhotoServiceicenseURL:String,//服务资格证
    // CarrunPhotoIdURL:String,//机动车行驶证
    const { registertype } = this.props;
    const {
      avatarURL,
      idcard,
      bankname,
      bankaccount,
      huji,
      PhotoandCarmanURL,
      PhotoJiandukaURL,
      PhotoServiceicenseURL,
      CarrunPhotoIdURL,

      OwnerName,

      City,
      VehicleNo,
      Seats,
      Certificate,
      PhotoldURL,
      CheckState,
      ...Platform_baseInfoDriver} = values;

    let data = {
      idcard,
      bankname,
      bankaccount,
      huji,
      avatarURL,
      PhotoandCarmanURL,
      PhotoJiandukaURL,
      PhotoServiceicenseURL,
      CarrunPhotoIdURL,
      Platform_baseInfoDriver,
      Platform_baseInfoVehicle:{
        OwnerName,
        City,
        VehicleNo,
        Seats,
        Certificate,
        PhotoldURL,
        CheckState
      },
      approvalstatus:'待审批',
      registertype
    };
    this.props.dispatch(fillrealnameprofile_request({data}));
  };

  renderpage0 =()=> {
        return (
    		<div className="registerPage approvalPage register1Page  AppPage">
          <NavBar back={false} title="开始成为司机"  leftnav={[
              {
                type:"action",
                action : ()=>{
                  this.props.history.replace('/');
                },
                text:"首页"
              }
            ]}/>
				      <Cells>
                <Cell access onClick={()=>this.setcurPage('网约车')}>
                    <CellHeader>
                        <img src="newimg/1.png" alt=""/>
                    </CellHeader>
                    <CellBody>
                        <div className="tit">我要成为网约车司机</div>
                        <div className="con">做点兼职赚点钱...</div>
                    </CellBody>
                    <CellFooter />
                </Cell>
		            <Cell access onClick={()=>this.setcurPage('快车')}>
		                <CellHeader>
		                    <img src="newimg/1.png" alt=""/>
		                </CellHeader>
		                <CellBody>
		                    <div className="tit">我要成为快车司机</div>
		                    <div className="con">做点兼职赚点钱...</div>
		                </CellBody>
		                <CellFooter />
		            </Cell>
		            <Cell access onClick={()=>this.setcurPage('出租车')}>
		                <CellHeader>
		                    <img src="newimg/2.png"  alt=""/>
		                </CellHeader>
		                <CellBody>
		                    <div className="tit">我要成为出租车司机</div>
		                    <div className="con">做点兼职赚点钱...</div>
		                </CellBody>
		                <CellFooter />
		            </Cell>

		        </Cells>
    		</div>
    	)
    }

  render() {
    const { registertype,curpage } = this.props;
    if(curpage === 0){
      return this.renderpage0();
    }

    if(registertype === '快车'){
      if(curpage === 1){
        return (<FastRegPage1  previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 2){
        return (<FastRegPage2  previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 3){
        return (<FastRegPage3  previousPage={this.previousPage}  onSubmit={this.onSubmit}/>);
      }
    }
    if(registertype === '出租车'){
      if(curpage === 1){
        return (<TaxiRegPage1 previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 2){
        return (<TaxiRegPage2  previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 3){
        return (<TaxiRegPage3  previousPage={this.previousPage}  onSubmit={this.onSubmit}/>);
      }
    }
    if(registertype === '网约车'){
      if(curpage === 1){
        return (<FastRegPage1  previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 2){
        return (<FastRegPage2  previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 3){
        return (<FastRegPage3  previousPage={this.previousPage}  onSubmit={this.onSubmit}/>);
      }
    }

    return (<div>{registertype}{curpage}</div>);
  }
}

const mapStateToProps = ({registerfillwizard}) => {
    return {...registerfillwizard};
}
RegisterFillWizardForm = connect(mapStateToProps)(RegisterFillWizardForm);
export default RegisterFillWizardForm;

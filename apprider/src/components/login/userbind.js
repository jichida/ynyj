import React, { Component } from 'react';
// import { Input, List, Radio, Button, Icon, Image, Checkbox,Label} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {sendauth_request} from '../../actions/index.js';
import {oauthbinduser} from '../../actions/sagacallback.js';
import Sendauth from '../tools/sendauth.js';


let renderBinduserForm = (fields)=> {
    console.dir(fields);
    let ispasswordvisiable = fields.ispasswordvisiable.input.value;
    if (typeof ispasswordvisiable === 'string') {
        ispasswordvisiable = true;
    }

    let onChangePasswordvisiable = (event)=> {
        let newvalue = !ispasswordvisiable;
        fields.ispasswordvisiable.input.onChange(newvalue);
    }


    let onClickAuth = (callback)=> {
        const name = fields.username.input.value;
        const phone =  !!name && !(name.match(/\D/g)||name.length !== 11||!name.match(/^1/));
        console.log(phone);
        if(phone){
            fields.dispatch(sendauth_request({username: name,reason:'binduser'}));
        }
        callback(phone);
    }



    return (<div className='loginform'>
        <div className="username logininput">
            <input placeholder='输入手机号' {...fields.username.input} type="text"/>
            {fields.username.meta.touched && fields.username.meta.error &&
            <label basic color='red' pointing>{fields.username.meta.error}</label>}

        </div>
        <div className="password logininput">
            <input placeholder='输入验证码'  {...fields.authcode.input} type="text"/>
            {fields.authcode.meta.touched && fields.authcode.meta.error &&
            <label basic color='red' pointing>{fields.authcode.meta.error}</label>}
            <img src="img/rg2.png" className='lefticon'/>

            <Sendauth primary action={onClickAuth} className="yanzhenBtn" />
        </div>
    </div>);
}
renderBinduserForm = connect()(renderBinduserForm);

let BinduserForm = (props)=> {
    let {handleSubmit,onClickBinduser,onClickLogin,onClickReturn} = props;
    return (<Form onSubmit={handleSubmit(onClickBinduser)}>
        <div className="loginPageTop">
            <div className="loginHead">

                <img src="img/4.png" className="loginhead"/>
            </div>
            <Fields names={['username','ispasswordvisiable','authcode']} component={renderBinduserForm}/>

            <div className="loginBotton">
                <button primary>绑定</button>
             </div>
        </div>
    </Form>);
};


const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = '必填项';
    }
    else {
        let phone = values.username;
        phone = phone.replace(/\s/g, '');
        if (phone.match(/\D/g) || phone.length !== 11 || !phone.match(/^1/)) {
            errors.username = '无效手机号';
        }
    }

    if (!values.authcode) {
        errors.authcode = '必填项';
    }
    else {
        let authcode = values.authcode;
        authcode = authcode.replace(/\s/g, '');
        if (authcode.match(/\D/g) || authcode.length !== 4) {
            errors.authcode = '四位数字';
        }
    }

    return errors;
}

BinduserForm = reduxForm({
    form: 'binduser',
    validate,
    initialValues: {
        username: '',
        authcode: '',
        ispasswordvisiable: false,
    }
})(BinduserForm);


export class Page extends React.Component {

    componentWillMount() {
    }

    onClickReturn =()=>{
        this.props.history.goBack();
    }
    onClickBinduser = (values)=> {
        console.dir(values);

        let payload = {
            bindtype:this.props.bindtype,
            openid:this.props.openid,
            username: values.username,
            authcode: values.authcode,
        }
        //alert(JSON.stringify(formdata));
        this.props.dispatch(oauthbinduser(payload)).then((result)=> {
            this.props.history.replace('/');
        }).catch((error)=> {
            console.log("注册失败:" + JSON.stringify(error));
        });
    }

    onClickLogin = ()=> {
        this.props.history.replace('/login');
    }

    render() {
        return (
            <div className="UserLoginPage">
                <BinduserForm onClickBinduser={this.onClickBinduser}
                              onClickLogin={this.onClickLogin}
                              onClickReturn={this.onClickReturn}/>
            </div>
        );
    }

}

const mapStateToProps = ({userlogin}) => {
    return {...userlogin};
}
Page = connect(mapStateToProps)(Page);
export default Page;

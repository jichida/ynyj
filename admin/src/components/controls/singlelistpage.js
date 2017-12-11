/* eslint jsx-a11y/anchor-has-content: off */
import React, { Component,cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import buildSchema from 'redux-form-schema';
import { Card, CardActions, CardTitle, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Avatar from 'material-ui/Avatar';
import {white, cyan500} from 'material-ui/styles/colors';
//import 'material-design-icons/iconfont/material-icons.css';
import FontIcon from 'material-ui/FontIcon';

import { push } from 'react-router-redux';
import { CreateButton,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,BooleanField } from 'admin-on-rest/lib/mui';
//import { CreateButton } from 'admin-on-rest/lib/mui/button';
import _ from 'lodash';

// import CircularProgress from 'material-ui/CircularProgress';
// 参见代码: src/mui/detail/Edit.js
class Page extends Component {

    componentDidMount() {
      this.props.crudGetList(this.props.resource);
    }
    // componentWillReceiveProps (nextProps) {
    //   if(nextProps.ids.length > 0){
    //       let id = nextProps.ids[0];
    //       let basePath = nextProps.location.pathname;
    //       let pathname=`${basePath}/${encodeURIComponent(id)}/show`;
    //       console.log("enter--->" + pathname);
    //       nextProps.redirecturl(pathname);
    //       //nextProps.dispatch(pushAction(pathname));
    //   }
    //
    // }

    render() {
        console.log(this.props)
        if(this.props.ids.length === 0){
          return this.props.Create;
        }
        const id = this.props.ids[0];
        const {
            resource,
            location
          } = this.props;
        const editprops = {
          actions:null,
          resource,
          location:{
            pathname:`${resource}/${id}`,
          },
          match:{
            path:`${resource}/${id}`,
            url:`${resource}/${id}`,
            params:{
              id
            }
          }
        }

        let Edit = this.props.Edit;
        return <Edit {...editprops} />
    }
}


const mapStateToProps = (state,props) => {
  const resourceState = state.admin.resources[props.resource];
  let page = {
    ids:[]
  };
  if(!!resourceState){
    page.ids = _.get(resourceState,'list.ids',[]);
    console.log(`resourceState==>${JSON.stringify(resourceState)}`)
  }

  return {...page};
};

const mapDispatchToProps = (dispatch) => {
  return {
    crudGetList:(resource)=>{
      dispatch({
        type: 'CRUD_GET_LIST',
        payload: {},
        meta: { resource, fetch: 'GET_LIST', cancelPrevious: true },
      });
    },
    redirecturl:(url)=>{
      dispatch(push(url));
    }
  };
}

// export default reduxForm({
//     form: 'signIn',
//     validate: signInSchema.validate,
//     destroyOnUnmount: true,
// })(connect(mapStateToProps, mapDispatchToProps)(SignIn));

Page = connect(mapStateToProps, mapDispatchToProps)(Page);
export default Page;
// export default reduxForm({
//     form: 'signIn',
//     validate: signInSchema.validate,
//     destroyOnUnmount: true,
// })(SignIn);

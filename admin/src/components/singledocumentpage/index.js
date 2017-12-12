/* eslint jsx-a11y/anchor-has-content: off */
import React, { Component,cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {findOneAction} from './action';
import CircularProgress from 'material-ui/CircularProgress';

class Page extends Component {

    componentWillMount() {
      const {dispatch,resource} = this.props;
      findOneAction({resource},dispatch);
    }

    renderCreate =()=>{
      const {isLoading,Create,...rest} = this.props;
      return (<Create actions={null} {...rest} hasShow={false} hasEdit={false} isLoading={isLoading} />);
      // return cloneElement(Create, {
      //   ...rest,
      //   actions:null,
      //   hasShow:false,
      //   hasEdit:false,
      //   isLoading});
    }

    renderEdit =()=>{
        const {record,isLoading,Edit,resource,location,...rest} = this.props;
        const defaultProps = {
          data: record,
          crudGetOne: () => {},
          crudUpdate: () => {},
          hasDelete: false,
          id: record.id,
          isLoading: false,
          location: { pathname: '' },
          params: {},
          resource:resource,
          translate: x => x,
      };
      return (<Edit {...defaultProps} />);
      // return cloneElement(Edit, {
      //   ...defaultProps});
    }

    render() {
        console.log(this.props);
        const {isLoading,isget,record} = this.props;
        if(isLoading){
          //等待图标
          return <CircularProgress size={60} thickness={7} />;
        }
        if(!isget){
          return this.renderCreate();
        }

        return this.renderEdit();
    }
}


const mapStateToProps = ({singledocumentpage}) => {
  return {...singledocumentpage};
};


Page = connect(mapStateToProps)(Page);
export default Page;

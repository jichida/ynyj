import React from 'react'
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import {getabouthtml_request} from '../../actions';
import NavBar from '../tools/nav.js';
import {opendownloadurl} from '../../env/os';

export class Page extends React.Component {
    componentWillMount () {

    }
    onClickBack =()=>{
        this.props.history.goBack();
    }
    download=(v)=>{
        const {downloadurl_android,downloadurl_ios} = this.props;
        let url;
        if(v === 'android'){
          url = downloadurl_android;
        }
        else if(v === 'ios'){
          url = downloadurl_ios;
        }
        console.log(`download url ${url}`);
        opendownloadurl(url);
    }
    render() {
        return (
            <div className="settingPage AppPage">
                <NavBar back={true} title={"司机入驻"} />
                <div className="list gotodriver">
                    <img src="newimg/r1.png" />
                    <div>
                        <img src="newimg/r2.png" onClick={this.download.bind(this, "android")} />
                        <img src="newimg/r3.png" onClick={this.download.bind(this, "ios")} />
                    </div>
                </div>
            </div>
        );
    }
}

const data =  ({app:{downloadurl_android,downloadurl_ios}}) =>{
    return {downloadurl_android,downloadurl_ios};
};
export default connect(data)(Page);

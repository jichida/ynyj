import React from 'react'
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import {getabouthtml_request} from '../../actions';
import NavBar from '../tools/nav.js';

export class Page extends React.Component {
    componentWillMount () {
        
    }
    onClickBack =()=>{
        this.props.history.goBack();
    }
    download=(v)=>{
        console.log(`download ${v}`);
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
export default connect()(Page);


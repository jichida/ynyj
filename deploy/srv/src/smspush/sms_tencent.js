// npm install qcloudsms_js
//https://github.com/qcloudsms/qcloudsms_js
const QcloudSms = require("qcloudsms_js");
const config = require('../config.js');
const _ = require('lodash');
const appid_rider = 1400054365;
const appkey_rider = "37f65130b73c2fc82a92b8ebdb2665e2";

const appid_driver = 1400056261;
const appkey_driver = "cd7b2c0f7d67d040cf4583e7d47683f7";
// const templId = 7839;

let sendsms= (ctxtype,tel,templId,params,callbackfn)=> {
  let ssender;
  let sign = '';
  if(ctxtype === 'rider'){
    const qcloudsms_rider = QcloudSms(appid_rider, appkey_rider);
    ssender = qcloudsms_rider.SmsSingleSender();
    // sign = '32103';
  }
  else{
    const qcloudsms_driver = QcloudSms(appid_driver, appkey_driver);
    ssender = qcloudsms_driver.SmsSingleSender();
    // sign = '32107';
  }
  console.log(`sendsms appid==>${ssender.appid},sign==>${sign},templId===>${templId},params==>${JSON.stringify(params)}`);

  ssender.sendWithParam(86,tel,
    templId,
    params,sign, "", "", (err, res, resData)=>{
      if (!!err){
        callbackfn(err,null);
      }
      else{
        console.log("response data: ", resData);
        callbackfn(null,resData);
      }
    });
}

const sendsmstouser = (tel,reason,authcode,callbackfn)=>{
    const textobj = {
        'rider_binduser':67615,//`您正在绑定用户，验证码是：${authcode}，请勿泄漏。`,
        'rider_login':67412,//`您正在注册(登录)旺旺约车乘客端账号，验证码是：${authcode}，请勿泄漏。`,//【中南出行】
        'driver_findpwd':67425,//`您正在找回旺旺约车司机密码，验证码是：${authcode}，请勿泄漏。`,
        'driver_withdraw':67426,//`您正在申请提现，验证码是：${authcode}，请勿泄漏。`,
        'driver_register':67427,//`您正在注册旺旺约车司机端账号，验证码是：${authcode}，请勿告诉他人！`,
        'driver_login':67428,//`您正在登录旺旺约车司机端，验证码是：${authcode}，请勿泄漏。`,
        'driver_isapprovaledtrue':67429,//`您已经审核为旺旺约车司机,请登录后查看。`,
        'driver_isapprovaledfalse':78158,///`您申旺旺约车司机未通过,请登录后查看。`,
      }
    if(!!textobj[reason]){
      if(config.issmsdebug){
        console.log(`sendsmstouser authcode==>${authcode}`);

        callbackfn(null,{result:true,msg:textobj[reason]});
        return;
      }
      let params = [];
      if(reason !== 'driver_isapprovaledtrue' && reason !== 'driver_isapprovaledfalse'){
        params = [authcode]
      }
      sendsms(_.startsWith(reason,'rider_')?'rider':'driver',
        tel,textobj[reason],params,(err,result)=>{
        if(!err){
          callbackfn(err,{result,msg:'验证码发送成功'});
        }
        else{
          callbackfn(error,null);
        }
      });
    }
    else{
      let error = new Error('请发送验证短信原因');
      callbackfn(error,null);
    }

}

exports.sendsmstouser = sendsmstouser;

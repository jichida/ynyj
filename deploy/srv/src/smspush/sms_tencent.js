// npm install qcloudsms_js
//https://github.com/qcloudsms/qcloudsms_js
const QcloudSms = require("qcloudsms_js");
const config = require('../config.js');

const appid = 1400054365;
const appkey = "37f65130b73c2fc82a92b8ebdb2665e2";
// const templId = 7839;
const qcloudsms = QcloudSms(appid, appkey);

let sendsms= (tel,smstext,callbackfn)=> {
  const ssender = qcloudsms.SmsSingleSender();
  ssender.send(0, 86, tel,
    smstext, "", "", (err, res, resData)=>{
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
        'rider_login':`您正在注册(登录)旺旺约车乘客端账号，验证码是：${authcode}，请勿泄漏。`,//【中南出行】
        'driver_findpwd':`您正在找回旺旺约车司机密码，验证码是：${authcode}，请勿泄漏。`,
        'driver_withdraw':`您正在申请提现，验证码是：${authcode}，请勿泄漏。`,
        'driver_register':`您正在注册旺旺约车司机端账号，验证码是：${authcode}，请勿告诉他人！`,
        'driver_login':`您正在登录旺旺约车司机端，验证码是：${authcode}，请勿泄漏。`,
        'driver_isapprovaledtrue':`您已经审核为旺旺约车司机,请登录后查看。`,
        'driver_isapprovaledfalse':`您申旺旺约车司机未通过,请登录后查看。`,
      }
    if(!!textobj[reason]){
      if(config.issmsdebug){
        callbackfn(null,{result:true,msg:textobj[reason]});
        return;
      }
      sendsms(tel,textobj[reason],(err,result)=>{
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

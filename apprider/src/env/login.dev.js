export const haveWechatApp=(fncallback)=>{
  fncallback({code: '0',message:'仅测试'});
}

export const loginQQ = (fncallback)=>{
   fncallback({
       openId:'101372126',
       code:'0'
   });
}


export const loginWx=(fncallback)=>{
    fncallback({
       openid:'101372126',
       code:'0'
   });
}

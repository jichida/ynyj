let islocalhost = true;
let serverurl = islocalhost?'http://localhost:3006':'http://ynyj.com28.cn';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};

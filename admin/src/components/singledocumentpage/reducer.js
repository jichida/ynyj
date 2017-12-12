import {
    FINDONE,
    FINDONE_LOADING,

    FINDONE_FAILURE,
    FINDONE_SUCCESS,

} from './action';

export default (previousState = {
  isLoading:true,
  isget:false,
  record:{}
}, { type, payload }) => {
    if (type === FINDONE_LOADING) {
        return {...previousState,isLoading:true,
        isget:false,
        record:{}};
    }
    else if (type === FINDONE_FAILURE) {
        return {...previousState,isLoading:false,
        isget:false,
        record:{}};
    }
    else if(type === FINDONE_SUCCESS) {
          return {...previousState,isLoading:false,
          isget:true,
          record:payload};
    }
    return previousState;
}

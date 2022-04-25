import { combineReducers } from "redux";

const RequestStatusReducer = (status = false, action) => {
  if (action.type === "UPDATE_REQUEST_STATUS") {
    return action.payload;
  }
  return status;
};

const ActiveRestReducer = (id = 1, action) => {
  if (action.type === "UPDATE_ACTIVE_REST") {
    return action.payload;
  }
  return id;
};

const DataReducer = (data = null, action) => {
  if (action.type === "UPDATE_DATA") {
    return action.payload;
  }
  return data;
};

const ModalStatusReducer = (status = 0, action) => {
  if (action.type === "UPDATE_MODAL_STATUS") {
    return action.payload;
  }
  return status;
};

const UserDataReducer = (key = "", action) => {
  if (action.type === "UPDATE_USER_DATA") {
    return action.payload;
  }
  return key;
};

const UserDataViewReducer = (view = {}, action) => {
  if (action.type === "UPDATE_USER_DATA_VIEW") {
    return action.payload;
  }
  return view;
};

const BasketListReducer = (list = [], action) => {
  if (action.type === "UPDATE_BASKET_LIST") {
    return action.payload;
  }
  return list;
};

const ActiveDishReducer = (dish = null, action) => {
  if (action.type === "UPDATE_ACTIVE_DISH") {
    return action.payload;
  }
  return dish;
};

const ActiveDeliveryAddressReducer = (address = "", action) => {
  if (action.type === "UPDATE_ACTIVE_DELIVERY_ADDRESS") {
    return action.payload;
  }
  return address;
};

const ActiveRestAddressReducer = (address = "", action) => {
  if (action.type === "UPDATE_ACTIVE_REST_ADDRESS") {
    return action.payload;
  }
  return address;
};

const DeliveryStatusReducer = (status = 0, action) => {
  if (action.type === "UPDATE_DELIVERY_STATUS") {
    return action.payload;
  }
  return status;
};

const LogoStatusReducer = (status = 0, action) => {
  if (action.type === "UPDATE_LOGO_STATUS") {
    return action.payload;
  }
  return status;
};

const AuthStatusReducer = (status = false, action) => {
  if (action.type === "UPDATE_AUTH_STATUS") {
    return action.payload;
  }
  return status;
};

const AuthTimerReducer = (seconds = 30, action) => {
  if (action.type === "UPDATE_AUTH_TIMER") {
    return action.payload;
  }
  return seconds;
};

const TempRestIdReducer = (id = 0, action) => {
  if (action.type === "UPDATE_TEMP_REST_ID") {
    return action.payload;
  }
  return id;
};

const TempDeliveryStatusReducer = (status = 0, action) => {
  if (action.type === "UPDATE_TEMP_DELIVERY_STATUS") {
    return action.payload;
  }
  return status;
};

const rootReducer = combineReducers({
  data: DataReducer,
  activeRest: ActiveRestReducer,
  requestStatus: RequestStatusReducer,
  modalStatus: ModalStatusReducer,
  userData: UserDataReducer,
  userDataView: UserDataViewReducer,
  basketList: BasketListReducer,
  deliveryStatus: DeliveryStatusReducer,
  activeDish: ActiveDishReducer,
  activeRestAddress: ActiveRestAddressReducer,
  activeDeliveryAddress: ActiveDeliveryAddressReducer,
  logoStatus: LogoStatusReducer,
  timerStatus: AuthStatusReducer,
  timer: AuthTimerReducer,
  tempRestId: TempRestIdReducer,
  tempDeliveryStatus: TempDeliveryStatusReducer,
});

export default rootReducer;

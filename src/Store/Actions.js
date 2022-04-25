import axios from "axios";

export const updateData = (rest) => async (dispatch) => {
  updateRequestStatus(true);
  await axios
    .post("../api/0.1.0/getMenu", { RestId: rest })
    .then((response) => {
      const data = response.data;
      updateRequestStatus(false);
      if (data.RestStatus) {
        dispatch({
          type: "UPDATE_DATA",
          payload: {
            restId: data.RestId,
            restStatus: data.RestStatus,
            restList: data.RestList,
            categories: data.Categories,
            menu: data.Menu,
          },
        });
      } else {
        dispatch({
          type: "UPDATE_DATA",
          payload: {
            restId: data.RestId,
            restStatus: data.RestStatus,
            restList: data.RestList,
            categories: [],
            menu: [],
          },
        });
      }
    });
};

export const updateRequestStatus = (status) => {
  return {
    type: "UPDATE_REQUEST_STATUS",
    payload: status,
  };
};

export const updateUserData = () => async (dispatch) => {
  await axios.get("../api/0.1.0/getUserData").then((response) => {
    const data = response.data;
    dispatch({
      type: "UPDATE_USER_DATA",
      payload: data,
    });
  });
};

export const updateUserDataView = (view) => {
  return {
    type: "UPDATE_USER_DATA_VIEW",
    payload: view,
  };
};

export const getBasketList = () => async (dispatch) => {
  await axios.get("../api/0.1.0/getBasket").then((response) => {
    const data = response.data;
    dispatch({
      type: "UPDATE_BASKET_LIST",
      payload: data,
    });
  });
};

export const updateBasketList = (data) => async (dispatch) => {
  const response = await axios.post("../api/0.1.0/addToBasket", data);
  const list = response.data;
  dispatch({
    type: "UPDATE_BASKET_LIST",
    payload: list,
  });
};

export const updateModalStatus = (status) => {
  return {
    type: "UPDATE_MODAL_STATUS",
    payload: status,
  };
};

export const updateActiveDish = (dish) => {
  return {
    type: "UPDATE_ACTIVE_DISH",
    payload: dish,
  };
};

export const updateActiveDeliveryAddress = (address) => {
  return {
    type: "UPDATE_ACTIVE_DELIVERY_ADDRESS",
    payload: address,
  };
};

export const updateActiveRestAddress = (address) => {
  return {
    type: "UPDATE_ACTIVE_REST_ADDRESS",
    payload: address,
  };
};

export const updateActiveRest = (id) => {
  return {
    type: "UPDATE_ACTIVE_REST",
    payload: id,
  };
};

export const updateDeliveryStatus = (status) => {
  return {
    type: "UPDATE_DELIVERY_STATUS",
    payload: status,
  };
};

export const updateLogoStatus = (status) => {
  return {
    type: "UPDATE_LOGO_STATUS",
    payload: status,
  };
};

export const updateAuthStatus = (status) => {
  return {
    type: "UPDATE_AUTH_STATUS",
    payload: status,
  };
};

export const updateAuthTimer = (seconds) => {
  return {
    type: "UPDATE_AUTH_TIMER",
    payload: seconds,
  };
};

export const editBasketList = (rest, index, method) => async (dispatch) => {
  const response = await axios.post("../api/0.1.0/editBasket", {
    RestId: rest,
    Index: index,
    Method: method,
  });
  const list = response.data;
  dispatch({
    type: "UPDATE_BASKET_LIST",
    payload: list,
  });
};

export const updateTempRestId = (id) => {
  return {
    type: "UPDATE_TEMP_REST_ID",
    payload: id,
  };
};

export const updateTempDeliveryStatus = (status) => {
  return {
    type: "UPDATE_TEMP_DELIVERY_STATUS",
    payload: status,
  };
};

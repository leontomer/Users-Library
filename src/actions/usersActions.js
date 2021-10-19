export const saveUsers = (users) => (dispatch) => {
  dispatch({
    type: "SAVE_USERS",
    payload: users,
  });
};

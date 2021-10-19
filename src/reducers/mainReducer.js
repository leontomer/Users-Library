const initialState = {
  users: [],
  changed: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SAVE_USERS":
      return {
        users: payload,
        changed: !state.changed,
      };

    default:
      return state;
  }
}

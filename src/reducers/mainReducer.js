const initialState = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  changed: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SAVE_USERS":
      console.log(payload);
      localStorage.setItem("users", JSON.stringify(payload));
      return {
        users: payload,
        changed: !state.changed,
      };

    default:
      return state;
  }
}

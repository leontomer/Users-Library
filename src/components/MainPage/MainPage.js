import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./MainPage.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { saveUsers } from "../../actions/usersActions";
import useForkRef from "@mui/utils/useForkRef";
export default function MainPage() {
  const [userPressedEmail, setUserPressedEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [addUserModal, setAddUserModal] = useState("");
  const [newStreetName, setNewStreetName] = useState("");
  const [newStreetNumber, setNewStreetNumber] = useState("");
  const dispatch = useDispatch();
  let GlobalState = useSelector((state) => state.mainReducer);
  const [users, setUsers] = useState(GlobalState.users);
  const [editModal, setEditModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("Mr");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setUsers(GlobalState.users);
  }, [GlobalState]);

  useEffect(() => {
    if (GlobalState.users.length == 0) {
      (async function getData() {
        const res = await axios.get("https://randomuser.me/api/?results=10");
        setUsers(res.data.results);
        dispatch(saveUsers(res.data.results));
      })();
    }
  }, []);

  const handleClickedDelete = (userMail) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]["email"] === userMail) {
        users.splice(i, 1);
        dispatch(saveUsers(users));
      }
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClickedEdit = (userMail) => {
    setUserPressedEmail(userMail);
    setEditModal(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (
      newFirstName === "" ||
      newLastName === "" ||
      newCountry === "" ||
      newCity === "" ||
      newEmail === "" ||
      newStreetName === "" ||
      newStreetNumber === ""
    ) {
      setMsg("all fields must be filled!");
      setOpenSnackBar(true);
      return;
    }

    if ((newFirstName + newLastName).length < 3) {
      setMsg("full name must have at least 3 characters!");
      setOpenSnackBar(true);
      return;
    }
    for (let user of users) {
      if (user["email"] === newEmail && userPressedEmail !== newEmail) {
        setMsg("Email allready exist!");
        setOpenSnackBar(true);
        return;
      }
    }
    if (userPressedEmail !== "") {
      for (let user of users) {
        if (user["email"] === userPressedEmail) {
          user["name"]["first"] = newFirstName;

          user["name"]["last"] = newLastName;

          user["location"]["country"] = newCountry;

          user["location"]["city"] = newCity;

          user["email"] = newEmail;

          user["location"]["street"]["name"] = newStreetName;

          user["location"]["street"]["number"] = newStreetNumber;

          dispatch(saveUsers(users));
          handleCloseModal();
        }
      }
    } else {
      let newUser = {
        email: newEmail,
        name: { title: title, first: newFirstName, last: newLastName },
        location: {
          country: newCountry,
          city: newCity,
          street: { name: newStreetName, number: newStreetNumber },
        },
        id: uuidv4(),
        picture: {
          medium:
            "https://www.resizepixel.com/Image/6e9d4dda84/Preview/CHOXLj9b_400x400.jpg?v=9b9d92b9-ce63-4a45-8854-e9799bcb1dea",
        },
      };

      users.push(newUser);
      dispatch(saveUsers(users));
      handleCloseModal();
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleCloseModal = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setEditModal(false);
  };

  return (
    <div>
      <Modal onClose={handleCloseModal} open={editModal}>
        <Box sx={style}>
          <div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal">
                <Typography variant="body2">First Name: </Typography>{" "}
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  onChange={(Name) => setNewFirstName(Name.target.value)}
                />
              </div>
              <div className="modal">
                <Typography variant="body2">Last Name: </Typography>{" "}
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  onChange={(Name) => setNewLastName(Name.target.value)}
                />
              </div>
              <div className="modal">
                <Typography variant="body2">Email: </Typography>{" "}
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  onChange={(email) => setNewEmail(email.target.value)}
                />
              </div>
              <div className="modal">
                <Typography variant="body2">Country: </Typography>{" "}
                <TextField
                  id="outlined-basic"
                  label="Country"
                  variant="outlined"
                  onChange={(country) => setNewCountry(country.target.value)}
                />
              </div>
              <div className="modal">
                <Typography variant="body2">City: </Typography>{" "}
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  onChange={(city) => setNewCity(city.target.value)}
                />
              </div>
              <div className="modal">
                <Typography variant="body2">Street Name: </Typography>{" "}
                <TextField
                  id="outlined-basic"
                  label="street Name"
                  variant="outlined"
                  onChange={(streetName) =>
                    setNewStreetName(streetName.target.value)
                  }
                />
              </div>
              <div className="modal">
                <Typography variant="body2">Street Number: </Typography>{" "}
                <TextField
                  id="outlined-basic"
                  label="street Number"
                  variant="outlined"
                  onChange={(streetNumber) =>
                    setNewStreetNumber(streetNumber.target.value)
                  }
                />
              </div>
              {userPressedEmail === "" && (
                <div className="modal">
                  <Typography variant="body2">Gender: </Typography>{" "}
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={title}
                        label="Gender"
                        onChange={(e) => setTitle(e.target.value)}
                      >
                        <MenuItem value={"Mr"}>Male</MenuItem>
                        <MenuItem value={"Mrs"}>Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>{" "}
                </div>
              )}
              <div className="buttonsModal">
                <div>
                  <Button variant="contained" size="small" type="submit">
                    Save
                  </Button>
                </div>
                <div className="button2">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                </div>{" "}
              </div>{" "}
            </form>
          </div>{" "}
        </Box>
      </Modal>
      {users.map((user, index) => {
        return (
          <Card sx={{ minWidth: 275 }} key={index}>
            <CardContent>
              <div className="mainDiv">
                <div>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {user["name"]["title"]} {user["name"]["first"]}{" "}
                    {user["name"]["last"]}
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>

                  {user["id"]["value"] ? (
                    <Typography variant="body2">
                      id: {user["id"]["value"]}{" "}
                    </Typography>
                  ) : (
                    <Typography variant="body2"> id: some-random-id</Typography>
                  )}
                  <Typography variant="body2">
                    email: {user["email"]}{" "}
                  </Typography>
                  <Typography variant="body2">
                    location: {user["location"]["country"]},{" "}
                    {user["location"]["city"]},{" "}
                    {user["location"]["street"]["name"]}{" "}
                    {user["location"]["street"]["number"]}{" "}
                  </Typography>
                </div>
                <div>
                  {" "}
                  <img src={user["picture"]["medium"]}></img>
                </div>
              </div>{" "}
            </CardContent>
            <CardActions>
              <div className="buttons">
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleClickedEdit(user["email"])}
                  >
                    edit
                  </Button>
                </div>

                <div className="button2">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleClickedDelete(user["email"])}
                  >
                    delete
                  </Button>
                </div>
              </div>
            </CardActions>
          </Card>
        );
      })}
      <div className="adduserbutton">
        <Button
          variant="contained"
          size="small"
          onClick={() => handleClickedEdit("")}
        >
          Add user
        </Button>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

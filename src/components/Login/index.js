import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const paperStyle = {
  height: "70vh",
  width: "280px",
  padding: "20px",
  margin: "20px auto",
};
const avatarStyle = {
  backgroundColor: "#0080ff",
};
const btnSubmit = {
  margin: "10px 0",
  backgroundColor: "#0080ff",
};
function Login() {
  async function handleLogin() {
    const auth = getAuth();
    const fbProvider = new GoogleAuthProvider();
    try {
      const dataUser = await signInWithPopup(auth, fbProvider);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const dataUser = await signInWithPopup(auth, fbProvider);
    //   const { displayName, email, photoURL, uid } = dataUser.user;
    //   const newUser = {
    //     displayName,
    //     email,
    //     photoURL,
    //     userId: uid,
    //   };
    //   const q = query(
    //     collection(db, "users"),
    //     where("userId", "==", newUser.userId)
    //   );
    //   const querySnapshot = await getDocs(q);
    //   if (querySnapshot.docs.length === 0) {
    //     const newUserFef = doc(collection(db, "users"));
    //     await setDoc(newUserFef, {
    //       ...newUser,
    //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //     });
    //   } else {
    //     console.log("user da ton tai");
    //   }
    // } catch (error) {
    //   console.log("error", error);
    // }
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon style={{ fontSize: "25px" }} />
          </Avatar>
          <h1>Log in</h1>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
        />
        <Button variant="contained" color="primary" fullWidth style={btnSubmit}>
          Sign In
        </Button>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth onClick={handleLogin}>
              Email
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="outlined" fullWidth>
              FaceBook
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
export default Login;

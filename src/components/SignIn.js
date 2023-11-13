import { useEffect, useState } from "react";
import { UserAuth } from "../config/AuthContext"
import Axios from "axios";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { createUser, signInUser, signOutUser, user } = UserAuth();

    useEffect(() => {
        console.log(`User changed to ${JSON.stringify(user)}`);
    }, [user]);

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const getUser = async () => {
        const jwt = user.accessToken;
        const config = {
            headers: {
              Authorization: "Bearer " + jwt,
              "Content-Type": "application/json",
            },
          };
        const userData = await Axios.get('http://localhost:3001/getUser', config);
        console.log(userData.data);
    }

    return (
        <div className="App">
            <form>
            <input type="email" onChange={handleChangeEmail} value={email} required/>
            <input type="password" onChange={handleChangePassword} value={password} minLength="6" required/>
            </form>

            <button onClick={() => { signInUser(email, password) }}>Sign In</button>
            <button onClick={() => { createUser(email, password) }}>New User</button>
            <button onClick={() => { signOutUser() }}>Sign Out</button>
            <button onClick={getUser}>Get User</button>
        </div>
    )
}
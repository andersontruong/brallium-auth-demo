import { useState } from "react"

export default function Homepage() {
    const { user } = UserAuth();
    const [email, setEmail] = useState(undefined);

    useEffect(async () => {
        const jwt = user.accessToken;
        const config = {
            headers: {
                Authorization: "Bearer " + jwt,
                "Content-Type": "application/json",
            },
        };
        const response = await Axios.get('http://localhost:3001/getEmail', config);
        setEmail(response);
    }, [user]);

    return (
        <div>

        </div>
    )
}
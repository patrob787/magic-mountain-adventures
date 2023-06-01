import { useState, useEffect, createContext } from "react"
import Login from "./Login";

export const MyContext = createContext()

function MyProvider({ children }) {
    
    // attractions fetch

    const [attractions, setAttractions] = useState([])

    useEffect(() => {
        fetch("/attractions")
        .then(r => r.json())
        .then(data => setAttractions(data))
    }, [])
    
    
    // auto login authetification
    const [user, setUser] = useState(null)

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
        if (r.ok) {
            r.json().then((user) => setUser(user));
        }
        });
    }, []);

    if (!user) return <Login onLogin= {setUser}/>;

    return (
        <MyContext.Provider
            value={({user: user, setUser: setUser, attractions: attractions})}
        >
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider
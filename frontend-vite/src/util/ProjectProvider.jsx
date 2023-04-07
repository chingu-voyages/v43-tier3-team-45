import React, { createContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

function ProjectProvider({ children }) {

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`/me`)
        .then((r) => r.json())
        .then((user) => setUser(user));
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
        { children }
        </UserContext.Provider>
    )
}

export { Context, ProjectProvider }




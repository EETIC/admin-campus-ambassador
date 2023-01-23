import { createContext, useContext, useState, useEffect } from "react";


const caContext = createContext();

export const ContextProvider = ({ children }) => {
    const [ca, setCA] = useState({});

    const caCollectionRef = collection(db, 'ca')

    useEffect(() => {
        const getCA = async () => {
            const data = await getDocs(caCollectionRef)
                .catch((err) => {
                    setError(err.message)
                    setLoading(false)
                })
            console.log(data)
            setDocs(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }
        getCA()
    }, [])

    return (
        <caContext.Provider value={{}}>
            {children}
        </caContext.Provider>
    );
};

export const useCAContext = () => useContext(caContext);

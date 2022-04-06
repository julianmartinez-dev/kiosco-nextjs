import { useState, useEffect, createContext } from "react";
import axios from "axios";

const KioscoContext = createContext();

const KioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias');
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias();
    },[])


    return(
        <KioscoContext.Provider
            value={{
                categorias
            }}
        >
            {children}
        </KioscoContext.Provider>
    )
}

export {
    KioscoProvider
}

export default KioscoContext;
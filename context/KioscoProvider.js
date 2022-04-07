import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast, Toast } from 'react-toastify';
import { useRouter } from 'next/router';

const KioscoContext = createContext();

const KioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [productoSeleccionado, setProductoSeleccionado] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState('');

  const router = useRouter()

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias');
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push('/')
  };

  const handleProductoSeleccionado = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleEditarCantidades = id =>{
    const pedidoActualiar = pedido.filter( producto => producto.id === id);
    console.log(pedidoActualiar);
    setProductoSeleccionado(pedidoActualiar[0]);
    setModal(!modal);
  }

  const handleEliminarProducto = id =>{
    const pedidoActualizado = pedido.filter( producto => producto.id !== id)
    setPedido(pedidoActualizado);
  }


  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((p) => p.id === producto.id)) {
      //Si el producto ya existe actualizamos la cantidad
      const pedidoActualizado = pedido.map((p) =>
        p.id === producto.id ? producto : p
      );
      setPedido(pedidoActualizado);
      toast.success(`${producto.nombre} guardado correctamente`);
    } else {
      setPedido([...pedido, producto]);
      toast.success(`${producto.nombre} agregado al pedido`);
    }

    setModal(false);
  };
  return (
    <KioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        productoSeleccionado,
        handleProductoSeleccionado,
        modal,
        handleChangeModal,
        pedido,
        handleAgregarPedido,
        handleEditarCantidades,
        handleEliminarProducto,
        setNombre,
        nombre
      }}
    >
      {children}
    </KioscoContext.Provider>
  );
};

export { KioscoProvider };

export default KioscoContext;

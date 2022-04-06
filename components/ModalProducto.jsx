import { useState, useEffect } from 'react';
import Image from 'next/image';
import useKiosco from '../hooks/useKiosco';
import { formatearPrecio } from '../helpers';

const ModalProducto = () => {
    const { productoSeleccionado, handleChangeModal, handleAgregarPedido, pedido } =
    useKiosco();

    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);

    useEffect(() => {
    if(pedido.some(pedidoState => pedidoState.id === productoSeleccionado.id)){
        setEdicion(true)
        const productoEdicion = pedido.find(pedidoState => pedidoState.id === productoSeleccionado.id);
        setCantidad(productoEdicion.cantidad);
    }
    },[productoSeleccionado, pedido]);
  

  return (
    <div className="md:flex gap-10">
      <div className="w-1/3">
        <Image
          width={300}
          height={400}
          alt={`imagen producto ${productoSeleccionado.nombre}`}
          src={`/assets/img/${productoSeleccionado.imagen}.jpg`}
        />
      </div>
      <div className="w-2/3">
        <div className="flex justify-end">
          {' '}
          {/*Icono para cerrar modal*/}
          <button onClick={handleChangeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-bold mt-5">
          {productoSeleccionado.nombre}
        </h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearPrecio(productoSeleccionado.precio)}
        </p>

        <div className="flex gap-4 mt-10">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 0) return;
              setCantidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button
            type="button"
            onClick={() => {
              if (cantidad >= 10) return;
              setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-md"
          onClick={() => handleAgregarPedido({
              ...productoSeleccionado,
              cantidad
          })}
        >
          {edicion ? 'Guardar cambios' : 'Añadir Pedido'}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;

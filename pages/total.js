import { useEffect, useCallback } from 'react';
import useKiosco from '../hooks/useKiosco';
import Layout from '../layout/Layout';
import { formatearPrecio } from '../helpers';


export default function Total() {

  const { pedido, nombre, setNombre, colocarOrden, total } = useKiosco()

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === '' || nombre < 3;
  },[pedido,nombre]);

  useEffect(() => {
    comprobarPedido();
  },[pedido,nombre, comprobarPedido]);


  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>

      <form onSubmit={colocarOrden}>
        <div>
          <label
            className="block uppercase text-slate-800 font-bold text-xl"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full lg:w-1/3 rounded-md"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></input>
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar: <span className="font-bold">{formatearPrecio(total)}</span>
          </p>
        </div>

        <div className="mt-5">
          <input
            className={`${
              comprobarPedido()
                ? 'bg-indigo-100 hover:bg-slate-400 hover:cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700 hover:cursor-pointer'
            }   text-white font-bold py-2 px-4 rounded-full text-center `}
            value="Confirmar Pedido"
            type={'submit'}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}

import Image from "next/image"
import { formatearPrecio } from "../helpers"
import useKiosco from "../hooks/useKiosco"

const Producto = ({producto}) => {

    const { handleProductoSeleccionado } = useKiosco();
    const { nombre, precio, imagen } = producto

    return (
      <div className="border p-3">
        <Image
          src={`/assets/img/${imagen}.jpg`}
          alt={`Imagen plato ${nombre}`}
          width={200}
          height={250}
        />

        <div className="p-5">
          <h3 className="font-bold text-2xl">{nombre}</h3>
          <p className="mt-5 font-black text-4xl text-amber-500">
            {formatearPrecio(precio)}
          </p>

          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full px-4 py-3 mt-4 rounded-md uppercase font-bold text-sm"
            onClick={() => handleProductoSeleccionado(producto)}
          >
            Agregar a la orden
          </button>
        </div>
      </div>
    );
}

export default Producto
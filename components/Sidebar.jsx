import Image from 'next/image';
import useKiosco from '../hooks/useKiosco';
import Categoria from './Categoria';

const Sidebar = () => {
  const { categorias } = useKiosco();

  return (
    <>
      <Image
        src={'/assets/img/logo.svg'}
        width={300}
        height={100}
        alt="Imagen logotipo"
      />

      <nav className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;

import Page from "../components/shared/page";

const Welcome = () => {
  return (
    <Page>
      <div className="w-full pt-10 pb-10">
        <div className="sm:p-10 sm:shadow-2xl flex flex-col gap-3">
          <div>
            <span className="text-2xl font-[600]">¡Bienvenido a Deli!</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg">
              Muchas gracias por unirte a nuestra comunidad
            </span>
            <span className="text-lg">
              ¡Esperemos que lo disfrutes tanto como nosotros!
            </span>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Welcome;

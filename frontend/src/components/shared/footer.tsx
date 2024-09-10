import SocialMedia from "./socialMedia";

const Footer = () => {
  return (
    <div className="bg-secondary w-full flex justify-center shadow-md">
      <div className="flex items-center w-[90%] max-w-page">
        <div className="text-white w-full py-7 flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <img className="h-[24px]" src="deli_white.png" />
          </div>
          <div className="flex gap-3">
            <SocialMedia
              url="https://www.facebook.com/deli.sistema/"
              src="facebook.png"
            />
            <SocialMedia
              url="https://www.instagram.com/deli.sistema/"
              src="instagram.png"
            />
            <SocialMedia
              url="https://www.youtube.com/@deli.sistema"
              src="youtube.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

interface Props {
  src: string;
  url: string;
}

const SocialMedia = (props: Props) => {
  return (
    <a href={props.url} target="_blank">
      <img className="h-[40px] sm:h-[50px]" src={props.src} />
    </a>
  );
};

export default SocialMedia;

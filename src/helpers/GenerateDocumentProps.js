export default ({ title, description, cover_image, type, url, locale, robots }) => {
  if (!cover_image) cover_image = {};

  // width and height required to send as string

  cover_image = {
    src: cover_image.src ? cover_image.src : "",
    width: cover_image.width ? cover_image.width : "800",
    height: cover_image.height ? cover_image.height : "600",
    alt: cover_image.alt ? cover_image.alt : "Image",
    type: cover_image.type ? cover_image.type : "image/png",
    
  };

  return {
    title: title ? title : `Welcome to my Site`,
    description: description ? description : `This is my personal portfolio`,
    url,
    locale: locale ? locale : "en_IN",
    type,
    cover_image,
    robots: robots ? robots : `follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large`,
  };
};
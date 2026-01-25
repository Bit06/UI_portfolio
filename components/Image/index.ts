// Portfolio Homepage Images
const echoHomepage = new URL('./ECHO - Homepage.jpg', import.meta.url).href;
const shopHebronHomepage = new URL('./SHOP HEBRON - Homepage.jpg', import.meta.url).href;
const estateHomepage = new URL('./MY-ESTATE - Homepage.jpg', import.meta.url).href;

// Profile Image
const profileImage = new URL('./Profile Image.jpg', import.meta.url).href;

// Echo Case Study Images
const echoFirstImage = new URL('./ECHO - Fist Image.jpg', import.meta.url).href;
const echoSecondImage = new URL('./ECHO - Second Image.jpg', import.meta.url).href;

// Shop Hebron Case Study Images
const shopHebronFirstImage = new URL('./SHOP HEBRON - First Image.jpg', import.meta.url).href;
const shopHebronSecondImage = new URL('./SHOP HEBRON - Second Image.jpg', import.meta.url).href;

// Estate Case Study Images
const estateFirstImage = new URL('./MY-ESTATE - First Image.jpg', import.meta.url).href;
const estateSecondImage = new URL('./MY-ESTATE - Second Image.jpg', import.meta.url).href;

// Tagged image export for easy reference
export const images = {
  profile: profileImage,
  portfolio: {
    echo: echoHomepage,
    shopHebron: shopHebronHomepage,
    estate: estateHomepage,
  },
  caseStudy: {
    echo: {
      first: echoFirstImage,
      second: echoSecondImage,
    },
    shopHebron: {
      first: shopHebronFirstImage,
      second: shopHebronSecondImage,
    },
    estate: {
      first: estateFirstImage,
      second: estateSecondImage,
    },
  },
};

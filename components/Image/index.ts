// Portfolio Homepage Images
const echoHomepage = new URL('./ECHO - Homepage.png', import.meta.url).href;
const shopHebronHomepage = new URL('./SHOP HEBRON - Homepage.png', import.meta.url).href;
const estateHomepage = new URL('./MY-ESTATE - Homepage.png', import.meta.url).href;

// Echo Case Study Images
const echoFirstImage = new URL('./ECHO - Fist Image.png', import.meta.url).href;
const echoSecondImage = new URL('./ECHO - Second Image.png', import.meta.url).href;

// Shop Hebron Case Study Images
const shopHebronFirstImage = new URL('./SHOP HEBRON - First Image.png', import.meta.url).href;
const shopHebronSecondImage = new URL('./SHOP HEBRON - Second Image.png', import.meta.url).href;

// Estate Case Study Images
const estateFirstImage = new URL('./MY-ESTATE - First Image.png', import.meta.url).href;
const estateSecondImage = new URL('./MY-ESTATE - Second Image.png', import.meta.url).href;

// Tagged image export for easy reference
export const images = {
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

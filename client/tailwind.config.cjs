/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'watch': '162px',
   
        'tcw': '350px',
  
        'tsw': '360px',
  
        'cl': '390px',
  
        'cdw': '393px',
        // => @media (min-width: 393px) { ... }
        'ccc': '414px',
        // => @media (min-width: 414px) { ... }
        'cvo': '428px',
        // => @media (min-width: 428px) { ... }
        'csw': '460px',
        // => @media (min-width: 460px) { ... }
        'cst': '470px',
        // => @media (min-width: 470px) { ... }
        'qv':'520px',
  
  
        'qq': '525px',
        // => @media (min-width: 525px) { ... }
        'qc':'555px',
        
        'qn': '590px',
  
        'sv': '620px',
  
      
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'aser': '850px',

        'lg': '1000px',
        // => @media (min-width: 1024px) { ... }
        'lgg': '1090px',

        'ggg': '1150px',

        'gxl': '1205px',
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '1xl': '1407px',
        '2xl': '1535px',
        // => @media (min-width: 1536px) { ... }
        '3x1': '1600px',
      },
    },
  },
  plugins: [],
};

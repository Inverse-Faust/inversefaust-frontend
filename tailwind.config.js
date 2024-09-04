/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        0.5: '0.5px', // 0.5px 두께의 테두리 추가
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      width: {
        128: '32rem', // 512px
        144: '36rem', // 576px
        160: '40rem', // 640px
        192: '48rem', // 768px
      },
      minWidth: {
        128: '32rem', // 512px
        144: '36rem', // 576px
        160: '40rem', // 640px
        192: '48rem', // 768px
      },
    },
  },
  plugins: [],
};

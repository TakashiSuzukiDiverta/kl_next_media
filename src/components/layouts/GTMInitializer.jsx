import React, { useEffect } from 'react';

const GTMInitializer = () => {
  useEffect(() => {
    console.log('Adding GTM script...');

    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KQCXQRMC');
    `;
    document.head.appendChild(script);
    console.log('GTM script added:', script.src);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQCXQRMC"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);
    console.log('GTM noscript added:', noscript.innerHTML);

    return () => {
      console.log('Cleaning up GTM script and noscript');
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, []);

  return null; // このコンポーネントは何もレンダリングしない
};

export default GTMInitializer;

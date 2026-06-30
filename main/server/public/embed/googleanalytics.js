// Google Analytics (gtag) dynamic loader without HTML <script> tag
  (function loadGA() {
    console.log("[GA] init: starting loader");
    const GA_ID = "G-FRYR5GJLJ7";
    console.log("[GA] using GA_ID:", GA_ID);
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      window.dataLayer.push(arguments);
    }
  
    window.gtag = gtag;
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
  
    script.onload = () => {
      console.log("[GA] script loaded, initializing gtag");
      console.log("[GA] script onload fired");
      gtag("js", new Date());
      gtag("config", GA_ID);
      console.log("[GA] config sent");
    };
  
    document.head.appendChild(script);
    console.log("[GA] script appended to document head");
  })();
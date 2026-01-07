import { SMAconfig } from "../types/SMA_objects";

const config: SMAconfig = {
  products: [
    { tri: "JUP", name: "Jupiler", defaultPrice: 2.5, crashPrice: 1 },
    { tri: "LIN", name: "Lindemans Kriek", defaultPrice: 2.5, crashPrice: 1.5 },
    { tri: "DUV", name: "Duvel", defaultPrice: 4, crashPrice: 1.5 },
    { tri: "HOE", name: "Witte Van Hoegaarden", defaultPrice: 3, crashPrice: 1.3 },
    { tri: "KWA", name: "Kwak", defaultPrice: 4, crashPrice: 1.5 },
    { tri: "KBR", name: "Kasteelbier Rouge", defaultPrice: 4.5, crashPrice: 1.7 },
    { tri: "CHO", name: "Chouffe", defaultPrice: 4.5, crashPrice: 1.5 },
    { tri: "OME", name: "Omer", defaultPrice: 4, crashPrice: 1.5 },
  ],
};

export default config;

import { SMAconfig } from "../types/SMA_objects";

const config: SMAconfig = {
  products: [
    { tri: "JUP", name: "Jupiler", defaultPrice: 2.5, crashPrice: 1 },
    { tri: "KRI", name: "Kriek Lambic", defaultPrice: 2.5, crashPrice: 1.5 },
    { tri: "DUV", name: "Duvel", defaultPrice: 4, crashPrice: 1.5 },
    { tri: "KBR", name: "Kasteelbier Rouge", defaultPrice: 4, crashPrice: 1.7 },
    { tri: "HOE", name: "Witte Van Hoegaarden", defaultPrice: 3, crashPrice: 1.3 },
    { tri: "WWN", name: "Witte Wijn", defaultPrice: 4, crashPrice: 1.5 },
    { tri: "SPR", name: "Aperol/Limoncello Spritz", defaultPrice: 8, crashPrice: 4 },
    { tri: "MOJ", name: "Mojito", defaultPrice: 8, crashPrice: 3 },
    { tri: "MUL", name: "Moscow Mule", defaultPrice: 8, crashPrice: 3.8 },
    { tri: "GIN", name: "Gin&Tonic", defaultPrice: 6, crashPrice: 1.8 },
    { tri: "RUM", name: "Rum Cola", defaultPrice: 6, crashPrice: 2.1 },
    { tri: "CLA", name: "Coca Cola (zero)", defaultPrice: 2.5, crashPrice: 1 },
    { tri: "FRI", name: "Fanta/iceTea/sprite", defaultPrice: 2.5, crashPrice: 1 },
    { tri: "WAT", name: "(Spuit) Water", defaultPrice: 2.5, crashPrice: 0.75 },
  ],
};

export default config;

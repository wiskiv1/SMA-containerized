import Image from "next/image";
import Script from "next/script";
import "./page.css";

export default function Dashboard() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: "0",
        overflow: "hidden",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <div id="remerciements">developed by Marc Bresson & Witse Panneels</div>
      <div className="conteneur" id="header">
        <div id="banniere">
          <div id="logo">
            <Image src="/logo.png" width={90} height={90} alt="SMA logo" />
          </div>
          <div id="titre">Soirée bourse</div>
          <span id="cheapest">
            <span>cheapest</span>
            <span>
              <span className="hashtag_prix">#1</span>
              <span className="indice" id="numero_1"></span>
            </span>
            <span>
              <span className="hashtag_prix">#2</span>
              <span className="indice" id="numero_2"></span>
            </span>
            <span>
              <span className="hashtag_prix">#3</span>
              <span className="indice" id="numero_3"></span>
            </span>
          </span>
        </div>
      </div>
      <div id="content">
        <div className="chart-container conteneur">
          <canvas id="chart"></canvas>
        </div>
        <div className="table-container conteneur">
          <table id="afficheur_prix">
            <thead>
              <tr>
                <th className="cercle"></th>
                <th className="nom">name</th>
                <th className="indice">index</th>
                <th className="prix">price</th>
                <th className="croissance">growth</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <Script src="/js/external_src/chartjs.3.9.1.min.js" strategy="beforeInteractive" />
      <Script src="/js/external_src/luxon.1.2.0.min.js" strategy="beforeInteractive" />
      <Script src="/js/external_src/chartjs-adapter-luxon.min.js" strategy="beforeInteractive" />

      <Script src="/js/dashboard_chart.js" />
      <Script src="/js/countdown_MB.js" />
      <Script src="/js/sale_animation.js" />
      <Script src="/js/dashboard.js" />
    </div>
  );
}

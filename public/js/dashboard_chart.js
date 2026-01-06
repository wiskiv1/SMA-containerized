var curves_to_display = 9;
var minutes_for_points_history = 15; // <= number of datapoints on the chart
/**
 * @author Marc Bresson
 *
 * changes made by Witse Panneels to work with the new backend
 */

/** */
const ctx = document.getElementById("chart").getContext("2d");

const config = {
  type: "line",
  options: {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "rgba(255,255,255,0.7)",
          boxHeight: 1,
        },
      },
      tooltip: {
        intersect: false,
      },
    },
    resizeDelay: 300,
    responsive: true, // Resize dynamically
    maintainAspectRatio: false, // Resize dynamically
    scales: {
      y: {
        position: "right",
        ticks: {
          color: "#fff",
          callback: function (value) {
            return round(value, 1) + " €";
          },
        },
        grid: {
          borderColor: "#fff",
          color: "rgba(255,255,255,0.4)",
          borderDash: [5, 5],
        },
      },
      x: {},
    },
    animation: false,
  },
};

/** @author Marc Bresson */
class ChartExtension {
  chart;
  trigram_displayed = [];

  constructor(ctx, config) {
    this.chart = new Chart(ctx, config);
  }

  removeOldestDatapoints() {
    this.chart.data.labels.splice(0, 1);
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.splice(0, 1);
    });
  }

  addDataPoint(trigram, new_price) {
    let index = this.trigram_displayed.indexOf(trigram);
    if (index >= 0) {
      this.chart.data.datasets[index].data.push(new_price);
    }
  }

  addAxisLabel(start_index) {
    if (this.chart.data.labels.length == 0 || this.chart.data.labels.at(-1) < start_index) {
      this.chart.data.labels.push(start_index);
      return true;
    }

    return false;
  }

  OldestDataPoint() {
    return this.chart.data.labels[0];
  }

  addNewCurve(trigram, full_name, couleur, data) {
    this.chart.data.datasets.push({
      type: "line",
      trigram: trigram,
      label: full_name,
      data: data,
      fill: false,
      borderColor: couleur,
      tension: 0.3,
    });
    this.trigram_displayed.push(trigram);

    this.removeExcessiveCurve();
  }

  getNbrCurveMissing() {
    return curves_to_display - this.trigram_displayed.length;
  }

  removeExcessiveCurve() {
    if (this.trigram_displayed.length >= curves_to_display) {
      this.removeDataset();
    }
  }

  removeDataset() {
    this.chart.data.datasets.splice(0, 1);
    this.trigram_displayed.splice(0, 1);
  }

  update() {
    this.chart.update();
  }
}

var chart = new ChartExtension(ctx, config);

function init_chart() {
  let nbr_points = minutes_for_points_history;
  let priceHistLength = prices_history[Object.keys(prices_history)[0]].length;
  let i = Math.max(0, priceHistLength - nbr_points);
  while (i < priceHistLength) {
    chart.addAxisLabel(i);
    i++;
  }
  chart.update();
}

function display_new_curve() {
  let trigram = trigram_to_display();
  let last_prices = prices_history[trigram].slice(-minutes_for_points_history);
  let full_name = getProduct(trigram).name;
  let color = getProduct(trigram).color;

  chart.addNewCurve(trigram, full_name, color, last_prices);

  if (chart.getNbrCurveMissing() > 1) {
    display_new_curve();
  }
  chart.update();
}

var next_index_to_display = 0;
function trigram_to_display() {
  let available_trigrams = Object.keys(prices_history);
  next_index_to_display = (next_index_to_display + 1) % available_trigrams.length;
  return available_trigrams[next_index_to_display];
}

function add_new_prices_to_chart() {
  let last_prices = get_last_prices();

  let newest_datapoint = prices_history[Object.keys(prices_history)[0]].length - 1;
  let need_update = chart.addAxisLabel(newest_datapoint);

  if (need_update) {
    for (index in chart.trigram_displayed) {
      trigram = chart.trigram_displayed[index];
      chart.addDataPoint(trigram, last_prices[trigram]);
    }
  }

  let oldest_datapoint = chart.OldestDataPoint();
  while (newest_datapoint - oldest_datapoint >= minutes_for_points_history) {
    chart.removeOldestDatapoints();
    oldest_datapoint = chart.OldestDataPoint();
  }
  chart.update();
}

function round(x, n_digit) {
  return Math.round(x * 10 ** n_digit) / 10 ** n_digit;
}

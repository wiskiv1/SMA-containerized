"use client";
/**
 * Client-only running total for the current order.
 * Sums the price of each drink sold and keeps summing until either a dry
 * period of 120s without a sale, or the bar personnel presses reset.
 */
export default function RunningTotal({
  total,
  count,
  onReset,
}: {
  total: number;
  count: number;
  onReset: () => void;
}) {
  return (
    <div id="running_total" className={count > 0 ? "active" : ""}>
      <div className="rt_info">
        <span className="rt_amount">{total}€</span>
        <span className="rt_count">
          {count} {count === 1 ? "drink" : "drinks"}
        </span>
      </div>
      <div className="rt_reset" onClick={onReset}>
        Reset
      </div>
    </div>
  );
}

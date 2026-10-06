import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import collapse from "@alpinejs/collapse";

Alpine.plugin(intersect);
Alpine.plugin(collapse);

// Mobile menu state, shared by the header button and the full-screen overlay.
Alpine.store("menu", { open: false });

// Paint quantity estimate (bojera page). Adds ~10% spare, rounded up to 0.5 L.
Alpine.data("paintCalc", (whatsapp) => ({
  length: 4,
  width: 3.5,
  height: 2.7,
  openings: 4,
  coats: 2,
  coverage: 10,
  ceiling: true,
  num(v) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 0;
  },
  get area() {
    const walls = 2 * (this.num(this.length) + this.num(this.width)) * this.num(this.height) - this.num(this.openings);
    const ceiling = this.ceiling ? this.num(this.length) * this.num(this.width) : 0;
    return Math.max(0, walls) + ceiling;
  },
  get liters() {
    const coverage = this.num(this.coverage) || 10;
    return Math.ceil(((this.area * this.num(this.coats)) / coverage) * 1.1 * 2) / 2;
  },
  fmt(n) {
    return n.toLocaleString("sq-AL", { maximumFractionDigits: 1 });
  },
  get waHref() {
    const text = `Përshëndetje, më duhen rreth ${this.fmt(this.liters)} litra bojë për ${this.fmt(this.area)} m² (${this.coats} shtresa). Mund të më jepni një ofertë?`;
    return `${whatsapp}?text=${encodeURIComponent(text)}`;
  },
}));

window.Alpine = Alpine;
Alpine.start();

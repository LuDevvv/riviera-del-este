declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    lenis?: any;
  }
}

// Performance API types
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface LargestContentfulPaintEntry extends PerformanceEntry {
  renderTime: number;
  loadTime: number;
}

export type { LayoutShiftEntry, FirstInputEntry, LargestContentfulPaintEntry };

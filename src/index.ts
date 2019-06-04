import { hasProperties } from "./util/object";
import loadWhenDocumentReady from "./util/loadWhenDocumentReady";
import Worker from "workerize-loader!./worker";

// List of required features browser features
const requiredFeatures = ["Worker", "Promise", "fetch"];
// Test whether browser has required feature support
const hasFeatureSupport = hasProperties(window, requiredFeatures);

// Define gloabl state
const state: Fastly = {
  client: {
    hasFeatureSupport
  }
};

// Init initializes the library when the browser is ready
export function init(): void {
  loadWhenDocumentReady(
    (): void => {
      const worker = new Worker();
      worker.init();
    }
  );
}

// If browser has feature support,
// initialize the library
if (hasFeatureSupport) {
  init();
}

// Expose global state as default export
// Webpack assigns this return value to the global window.FASTLY;
export default state;

import { attach } from "@openmrs/esm-extension-manager";
import "./set-public-path";

const backendDependencies = {
  "webservices.rest": "2.24.0"
};

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

function setupOpenMRS() {
  return {
    lifecycle: () => import("./openmrs-esm-home"),
    activate: "home",
    extensions: [
      {
        name: "magic-button",
        load: () => import("./button")
      }
    ]
  };
}

attach("home-buttons", "magic-button");

export { backendDependencies, importTranslation, setupOpenMRS };

import { exec } from "resource:///com/github/Aylur/ags/utils.js";
import { Bar, BarAlt } from "./modules/bar/bar.js";
import DirectoryMonitorService from "./directoryMonitorService.js";
import MenuWindows from "./modules/menus/main.js";
import Notifications from "./modules/notifications/index.js";

const applyScss = () => {
  // Compile scss
  exec(`sass ${App.configDir}/scss/main.scss ${App.configDir}/style.css`);
  exec(
    `sass ${App.configDir}/scss/highlight.scss ${App.configDir}/highlight.css`,
  );
  console.log("Scss compiled");

  // Apply compiled css
  App.resetCss();
  App.applyCss(`${App.configDir}/style.css`);
  console.log("Compiled css applied");
};

DirectoryMonitorService.connect("changed", () => applyScss());

applyScss();

const workspaceMonitorMap = {
  0: [4, 5],
  1: [6, 7],
  2: [1, 2, 3, 8, 9, 10],
};

App.config({
  windows: [
    ...MenuWindows,
    Notifications(),
    BarAlt(0, workspaceMonitorMap),
    BarAlt(1, workspaceMonitorMap),
    Bar(2, workspaceMonitorMap),
  ],
  style: `${App.configDir}/style.css`,
  closeWindowDelay: {
    sideright: 350,
    launcher: 350,
    bar0: 350,
  },
  onConfigParsed: () => Utils.execAsync(`python3 ${App.configDir}/services/bluetooth.py`),
});

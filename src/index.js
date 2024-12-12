import { Clock } from "./clock";
import { Marquee } from "./marquee";
import { Grid } from "./grid";
import { Heading } from "./heading";
import { ToolkitText } from "./toolkit";
import { ColorModeButton } from "./colorModeButton";
import { ImageRevealSection } from "./imageReveal";

import { reveal } from "./helpers/reveal";

import imagesLoaded from "imagesloaded";

class App {
  constructor() {
    this.clock = null;
    this.marquees = [];
    this.grid = null;
    this.heading = null;
    this.toolkit = null;
    this.colorModeButton = null;
    this.imageReveal = null;
  }

  init() {
    console.log("App Initializing...");

    // Clock
    this.clock = new Clock(".hero_clock");

    // Grid
    if (this.grid) this.grid.destroy();
    this.grid = new Grid();

    // Marquee
    const marqueeElements = document.querySelectorAll(".marquee");
    marqueeElements.forEach((marquee) =>
      this.marquees.push(new Marquee(marquee))
    );

    // Heading
    this.heading = new Heading(document.querySelector(".hero_h1"));

    // ToolkitText
    if (this.toolkit) this.toolkit.destroy();
    this.toolkit = new ToolkitText(".toolkit_p");

    // Image Reveal Section
    this.imageReveal = new ImageRevealSection(
      ".images_thumbnails_list",
      ".images_full_list"
    );

    // Initialize ColorModeButton and pass a reference to the handler
    this.colorModeButton = new ColorModeButton(() =>
      this.handleColorModeChange()
    );

    reveal();
  }

  handleColorModeChange() {
    console.log("Color mode changed, reinitializing necessary components...");

    // Update the grid
    if (this.grid) {
      this.grid.destroy();
    }
    this.grid = new Grid();

    // Update the toolkit
    if (this.toolkit) {
      this.toolkit.destroy();
    }
    this.toolkit = new ToolkitText(".toolkit_p");

    // Any other components that depend on color mode changes can also be updated here
    console.log("Color mode-related reinitialization complete.");
  }

  listenToMotionPreferenceChanges() {}

  start() {
    document.fonts.ready.then(() => {
      const imgLoad = imagesLoaded("body");
      imgLoad.on("always", () => {
        console.log("All images loaded");
        this.init();
      });
    });
  }
}

// Instantiate and start the app
const app = new App();
app.start();

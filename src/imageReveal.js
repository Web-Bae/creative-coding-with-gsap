import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMotionPreference } from "./stores/MotionFunc";

export class ImageRevealSection {
  constructor(thumbnailListSelector, fullImageListSelector) {
    this.thumbnailList = document.querySelector(thumbnailListSelector);
    this.fullImageList = document.querySelector(fullImageListSelector);

    if (!this.thumbnailList || !this.fullImageList) {
      throw new Error("ImageRevealSection: Error selecting lists");
    }
    if (getMotionPreference()) {
      return;
    }
    this.createAnimation();
  }

  createAnimation() {
    const thumbnailCovers =
      this.thumbnailList.querySelectorAll(".images_cover");
    const fullImages = this.fullImageList.querySelectorAll("img");

    fullImages.forEach((fullImage, index) => {
      const thumbnailCover = thumbnailCovers[index];
      const nextImage = fullImages[index + 1] || this.fullImageList;

      ScrollTrigger.create({
        trigger: fullImage,
        start: index === 0 ? "top bottom" : "top center",
        endTrigger: nextImage,
        end: index !== fullImages.length - 1 ? "top center" : "bottom top",
        // markers: true,
        onEnter: () => {
          gsap.set(thumbnailCover, { transformOrigin: "top" });

          // Animation when scrolling down
          gsap.to(thumbnailCover, {
            duration: 0.4,
            scaleY: 0,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.set(thumbnailCover, { transformOrigin: "bottom" });

          gsap.to(thumbnailCover, {
            duration: 0.4,
            scaleY: 1,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.set(thumbnailCover, { transformOrigin: "top" });
          gsap.to(thumbnailCover, {
            duration: 0.4,
            scaleY: 1,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.set(thumbnailCover, { transformOrigin: "bottom" });
          gsap.to(thumbnailCover, {
            duration: 0.4,
            scaleY: 0,
            ease: "power2.out",
          });
        },
      });
    });
  }
}

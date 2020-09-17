import {gsap} from 'gsap'; 

gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin);

gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin);

const Clock = {
  timeSpecRoot: document.querySelector(".container").style,
  allDigits: document.querySelectorAll(".num"),
  iconWrapper: document.querySelector(".icon"),
  hArr: [...Array(23).keys()],
  mArr: [...Array(59).keys()],
  animState: "",
  passNumber(target, arr, num) {
    let clockDigit = `<span class='digit'>${arr[num]}</span>`;
    target.childNodes.forEach((item, i) => {
      item.tagName == "SPAN" && item.classList.contains("digit")
        ? target.removeChild(item)
        : null;
    });
    target.insertAdjacentHTML("beforeend", clockDigit);
  },
  setClock() {
    Clock.allDigits.forEach((item, i) => {
      i == 0
        ? Clock.passNumber(item, Clock.hArr, 0)
        : i == 1
        ? Clock.passNumber(item, Clock.hArr, 6)
        : i == 2 || i == 3
        ? Clock.passNumber(item, Clock.mArr, 0)
        : null;
    });
    document.querySelectorAll(".ray").forEach((item, i) => {
      i == 5 || i == 6 || i == 7
        ? gsap.to(item, {
            drawSVG: "100% 100%",
            onComplete: () => {
              gsap.set(item, { stroke: "#FFF" });
            }
          })
        : null;
    });
  },
  flip(el, className, num) {
    document.querySelectorAll(".line").forEach((dash, i) => {
      i == num ? dash.classList.add("flapping") : null;
    });
    el.classList.add(className);
    let cleanUp = () => {
      document.querySelectorAll(".line").forEach((dash, i) => {
        i == num ? dash.classList.remove("flapping") : null;
      });
      el.classList.remove(className);
      el.removeEventListener("animationend", cleanUp);
    };
    el.addEventListener("animationend", cleanUp);
  },
  transBg(col1, col2) {
    Clock.timeSpecRoot.setProperty("--gradient-color-one", col1);
    Clock.timeSpecRoot.setProperty("--gradient-color-two", col2);
  },
  transPs(col1, col2) {
    Clock.timeSpecRoot.setProperty("--gradient-color-three", col1);
    Clock.timeSpecRoot.setProperty("--gradient-color-four", col2);
  },
  toNoon() {
    Clock.iconWrapper.classList.add("activated");
    let cleanUp = () => {
      Clock.transBg("#FCD154", "#FC45AA");
      Clock.iconWrapper.removeEventListener("transitionend", cleanUp);
    };
    Clock.iconWrapper.addEventListener("transitionend", cleanUp);
    let tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "none"
      }
    });
    let circShape = MorphSVGPlugin.convertToPath("#noon-sun");
    tl.to("#half-sun", { morphSVG: circShape, strokeWidth: 0 })
      .to(
        ".ray.one",
        {
          attr: {
            x1: "300",
            x2: "300",
            y1: "130",
            y2: "180"
          }
        },
        ">-1"
      )
      .to(
        ".ray.two",
        {
          attr: {
            x1: "285",
            x2: "285",
            y1: "95",
            y2: "145"
          }
        },
        ">-1"
      )
      .to(
        ".ray.three",
        {
          attr: {
            y1: "80",
            y2: "130"
          }
        },
        ">-1"
      )
      .to(
        ".ray.four",
        {
          attr: {
            x1: "215",
            x2: "215",
            y1: "95",
            y2: "145"
          }
        },
        ">-1"
      )
      .to(
        ".ray.five",
        {
          attr: {
            x1: "200",
            x2: "200",
            y1: "130",
            y2: "180"
          }
        },
        ">-1"
      )
      .to(
        ".sun-below.bottom",
        {
          attr: {
            y1: "430",
            y2: "430"
          },
          drawSVG: "50% 50%",
          onComplete: () => {
            gsap.to(".sun-below.bottom", 0.08, {
              strokeWidth: "0",
              ease: "none"
            });
          }
        },
        ">-1"
      )
      .to(
        ".sun-below.top",
        {
          attr: {
            y1: "430",
            y2: "430"
          },
          drawSVG: "50% 50%",
          onComplete: () => {
            gsap.to(".sun-below.top", 0.08, { strokeWidth: "0", ease: "none" });
          }
        },
        ">-0.7"
      )
      .to(".ray.six", { drawSVG: "100% 0" }, ">-.9")
      .to(".ray.eight", { drawSVG: "100% 0" }, ">-1")
      .to(".ray.seven", { drawSVG: "100% 0" }, ">-.8");
        console.log(tl.duration())
  },
  toDusk() {
    Clock.iconWrapper.classList.remove("activated");
    let cleanUp = () => {
      Clock.transPs("#006CAA", "#002455");
      Clock.iconWrapper.removeEventListener("transitionend", cleanUp);
    };
    Clock.iconWrapper.addEventListener("transitionend", cleanUp);
    let tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "none"
      }
    });
    gsap.set(".sun-below.top", {
      strokeWidth: "30"
    });
    gsap.set(".sun-below.bottom", {
      strokeWidth: "30"
    });
    tl.to(".sun-below.top", {
      attr: {
        y1: "350",
        y2: "350"
      },
      drawSVG: "0 100%"
    })
      .to(".ray.seven", 0.5, { drawSVG: "100% 100%" }, ">-1")
      .to(".ray.six", 0.3, { drawSVG: "100% 100%" }, ">0.1")
      .to(".ray.eight", 0.3, { drawSVG: "100% 100%" }, ">-0.3")
      .to(
        ".sun-below.bottom",
        {
          attr: {
            y1: "400",
            y2: "400"
          },
          drawSVG: "0 100%"
        },
        ">-0.8"
      )

      .to(
        "#half-sun",
        {
          morphSVG: "#half-shape",
          strokeWidth: "30"
        },
        ">-.8"
      )
      .to(
        ".ray.one",
        {
          attr: {
            x1: "250",
            y1: "100",
            x2: "250",
            y2: "150"
          }
        },
        ">-1"
      )
      .to(
        ".ray.two",
        {
          attr: {
            x1: "250",
            y1: "100",
            x2: "250",
            y2: "150"
          }
        },
        ">-1"
      )
      .to(
        ".ray.three",
        {
          attr: {
            x1: "250",
            y1: "100",
            x2: "250",
            y2: "150"
          }
        },
        ">-1"
      )
      .to(
        ".ray.four",
        {
          attr: {
            x1: "250",
            y1: "100",
            x2: "250",
            y2: "150"
          }
        },
        ">-1"
      )
      .to(
        ".ray.five",
        {
          attr: {
            x1: "250",
            y1: "100",
            x2: "250",
            y2: "150"
          }
        },
        ">-1"
      );
        console.log(tl.duration())
  },
  toNight() {
    Clock.iconWrapper.classList.add("activated");
    let cleanUp = () => {
      Clock.transBg("#00FCFB", "#0092FF");
      Clock.iconWrapper.removeEventListener("transitionend", cleanUp);
    };
    Clock.iconWrapper.addEventListener("transitionend", cleanUp);
    let tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "none"
      }
    });
    tl.to(".sun-below.top", {
      attr: {
        y1: "270",
        y2: "270"
      }
    })
      .to(
        ".sun-below.top",
        0.5,
        {
          drawSVG: "50% 50%",
          onComplete: () => {
            gsap.to(".sun-below.top", 0.075, {
              strokeWidth: "0",
              ease: "none"
            });
          }
        },
        ">-.5"
      )
      .to(
        "#sunset-group",
        0.5,
        { scale: 0, transformOrigin: "50% 65%" },
        ">-.5"
      )
      .to(
        ".sun-below.bottom",
        {
          attr: {
            y1: "280",
            y2: "280"
          }
        },
        ">-0.75"
      )

      .to(
        ".sun-below.bottom",
        0.5,
        {
          drawSVG: "50% 50%",
          onComplete: () => {
            gsap.to(".sun-below.bottom", 0.08, {
              strokeWidth: "0",
              ease: "none"
            });
          }
        },
        ">-0.5"
      )
      .to("#moon-wr", 0.6, {
        y: 10,
        fillOpacity: "1"
      })
      .to(
        ".star",
        0.4,
        { rotate: "0", fill: "#FFF", transformOrigin: "50% 50%" },
        ">-.1"
      );
        console.log(tl.duration())
  },
  toDawn() {
    Clock.iconWrapper.classList.remove("activated");
    let cleanUp = () => {
      Clock.transPs("#FAFCA4", "#FCBA00");
      Clock.iconWrapper.removeEventListener("transitionend", cleanUp);
    };
    Clock.iconWrapper.addEventListener("transitionend", cleanUp);
    let tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "none"
      }
    });
    tl.to(".star", 0.4, {
      rotate: "-30",
      fill: "transparent",
      transformOrigin: "50% 50%"
    })
      .to(
        "#moon-wr",
        {
          y: 250,
          fillOpacity: "0"
        },
        ">-.1"
      )
      .to(".sun-below.top", 0.08, {
        strokeWidth: "30"
      })
      .to(".sun-below.top", {
        attr: {
          y1: "350",
          y2: "350"
        },
        drawSVG: "0 100%"
      })
      .to(
        "#sunset-group",
        {
          scale: "1",
          transformOrigin: "50% 65%"
        },
        ">-1"
      )
      .to(".sun-below.bottom",0.08,{
        strokeWidth: "30"
      },">-1.15")
      .to(
        ".sun-below.bottom",
        {
          attr: {
            y1: "400",
            y2: "400"
          },
          drawSVG: "0 100%"
        },">-0.08");
    console.log(tl.duration())
  },

  animateClock(endnum) {
    let upperTarget;
    let upperTarget2;
    let upperTarget3;
    let upperTarget4;
    let target;
    let target2;
    let target3;
    let target4;
    let flap;
    let flap2;
    let flap3;
    let flap4;

    Clock.allDigits.forEach((ndig, i) => {
      switch (i) {
        case 0:
          upperTarget4 = ndig;
          target4 = ndig.children[2];
          flap4 = ndig.children[0];
          break;
        case 1:
          upperTarget3 = ndig;
          target3 = ndig.children[2];
          flap3 = ndig.children[0];
          break;
        case 2:
          upperTarget2 = ndig;
          target2 = ndig.children[2];
          flap2 = ndig.children[0];
          break;
        case 3:
          upperTarget = ndig;
          target = ndig.children[2];
          flap = ndig.children[0];
          break;
      }
    });

    let currentVal = Number(target.innerHTML);
    let currentVal2 = Number(target2.innerHTML);
    let currentVal3 = Number(target3.innerHTML);
    let currentVal4 = Number(target4.innerHTML);
    let count = currentVal;
    let count2 = currentVal2;
    let count3 = currentVal3;
    let count4 = currentVal4;

    let checkFunc = () => {
      let countStr = count.toString();
      let countStr2 = count2.toString();
      let countStr3 = count3.toString();
      let countStr4 = count4.toString();
      let matchStr = countStr4 + countStr3 + countStr2 + countStr;

      if (matchStr === endnum) {
        clearInterval(Clock.animState);
      } else if (count >= 9) {
        Clock.flip(flap, "m2-flap", 3);
        count = 0;
        Clock.flip(flap2, "m1-flap", 2);
        count2++;
        if (count2 >= 6) {
          Clock.flip(flap2, "m1-flap", 2);
          count2 = 0;
          Clock.flip(flap3, "h2-flap", 1);
          count3++;
          if (count3 >= 10) {
            Clock.flip(flap3, "h2-flap", 1);
            count3 = 0;
            Clock.flip(flap4, "h1-flap", 0);
            count4++;
          }
        }
      } else if (count3 === 4 && count4 === 2) {
        Clock.flip(flap3, "h2-flap", 1);
        count3 = 0;
        Clock.flip(flap4, "h1-flap", 0);
        count4 = 0;
      } else {
        if (matchStr === "1015") {
          Clock.toNoon();
        } else if (matchStr === "1700") {
          Clock.toDusk();
        } else if (matchStr === "2200") {
          Clock.toNight();
        } else if (matchStr === "0330") {
          Clock.toDawn();
        }
        count++;
        Clock.flip(flap, "m2-flap", 3);
      }
    };

    Clock.animState = setInterval(() => {
      checkFunc();
      Clock.passNumber(upperTarget4, Clock.hArr, count4);
      Clock.passNumber(upperTarget3, Clock.hArr, count3);
      Clock.passNumber(upperTarget2, Clock.mArr, count2);
      Clock.passNumber(upperTarget, Clock.mArr, count);
    }, 5);
  }
};

Clock.setClock();
Clock.animateClock("2500");

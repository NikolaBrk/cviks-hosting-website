// ----------------------- Text Animation -------------------------

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap white--bar">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

// ----------------------- Page Transition -------------------------

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const href = this.getAttribute("href");

            // Add a CSS class to trigger the transition effect
            document.body.classList.add("fade-out");

            // After a delay, navigate to the new page
            setTimeout(function () {
                window.location.href = href;
            }, 800); // Adjust the delay time as needed
        });
    });
});

// ----------------------- Hamburger Menu -------------------------

const menuToggle = document.querySelector(".hamburger-toggle");
const hamburger = document.querySelector(".hamburger-content");
const buttenLine = document.querySelectorAll(".bar");
const buttenX = document.querySelector(".x-toggle");

menuToggle.addEventListener("click", () => {
    hamburger.classList.toggle("active");

    buttenLine.forEach((line) => {
        line.classList.toggle("active");
    });

    buttenX.classList.toggle("active");
});

// --------------------------------- Butten Activation -------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById("price-btn1");
    const btn2 = document.getElementById("price-btn2");
    const kvm = document.getElementById("kvm-root-prices");
    const dedicated = document.getElementById("dedicated-server-prices");

    const serverBtn1 = document.getElementById("server-btn1");
    const serverBtn2 = document.getElementById("server-btn2");
    const serverBtn3 = document.getElementById("server-btn3");
    const amd = document.getElementById("AMD-RYZEN");
    const intel = document.getElementById("INTEL");
    const xeon = document.getElementById("XEON");

    btn1.addEventListener("click", function () {
        btn1.classList.add("active");
        kvm.classList.add("active");

        btn2.classList.remove("active");
        dedicated.classList.remove("active");
    });

    btn2.addEventListener("click", function () {
        btn2.classList.add("active");
        dedicated.classList.add("active");

        btn1.classList.remove("active");
        kvm.classList.remove("active");
    });

    serverBtn1.addEventListener("click", function () {
        serverBtn1.classList.add("active");
        amd.classList.add("active");

        serverBtn2.classList.remove("active");
        serverBtn3.classList.remove("active");
        intel.classList.remove("active");
        xeon.classList.remove("active");
    });

    serverBtn2.addEventListener("click", function () {
        serverBtn2.classList.add("active");
        intel.classList.add("active");

        serverBtn1.classList.remove("active");
        serverBtn3.classList.remove("active");
        amd.classList.remove("active");
        xeon.classList.remove("active");
    });

    serverBtn3.addEventListener("click", function () {
        serverBtn3.classList.add("active");
        xeon.classList.add("active");

        serverBtn2.classList.remove("active");
        serverBtn1.classList.remove("active");
        intel.classList.remove("active");
        amd.classList.remove("active");
    });
});

// --------------------------------- Slider Price Change -------------------------------------------

// Initializing Base prices, Ram , Connection  and DDost Protection Arrays
// The basePrices array assings the unmodified/base prices for the cards in order
// (basePrice[0] is for the first card and so on)
const basePrices = [
    100, 120, 110, 145, 180, 80, 135, 160, 230, 280, 320, 360, 60, 70, 80, 120,
    170, 195,
];
const ramArray = [64, 128];
const xeonRamArray = [32, 64, 128, 256, 512];
const connectionArray = ["10", "2x10"];
const ddosArray = ["Standard ", "Premium "];

// Getting all price and slider elements as arrays into variables
const priceElements = document.getElementsByClassName("price");

const ramTextElements = document.getElementsByClassName("ram-text");
const sliderElements = document.getElementsByClassName("ram-slider");

const çonnectionTextElements =
    document.getElementsByClassName("connection-text");
const connectionSliderElements =
    document.getElementsByClassName("connection-slider");

const ddosTextElements = document.getElementsByClassName("ddos-text");
const ddosSliderElements = document.getElementsByClassName("ddos-slider");
// Looping through slider element arrays and attaching event listeners
for (let i = 0; i < priceElements.length; i++) {
    sliderElements[i].addEventListener("input", () => updatePrice(i));
    connectionSliderElements[i].addEventListener("input", () => updatePrice(i));
    ddosSliderElements[i].addEventListener("input", () => updatePrice(i));
    updatePrice(i);
}

// Updating the price based on the selected RAM/Connectivity/DDoS Protection on the slider
function updatePrice(priceLevel) {
    const selectedRAMValue = parseInt(sliderElements[priceLevel].value);
    const selectedConnectionValue = parseInt(
        connectionSliderElements[priceLevel].value
    );
    const selectedDDosValue = parseInt(ddosSliderElements[priceLevel].value);
    // If statment that figures out which Ram Array to use based on the max size of the input
    let selectedRam;
    if (parseInt(sliderElements[priceLevel].max) === 4) {
        selectedRam = xeonRamArray[selectedRAMValue];
    } else {
        selectedRam = ramArray[selectedRAMValue];
    }

    const selectedConnectionSpeed = connectionArray[selectedConnectionValue];
    const selectedDDosSpeed = ddosArray[selectedDDosValue];
    // basePrice at the current priceLevel (the card the slider belongs to)
    const basePrice = basePrices[priceLevel];
    const totalPrice =
        basePrice +
        selectedRAMValue * 15 +
        selectedConnectionValue * 15 +
        selectedDDosValue * 15;

    // Changing the text for the price on the current card and the text above the
    // slider that is currently being used
    priceElements[priceLevel].textContent = `${totalPrice}`;
    ramTextElements[priceLevel].textContent = `${selectedRam}`;
    çonnectionTextElements[
        priceLevel
    ].textContent = `${selectedConnectionSpeed}`;
    ddosTextElements[priceLevel].textContent = `${selectedDDosSpeed}`;
}

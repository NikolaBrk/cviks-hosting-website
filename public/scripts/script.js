// ----------------------- Hero Text Animation -------------------------

// Constructor function that takes three parameters:
// el (the HTML element to be typed on), toRotate (an array of strings to be typed),
// and period (the duration of the pause between typing cycles)
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0; // Keeps track of the number of loops the program is on (per string not array)
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick(); // call the tick method to start the typing animation
    this.isDeleting = false; //property is initialized to false, indicating that the animation
    // is in typing mode
};

TxtType.prototype.tick = function () {
    // Calculates i to find which string of the array needs to be displayed
    // It does this by finding the remainder of loopNum when you divide it by toRotate.length
    // For example if the current loopNum is 7 and the array is always 4 ( 7 % 4 = 3) it
    // will display the last element in the toRotate array aka this.toRotate[3]
    // This code also ensure that the code can go on for forever
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    // This if statment check if the isDeleting variable is true or false and then either
    // removes 1 character from the txt string or adds 1 character
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // This part of the code injects the element, text and class into the HTML
    this.el.innerHTML = '<span class="wrap white--bar">' + this.txt + "</span>";

    // Here we assign a referance to the current TxtType instance to ensure that it's
    // accessible inside the setTimeout callback function. Otherwise the context of "this" can change
    // leading to some unintended behavior or errors.
    var that = this;

    // Delta is a random delay value to simulate a varying typing speed
    var delta = 200 - Math.random() * 100;

    // If the animation is in deleting mode the delay gets halved to
    // simulate the deletion always being faster
    if (this.isDeleting) {
        delta /= 2;
    }

    // Here the if statement checks weather or not we are in deleting mode and if the txt is completed
    // If we are not in deleting mode and the text is compelted we chage isDeleting to true to switch modes
    // If the text is empty and we are in deleting mode (isDeleting = ture) then we change modes
    // and increment the number of loops we are on
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    // Here we simply have a timeout function for the program to wait a bit before calling this function
    // again and repeating the loop
    setTimeout(function () {
        that.tick();
    }, delta);
};

// on loading the window we find all the elements with class name "typewrite" and add them into and array
// we the loop through the elements array and assign (in this case only 1) the texts from the html
// element "data-type" to "toRotate" and the speed of the typing from the "data-period"
// attribute into the "period" variable
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

// Code that makes the body fade out when an "a" element gets clicked
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const href = this.getAttribute("href");

            document.body.classList.add("fade-out");

            setTimeout(function () {
                window.location.href = href;
            }, 800);
        });
    });
});

// ----------------------- Hamburger Menu -------------------------

// The hamburger butten interaction to show the navigatio buttens for smaller screen sizes
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

// All the buttens for the server page to show the different hosting and CPU options
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

// --------------------------------- Server Slider Price Change -------------------------------------------

// Code to dynamicly change the prices when the sliders are being moved by the user

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

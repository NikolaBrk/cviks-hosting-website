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

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

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
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

// ----------------------- Page Transition -------------------------


document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent the default link behavior

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

// --------------------------------- Butten Activation -------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById("price-btn1");
    const btn2 = document.getElementById("price-btn2");
    const kvm = document.getElementById("kvm-root-prices");
    const dedicated = document.getElementById("dedicated-server-prices");

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
});

// --------------------------------- Slider Price Change -------------------------------

function priceCalculation(first, second, third) {
    return first + second + third;
}

// ----------------------- Starter Price and Text -------------------------

var starterRamPrice = 0;
var starterConnectivityPrice = 0;

const starterPrice = document.getElementById("starter-price");
const starterRamSlider = document.getElementById("starter-ram-slider");
const sliderRamText = document.getElementById("starter-ram-text");

starterRamSlider.addEventListener("input", () => {
    const sliderValue = parseInt(starterRamSlider.value);

    switch (sliderValue) {
        case 0:
            sliderRamText.textContent = "3";
            starterRamPrice = 0;
            starterPrice.textContent = priceCalculation(
                5,
                starterRamPrice,
                starterConnectivityPrice
            );
            break;
        case 1:
            sliderRamText.textContent = "6";
            starterRamPrice = 5;
            starterPrice.textContent = priceCalculation(
                5,
                starterRamPrice,
                starterConnectivityPrice
            );
            break;
        case 2:
            sliderRamText.textContent = "12";
            starterRamPrice = 10;
            starterPrice.textContent = priceCalculation(
                5,
                starterRamPrice,
                starterConnectivityPrice
            );
            break;
    }
});

const starterConnectivitySlider = document.getElementById(
    "starter-connection-slider"
);
const sliderConnectivityText = document.getElementById(
    "starter-connection-text"
);

starterConnectivitySlider.addEventListener("input", () => {
    const starterConnectivitySliderValue = parseInt(
        starterConnectivitySlider.value
    );

    switch (starterConnectivitySliderValue) {
        case 0:
            sliderConnectivityText.textContent = "10";
            starterConnectivityPrice = 0;
            starterPrice.textContent = priceCalculation(
                5,
                starterRamPrice,
                starterConnectivityPrice
            );
            break;
        case 1:
            sliderConnectivityText.textContent = "2x10";
            starterConnectivityPrice = 5;
            starterPrice.textContent = priceCalculation(
                5,
                starterRamPrice,
                starterConnectivityPrice
            );
            break;
    }
});

// ----------------------- Middle Price and Text -------------------------

var middleRamPrice = 0;
var middleConnectivityPrice = 0;

const middlePrice = document.getElementById("middle-price");
const middleRamSlider = document.getElementById("middle-ram-slider");
const middleRamText = document.getElementById("middle-ram-text");

middleRamSlider.addEventListener("input", () => {
    const sliderValue = parseInt(middleRamSlider.value);

    switch (sliderValue) {
        case 0:
            middleRamText.textContent = "3";
            middleRamPrice = 0;
            middlePrice.textContent = priceCalculation(
                10,
                middleRamPrice,
                middleConnectivityPrice
            );
            break;
        case 1:
            middleRamText.textContent = "6";
            middleRamPrice = 5;
            middlePrice.textContent = priceCalculation(
                10,
                middleRamPrice,
                middleConnectivityPrice
            );
            break;
        case 2:
            middleRamText.textContent = "12";
            middleRamPrice = 10;
            middlePrice.textContent = priceCalculation(
                10,
                middleRamPrice,
                middleConnectivityPrice
            );
            break;
    }
});

const middleConnectivitySlider = document.getElementById(
    "middle-connection-slider"
);
const middleConnectivityText = document.getElementById(
    "middle-connection-text"
);

middleConnectivitySlider.addEventListener("input", () => {
    const middleConnectivitySliderValue = parseInt(
        middleConnectivitySlider.value
    );

    switch (middleConnectivitySliderValue) {
        case 0:
            middleConnectivityText.textContent = "10";
            middleConnectivityPrice = 0;
            middlePrice.textContent = priceCalculation(
                10,
                middleRamPrice,
                middleConnectivityPrice
            );
            break;
        case 1:
            middleConnectivityText.textContent = "2x10";
            middleConnectivityPrice = 5;
            middlePrice.textContent = priceCalculation(
                10,
                middleRamPrice,
                middleConnectivityPrice
            );
            break;
    }
});

// ----------------------- Big Price and Text -------------------------

var bigRamPrice = 0;
var bigConnectivityPrice = 0;

const bigPrice = document.getElementById("big-price");
const bigRamSlider = document.getElementById("big-ram-slider");
const bigRamText = document.getElementById("big-ram-text");

bigRamSlider.addEventListener("input", () => {
    const sliderValue = parseInt(bigRamSlider.value);

    switch (sliderValue) {
        case 0:
            bigRamText.textContent = "3";
            bigRamPrice = 0;
            bigPrice.textContent = priceCalculation(
                15,
                bigRamPrice,
                bigConnectivityPrice
            );
            break;
        case 1:
            bigRamText.textContent = "6";
            bigRamPrice = 5;
            bigPrice.textContent = priceCalculation(
                15,
                bigRamPrice,
                bigConnectivityPrice
            );
            break;
        case 2:
            bigRamText.textContent = "12";
            bigRamPrice = 10;
            bigPrice.textContent = priceCalculation(
                15,
                bigRamPrice,
                bigConnectivityPrice
            );
            break;
    }
});

const bigConnectivitySlider = document.getElementById("big-connection-slider");
const bigConnectivityText = document.getElementById("big-connection-text");

bigConnectivitySlider.addEventListener("input", () => {
    const bigConnectivitySliderValue = parseInt(bigConnectivitySlider.value);

    switch (bigConnectivitySliderValue) {
        case 0:
            bigConnectivityText.textContent = "10";
            bigConnectivityPrice = 0;
            bigPrice.textContent = priceCalculation(
                15,
                bigRamPrice,
                bigConnectivityPrice
            );
            break;
        case 1:
            bigConnectivityText.textContent = "2x10";
            bigConnectivityPrice = 5;
            bigPrice.textContent = priceCalculation(
                15,
                bigRamPrice,
                bigConnectivityPrice
            );
            break;
    }
});

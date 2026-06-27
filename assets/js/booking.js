/*========================================================

SKYWARD AIRLINES

booking.js

Professional Booking System

=========================================================*/

class FlightBooking {

    constructor() {

        this.form = document.getElementById("bookingForm");

        this.passengers = 1;

        this.cabin = "Economy";

        this.baseFare = 5500;

        this.airports = [

            "Nairobi (NBO)",
            "Mombasa (MBA)",
            "Kisumu (KIS)",
            "Eldoret (EDL)",
            "Malindi (MYD)",
            "Ukunda (UKA)",
            "Entebbe (EBB)",
            "Kigali (KGL)",
            "Dar es Salaam (DAR)",
            "Zanzibar (ZNZ)"

        ];

        this.initialize();

    }

    initialize() {

        this.initializeAirportSuggestions();

        this.initializePassengerButtons();

        this.initializeCabinSelector();

        this.initializeTripSelector();

        this.initializeDateValidation();

        this.initializeForm();

        this.calculatePrice();

    }

    initializeAirportSuggestions() {

        const inputs = document.querySelectorAll(".airport-input");

        inputs.forEach(input => {

            input.addEventListener("input", () => {

                const value = input.value.toLowerCase();

                const list = input.nextElementSibling;

                if (!list) return;

                list.innerHTML = "";

                if (value.length < 1) return;

                this.airports.forEach(airport => {

                    if (airport.toLowerCase().includes(value)) {

                        const item = document.createElement("div");

                        item.className = "airport-item";

                        item.innerText = airport;

                        item.onclick = () => {

                            input.value = airport;

                            list.innerHTML = "";

                        };

                        list.appendChild(item);

                    }

                });

            });

        });

    }

    initializePassengerButtons() {

        const minus = document.getElementById("minusPassenger");

        const plus = document.getElementById("plusPassenger");

        const display = document.getElementById("passengerCount");

        if (!minus || !plus || !display) return;

        minus.onclick = () => {

            if (this.passengers > 1) {

                this.passengers--;

                display.innerText = this.passengers;

                this.calculatePrice();

            }

        };

        plus.onclick = () => {

            if (this.passengers < 9) {

                this.passengers++;

                display.innerText = this.passengers;

                this.calculatePrice();

            }

        };

    }

    initializeCabinSelector() {

        const cabin = document.getElementById("cabin");

        if (!cabin) return;

        cabin.addEventListener("change", () => {

            this.cabin = cabin.value;

            this.calculatePrice();

        });

    }

    initializeTripSelector() {

        const trip = document.getElementById("tripType");

        const returnContainer = document.getElementById("returnContainer");

        if (!trip || !returnContainer) return;

        trip.addEventListener("change", () => {

            if (trip.value === "oneway") {

                returnContainer.style.display = "none";

            } else {

                returnContainer.style.display = "block";

            }

        });

    }

    initializeDateValidation() {

        const departure = document.getElementById("departureDate");

        if (!departure) return;

        const today = new Date().toISOString().split("T")[0];

        departure.min = today;

    }

    calculatePrice() {

        let multiplier = 1;

        switch (this.cabin) {

            case "Premium Economy":

                multiplier = 1.35;

                break;

            case "Business":

                multiplier = 2;

                break;

            case "First Class":

                multiplier = 3;

                break;

            default:

                multiplier = 1;

        }

        const total = Math.round(

            this.baseFare *

            multiplier *

            this.passengers

        );

        const summary = document.getElementById("estimatedFare");

        if (summary) {

            summary.innerText =

                "KES " +

                total.toLocaleString();

        }

    }

    initializeForm() {

        if (!this.form) return;

        this.form.addEventListener("submit", e => {

            e.preventDefault();

            if (!this.validate()) return;

            this.showConfirmation();

        });

    }

    validate() {

        const required =

            this.form.querySelectorAll("[required]");

        let valid = true;

        required.forEach(field => {

            field.style.border = "";

            if (field.value.trim() === "") {

                field.style.border =

                    "2px solid red";

                valid = false;

            }

        });

        if (!valid) {

            alert("Please complete all required fields.");

        }

        return valid;

    }

    showConfirmation() {

        const modal = document.getElementById("bookingModal");

        if (!modal) {

            alert(

                "Booking submitted successfully."

            );

            return;

        }

        modal.style.display = "flex";

    }

}

document.addEventListener(

    "DOMContentLoaded",

    () => {

        new FlightBooking();

    }

);

/*====================================================

Close Modal

=====================================================*/

const closeButton =

document.getElementById("closeModal");

if(closeButton){

closeButton.addEventListener("click",()=>{

document.getElementById("bookingModal").style.display="none";

});

}

/*====================================================

Swap Airports

=====================================================*/

const swapButton=document.getElementById("swapRoute");

if(swapButton){

swapButton.addEventListener("click",()=>{

const from=document.getElementById("fromAirport");

const to=document.getElementById("toAirport");

const temp=from.value;

from.value=to.value;

to.value=temp;

});

}

/*====================================================

Live Clock

=====================================================*/

function updateClock(){

const clock=document.getElementById("currentTime");

if(!clock)return;

const now=new Date();

clock.innerHTML=now.toLocaleString();

}

setInterval(updateClock,1000);

updateClock();

/*====================================================

Random Flight Deals

=====================================================*/

const deals=[

"Save 15% on Nairobi → Mombasa",

"Business Class Upgrade Available",

"Weekend Special to Kisumu",

"Family Travel Discount",

"Free Extra Baggage Promotion"

];

const dealBox=document.getElementById("dealText");

if(dealBox){

let index=0;

setInterval(()=>{

index++;

if(index>=deals.length){

index=0;

}

dealBox.innerHTML=deals[index];

},5000);

}

/*====================================================

END

=====================================================*/
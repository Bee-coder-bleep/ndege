document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const requiredFields = form.querySelectorAll(
            "input[required], textarea"
        );

        let valid = true;

        requiredFields.forEach(field => {

            field.style.border = "";

            if (field.value.trim() === "") {

                field.style.border = "2px solid red";

                valid = false;

            }

        });

        if (!valid) {

            alert("Please complete all required fields.");

            return;

        }

        alert(
            "Thank you for contacting Skyward Airlines. Our team will respond shortly — or reach us instantly on WhatsApp at +254 785 871 084."
        );

        form.reset();

    });

});
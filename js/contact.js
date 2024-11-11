document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Clear previous errors
  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("subjectError").innerText = "";
  document.getElementById("messageError").innerText = "";

  // Form Validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  let isValid = true;

  // Name validation: more than 5 characters
  if (name.length <= 5) {
    document.getElementById("nameError").innerText =
      "Name must be more than 5 characters.";
    isValid = false;
  }

  // Email validation: valid email format
  if (!email) {
    document.getElementById("emailError").innerText = "Email is required.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("emailError").innerText =
      "Please enter a valid email.";
    isValid = false;
  }

  // Subject validation: more than 15 characters
  if (subject.length <= 15) {
    document.getElementById("subjectError").innerText =
      "Subject must be more than 15 characters.";
    isValid = false;
  }

  // Message validation: more than 25 characters
  if (message.length <= 25) {
    document.getElementById("messageError").innerText =
      "Message must be more than 25 characters.";
    isValid = false;
  }

  if (!isValid) return; // Stop submission if validation fails

  // Submit data via fetch API (AJAX)
  fetch("https://stianrostad.no/wordpress/wp-json/contact-form/v1/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, subject, message }),
  })
    .then((response) => {
      if (response.ok) {
        document.getElementById("formMessage").innerText =
          "Thank you! Your message has been sent.";
        document.getElementById("formMessage").style.color = "green";
        document.getElementById("contactForm").reset();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .catch((error) => {
      document.getElementById("formMessage").innerText =
        "There was a problem sending your message.";
      document.getElementById("formMessage").style.color = "red";
    });
});

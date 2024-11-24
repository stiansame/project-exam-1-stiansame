// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const clearButton = document.getElementById("clearForm");

  // Check if form exists before adding event listener
  if (!contactForm) {
    console.error("Contact form not found in the DOM");
    return;
  }

  // Helper function to show error
  const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.innerText = message;
    } else {
      console.error(`Error element ${elementId} not found`);
    }
  };

  // Helper function to clear error
  const clearError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.innerText = "";
    }
  };

  // Helper function to clear form message
  const clearFormMessage = () => {
    const formMessage = document.getElementById("formMessage");
    if (formMessage) {
      formMessage.innerText = "";
    }
  };

  // Clear form function
  const clearFormData = () => {
    contactForm.reset();
    ["nameError", "emailError", "subjectError", "messageError"].forEach(
      clearError
    );
    clearFormMessage();
  };

  // Add clear button event listener
  if (clearButton) {
    clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearFormData();
    });
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Clear all previous errors
    ["nameError", "emailError", "subjectError", "messageError"].forEach(
      clearError
    );

    // Get and validate form inputs
    const formData = {
      name: document.getElementById("name")?.value?.trim() ?? "",
      email: document.getElementById("email")?.value?.trim() ?? "",
      subject: document.getElementById("subject")?.value?.trim() ?? "",
      message: document.getElementById("message")?.value?.trim() ?? "",
    };

    // Validation rules
    const validationRules = [
      {
        field: "name",
        minLength: 5,
        errorId: "nameError",
        message: "Name must be more than 5 characters.",
      },
      {
        field: "subject",
        minLength: 15,
        errorId: "subjectError",
        message: "Subject must be more than 15 characters.",
      },
      {
        field: "message",
        minLength: 25,
        errorId: "messageError",
        message: "Message must be more than 25 characters.",
      },
    ];

    let isValid = true;

    // Check each validation rule
    validationRules.forEach((rule) => {
      if (formData[rule.field].length <= rule.minLength) {
        showError(rule.errorId, rule.message);
        isValid = false;
      }
    });

    // Email validation
    if (!formData.email) {
      showError("emailError", "Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showError("emailError", "Please enter a valid email.");
      isValid = false;
    }

    if (!isValid) return;

    // Submit data via fetch API
    fetch("https://stianrostad.no/wordpress/wp-json/contact-form/v1/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        const formMessage = document.getElementById("formMessage");
        if (!formMessage) {
          throw new Error("Form message element not found");
        }

        if (response.ok) {
          formMessage.innerText = "Thank you! Your message has been sent.";
          formMessage.style.color = "green";
          clearFormData();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        const formMessage = document.getElementById("formMessage");
        if (formMessage) {
          formMessage.innerText = "There was a problem sending your message.";
          formMessage.style.color = "red";
        }
        console.error("Error:", error);
      });
  });
});

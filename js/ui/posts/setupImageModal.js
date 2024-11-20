export function setupImageModal() {
	const postContainer = document.querySelector(".blog");
	const postContent = postContainer.querySelector(".postContent");
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");

	// Add click event listeners to all images within wp-block-image divs
	postContent.addEventListener("click", (e) => {
		const clickedImage = e.target.closest(".wp-block-image img");
		if (clickedImage) {
			// Get the full size image URL (assuming it's in the src attribute)
			const fullSizeUrl = clickedImage.src;

			// Set the modal image source
			modalImg.src = fullSizeUrl;
			modalImg.alt = clickedImage.alt || "Full size image";

			// Show the modal
			modal.classList.remove("hidden");
			modal.classList.add("visible");

			// Prevent scrolling on the body while modal is open
			document.body.style.overflow = "hidden";
		}
	});

	// Close modal when clicking outside the image
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	// Close modal when pressing escape key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeModal();
		}
	});

	function closeModal() {
		modal.classList.remove("visible");
		modal.classList.add("hidden");
		document.body.style.overflow = "";
		modalImg.src = ""; // Clear the image source
	}
}

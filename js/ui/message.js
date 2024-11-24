//Message function for API calls

export function createMessage(
  type = "error",
  message = "Oopsi! Something went wrong with the API-call! Check console for details!"
) {
  const htmlMessage = `<div class="message ${type}">${message}</div>`;
  return htmlMessage;
}

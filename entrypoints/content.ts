const injectLinkedInAIcon = () => {
  const waitForMessageInput = () => {
    // Select the LinkedIn message input div
    const messageInput = document.querySelector(
      ".msg-form__contenteditable"
    ) as HTMLElement;

    if (messageInput) {
      messageInput.style.position = "relative";
      const aiIcon = document.createElement("span");
      // Ai Icon Styling
      aiIcon.innerHTML = pencillAiIcon;
      aiIcon.style.position = "absolute";
      aiIcon.style.bottom = "10px";
      aiIcon.style.right = "10px";
      aiIcon.style.width = "24px";
      aiIcon.style.height = "24px";
      aiIcon.style.cursor = "pointer";
      aiIcon.style.zIndex = "1000";

      // event listener  on ai Icon click
      aiIcon.addEventListener("click", () => {
        // Create the overlay div
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "9998";

        // Create the popup div and style it
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.width = "45rem";
        popup.style.height = "11rem";
        popup.style.overflow = "hidden";
        popup.style.backgroundColor = "#fff";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        popup.style.border = "1px solid #ccc";
        popup.style.zIndex = "9999";
        popup.style.padding = "20px";
        popup.style.textAlign = "center";
        popup.style.borderRadius = "8px";
        popup.style.display = "flex";
        popup.style.flexDirection = "column";
        popup.style.justifyContent = "flex-start";

        // Custom scrollbar styling
        const style = document.createElement("style");
        style.textContent = `
          /* Modern scrollbar styles */
          ::-webkit-scrollbar {
            width: 8px;
          }
    
          ::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 4px;
          }
    
          ::-webkit-scrollbar-thumb:hover {
            background-color: #aaa;
          }
    
          ::-webkit-scrollbar-track {
            background-color: #f1f1f1;
          }
        `;
        document.head.appendChild(style);

        // Create the input field for the user prompt
        const inputWrapper = document.createElement("div");
        inputWrapper.style.width = "100%";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Your prompt";
        inputField.style.width = "100%";
        inputField.style.padding = "10px";
        inputField.style.border = "1px solid #ccc";
        inputField.style.borderRadius = "4px";
        inputField.style.fontSize = "14px";
        inputField.style.marginBottom = "5px";
        inputWrapper.appendChild(inputField);

        // Append the input field to the popup
        popup.appendChild(inputWrapper);

        // Create a container for the messages  (user and AI responses)
        const messageContainer = document.createElement("div");
        messageContainer.style.display = "flex";
        messageContainer.style.flexDirection = "column";
        messageContainer.style.alignItems = "flex-start";

        // insert the message container before the input field
        popup.insertBefore(messageContainer, popup.firstChild);

        // button wrapper for the generate button and insert button
        const buttonWrapper = document.createElement("div");
        buttonWrapper.style.display = "flex";
        buttonWrapper.style.justifyContent = "flex-end";
        buttonWrapper.style.width = "100%";
        buttonWrapper.style.gap = "10px";

        // Create the generate button and style it
        const generateButton = document.createElement("button");
        generateButton.style.display = "flex";
        generateButton.style.alignItems = "center";
        generateButton.style.padding = "5px 10px";
        generateButton.style.backgroundColor = "#007BFF";
        generateButton.style.color = "#fff";
        generateButton.style.border = "none";
        generateButton.style.borderRadius = "4px";
        generateButton.style.cursor = "pointer";
        generateButton.style.fontSize = "16px";
        generateButton.style.marginTop = "10px";

        const generateIcon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        generateIcon.setAttribute("width", "16");
        generateIcon.setAttribute("height", "16");
        generateIcon.setAttribute("viewBox", "0 0 25 25");
        generateIcon.innerHTML = buttonGeneraterIcon;
        generateIcon.style.marginRight = "6px";
        generateButton.appendChild(generateIcon);
        generateButton.appendChild(document.createTextNode("Generate"));

        // Append the generate button to the button wrapper
        buttonWrapper.appendChild(generateButton);

        // Append the button wrapper to the popup
        popup.appendChild(buttonWrapper);

        let insertButtonAdded = false;
        let userMessageAdded = false;
        let currentResponse = "";
        // Event listener for the generate button
        generateButton.addEventListener("click", () => {
          const userInput = inputField.value.trim();

          // Check if the input field is empty
          if (!userInput) {
            alert("Please enter a prompt before generating a response.");
            return;
          }
          generateButton.textContent = "Generating...";
          generateButton.disabled = true;
          popup.style.height = "20rem";
          popup.style.overflow = "auto";

          // Add user message only once
          if (!userMessageAdded) {
            // Add the user message to the message container
            const userMessage = document.createElement("div");
            userMessage.textContent = userInput;
            userMessage.style.textAlign = "right";
            userMessage.style.backgroundColor = "#DFE1E7";
            userMessage.style.padding = "10px";
            userMessage.style.borderRadius = "10px";
            userMessage.style.margin = "10px 0";
            userMessage.style.maxWidth = "70%";
            userMessage.style.alignSelf = "flex-end";
            messageContainer.appendChild(userMessage);
            userMessageAdded = true;
          }

          // AI response message
          const responseMessage = document.createElement("div");
          responseMessage.textContent =
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask. ";
          responseMessage.style.textAlign = "left";
          responseMessage.style.backgroundColor = "#DBEAFE";
          responseMessage.style.padding = "10px";
          responseMessage.style.borderRadius = "10px";
          responseMessage.style.margin = "10px 0";
          responseMessage.style.maxWidth = "70%";
          responseMessage.style.alignSelf = "flex-start";
          messageContainer.appendChild(responseMessage);
          currentResponse =
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask. "; // Set current response

          // Clear the input field after generating the response
          inputField.value = "";

          // Add the "Insert" button after the response appears (only if not already added)
          if (!insertButtonAdded) {
            // Create the Insert button and style it
            const insertButton = document.createElement("button");
            insertButton.style.display = "flex";
            insertButton.style.alignItems = "center";
            insertButton.style.padding = "5px 10px";
            insertButton.style.backgroundColor = "white";
            insertButton.style.color = "black";
            insertButton.style.border = "1px solid #ccc";
            insertButton.style.borderRadius = "4px";
            insertButton.style.cursor = "pointer";
            insertButton.style.marginTop = "10px";
            const insertIcon = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg"
            );
            insertIcon.setAttribute("width", "12");
            insertIcon.setAttribute("height", "14");
            insertIcon.setAttribute("viewBox", "0 0 16 16");
            insertIcon.innerHTML = insertButtonIcon;
            insertIcon.style.marginRight = "8px";
            insertButton.appendChild(insertIcon);
            insertButton.appendChild(document.createTextNode("Insert"));
            // Append the Insert button before the Generate button
            buttonWrapper.insertBefore(insertButton, generateButton);
            insertButtonAdded = true;

            // Event listener for Insert button
            insertButton.addEventListener("click", () => {
              const messageInput = document.querySelector(
                ".msg-form__contenteditable"
              ) as HTMLElement;

              if (messageInput) {
                // Select the `p` tag inside `messageInput`
                const pTag = messageInput.querySelector("p");

                if (pTag) {
                  // Set the current response inside the `p` tag
                  pTag.innerText = currentResponse + pTag.innerText;
                } else {
                  // If no `p` tag is found, create one and insert it
                  const newP = document.createElement("p");
                  newP.innerText = currentResponse;
                  messageInput.appendChild(newP);
                }
              }
              // Select the placeholder element and remove its attribute
              const messagePlaceholder = document.querySelector(
                ".msg-form__placeholder"
              ) as HTMLElement;

              if (messagePlaceholder) {
                messagePlaceholder.removeAttribute("data-placeholder");
              }
              popup.remove();
              overlay.remove();
            });
          }

          // Change the generate button to "Regenerate"
          generateButton.textContent = "Regenerate";
          generateButton.disabled = true;

          // Create an icon for the Regenerate button
          const regenerateIcon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          regenerateIcon.setAttribute("width", "14");
          regenerateIcon.setAttribute("height", "14");
          regenerateIcon.setAttribute("viewBox", "0 0 20 20");
          regenerateIcon.innerHTML = reGenerateButtonIcon;
          regenerateIcon.style.marginRight = "8px";
          generateButton.innerHTML = "";
          generateButton.appendChild(regenerateIcon);
          generateButton.appendChild(document.createTextNode("Regenerate"));
        });

        // Add event listener to overlay to close the popup
        overlay.addEventListener("click", () => {
          popup.remove();
          overlay.remove();
        });

        // Prevent click events inside the popup from closing it
        popup.addEventListener("click", (event) => {
          event.stopPropagation();
        });

        // Append the popup and overlay to the document body
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
      });

      // Show the AI icon when the input is focused
      messageInput.addEventListener("focus", () => {
        messageInput.appendChild(aiIcon);
      });

      // Hide the AI icon when the input loses focus
      messageInput.addEventListener("blur", () => {
        messageInput.removeChild(aiIcon);
      });
    } else {
      setTimeout(waitForMessageInput, 100); // Retry after 100ms if the input is not found
    }
  };

  waitForMessageInput(); // Call the function to start looking for the input
};

// Define content script configuration
export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    console.log("LinkedIn AI Extension content script running.");
    injectLinkedInAIcon();
  },
});

const pencillAiIcon = `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.4667 8.73332C15.4667 8.88655 15.4063 9.03351 15.2989 9.14187C15.1915 9.25022 15.0458 9.3111 14.8938 9.3111H13.7482V10.4667C13.7482 10.6199 13.6879 10.7668 13.5804 10.8752C13.473 10.9836 13.3273 11.0444 13.1754 11.0444C13.0235 11.0444 12.8778 10.9836 12.7703 10.8752C12.6629 10.7668 12.6026 10.6199 12.6026 10.4667V9.3111H11.4569C11.305 9.3111 11.1593 9.25022 11.0519 9.14187C10.9445 9.03351 10.8841 8.88655 10.8841 8.73332C10.8841 8.58008 10.9445 8.43312 11.0519 8.32477C11.1593 8.21641 11.305 8.15554 11.4569 8.15554H12.6026V6.99998C12.6026 6.84675 12.6629 6.69979 12.7703 6.59143C12.8778 6.48308 13.0235 6.42221 13.1754 6.42221C13.3273 6.42221 13.473 6.48308 13.5804 6.59143C13.6879 6.69979 13.7482 6.84675 13.7482 6.99998V8.15554H14.8938C15.0458 8.15554 15.1915 8.21641 15.2989 8.32477C15.4063 8.43312 15.4667 8.58008 15.4667 8.73332ZM1.719 2.95554H2.86464V4.11109C2.86464 4.26433 2.92499 4.41129 3.03241 4.51965C3.13984 4.628 3.28554 4.68887 3.43746 4.68887C3.58938 4.68887 3.73508 4.628 3.8425 4.51965C3.94993 4.41129 4.01028 4.26433 4.01028 4.11109V2.95554H5.15592C5.30784 2.95554 5.45354 2.89467 5.56096 2.78631C5.66839 2.67796 5.72874 2.531 5.72874 2.37776C5.72874 2.22453 5.66839 2.07757 5.56096 1.96921C5.45354 1.86086 5.30784 1.79998 5.15592 1.79998H4.01028V0.644428C4.01028 0.491192 3.94993 0.344232 3.8425 0.235878C3.73508 0.127523 3.58938 0.0666504 3.43746 0.0666504C3.28554 0.0666504 3.13984 0.127523 3.03241 0.235878C2.92499 0.344232 2.86464 0.491192 2.86464 0.644428V1.79998H1.719C1.56708 1.79998 1.42138 1.86086 1.31396 1.96921C1.20653 2.07757 1.14618 2.22453 1.14618 2.37776C1.14618 2.531 1.20653 2.67796 1.31396 2.78631C1.42138 2.89467 1.56708 2.95554 1.719 2.95554ZM10.8841 11.6222H10.3113V11.0444C10.3113 10.8912 10.2509 10.7442 10.1435 10.6359C10.0361 10.5275 9.89039 10.4667 9.73847 10.4667C9.58655 10.4667 9.44085 10.5275 9.33343 10.6359C9.226 10.7442 9.16565 10.8912 9.16565 11.0444V11.6222H8.59283C8.44091 11.6222 8.29521 11.6831 8.18779 11.7914C8.08036 11.8998 8.02001 12.0467 8.02001 12.2C8.02001 12.3532 8.08036 12.5002 8.18779 12.6085C8.29521 12.7169 8.44091 12.7778 8.59283 12.7778H9.16565V13.3555C9.16565 13.5088 9.226 13.6557 9.33343 13.7641C9.44085 13.8724 9.58655 13.9333 9.73847 13.9333C9.89039 13.9333 10.0361 13.8724 10.1435 13.7641C10.2509 13.6557 10.3113 13.5088 10.3113 13.3555V12.7778H10.8841C11.036 12.7778 11.1817 12.7169 11.2892 12.6085C11.3966 12.5002 11.4569 12.3532 11.4569 12.2C11.4569 12.0467 11.3966 11.8998 11.2892 11.7914C11.1817 11.6831 11.036 11.6222 10.8841 11.6222ZM13.4124 3.53332L3.43746 13.5946C3.22263 13.8111 2.93135 13.9328 2.62764 13.9328C2.32392 13.9328 2.03264 13.8111 1.81781 13.5946L0.335642 12.101C0.229232 11.9937 0.144822 11.8663 0.0872316 11.7261C0.0296415 11.5859 0 11.4356 0 11.2838C0 11.1321 0.0296415 10.9818 0.0872316 10.8416C0.144822 10.7014 0.229232 10.574 0.335642 10.4667L10.3113 0.405373C10.4177 0.298041 10.544 0.2129 10.683 0.154812C10.822 0.0967231 10.971 0.0668251 11.1215 0.0668251C11.2719 0.0668251 11.4209 0.0967231 11.5599 0.154812C11.699 0.2129 11.8253 0.298041 11.9317 0.405373L13.4124 1.89893C13.5188 2.00623 13.6032 2.13363 13.6608 2.27385C13.7184 2.41407 13.748 2.56435 13.748 2.71612C13.748 2.86789 13.7184 3.01818 13.6608 3.1584C13.6032 3.29861 13.5188 3.42601 13.4124 3.53332ZM12.6026 2.71648L11.1211 1.22221L8.82984 3.53332L10.3113 5.0276L12.6026 2.71648Z" fill="#2563EB"/>
</svg>
`;

const buttonGeneraterIcon = `<svg fill="none" ">
<path d="M24.456 11.6075L2.45599 0.607504C2.28356 0.521271 2.08988 0.486719 1.89827 0.508009C1.70665 0.529299 1.52528 0.605523 1.37599 0.727504C1.23341 0.846997 1.12699 1.00389 1.0687 1.18055C1.0104 1.35721 1.00254 1.54662 1.04599 1.7275L4.00599 12.4975L1.00599 23.2375C0.965214 23.3886 0.960455 23.5471 0.992092 23.7003C1.02373 23.8535 1.09088 23.9972 1.18815 24.1198C1.28541 24.2423 1.41008 24.3403 1.55212 24.4059C1.69416 24.4715 1.84962 24.5029 2.00599 24.4975C2.16253 24.4966 2.31667 24.4589 2.45599 24.3875L24.456 13.3875C24.6198 13.3036 24.7573 13.1761 24.8532 13.0191C24.9492 12.862 25 12.6816 25 12.4975C25 12.3135 24.9492 12.133 24.8532 11.9759C24.7573 11.8189 24.6198 11.6914 24.456 11.6075ZM3.55599 21.6075L5.76599 13.4975H15.006V11.4975H5.76599L3.55599 3.3875L21.766 12.4975L3.55599 21.6075Z" fill="white"/>
</svg>`;

const insertButtonIcon = `<svg  fill="none" >
<path d="M6.1 12.3666V1.43331C6.1 1.05553 6.228 0.739087 6.484 0.483976C6.74 0.228865 7.05644 0.100864 7.43333 0.0999756C7.81111 0.0999756 8.128 0.227976 8.384 0.483976C8.64 0.739976 8.76756 1.05642 8.76667 1.43331V12.3666L12.6333 8.49998C12.8778 8.25553 13.1889 8.13331 13.5667 8.13331C13.9444 8.13331 14.2556 8.25553 14.5 8.49998C14.7444 8.74442 14.8667 9.05553 14.8667 9.43331C14.8667 9.81109 14.7444 10.1222 14.5 10.3666L8.36667 16.5C8.1 16.7666 7.78889 16.9 7.43333 16.9C7.07778 16.9 6.76667 16.7666 6.5 16.5L0.366666 10.3666C0.122222 10.1222 0 9.81109 0 9.43331C0 9.05553 0.122222 8.74442 0.366666 8.49998C0.611111 8.25553 0.922222 8.13331 1.3 8.13331C1.67778 8.13331 1.98889 8.25553 2.23333 8.49998L6.1 12.3666Z" fill="#666D80"/>
</svg>`;

const reGenerateButtonIcon = `<svg  fill="none" ">
<path d="M8.5 3.24541V0L4.25 4.32724L8.5 8.65459V5.40903C12.006 5.40903 14.875 8.32995 14.875 11.9C14.875 12.9818 14.6094 14.0098 14.131 14.929L15.6719 16.4978C16.5217 15.1454 17 13.5766 17 11.9C17 7.14005 13.1749 3.24541 8.5 3.24541ZM8.5 18.391C4.9937 18.391 2.125 15.4698 2.125 11.9C2.125 10.8182 2.39062 9.79046 2.8687 8.87081L1.32812 7.30224C0.478072 8.60041 0 10.2232 0 11.9C0 16.6599 3.82511 20.5546 8.5 20.5546V23.8L12.75 19.4728L8.5 15.1454V18.391Z" fill="white"/>
</svg>`;

document.addEventListener("DOMContentLoaded", () => {
    const userMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const logoutButton = document.getElementById("logout-button");
    const currentUsername = sessionStorage.getItem("currentUsername");

    // Display the username in the username-display <div>
    const usernameDisplay = document.getElementById("username-display");
    if (currentUsername) {
        usernameDisplay.textContent = `USER:${currentUsername}`;
    }

    // Display messages from local storage on page load
    displayMessages();

    // Add event listener for the "Send" butt1
    sendButton.addEventListener("click", () => {
        const messageText = userInput.value.trim();
        if (messageText === "") {
            return;
        }

        // Create a message object that includes the username
        const currentUsername = sessionStorage.getItem("currentUsername");
        const message = {
            username: currentUsername,
            text: messageText
        };

        // Save the message in localStorage for demonstration purposes
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));

        displayMessages();
        //userMessages.innerHTML += `<strong>${message.username}:</strong> ${message.text}<br>`;
        userInput.value = "";
    });
    
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            // Trigger a click on the "Send" button when Enter key is pressed
            document.getElementById("send-button").click();
        }
    });
    

    // Add event listener for the "Logout" button
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            sessionStorage.removeItem("currentUsername");
            window.location.href = "login.html"; // Redirect to the login page after logout
        });
    }

    // Display messages from localStorage
    function displayMessages() {
        //const messages = JSON.parse(localStorage.getItem("messages")) || [];
        const messages = [
            //{ username: "User1", text: "Hello, there!" },
            //{ username: "User2", text: "Hi, User1!" },
        ];
        userMessages.innerHTML = messages.map(msg => `<strong>${msg.username}:</strong> ${msg.text}`).join("<br>");
        
    }
    setInterval(() => {
        console.log("Fetching new messages..."); // Check if this message appears in the console
        fetchNewMessages();
    }, 1000);

    function fetchNewMessages() {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        const currentMessageCount = userMessages.childElementCount;
        if (messages.length > currentMessageCount) {
            const newMessages = messages.slice(currentMessageCount);
            newMessages.forEach(msg => {
                const messageElement = document.createElement("div");
                messageElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
                userMessages.appendChild(messageElement);
            });
        }
    }
});
    


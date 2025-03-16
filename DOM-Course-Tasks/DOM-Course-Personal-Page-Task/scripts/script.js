const feedbacksContainer = document.querySelector(".feedbacks-container");

document.querySelector("#feedbacks-form").addEventListener("submit", (event) => {
    event.preventDefault();
    let eventTarget = event.target;
    
    let feedbackContent = document.createElement("p");
    feedbackContent.innerText = eventTarget.children[1].value;

    let feedbackName = document.createElement("h2");
    feedbackName.innerText = eventTarget.children[2].value;

    let feedbackInstance = document.createElement("article");
    
    feedbackInstance.classList.add("feedback-instance");
    feedbackInstance.append(feedbackName);
    feedbackInstance.append(feedbackContent);

    feedbacksContainer.append(feedbackInstance);
});




const commentsData = [];
const commentsContainer = document.getElementById("comments-container");
const commentInput = document.getElementById("comment-input");
const commentButton = document.getElementById("comment-btn");

function createCommentElement(comment, isFirstLevel = false) {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.style.marginLeft = isFirstLevel ? "0px" : "20px";
    commentDiv.innerHTML = `
    <p>${comment.text}</p>
    <div class="actions">
        <button class="reply-btn">Reply</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    </div>
    <div class="replies-container"></div>
    `;

    const replyBtn = commentDiv.querySelector(".reply-btn");
    replyBtn.addEventListener("click", () => {
        commentDiv.querySelector(".replies-container").appendChild(createReplyInput(comment, commentDiv));
    });

    return commentDiv;
}

commentButton.addEventListener("click", () => {
    const commentText = commentInput.value.trim();

    if (commentText) {
        const newComment = { id: Date.now(), text: commentText, replies: [] };
        commentsData.push(newComment);
        commentsContainer?.appendChild(createCommentElement(newComment, true));
        commentInput.value = "";
    }
});

function createReplyInput(comment, parentContainer) {
    const replyInput = document.createElement("input");
    replyInput.type = "text";
    replyInput.placeholder = "Reply to this comment";

    const replyButton = document.createElement("button");
    replyButton.textContent = "Reply";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    const replyContainer = document.createElement("div");
    replyContainer.className = "replyContainer";
    replyContainer.appendChild(replyInput);
    replyContainer.appendChild(replyButton);
    replyContainer.appendChild(cancelButton);

    replyButton.addEventListener("click", () => {
        const replyText = replyInput.value.trim();

        if (replyText) {
            const newReply = { id: Date.now(), text: replyText, replies: [] };
            comment.replies.push(newReply);
            replyContainer.remove();

            parentContainer.querySelector(".replies-container").appendChild(createCommentElement(newReply));
        }
    });

    return replyContainer;
}

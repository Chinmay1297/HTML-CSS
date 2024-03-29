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
    <div class="btn-actions">
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

    const repliesContainer = commentDiv.querySelector(".replies-container");
    const editBtn = commentDiv.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        console.log("commentsData:", commentsData);

        let buttons = commentDiv.querySelector(".btn-actions");
        buttons.style.display = "none";

        let saveBtn = document.createElement("button");
        let cancelBtn = document.createElement("button");

        saveBtn.classList.add("save-btn");
        saveBtn.textContent = "Save";

        cancelBtn.classList.add("cancel-btn");
        cancelBtn.textContent = "Cancel";

        commentDiv.insertBefore(saveBtn, repliesContainer);
        commentDiv.insertBefore(cancelBtn, repliesContainer);

        let commentTag = commentDiv.querySelector("p");
        commentTag.contentEditable = true;
        commentTag.focus();

        cancelBtn.addEventListener("click", () => {
            commentTag.contentEditable = false;
            commentTag.textContent = comment.text;
            buttons.style.display = "inline-block";
            commentDiv.removeChild(cancelBtn);
            commentDiv.removeChild(saveBtn);
        });

        saveBtn.addEventListener("click", () => {
            comment.text = commentTag.textContent;
            commentTag.contentEditable = false;
            buttons.style.display = "inline-block";
            commentDiv.removeChild(cancelBtn);
            commentDiv.removeChild(saveBtn);
        });
    });

    const deleteBtn = commentDiv.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        function deleteObjectById(array, targetId) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === targetId) {
                    array.splice(i, 1);
                    return true;
                }

                if (array[i].replies && array[i].replies.length > 0) {
                    if (deleteObjectById(array[i].replies, targetId)) {
                        return true;
                    }
                }
            }
            return false;
        }

        deleteObjectById(commentsData, comment.id);
        commentDiv.remove();
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

    cancelButton.addEventListener("click", () => {
        replyContainer.remove();
    });

    return replyContainer;
}

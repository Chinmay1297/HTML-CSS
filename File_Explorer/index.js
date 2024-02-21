//array to contain the entire folder structure
const explorerData = [];

const parentContainer = document.querySelector(".parentContainer");
const parentFolder = document.getElementById("parentFolder");
const parentFile = document.getElementById("parentFile");

parentFile.addEventListener("click", () => {
    const item = createItemInput(explorerData, parentContainer, null, true);
    parentContainer.appendChild(item);
});

parentFolder.addEventListener("click", () => {
    const item = createItemInput(explorerData, parentContainer, "file", true);
    parentContainer.appendChild(item);
});

function createItemInput(item, parentContainer, type, isFirstLevel) {
    const itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.placeholder = type === "file" ? "File name..." : "Folder name...";

    const addButton = document.createElement("button");
    addButton.textContent = type === "file" ? "Add file" : "Add folder";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    const createItemContainer = document.createElement("div");
    createItemContainer.className = "createItemContainer";
    createItemContainer.appendChild(itemInput);
    createItemContainer.appendChild(addButton);
    createItemContainer.appendChild(cancelButton);
    createItemContainer.style.marginLeft = !isFirstLevel && "20px";

    return createItemContainer;
}


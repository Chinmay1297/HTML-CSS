//array to contain the entire folder structure
const explorerData = [];

const parentContainer = document.querySelector(".parentContainer");
const parentFolder = document.getElementById("parentFolder");
const parentFile = document.getElementById("parentFile");

parentFile.addEventListener("click", () => {
    const item = createItemInput(explorerData, parentContainer, "file", true);
    parentContainer.appendChild(item);
});

parentFolder.addEventListener("click", () => {
    const item = createItemInput(explorerData, parentContainer, null, true);
    parentContainer.appendChild(item);
});

function createFolderOrFileElement(item, type = null, isFirstLevel) {
    const explorerDiv = document.createElement("div");
    explorerDiv.className = "item";

    if (type === "file") {
        explorerDiv.innerHTML = `
            <div class="container">
                <div class="file-info">
                    <img src="./file.svg" class="file"/>
                    <p>${item.text}</p>
                </div>

                <div class="actions">
                    <img src="./edit.svg" class="edit-btn"/>
                    <img src="./delete.svg" class="delete-btn"/>
                </div>
            </div>
        `;
    } else {
        explorerDiv.innerHTML = `
            <div class="container">
                <div class="folder-info">
                    <img src="./arrow-up.svg" class="arrow" id="up"/>
                    <img src="./folder.svg" class="folder"/>
                    <p>${item.text}</p>
                </div>

                <div class="actions">
                    <img src="./folder-add.svg" class="addFolder"/>
                    <img src="./file-add.svg" class="addFile"/>
                    <img src="./edit.svg" class="edit-btn"/>
                    <img src="./delete.svg" class="delete-btn"/>
                </div>
            </div>

            <div class="items-container"></div>
        `;
    }

    return explorerDiv;
}

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

    addButton.addEventListener("click", () => {
        const itemText = itemInput.value.trim();

        if (itemText) {
            const newItem = type === "file"
                ? { id: Date.now(), text: itemText }
                : { id: Date.now(), text: itemText, items: [] };

            isFirstLevel ? item.push(newItem) : item.items.push(newItem);
            if (isFirstLevel) {
                parentContainer.appendChild(createFolderOrFileElement(
                    newItem,
                    type === "file" && "file",
                    isFirstLevel
                ));
            }
            else {

            }
        }
    })

    cancelButton.addEventListener("click", () => {
        createItemContainer.remove();
    })

    return createItemContainer;
}


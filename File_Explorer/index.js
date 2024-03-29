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

    if (isFirstLevel) {
        explorerDiv.style.marginLeft = type === "file" && "30px";
    }
    else {
        explorerDiv.style.marginLeft = type === "file" ? "60px" : "30px";
    }

    if (type === "file") {
        explorerDiv.innerHTML = `
            <div class="container">
                <div class="file-info">
                    <img src="./assets/file.svg" class="file"/>
                    <p>${item.text}</p>
                </div>

                <div class="actions">
                    <img src="./assets/edit.svg" class="edit-btn"/>
                    <img src="./assets/delete.svg" class="delete-btn"/>
                </div>
            </div>
        `;
    } else {
        explorerDiv.innerHTML = `
            <div class="container">
                <div class="folder-info">
                    <img src="./assets/arrow-up.svg" class="arrow" id="up"/>
                    <img src="./assets/folder.svg" class="folder"/>
                    <p>${item.text}</p>
                </div>

                <div class="actions">
                    <img src="./assets/folder-add.svg" class="addFolder"/>
                    <img src="./assets/file-add.svg" class="addFile"/>
                    <img src="./assets/edit.svg" class="edit-btn"/>
                    <img src="./assets/delete.svg" class="delete-btn"/>
                </div>
            </div>

            <div class="items-container"></div>
        `;
    }

    const itemsContainer = explorerDiv?.querySelector(".items-container");
    const arrow = explorerDiv?.querySelector(".arrow");
    const folderInfo = explorerDiv?.querySelector(".folder-info");

    folderInfo?.addEventListener("click", () => {
        if (!itemsContainer.innerHTML) {        //optional
            if (arrow.id === "up") {
                arrow.src = "./assets/arrow-down.svg";
                arrow.id = "down";
            } else if (arrow.id === "down") {
                arrow.src = "./assets/arrow-up.svg";
                arrow.id = "down";
            }

            return;
        }
        if (itemsContainer.style.display === "none") {
            arrow.src = "./assets/arrow-down.svg";
            itemsContainer.style.display = "block";
        }
        else {
            arrow.src = "./assets/arrow-up.svg";
            itemsContainer.style.display = "none";
        }
    });

    const addFolderBtn = explorerDiv?.querySelector(".addFolder");
    addFolderBtn?.addEventListener("click", () => {
        arrow.src = "./assets/arrow-down.svg";
        explorerDiv.querySelector(".items-container").appendChild(createItemInput(item, explorerDiv));
    });

    const addFileBtn = explorerDiv?.querySelector(".addFile");
    addFileBtn?.addEventListener("click", () => {
        arrow.src = "./assets/arrow-down.svg";
        explorerDiv.querySelector(".items-container").appendChild(createItemInput(item, explorerDiv, "file"));
    });

    const deleteBtn = explorerDiv?.querySelector(".delete-btn");
    deleteBtn?.addEventListener("click", () => {
        function deleteObjectById(array, targetId) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === targetId) {
                    array.splice(i, 1);
                    return true;
                }

                if (array[i].items && array[i].items.length > 0) {
                    if (deleteObjectById(array[i], item.id)) return true;
                }
            }

            return false;
        }
        deleteObjectById(explorerData, item.id);
        explorerDiv.remove();
    });

    const editBtn = explorerDiv?.querySelector(".edit-btn");
    editBtn?.addEventListener("click", () => {
        if (document.querySelector(".save-btn")) {
            document.querySelector(".save-btn").remove();
            document.querySelector(".cancel-btn").remove();
        }
        let saveBtn = document.createElement("button");
        let cancelBtn = document.createElement("button");

        saveBtn.classList.add("save-btn");
        saveBtn.textContent = "Save";
        cancelBtn.classList.add("cancel-btn");
        cancelBtn.textContent = "Cancel";
        explorerDiv.insertBefore(saveBtn, itemsContainer);
        explorerDiv.insertBefore(cancelBtn, itemsContainer);

        let itemName = explorerDiv?.querySelector("p");
        itemName.contentEditable = true;
        itemName.focus();

        cancelBtn.addEventListener("click", () => {
            console.log("explorerData:", explorerData);
            itemName.textContent = item.text;
            explorerDiv.removeChild(cancelBtn);
            explorerDiv.removeChild(saveBtn);
            itemName.contentEditable = false;
        });

        saveBtn.addEventListener("click", () => {
            item.text = itemName.textContent;
            explorerDiv.removeChild(cancelBtn);
            explorerDiv.removeChild(saveBtn);
            itemName.contentEditable = false;
        });
    });

    return explorerDiv;
}

function createItemInput(item, parentContainer, type, isFirstLevel) {
    if (document.querySelector(".createItemContainer")) {
        document.querySelector(".createItemContainer").remove();
    }
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
            createItemContainer.remove();

            if (isFirstLevel) {
                parentContainer.appendChild(createFolderOrFileElement(
                    newItem,
                    type === "file" && "file",
                    isFirstLevel
                ));
            }
            else {
                parentContainer.querySelector(".items-container")
                    .appendChild(
                        createFolderOrFileElement(
                            newItem,
                            type === "file" && "file"
                        )
                    );
            }
        }
    })

    cancelButton.addEventListener("click", () => {
        createItemContainer.remove();
    })

    return createItemContainer;
}


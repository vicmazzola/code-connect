const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({url: reader.result, nome: file.name})
        }

        reader.onerror = () => {
            reject(`Error reading the file ${file.name}`)
        }

        reader.readAsDataURL(file)
    })
}

const mainImage = document.querySelector(".img-main");
const imgName = document.querySelector(".img-name-container p");

inputUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (file) {
        try {
            const fileContent = await readFileContent(file);
            mainImage.src = fileContent.url;
            imgName.textContent = fileContent.nome;
        } catch (error) {
            console.error("Error reading the file")
        }
    }
})

const inputTags = document.getElementById("input-tags");
const tagList = document.getElementById("tag-list");

inputTags.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const textTag = inputTags.value.trim();
        if (textTag !== "") {
            const newTag = document.createElement("li");
            newTag.innerHTML = `<p>${textTag}</p> <img src="./img/close-black.svg" class="remove-tag">`
            tagList.appendChild(newTag);
            tagList.value = "";
        }
    }
})

tagList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-tag")) {
        const tagToRemove = event.target.parentElement;
        tagList.removeChild(tagToRemove);
    }
})

const availableTags = ["Front-end", "Programming", "Back-end", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript", "Java"];

async function checkAvailableTags(textTag) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(availableTags.includes(textTag));
        }, 1000);

    })
}
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
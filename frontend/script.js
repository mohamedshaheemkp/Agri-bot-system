function showSection(section) {

    document.querySelectorAll(".section")
        .forEach(s => s.classList.add("hidden"))

    document.getElementById(section)
        .classList.remove("hidden")

}

/* Image Preview */

document.getElementById("imageUpload")
    .onchange = function (e) {

        const file = e.target.files[0]

        document.getElementById("preview")
            .src = URL.createObjectURL(file)

    }

/* Detect Disease */

async function detect() {

    const fileInput = document.getElementById("imageUpload")

    const formData = new FormData()

    formData.append("file", fileInput.files[0])

    const res = await fetch(
        "http://127.0.0.1:8000/detect",
        {
            method: "POST",
            body: formData
        }
    )

    const data = await res.json()

    document.getElementById("resultBox")
        .innerHTML = JSON.stringify(data)

}

/* Camera */

function startCamera() {

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {

            document.getElementById("video").srcObject = stream

        })

}

/* Chatbot */

async function sendMessage() {

    let msg = document.getElementById("userInput").value

    document.getElementById("chatbox")
        .innerHTML += `<p><b>You:</b> ${msg}</p>`

    const res = await fetch(
        `http://127.0.0.1:8000/chatbot?message=${msg}`,
        { method: "POST" }
    )

    const data = await res.json()

    document.getElementById("chatbox")
        .innerHTML += `<p><b>Bot:</b> ${data.response}</p>`

}
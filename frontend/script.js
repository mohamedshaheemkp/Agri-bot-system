async function detect(){

const file=document.getElementById("imageUpload").files[0]

const formData=new FormData()

formData.append("file",file)

const res=await fetch(
"http://127.0.0.1:8000/detect",
{
method:"POST",
body:formData
}
)

const data=await res.json()

let html=""

data.detections.forEach(d=>{

html+=`
<h2>${d.disease}</h2>
<p>Confidence: ${d.confidence}</p>
<p>${d.explanation}</p>
<hr>
`

})

document.getElementById("result").innerHTML=html

}
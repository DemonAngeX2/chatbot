const dialog=[{question:"salut", answer:"Salut"}, {question:"ca va ?", answer:"Bien et toi ?"}, {question:"toto", answer:"tata"}]
//console.table(dialog)
//console.log(document.getElementById("formDialogue"))
document.getElementById("formDialogue").addEventListener("submit", function(event){
    event.preventDefault();
    //console.log(event.target);
    //console.log(document.querySelector("#demande").value)
    document.querySelector(".question").innerHTML = document.querySelector(".form-question").value;
    

dialog.forEach(element => {
    //console.log(element.question)
    if(element.question === document.querySelector(".form-question").value){
        console.log(element.answer)
        document.querySelector(".answer").innerHTML = element.answer
    }
});
document.querySelector(".form-question").value=""
})
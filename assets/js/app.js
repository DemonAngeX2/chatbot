document.getElementById("formDialogue").addEventListener("submit", function(event){
    event.preventDefault();

    const question = document.querySelector(".form-question").value;
    document.querySelector(".question").innerHTML = question;

    // Envoyer la question au backend
    fetch("https://backend-chatbot-60oq.onrender.com/api/v1/dialogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: question })
    })
    .then(response => response.json())
    .then(data => {
        // Afficher la réponse du backend
        if (data && data.answer) {
            document.querySelector(".answer").innerHTML = data.answer;
        } else {
            document.querySelector(".answer").innerHTML = "Désolé, aucune réponse trouvée.";
        }
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la communication avec le backend:", error);
        document.querySelector(".answer").innerHTML = "Une erreur s'est produite. Veuillez réessayer.";
    });

    document.querySelector(".form-question").value = "";
});

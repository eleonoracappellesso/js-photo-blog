/*
*CONSEGNA*
*Milestone 1*
Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
*Milestone 2*
Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.
*Milestone 3*
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!
*Bonus*
rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata
*/


const overlay = document.getElementById('overlay');
const imgOverlay = overlay.querySelector('img');
const closeBtn = document.querySelector('button');
const loader = document.getElementById('loader');

const baseUrl = "https://jsonplaceholder.typicode.com/";
const resource = "photos";
const params = { "_limit": 6 };

axios.get(baseUrl + resource, { params })
    .then((res) => {
        const photos = res.data;
        // seleziono il contenitore in cui inserire le cards
        let photosContainer = document.querySelector(".container");

        // con un ciclo appendo al container il template creato per le card
        photos.forEach((element) => {
            let cardTemplate = document.createElement("div");
            cardTemplate.classList.add("row")

            cardTemplate.innerHTML += `
                <div class="col">
                    <div id="pin">
                        <img src="img/pin.svg" alt="Pin">
                    </div>
                    <figure id="id">
                        <img src="${element.url}" alt="${element.title}" id="photo">
                        <figcaption>${element.title}</figcaption>
                    </figure>
                </div>
            `
            photosContainer.appendChild(cardTemplate);

            // creo evento al click sulla card
            cardTemplate.addEventListener("click", () => {
                overlay.classList.remove('d-none');
                closeBtn.addEventListener("click", () => {
                    overlay.classList.add('d-none');
                })
                imgOverlay.src = element.url;
                imgOverlay.alt = element.title;
            })

        });
    }).catch((error) => {
        console.log(error);
    }).finally(() => {
        setTimeout(() => { loader.classList.add('d-none') }, 1500);
    });




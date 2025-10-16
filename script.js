// Controlla se c'è un parametro di stato nell'URL
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const messageDiv = document.getElementById('form-message');
    
    if (messageDiv && status === 'success') {
        messageDiv.innerHTML = '<p style="color: green; padding: 10px; background-color: #e8f5e9; border-radius: 4px; margin-bottom: 20px;">La tua richiesta è stata inviata con successo! Ti contatteremo presto.</p>';
        messageDiv.style.display = 'block';
    } else if (messageDiv && status === 'error') {
        messageDiv.innerHTML = '<p style="color: red; padding: 10px; background-color: #ffebee; border-radius: 4px; margin-bottom: 20px;">Si è verificato un errore nell\'invio della richiesta. Per favore, contattaci direttamente via telefono o email.</p>';
        messageDiv.style.display = 'block';
    }
};

// Funzione per caricare le immagini dalla cartella
function caricaGalleria() {
    // Array con i nomi delle immagini nella cartella
    const immagini = [
        {file: 'galleria/foto1.jpg', },
        {file: 'galleria/foto3.jpg', },
        {file: 'galleria/foto4.jpg', },
        {file: 'galleria/foto5.jpg', },
        {file: 'galleria/foto6.jpg', },
        {file: 'galleria/foto7.jpg', },
        {file: 'galleria/foto8.jpg', },
        {file: 'galleria/foto9.jpg', },
        {file: 'galleria/foto10.jpg', },
        {file: 'galleria/foto11.jpg', },
        {file: 'galleria/foto12.jpg', },
        {file: 'galleria/foto13.jpg', },
        {file: 'galleria/foto14.jpg', },
        {file: 'galleria/foto15.jpg', },
        {file: 'galleria/foto16.jpg', },
        {file: 'galleria/foto17.jpg', },
        {file: 'galleria/foto18.jpg', },
        {file: 'galleria/foto19.jpg', },
        {file: 'galleria/foto20.jpg', },
        {file: 'galleria/foto21.jpg', },
        {file: 'galleria/foto22.jpg', },
        {file: 'galleria/foto23.jpg', },
        {file: 'galleria/foto24.jpg', },
        {file: 'galleria/foto25.jpg', },
        {file: 'galleria/foto26.jpg', },
        {file: 'galleria/foto27.jpg', },
        {file: 'galleria/foto28.jpg', },
        {file: 'galleria/foto29.jpg', },
        {file: 'galleria/foto30.jpg', },
        {file: 'galleria/foto31.jpg', },
        {file: 'galleria/foto32.jpg', },
        {file: 'galleria/foto33.jpg', },
        {file: 'galleria/foto34.jpg', },
        {file: 'galleria/foto35.jpg', },
        {file: 'galleria/foto36.jpg', },
        {file: 'galleria/foto37.jpg', },
        {file: 'galleria/foto38.jpg', },
        {file: 'galleria/foto39.jpg', },
        {file: 'galleria/foto40.jpg', },
        {file: 'galleria/foto41.jpg', },
        {file: 'galleria/foto42.jpg', },
        {file: 'galleria/foto43.jpg', },
        {file: 'galleria/foto44.jpg', },
        // Aggiungi altre immagini secondo necessità
    ];
    
    const galleryContainer = document.getElementById('gallery-container');
    
    if (!galleryContainer) {
        console.warn('Gallery container not found');
        return;
    }
    
    // Crea un elemento per ogni immagine
    immagini.forEach((img, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const imgElement = document.createElement('img');
        imgElement.src = img.file;
        imgElement.alt = img.titolo || 'Immagine galleria';
        
        // Aggiungiamo un event listener per aprire l'immagine in grande
        galleryItem.addEventListener('click', () => {
            apriModaleFoto(immagini, index);
        });
        
        galleryItem.appendChild(imgElement);
        galleryContainer.appendChild(galleryItem);
    });
}

// Funzione per aprire il modale con l'immagine in grande
function apriModaleFoto(immagini, indiceCorrente) {
    // Creiamo il modale
    const modale = document.createElement('div');
    modale.className = 'foto-modale';
    
    // Contenitore per l'immagine
    const contenitoreImmagine = document.createElement('div');
    contenitoreImmagine.className = 'foto-modale-contenuto';
    
    // Immagine grande
    const immagineGrande = document.createElement('img');
    immagineGrande.src = immagini[indiceCorrente].file;
    immagineGrande.alt = immagini[indiceCorrente].titolo || 'Immagine galleria';
    
    // Pulsante di chiusura
    const pulsanteChiusura = document.createElement('span');
    pulsanteChiusura.className = 'chiudi-modale';
    pulsanteChiusura.innerHTML = '&times;';
    pulsanteChiusura.addEventListener('click', () => {
        document.body.removeChild(modale);
    });
    
    // Pulsanti per navigare tra le immagini
    const pulsantePrecedente = document.createElement('a');
    pulsantePrecedente.className = 'nav-foto prev';
    pulsantePrecedente.innerHTML = '&#10094;';
    pulsantePrecedente.addEventListener('click', (e) => {
        e.stopPropagation();
        indiceCorrente = (indiceCorrente - 1 + immagini.length) % immagini.length;
        immagineGrande.src = immagini[indiceCorrente].file;
        immagineGrande.alt = immagini[indiceCorrente].titolo || 'Immagine galleria';
    });
    
    const pulsanteSuccessivo = document.createElement('a');
    pulsanteSuccessivo.className = 'nav-foto next';
    pulsanteSuccessivo.innerHTML = '&#10095;';
    pulsanteSuccessivo.addEventListener('click', (e) => {
        e.stopPropagation();
        indiceCorrente = (indiceCorrente + 1) % immagini.length;
        immagineGrande.src = immagini[indiceCorrente].file;
        immagineGrande.alt = immagini[indiceCorrente].titolo || 'Immagine galleria';
    });
    
    // Aggiungiamo gli elementi al modale
    contenitoreImmagine.appendChild(immagineGrande);
    modale.appendChild(pulsanteChiusura);
    modale.appendChild(contenitoreImmagine);
    modale.appendChild(pulsantePrecedente);
    modale.appendChild(pulsanteSuccessivo);
    
    // Chiusura del modale cliccando fuori dall'immagine
    modale.addEventListener('click', (e) => {
        if (e.target === modale) {
            document.body.removeChild(modale);
        }
    });
    
    // Navigazione con tastiera
    document.addEventListener('keydown', function navigazioneTastiera(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modale);
            document.removeEventListener('keydown', navigazioneTastiera);
        } else if (e.key === 'ArrowLeft') {
            indiceCorrente = (indiceCorrente - 1 + immagini.length) % immagini.length;
            immagineGrande.src = immagini[indiceCorrente].file;
            immagineGrande.alt = immagini[indiceCorrente].titolo || 'Immagine galleria';
        } else if (e.key === 'ArrowRight') {
            indiceCorrente = (indiceCorrente + 1) % immagini.length;
            immagineGrande.src = immagini[indiceCorrente].file;
            immagineGrande.alt = immagini[indiceCorrente].titolo || 'Immagine galleria';
        }
    });
    
    // Aggiungiamo il modale al body
    document.body.appendChild(modale);
}

document.addEventListener('DOMContentLoaded', function() {
    // Carica le immagini della galleria
    caricaGalleria();
    
    // Gestione del banner dei cookie
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    if (cookieBanner && acceptCookiesBtn) {
        // Controlla se l'utente ha già accettato i cookie
        if (!localStorage.getItem('cookiesAccepted')) {
            // Mostra il banner dopo 1 secondo
            setTimeout(() => {
                cookieBanner.style.display = 'block';
            }, 1000);
        }
        
        // Quando l'utente accetta i cookie
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }
    
    // Codice per la galleria (se già presente)
});
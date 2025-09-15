
const insertionNav = (rechercheElement) => {
    
    if (sessionStorage.getItem('token')) {
        if(sessionStorage.getItem('userType')=="Coiffeur") {
            const navBar = `    
                <div class="navbar">
                    <nav>
                        <li><a href="/"><img src="../logo.avif" alt=""></a></li>
                        <li><input type="text" placeholder="Rechercher" id="rechercheValue"></li>
                        <li><button id="buttonNav" style="position: relative; bottom: 40px;">Rechercher</button></li>
                        <li><a href="/Dashboard"><h4><b>Dashboard</h4></b></a></li>
                        <li><a href="/Profile"><h4><b>Mon Profil</b></h4></a></li>
                        <li><a href="/Disponibilite"><h4><b>Mes Disponnibiltés</b></h4></a></li>
                        <li><a href="/Avis"><h4><b>Mes Avis</b></h4></a></li>
                        <li><a href="/rendezvous"><h4><b>Mes Rendez-Vous</b></h4></a></li>
                        <li><a href="/Services"><h4><b>Mes Services</b></h4></a></li>
                        <li><h4 id="deco" style="cursor: pointer;"><b>Déconnection</b></h4></li>
                    </nav>
                </div>
            `;
            document.body.insertAdjacentHTML('afterbegin', navBar);
            document.getElementById("deco").addEventListener("click", () => {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userType');
                window.location.reload();
            });
            document.getElementById("buttonNav").addEventListener("click", () => {
                const rechercheValue = document.getElementById("rechercheValue").value;
                window.location.href = `/Recherche?rechercheValue=${encodeURIComponent(rechercheValue)}`;
            });

        } else {
            const navBar = `
                <div class="navbar">
                    <nav>
                        <li><a href="/"><h1 class="title"><img src="../logo.avif" alt=""></h1></a></li>
                        <li><input type="text" placeholder="Rechercher" id="rechercheValue"></li>
                        <li><button id="buttonNav" style="position: relative; bottom: 40px;">Rechercher</button></li>
                        <li><a href="/Dashboard"><b><h4>Dashboard</b></h4></a></li>
                        <li><a href="/Profile"><h4><b>Mon Profil</b></h4></a></li>
                        <li><a href="/rendezvous"><h4><b>Mes Rendez-Vous</b></h4></a></li>
                        <li><a href="/Avis"><h4><b>Mes Avis</b></h4></a></li>
                        <li><a href="/Favoris"><h4><b>Mes Favoris</b></h4></a></li>
                        <li><h4 id="deco" style="cursor: pointer;"><b>Déconnection</b></h4></li>
                    </nav>
                </div>
            `;
            document.body.insertAdjacentHTML('afterbegin', navBar);
            document.getElementById("deco").addEventListener("click", () => {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userType');
                window.location.reload();
            });
            document.getElementById("buttonNav").addEventListener("click", () => {
                const rechercheValue = document.getElementById("rechercheValue").value;
                window.location.href = `/Recherche?rechercheValue=${encodeURIComponent(rechercheValue)}`;
            });
        }
    } else {
        const navBar = `
            <div class="navbar">
                <nav>
                    <ul style="list-style-type: none; color: black;">
                        <li><a href="/"><h1 class="title"><img src="./logo.avif" alt=""></h1></a>
                        <li style="margin-left: 1400px;"><a href="/authentification"><h4>Se Connecter</h4></li>
                        <li><a href="/"><h4>Accueil</h4></a></li>
                    </ul>
                </nav>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', navBar);
    }

};

async function checkIfEmailExistsInBothTables(email) {
    try {
        const coiffeurExists = await getCoiffeurByEmail(email);
        const clientExists = await getClientByEmail(email);
        
        return coiffeurExists.length > 0 && clientExists.length > 0;
    } catch (error) {
        throw error;
    }
}

async function getCoiffeurByEmail(email) {
    try {
        const rows = await db("Coiffeurs").select("*").where({ email: email });
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getClientByEmail(email) {
    try {
        const rows = await db("Clients").select("*").where({ email: email });
        return rows;
    } catch (error) {
        throw error;
    }
}



export {insertionNav, checkIfEmailExistsInBothTables}
window.onload = () => {
    console.log("Script loaded");
    
    /*Datos de prueba*/

    let caught = [];

    function create(name, species, game, Encounters, method, charm, url)
    {
        let Shiny = new Pokemon(name, species, game, Encounters, method, charm, url)
        caught.push(Shiny);
    }

    /*Objeto Pokemon*/
    let Shiny = {
        Nickname: "Doe",
        Species: "Mew",
        originGame: "Red",
        Encounters: "123",
        Method: "Random Encounters",
        Charm: "No",
        Photo: ""
    }

    function Pokemon(nick, spec, game, enc, meth, charm, pic){
        this.Nickname = nick
        this.Species = spec
        this.originGame = game
        this.Encounters = enc
        this.Method = meth
        this.Charm = charm
        this.Photo = pic
    }
    //Eliminar tabla base
    const body = document.getElementById("tableBody")
    body.deleteRow(0);

    //Construir tabla inicial
    create("Jane Doe", "Mew", "Red", "123", "Other", "No", "../Images/shinyPics/Spr_2s_151_s.png")
    create("Aether", "Druddigon", "X", "1","Random Encounters", "No", "../Images/shinyPics/20240729_212717.jpg")
    create("", "Xurkitree", "Ultra Sun", "2350", "Soft Reseting", "Yes", "")

    for (let i = 0; i<caught.length; i++)
        {
            tableBuilder(caught[i])
        }

    /*obtener variables del formulario*/

    const form = document.getElementById("registerForm");

    const txtP = document.getElementById("txtPokemon");
    /*Pokemon*/
    const txtN = document.getElementById("txtNick");
    /*Nickname*/
    const oGm = document.getElementById("originGame");
    /*Game*/
    const nEnc = document.getElementById("numEncounters");
    /*Encounters*/
    const pic = document.getElementById("photo");
    /*Photo URL*/
    const lstM = document.getElementById("lstMethod");
    /*Method*/

    //Enviar Formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        var chOp = document.querySelector('input[name="charmCheck"]:checked');
        /*Charm?*/

        //verificar que todo sea valido
        if(verify(txtN.value)){ 

            //Seleccionar opcion del Charm
            chOp = getCharmOpt(chOp);
            console.log("Result: " + chOp);
            /*Vaciar la tabla antes de actualizarla*/
            var index = caught.length - 1;
            clearTable(index);

            /*Construir nuevo objeto*/
            create(txtN.value, txtP.value, oGm.value, nEnc.value, lstM.value, chOp, pic.value);
            console.log(caught)

            /*Actualizar tabla*/
            for (let i = 0; i<caught.length; i++)
            {
                tableBuilder(caught[i])
            }

        }
    })

    function tableBuilder(Shiny){
        if(Shiny.Nickname == "")
            {
                rowName = Shiny.Species
            }
            else{
                rowName = Shiny.Nickname
            }

        /*Nueva fila*/
        const newRow = document.createElement("tr")

        /*Agregar fila de nombre*/
        const nameCell = document.createElement("td")
        nameCell.textContent = rowName
        newRow.appendChild(nameCell)

        /*Agregar boton*/
        const infoCell = document.createElement("td")
        const infoButton = document.createElement("button")
        infoButton.id = rowName + "Button"
        infoButton.textContent = "Show Info"
        infoCell.appendChild(infoButton)
        newRow.appendChild(infoCell)

        body.appendChild(newRow)

        infoButton.addEventListener("click", function(){
            showInfo(Shiny);
        })
    }

    function clearTable(index){
     for(let i = 0; i<=index; i++){
        body.deleteRow(0);
     }
     console.log("Deleted " + caught.length + " rows")
    }

    /*Mostrar informacion*/
    function showInfo(pokemon){
       
        console.log("button for " + pokemon.Species)

        console.log(pokemon)

        var infoDiv = document.getElementById("information");

        //Lista de informacion
        var infoList = document.createElement("ul");
        
        var item1 = document.createElement("li");
        var item2 = document.createElement("li");
        var item3 = document.createElement("li");
        var item4 = document.createElement("li");
        var item5 = document.createElement("li");
        var item6 = document.createElement("li");

        //actualizar tabla
        clearList(infoDiv);

        console.log("Creating New List")
        if(pokemon.Nickname != ""){
            item1.textContent = "Nickname: " + pokemon.Nickname;
            infoList.appendChild(item1)
        }

        item2.textContent = "Species: " + pokemon.Species;
        infoList.appendChild(item2)

        item3.textContent = "Game of Origin: " + pokemon.originGame;
        infoList.appendChild(item3)

        item4.textContent = "Encounters: " + pokemon.Encounters;
        infoList.appendChild(item4)

        item5.textContent = "Method Used: " + pokemon.Method;
        infoList.appendChild(item5)

        item6.textContent = "Shiny charm? " + pokemon.Charm;
        infoList.appendChild(item6)

        infoDiv.appendChild(infoList);

        loadImage(pokemon.Photo, pokemon.Nickname)
    }
    
    function clearList(list){
        console.log("Clearing List")
        while(list.firstChild){
            list.removeChild(list.firstChild);
        }
        console.log("Done")


    }

    function getCharmOpt(radio){
        console.log("checking for charm");
        console.log("Option: " + radio.value)

        if(radio.value == "charmNo"){
            return "No";
        }
        else{
            return "Yes";
        }
    }

    function loadImage(url, name){
        console.log(url)
        
        var imageDiv = document.getElementById("Photo")
        var image = document.createElement("img")

        clearImage(imageDiv);

        if(url != "")
        {
            image.alt = name;
            image.src = url;
            imageDiv.appendChild(image);
        }
        else{
            var error = document.createElement("p");

            error.innerHTML = "No Photo registered"
            imageDiv.appendChild(error);
        }
        
    }

    function clearImage(imageDiv){
        while(imageDiv.firstChild){
            imageDiv.removeChild(imageDiv.firstChild);
        }
    }

    function verify(nick){
        console.log("checking...")

        nick = nick.toLowerCase()

        console.log(nick)
        var regex = /[^a-z0-9]/

        if(regex.test(nick))
        {
            alert("Please don't include special characters on the nickname")
        }
        else{
            console.log("valid")
            return true
        }
    }
}
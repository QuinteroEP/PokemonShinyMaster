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
    create("Jane Doe", "Mew", "Red", "123", "Random", "No", "")
    create("Shine", "Onyx", "X", "0","Random", "No", "")

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
    const lstG = document.getElementById("lstGame");
    /*Game*/
    const nEnc = document.getElementById("numEncounters");
    /*Encounters*/
    const lstM = document.getElementById("lstMethod");
    /*Method*/
    const chOp = document.getElementById('charmCheck')
    /*Charm?*/
    const pic = document.getElementById("photo");
    /*Photo URL*/
    var listExists = false;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log(chOp);
        getCharmOpt(chOp);

        /*Vaciar la tabla antes de actualizarla*/
        var index = caught.length - 1;
        clearTable(index);

        /*Construir nuevo objeto*/
        create(txtN.value, txtP.value, lstG.value, nEnc.value, lstM.value, chOp, pic.value);
        console.log(caught)

        /*Actualizar tabla*/
        for (let i = 0; i<caught.length; i++)
        {
            tableBuilder(caught[i])
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
       
        console.log("button for " + pokemon.Nickname)

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
        clearList(infoList);

        console.log("Creating New List")
        item1.textContent = "Nickname: " + pokemon.Nickname;
        infoList.appendChild(item1)

        infoDiv.appendChild(infoList);

        item2.textContent = "Species: " + pokemon.Species;
        infoList.appendChild(item2)

        infoDiv.appendChild(infoList);

        item3.textContent = "Game: " + pokemon.originGame;
        infoList.appendChild(item3)

        infoDiv.appendChild(infoList);

        item4.textContent = "Encounters: " + pokemon.Encounters;
        infoList.appendChild(item4)

        infoDiv.appendChild(infoList);

        item5.textContent = "Method: " + pokemon.Method;
        infoList.appendChild(item5)

        infoDiv.appendChild(infoList);

        item6.textContent = "Shiny charm?: " + pokemon.charm;
        infoList.appendChild(item6)

        infoDiv.appendChild(infoList);
    }
    
    function getCharmOpt(radio){
        console.log("checking for charm. ");

        for(var i = 0; i<radio.length; i++){
            if(radio[i].checked){
                console.log(radio[i].value)
            }   
        }
    }

    function clearList(ul){
        console.log("Clearing List")
        while(ul.firstChild){
            ul.removeChild(firstChild);
        }
        console.log("Done")
    }
}
window.onload = () => {
    /*Datos de prueba*/
    let caught = [];
    create("Shine", "X", "1", "Random", "No", "a")
    for (let i = 0; i<caught.length; i++)
        {
            tableBuilder(caught[i])
        }

    console.log("Script loaded");
    /*Objeto Pokemon*/
    let Shiny = {
        Nickname: "Doe",
        Species: "Mew",
        originGame: "Red",
        Encounters: "123",
        Method: "Random Encounters",
        Charm: "no",
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

    function create(name, species, game, Encounters, method, charm, url)
    {
        let Shiny = new Pokemon(name, species, game, Encounters, method, charm, url)
        caught.push(Shiny);
    }

    /*Construir tabla inicial*/

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
    const chOp = document.getElementsById('charmOption')
    /*Charm?*/
    const pic = document.getElementById("photo");
    /*Photo URL*/
   

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log(chOp.value)

        /*Construir nuevo objeto*/
        create(txtN.value, txtP.value, lstG.value, nEnc.value, lstM.value, chOp, pic.value);
        console.log(caught)

        /*Modificar tabla*/
        for (let i = 0; i<caught.length; i++)
        {
            tableBuilder(caught[i])
        }


    })

    function tableBuilder(Shiny){
        if(Shiny.Nickname == null)
            {
                rowName = Shiny.Species
            }
            else{
                rowName = Shiny.Nickname
            }

        const body = document.getElementById("tableBody")

        /*Nueva fila*/
        const newRow = document.createElement("tr")

        /*Agregar fila de nombre*/
        const nameCell = document.createElement("td")
        nameCell.textContent = rowName
        newRow.appendChild(nameCell)

        /*Agregar boton*/
        const infoCell = document.createElement("td")
        const infoButton = document.createElement("button")
        infoButton.textContent = "Show Info"
        infoCell.appendChild(infoButton)
        newRow.appendChild(infoCell)

        body.appendChild(newRow)
    }

    /*Mostrar informacion*/

}
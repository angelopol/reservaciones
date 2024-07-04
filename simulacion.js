function SelectPhoneArea() {
    var selects = document.getElementsByClassName('SelectArea');
    for (let i = 0; i < selects.length; i++) {
        if(!selects[i].firstChild){
            PhonesAreaJson.forEach(item => {
                var phoneOption = document.createElement("option");
                phoneOption.value = item.dialCodes;
                phoneOption.text = item.name + " (" + item.dialCodes + ")";
                selects[i].appendChild(phoneOption);
            });
        }
    }
}

function MakeSimpleInput(id, Label, type="text", value = null){
    var div = document.createElement('div');
    div.classList.add('mb-3');
    var label = document.createElement('label');
    label.classList.add('form-label');
    label.setAttribute('for', id);
    label.innerHTML = Label;
    var input = document.createElement('input');
    if (type === "checkbox"){
        input.classList.add('form-check-input');
    }else {
        input.classList.add('form-control');
    }
    input.setAttribute('type', type);
    input.id = id;
    if (value != null){
        input.value = value;
    }
    div.appendChild(label);
    div.appendChild(input);
    return div;
}

function MakeTelefono(count){
    var DivTelefono = document.createElement('div');
    var LabelTelefono = document.createElement('label');
    LabelTelefono.setAttribute('for', "AreaSimulacionClientes"+count);
    LabelTelefono.classList.add('form-label');
    LabelTelefono.textContent = "Telefono móvil";
    var InputGroupTelefono = document.createElement('div');
    InputGroupTelefono.classList.add("input-group", "mb-3");
    var SelectArea = document.createElement('select');
    SelectArea.classList.add("SelectArea", "form-control");
    SelectArea.id = "AreaSimulacionClientes"+count;
    var InputTelefono = document.createElement('input');
    InputTelefono.setAttribute('type', 'text');
    InputTelefono.id = "TelefonoSimulacionClientes"+count;
    InputTelefono.classList.add("form-control");
    InputGroupTelefono.appendChild(SelectArea);
    InputGroupTelefono.appendChild(InputTelefono);
    DivTelefono.appendChild(LabelTelefono);
    DivTelefono.appendChild(InputGroupTelefono);
    return DivTelefono;
}

function MakeSexo(count){
    var div = document.createElement('div');
    div.classList.add('mb-3');
    var label = document.createElement('label');
    label.classList.add('form-label');
    label.setAttribute('for', "SexoSimulacionClientes"+count);
    label.textContent = "Sexo";
    var select = document.createElement('select');
    select.classList.add('form-select');
    select.id = "SexoSimulacionClientes"+count;
    var masculino = document.createElement('option');
    masculino.value = "Masculino";
    masculino.innerHTML = "Masculino";
    var femenino = document.createElement('option');
    femenino.value = "Femenino";
    femenino.innerHTML = "Femenino";
    var otro = document.createElement('option');
    otro.value = "Otro";
    otro.innerHTML = "Otro";
    select.appendChild(masculino);
    select.appendChild(femenino);
    select.appendChild(otro);
    div.appendChild(label);
    div.appendChild(select);
    return div;
}

function MakeNacionalidad(count){
    var div = document.createElement('div');
    div.classList.add('mb-3');
    var label = document.createElement('label');
    label.classList.add('form-label');
    label.setAttribute('for', "NacionalidadSimulacionClientes"+count);
    label.textContent = "Nacionalidad";
    var select = document.createElement('select');
    select.id = "NacionalidadSimulacionClientes"+count;
    select.classList.add('SelectPaises', "form-control");
    div.appendChild(label);
    div.appendChild(select);
    return div;
}

function AddPasajero(count, visa = false){
    var listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    var pasaporte = MakeSimpleInput('PasaporteSimulacionClientes'+count, 'Pasaporte');  
    var cedula = MakeSimpleInput('CedulaSimulacionClientes'+count, 'Cedula', "number");
    var nombres = MakeSimpleInput('NombresSimulacionClientes'+count, 'Nombres');
    var apellidos = MakeSimpleInput('ApellidosSimulacionClientes'+count, 'Apellidos');
    var telefono = MakeTelefono(count);
    var email = MakeSimpleInput('EmailSimulacionClientes'+count, 'Email', "email");
    var sexo = MakeSexo(count);
    var nacionalidad = MakeNacionalidad(count);
    var FechaNacimiento = MakeSimpleInput('FechaNacimientoSimulacionClientes'+count, 'Fecha de nacimiento', "date", "2005-07-18");

    var title = document.createElement('h2');
    title.innerHTML = "Pasajero " + count;

    listItem.appendChild(title);
    listItem.appendChild(pasaporte);
    listItem.appendChild(cedula);
    listItem.appendChild(nombres);
    listItem.appendChild(apellidos);
    listItem.appendChild(telefono);
    listItem.appendChild(email);
    listItem.appendChild(sexo);
    listItem.appendChild(nacionalidad);  
    listItem.appendChild(FechaNacimiento);  

    if (visa){
        visa = MakeSimpleInput('VisaSimulacionClientes'+count, 'Visa', "checkbox");
        listItem.appendChild(visa);
    }

    return listItem;
}

function AddItemToList(items, listGroup){
    items.forEach(function(itemText) {
        var listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = itemText;
        listGroup.appendChild(listItem);
    });
}

function AddVuelo(vuelos = document.getElementById('VuelosTable').rows, init = 1, AccordionId = 'AccordionVuelos', select = true){
    var AccordionVuelos = document.getElementById(AccordionId);
    VaciarElemento(AccordionVuelos);

    for (var t = init; t < vuelos.length; t++) {
        var VueloId = vuelos[t].cells[0].innerHTML;
        var destino = vuelos[t].cells[2].innerHTML;
        var origen = vuelos[t].cells[3].innerHTML;
        var tarifa = vuelos[t].cells[1].innerHTML;
        var FechaHora = vuelos[t].cells[4].innerHTML;
        var visa = vuelos[t].cells[5].innerHTML;

        var AccordionItem = document.createElement('div');
        AccordionItem.classList.add('accordion-item');
        AccordionItem.id = VueloId+"-AccordionItem";

        var AccordionHeader = document.createElement('h2');
        AccordionHeader.classList.add('accordion-header');
        AccordionHeader.id = VueloId+"-AccordionHeader";

        var AccordionButton = document.createElement('button');
        AccordionButton.classList.add('accordion-button');
        AccordionButton.classList.add('collapsed');
        AccordionButton.type = "button";
        AccordionButton.setAttribute("data-bs-toggle", "collapse");
        AccordionButton.setAttribute("data-bs-target", "#"+VueloId+"-AccordionCollapse");
        AccordionButton.setAttribute("aria-expanded", "false");
        AccordionButton.setAttribute("aria-controls", VueloId+"-AccordionCollapse");
        AccordionButton.innerHTML = VueloId + "&nbsp;<b>" + origen + " -> " + destino + "</b>";

        var AccordionCollapse = document.createElement('div');
        AccordionCollapse.id = VueloId+"-AccordionCollapse";
        AccordionCollapse.classList.add('accordion-collapse', 'collapse');
        AccordionCollapse.setAttribute("aria-labelledby", VueloId+"-AccordionHeader");
        AccordionCollapse.setAttribute("data-bs-parent", "#AccordionVuelos");

        var AccordionBody = document.createElement('div');
        AccordionBody.classList.add('accordion-body');

        var listGroup = document.createElement('ul');
        listGroup.classList.add('list-group');
        var items = ["<b>Tarifa:</b> " + tarifa, "<b>Fecha y hora de salida:</b> " + FechaHora, "<b>Necesitas visa:</b> " + visa];
        AddItemToList(items, listGroup);

        if(select){
            var formCheckDiv = document.createElement('div');
            formCheckDiv.classList.add('form-check', 'form-switch', 'mt-3');

            var inputCheckbox = document.createElement('input');
            inputCheckbox.classList.add('form-check-input', "SeleccionarCheckBox");
            inputCheckbox.setAttribute('type', 'checkbox');
            inputCheckbox.setAttribute('VueloId', VueloId);
            inputCheckbox.setAttribute('role', 'switch');
            inputCheckbox.id = VueloId+"-Checkbox";

            var label = document.createElement('label');
            label.classList.add('form-check-label');
            label.setAttribute('for', VueloId+"-Checkbox");
            label.textContent = 'Seleccionar vuelo';

            formCheckDiv.appendChild(inputCheckbox);
            formCheckDiv.appendChild(label);
        }

        AccordionBody.appendChild(listGroup);
        if (select){
            AccordionBody.appendChild(formCheckDiv);
        }
        AccordionCollapse.appendChild(AccordionBody);
        AccordionHeader.appendChild(AccordionButton);
        AccordionItem.appendChild(AccordionHeader);
        AccordionItem.appendChild(AccordionCollapse);
        AccordionVuelos.appendChild(AccordionItem);
    }
}

function SaveVuelo(VueloId){
    var VuelosHidden = document.getElementById('VuelosHidden');
    var value = VuelosHidden.value;
    VuelosHidden.setAttribute("value", value + VueloId + " ")
}

function ConfirmarVuelosEscogidos(){
    var checkboxes = document.getElementsByClassName('SeleccionarCheckBox');
    var seleccionados = 0;
    var VueloId = "";
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            seleccionados++;
            VueloId = checkboxes[i].getAttribute("vueloid");
        }
        
    }
    if (seleccionados > 1) {
        return "0";
    } else if (seleccionados === 0) {
        return "1";
    }
    SaveVuelo(VueloId);
    return VueloId;
}

function VuelosVuelta(){
    const VueloId = ConfirmarVuelosEscogidos();
    switch (VueloId) {
        case "0":
            alert('Hay más de un vuelo seleccionado.');
            return;
        case "1":
            alert('No hay ningún vuelo seleccionado.');
            return;
        default:
            break;
    }

    this.style.display = "none"; 
    var VuelosDestino = [];
    var vuelos = document.getElementById('VuelosTable')
    var rows = vuelos.rows;
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].innerHTML === VueloId) {
            var vuelo = rows[i];
            break;
        }
    }
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[3].innerHTML === vuelo.cells[2].innerHTML && rows[i].cells[2].innerHTML === vuelo.cells[3].innerHTML) {
            VuelosDestino.push(rows[i]);
        }
    };
    AddVuelo(VuelosDestino, 0);
    var ButtonSoloIda = document.getElementById('ConfirmarVuelos');
    ButtonSoloIda.innerHTML = "Confirmar vuelos";
}

function SetNavBar(ValueVuelos = "active", ValueAsientos = "", ValuePasajeros = "", ValueServicios = "", ValuePago = ""){
    var NavBarVuelos = document.getElementById('NavBarVuelos');
    var NavBarAsientos = document.getElementById('NavBarAsientos');
    var NavBarPago = document.getElementById('NavBarPago');
    var NavBarServicios = document.getElementById('NavBarServicios');
    var NavBarPasajeros = document.getElementById('NavBarPasajeros');

    NavBarVuelos.classList.remove('active');
    NavBarVuelos.classList.remove('disabled');
    NavBarAsientos.classList.remove('active');
    NavBarAsientos.classList.remove('disabled');
    NavBarPago.classList.remove('active');
    NavBarPago.classList.remove('disabled');
    NavBarServicios.classList.remove('active');
    NavBarServicios.classList.remove('disabled');
    NavBarPasajeros.classList.remove('active');
    NavBarPasajeros.classList.remove('disabled');

    if (ValueVuelos != ""){
        NavBarVuelos.classList.add(ValueVuelos);
    }
    if (ValueAsientos != ""){
        NavBarAsientos.classList.add(ValueAsientos);
    }
    if (ValuePago != ""){
        NavBarPago.classList.add(ValuePago);
    }
    if (ValueServicios != ""){
        NavBarServicios.classList.add(ValueServicios);
    }
    if (ValuePasajeros != ""){
        NavBarPasajeros.classList.add(ValuePasajeros);
    }
}

function ConfirmarId(table = 'ClientesTable'){
    var Table = document.getElementById(table);
    var rows = Table.rows;
    var randomId = Math.random().toString(3);
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].innerHTML === randomId) {
            return ConfirmarId();
        }
    }
    return randomId;
}

function ConfirmarPagoReservacion(){
    var NombreTarjetaSimulacion = document.getElementById('NombreTarjetaSimulacion');
    if (!/^[a-zA-Z\s]{1,50}$/.test(NombreTarjetaSimulacion.value)) {
        alert('El nombre no es válido');
        return;
    }
    var NumeroTarjetaSimulacion = document.getElementById('NumeroTarjetaSimulacion');
    if (!/^\d{16}$/.test(NumeroTarjetaSimulacion.value)) {
        alert('El número de tarjeta debe tener 16 dígitos numéricos');
        return;
    }
    var CVVSimulacion = document.getElementById('CVVSimulacion');
    if (!/^\d{3}$/.test(CVVSimulacion.value)) {
        alert('El CVV debe tener 3 dígitos numéricos');
        return;
    }
    var EmailFactSimulacion = document.getElementById('EmailFactSimulacion');
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(EmailFactSimulacion.value)) {
        alert('El email no es válido');
        return;
    }
    var DireccionSimulacion = document.getElementById('DireccionSimulacion');
    if (!/^[a-zA-Z0-9\s]{1,50}$/.test(DireccionSimulacion.value)) {
        alert('La dirección no es válida');
        return;
    }
    var CiudadSimulacion = document.getElementById('CiudadSimulacion');
    if (!/^[a-zA-Z\s]{1,50}$/.test(CiudadSimulacion.value)) {
        alert('La ciudad no es válida');
        return;
    }

    /*
    var PasajerosCount = document.getElementById('ListaDatosPasajeros').children.length;
    var ClientesFinal = "";
    for (let i = 1; i <= PasajerosCount; i++) {
        var visa = document.getElementById('VisaSimulacionClientes'+i.toString());
        if (visa == null) {
            visa = "";
        } else {
            visa = 'VisaSimulacionClientes'+i.toString();
        }
        var id = ConfirmarId();
        ClientesFinal += id + " ";
        SaveCliente(
            id, "PasaporteSimulacionClientes"+i.toString(),
            "CedulaSimulacionClientes"+i.toString(), "NombresSimulacionClientes"+i.toString(),
            "ApellidosSimulacionClientes"+i.toString(), "FechaNacimientoSimulacionClientes"+i.toString(),
            "TelefonoSimulacionClientes"+i.toString(), "EmailSimulacionClientes"+i.toString,
            "NacionalidadSimulacionClientes"+i.toString(), "SexoSimulacionClientes"+i.toString(), visa, true
        );
    }

    var ReservacionesTable = document.getElementById('ReservacionesTable');
    var servicios = GetServicios("ServiciosSelectSimulacion");
    var CountClientes = document.getElementById('ListaDatosPasajeros').children.length;
    totales = MontosTotales(
        document.getElementById('MaletaSimulacion').value, document.getElementById('MaletaManoSimulacion').value, '',
        VuelosHidden, document.getElementById('MascotasSimulacion'), "", false, [], false, servicios[1],
        CountClientes, "MaletasExtrasSimulacion"
    );
    var AsientosTemp = document.getElementById('AsientosSeleccionadosSimulacion').value.split(' ');
    var AsientoTable = "";
    for (var i = 0; i < AsientosTemp.length; i++) {
        var AsientoText = AsientosTemp[i].split('~')[0];
        if (AsientoText == ''){
            continue;
        }
        AsientoTable += AsientoText + ' ';
    }
    AddToReservacionesTable(
        ReservacionesTable, ConfirmarId('ReservacionesTable'), document.getElementById('MaletasSimulacion').value,
        document.getElementById('MaletaManoSimulacion').value, totales[0], document.getElementById('VueosHidden').value,
        totales[1].toString(), AsientoTable, document.getElementById('MascotasSimulacion').value, totales[2], ClientesFinal, servicios[0]

    )

    var SalirSimulacionDos = document.getElementById('SalirSimulacionDos');
    SalirSimulacionDos.addEventListener('click', SalirSimulacion);
    */
    var EndSimulacion = document.getElementById('EndSimulacion');
    EndSimulacion.style.display = "block";
}

function InitPago(){
    if (!ValidarMaletaMano('MaletaManoSimulacion')){
        alert('La maleta de mano excede el peso maximo');
        return;
    }

    var ReservacionesSimulacion = document.getElementById("ReservacionesSimulacion");
    ReservacionesSimulacion.style.display = "none";
    SetNavBar("", "", "", "", "active");

    var PagoSimulacion = document.getElementById("PagoSimulacion");
    PagoSimulacion.style.display = "block";

    var ConfirmarPago = document.getElementById('ConfirmarPago');
    ConfirmarPago.addEventListener('click', ConfirmarPagoReservacion);

    var VuelosInfo = [];
    var vuelos = document.getElementById('VuelosTable')
    var VuelosHidden = document.getElementById('VuelosHidden').value.split(" ");
    var rows = vuelos.rows;
    for (var i = 1; i < rows.length; i++) {
        for (let p = 0; p < VuelosHidden.length; p++) {
            if (rows[i].cells[0].innerHTML === VuelosHidden[p] && VuelosHidden[p] != "") {
                VuelosInfo.push(rows[i]);
                break;
            }
        }
    }
    AddVuelo(VuelosInfo, 0, "VuelosInfoSimulacion", false);
    SelectPaises();

    var ValorServicios = GetServicios("ServiciosSelectSimulacion")[1];
    var CountClientes = document.getElementById('ListaDatosPasajeros').children.length;
    totales = MontosTotales(
        document.getElementById('MaletaSimulacion').value, document.getElementById('MaletaManoSimulacion').value, '',
        VuelosHidden, document.getElementById('MascotasSimulacion').value, "", false, [], false, ValorServicios,
        CountClientes, "MaletasExtrasSimulacion"
    );

    var items = [
        "<b>Tarifa general:</b> " + totales[6], "<b>Costo por pasajes (x"+CountClientes+"):</b> " + totales[3],
        "<b>Costo por maleta:</b> " + totales[4], "<b>Costo por maleta de mano:</b> " + totales[5],
        "<b>Costo por maletas extras:</b> " + totales[7], "<b>Costo por mascotas:</b> " + totales[8]
    ];
    AddItemToList(items, document.getElementById('DetallesPagoSimulacion'));

    var TotalPagoSimulacion = document.getElementById('TotalPagoSimulacion');
    console.log(TotalPagoSimulacion);
    TotalPagoSimulacion.innerHTML = totales[1].toString();
}

function InitReservaciones(){
    var PasajerosCount = document.getElementById('ListaDatosPasajeros').children.length;
    for (let i = 1; i <= PasajerosCount; i++) {
        var CedulaSimulacionClientes = document.getElementById('CedulaSimulacionClientes'+i.toString());
        if (!/^\d{1,8}$/.test(CedulaSimulacionClientes.value)) {
            alert('La cédula debe tener entre 1 y 8 dígitos numéricos');
            return;
        }
        var TelefonoSimulacionClientes = document.getElementById('TelefonoSimulacionClientes'+i.toString());
        if (!/^\d{10}$/.test(TelefonoSimulacionClientes.value)) {
            alert('El número de teléfono debe tener 10 dígitos numéricos');
            return;
        }
        var PasaporteSimulacionClientes = document.getElementById('PasaporteSimulacionClientes'+i.toString());
        if (!/^\d{1,9}$/.test(PasaporteSimulacionClientes.value)) {
            alert('El pasaporte debe tener entre 1 y 9 dígitos numéricos');
            return;
        }
        var EmailSimulacionClientes = document.getElementById('EmailSimulacionClientes'+i.toString());
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(EmailSimulacionClientes.value)) {
            alert('El email no es válido');
            return;
        }
        var NombresSimulacionClientes = document.getElementById('NombresSimulacionClientes'+i.toString());
        if (!/^[a-zA-Z\s]{1,50}$/.test(NombresSimulacionClientes.value)) {
            alert('El nombre no es válido');
            return;
        }
        var ApellidosSimulacionClientes = document.getElementById('ApellidosSimulacionClientes'+i.toString());
        if (!/^[a-zA-Z\s]{1,50}$/.test(ApellidosSimulacionClientes.value)) {
            alert('El apellido no es válido');
            return;
        }
        var vuelos = document.getElementById('VuelosHidden').value.split(" ");
        var visa = document.getElementById('VisaSimulacionClientes'+i.toString());
        if (visa != null) {
            for (let p = 0; p < vuelos.length; p++) {
                if (vuelos != "") {
                    var vueloValido = false;
                    for (var j = 1; j < VuelosTable.rows.length; j++) {
                        if (VuelosTable.rows[j].cells[0].textContent == VueloId) {
                            vueloValido = VuelosTable.rows[j].cells[5].innerHTML.toLowerCase() === 'si';
                            break;
                        }
                    }
                    if (vueloValido && !visa.checked) {
                        alert('El vuelo requiere de que el pasajero tenga visa');
                        return;
                    }
                }
            }
        }
    }
    var PasajerosSimulacion = document.getElementById("PasajerosSimulacion");
    PasajerosSimulacion.style.display = "none";
    SetNavBar("", "", "", "active", "disabled");

    var ReservacionesSimulacion = document.getElementById("ReservacionesSimulacion");
    ReservacionesSimulacion.style.display = "block";

    InitMaletasExtras("MaletasExtrasSimulacion");
    LoadSelect(document.getElementById('ServiciosSelectSimulacion'), document.getElementById('ServiciosTable'));

    var ConfirmarReservaciones = document.getElementById('ConfirmarReservaciones');
    ConfirmarReservaciones.addEventListener('click', InitPago);
}

function InitPasajeros(){
    var AsientosTemp = document.getElementById('AsientosSeleccionadosSimulacion').value.split(' ');
    var vuelos = [];
    var CountAsientos = 0;
    for (var i = 0; i < AsientosTemp.length; i++) {
        if (AsientosTemp[i].split('~')[0] == ''){
            continue;
        }
        vuelos.push(AsientosTemp[i].split('~')[1]);
        CountAsientos++;
    }
    var VuelosTemp = vuelos;
    vuelos = vuelos.filter(
        (vuelo, indice, self) => self.indexOf(vuelo) === indice
    );

    if (vuelos.length > 1){
        const LenghtVuelos1 = VuelosTemp.filter(vuelo => vuelo === vuelos[0]).length;
        const LenghtVuelos2 = VuelosTemp.filter(vuelo => vuelo === vuelos[1]).length;
        if (LenghtVuelos1 != LenghtVuelos2) {
            alert('La cantidad de asientos de ida y vuelta no coincide');
            return;
        }
        CountAsientos = CountAsientos / 2;
    }

    var AsientosSimulacion = document.getElementById('AsientosSimulacion');
    AsientosSimulacion.style.display = "none";
    SetNavBar("", "", "active", "disabled", "disabled");

    var ListaPasajeros = document.getElementById('ListaDatosPasajeros');
    for (let i = 1; i <= CountAsientos; i++) {
        ListaPasajeros.appendChild(AddPasajero(i));
    }
    SelectPaises();
    SelectPhoneArea();

    var PasajerosSimulacion = document.getElementById("PasajerosSimulacion");
    PasajerosSimulacion.style.display = "block";

    var ConfirmarPasajeros = document.getElementById('ConfirmarPasajeros');
    ConfirmarPasajeros.addEventListener('click', InitReservaciones);
}

function InitAsientos(){
    const VueloId = ConfirmarVuelosEscogidos();
    switch (VueloId) {
        case "0":
            alert('Hay más de un vuelo seleccionado.');
            return;
        case "1":
            alert('No hay ningún vuelo seleccionado.');
            return;
        default:
            break;
    }
    
    VaciarElemento(document.getElementById('AccordionVuelos'));
    var ButtonSoloIda = document.getElementById('ConfirmarVuelos');
    ButtonSoloIda.innerHTML = "Confirmar vuelos";
    var VueloVueltaButton = document.getElementById('VueloVueltaButton');
    VueloVueltaButton.style.display = "block";
    var VuelosSimulacion = document.getElementById('VuelosSimulacion');
    VuelosSimulacion.style.display = "none";

    var AsientosSimulacion = document.getElementById('AsientosSimulacion');
    AsientosSimulacion.style.display = "block";

    var div = document.getElementById('SelectAsientosSimulacion');
    AsientosJson.forEach(item => {
        div.appendChild(CreateFila(item, true));
    });
    
    SelectAsiento('simulacion', "SelectVueloSimulacion", "AsientosSeleccionadosSimulacion");
    SetNavBar("", "active", "disabled", "disabled", "disabled");

    var VuelosHidden = document.getElementById('VuelosHidden').value.split(" ");
    var select = document.getElementById('SelectVueloSimulacion');
    for (var i = 0; i < VuelosHidden.length; i++) {
        if (VuelosHidden[i] != "") {
            var option = document.createElement('option');
            option.value = VuelosHidden[i];
            option.text = VuelosHidden[i];
            select.appendChild(option);
        }
    }

    AsOcupado('simulacion', "SelectVueloSimulacion", "AsientosSeleccionadosSimulacion");
    select.addEventListener('change', () => AsOcupado('simulacion', "SelectVueloSimulacion", "AsientosSeleccionadosSimulacion"));

    var ConfirmarAsientos = document.getElementById('ConfirmarAsientos');
    ConfirmarAsientos.addEventListener('click', InitPasajeros);
}

function SalirSimulacion(){
    /*document.getElementById('VuelosSimulacion').style.display = 'block';
    document.getElementById('AsientosSimulacion').style.display = 'none';
    document.getElementById('PasajerosSimulacion').style.display = 'none';
    document.getElementById('PagoSimulacion').style.display = 'none';
    document.getElementById('ReservacionesSimulacion').style.display = 'none';
    document.getElementById('EndSimulacionContent').style.display = 'none';
    VaciarElemento(document.getElementById('AccordionVuelos'))
    document.getElementById('VuelosHidden').value = "";
    document.getElementById('AsientosSeleccionadosSimulacion').value = "";
    VaciarElemento(document.getElementById('ListaDatosPasajeros'));
    VaciarElemento(document.getElementById('SelectAsientosSimulacion'));
    SetNavBar("active", "", "", "", "");*/
    var SimulacionClientes = document.getElementById('SimulacionClientes');
    SimulacionClientes.style.display = 'none';
    var app = document.getElementById('app');
    app.style.display = 'block';
}

function InitSimulacionClientes(){
    var entrar = document.getElementById('EntrarSimulacion');
    entrar.addEventListener('click', function() {
        var SimulacionClientes = document.getElementById('SimulacionClientes');
        SimulacionClientes.style.display = 'block';
        var app = document.getElementById('app');
        app.style.display = 'none';
        AddVuelo();
    });
    var salir = document.getElementById('SalirSimulacion');
    salir.addEventListener('click', SalirSimulacion);
    var ConfirmarVuelos = document.getElementById('ConfirmarVuelos');
    ConfirmarVuelos.addEventListener('click', InitAsientos)
    var VueloVueltaButton = document.getElementById('VueloVueltaButton');
    VueloVueltaButton.addEventListener('click', VuelosVuelta)
}

InitSimulacionClientes();
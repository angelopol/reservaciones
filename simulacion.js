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

function MakeSimpleInput(id, Label, type="text", value = null, label = false){
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
    if (label){
        var div = document.createElement('div');
        div.classList.add('mb-3');
        var label = document.createElement('label');
        label.classList.add('form-label');
        label.setAttribute('for', id);
        label.innerHTML = Label;
        div.appendChild(label);
        div.appendChild(input);
        return div;
    }
    return input;
}

function MakeTelefono(count){
    var DivTelefono = document.createElement('div');
    var LabelTelefono = document.createElement('label');
    LabelTelefono.setAttribute('for', "AreaSimulacionClientes"+count);
    LabelTelefono.classList.add('form-label');
    LabelTelefono.textContent = "Mobile phone";
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

function MakeSexo(count, label = false){
    var select = document.createElement('select');
    select.classList.add('form-select');
    select.id = "SexoSimulacionClientes"+count;
    var masculino = document.createElement('option');
    masculino.value = "Male";
    masculino.innerHTML = "Male";
    var femenino = document.createElement('option');
    femenino.value = "Female";
    femenino.innerHTML = "Female";
    var otro = document.createElement('option');
    otro.value = "Other";
    otro.innerHTML = "Other";
    select.appendChild(masculino);
    select.appendChild(femenino);
    select.appendChild(otro);
    if (label){
        var div = document.createElement('div');
        div.classList.add('mb-3');
        var label = document.createElement('label');
        label.classList.add('form-label');
        label.setAttribute('for', "SexoSimulacionClientes"+count);
        label.textContent = "Sex";
        div.appendChild(label);
        div.appendChild(select);
        return div;
    }
    return select;
}

function MakeNacionalidad(count, label = false){
    var select = document.createElement('select');
    select.id = "NacionalidadSimulacionClientes"+count;
    select.classList.add('SelectPaises', "form-control");
    if (label){
        var div = document.createElement('div');
        div.classList.add('mb-3');
        var label = document.createElement('label');
        label.classList.add('form-label');
        label.setAttribute('for', "NacionalidadSimulacionClientes"+count);
        label.textContent = "Nationality";
        div.appendChild(label);
        div.appendChild(select);
        return div;
    }
    return select;
}

function MakeSpan(text){
    var span = document.createElement('span');
    span.classList.add('input-group-text');
    span.textContent = text;
    return span;
}

function MakePasaporteCedula(count){
    let divInputGroup = document.createElement('div');
    divInputGroup.className = 'input-group mb-3 mt-3';

    let spanPasaporte = MakeSpan('Passport');
    var pasaporte = MakeSimpleInput('PasaporteSimulacionClientes'+count, 'Passport'); 

    let spanCedula = MakeSpan('Cedula');
    var cedula = MakeSimpleInput('CedulaSimulacionClientes'+count, 'Cedula', "number");

    divInputGroup.appendChild(spanPasaporte);
    divInputGroup.appendChild(pasaporte);
    divInputGroup.appendChild(spanCedula);
    divInputGroup.appendChild(cedula);
    
    return divInputGroup
}

function MakeNombresApellidos(count){
    let divInputGroup = document.createElement('div');
    divInputGroup.className = 'input-group mb-3';

    let spanNombres = MakeSpan('Names');
    var nombres = MakeSimpleInput('NombresSimulacionClientes'+count, 'Names');

    let spanApellidos = MakeSpan('Surnames');
    var apellidos = MakeSimpleInput('ApellidosSimulacionClientes'+count, 'Surnames');

    divInputGroup.appendChild(spanNombres);
    divInputGroup.appendChild(nombres);
    divInputGroup.appendChild(spanApellidos);
    divInputGroup.appendChild(apellidos);
    
    return divInputGroup
}

function MakeNacimientoNacionalidad(count){
    let divInputGroup = document.createElement('div');
    divInputGroup.className = 'input-group mb-3';

    let spanNacimiento = MakeSpan('Date of birth');
    var FechaNacimiento = MakeSimpleInput('FechaNacimientoSimulacionClientes'+count, 'Date of birth', "date", "2005-07-18");

    let spanNacionalidad = MakeSpan('Nacionality');
    var nacionalidad = MakeNacionalidad(count);

    divInputGroup.appendChild(spanNacimiento);
    divInputGroup.appendChild(FechaNacimiento);
    divInputGroup.appendChild(spanNacionalidad);
    divInputGroup.appendChild(nacionalidad);
    
    return divInputGroup
}

function MakeSexoEmail(count){
    let divInputGroup = document.createElement('div');
    divInputGroup.className = 'input-group mb-3';

    let spanSexo = MakeSpan('Sex');
    var sexo = MakeSexo(count);

    let spanEmail = MakeSpan('Email');
    var email = MakeSimpleInput('EmailSimulacionClientes'+count, 'Email', "email");

    divInputGroup.appendChild(spanSexo);
    divInputGroup.appendChild(sexo);
    divInputGroup.appendChild(spanEmail);
    divInputGroup.appendChild(email);
    
    return divInputGroup
}

function AddPasajero(count, visa = false, asientos = null){
    var listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    var telefono = MakeTelefono(count);

    var title = document.createElement('h2');
    title.innerHTML = "Passenger " + count;

    var AsientosSpan = document.createElement('span');
    if (asientos[count-1].length > 1 && Array.isArray(asientos[count])){
        AsientosSpan.innerHTML = "<b>Seats:</b> " + asientos[count-1][0] + ", " + asientos[count-1][1];
    } else {
        AsientosSpan.innerHTML = "<b>Seats:</b> " + asientos[count-1];
    }

    listItem.appendChild(title);
    listItem.appendChild(AsientosSpan);
    listItem.appendChild(MakePasaporteCedula(count));
    listItem.appendChild(MakeNombresApellidos(count));
    listItem.appendChild(MakeNacimientoNacionalidad(count));
    listItem.appendChild(MakeSexoEmail(count));  
    listItem.appendChild(telefono);

    if (visa){
        listItem.appendChild(MakeSimpleInput('VisaSimulacionClientes'+count, 'Visa', "checkbox", null, true));
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
        AccordionItem.id = "AccordionItem-"+VueloId;

        var AccordionHeader = document.createElement('h2');
        AccordionHeader.classList.add('accordion-header');
        AccordionHeader.id = "AccordionHeader"+VueloId;

        var AccordionButton = document.createElement('button');
        AccordionButton.classList.add('accordion-button');
        AccordionButton.classList.add('collapsed');
        AccordionButton.type = "button";
        AccordionButton.setAttribute("data-bs-toggle", "collapse");
        AccordionButton.setAttribute("data-bs-target", "#AccordionCollapse-"+VueloId);
        AccordionButton.setAttribute("aria-expanded", "false");
        AccordionButton.setAttribute("aria-controls", "AccordionCollapse-"+VueloId);
        AccordionButton.innerHTML = "<b>" + origen + " -> " + destino + "</b>: " + FechaHora;

        var AccordionCollapse = document.createElement('div');
        AccordionCollapse.id = "AccordionCollapse-"+VueloId;
        AccordionCollapse.classList.add('accordion-collapse', 'collapse');
        AccordionCollapse.setAttribute("aria-labelledby", "AccordionHeader-"+VueloId);
        AccordionCollapse.setAttribute("data-bs-parent", "#AccordionVuelos");

        var AccordionBody = document.createElement('div');
        AccordionBody.classList.add('accordion-body');

        var listGroup = document.createElement('ul');
        listGroup.classList.add('list-group');
        var items = ["<b>Fare:</b> " + tarifa, "<b>You need a visa:</b> " + visa];
        AddItemToList(items, listGroup);

        if(select){
            var formCheckDiv = document.createElement('div');
            formCheckDiv.classList.add('form-check', 'form-switch', 'mt-3');

            var inputCheckbox = document.createElement('input');
            inputCheckbox.classList.add('form-check-input', "SeleccionarCheckBox");
            inputCheckbox.setAttribute('type', 'checkbox');
            inputCheckbox.setAttribute('VueloId', VueloId);
            inputCheckbox.setAttribute('role', 'switch');
            inputCheckbox.id = "Checkbox-"+VueloId;

            var label = document.createElement('label');
            label.classList.add('form-check-label');
            label.setAttribute('for', "Checkbox-"+VueloId);
            label.textContent = 'Select flight';

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
            alert('There is more than one flight selected.');
            return;
        case "1":
            alert('No flight selected.');
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
    ButtonSoloIda.innerHTML = "Confirm flights";
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
    var randomId = Math.random().toString().substring(2, 8);
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
        alert('Name is invalid');
        return;
    }
    var NumeroTarjetaSimulacion = document.getElementById('NumeroTarjetaSimulacion');
    if (!/^\d{16}$/.test(NumeroTarjetaSimulacion.value)) {
        alert('The card number must be 16 numeric digits long');
        return;
    }
    var CVVSimulacion = document.getElementById('CVVSimulacion');
    if (!/^\d{3}$/.test(CVVSimulacion.value)) {
        alert('The CVV must have 3 numeric digits');
        return;
    }
    var EmailFactSimulacion = document.getElementById('EmailFactSimulacion');
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(EmailFactSimulacion.value)) {
        alert('The email is invalid');
        return;
    }
    var DireccionSimulacion = document.getElementById('DireccionSimulacion');
    if (!/^[a-zA-Z0-9\s]{1,50}$/.test(DireccionSimulacion.value)) {
        alert('The direction is invalid');
        return;
    }
    var CiudadSimulacion = document.getElementById('CiudadSimulacion');
    if (!/^[a-zA-Z\s]{1,50}$/.test(CiudadSimulacion.value)) {
        alert('The city is invalid');
        return;
    }

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
            "TelefonoSimulacionClientes"+i.toString(), "EmailSimulacionClientes"+i.toString(),
            "NacionalidadSimulacionClientes"+i.toString(), "SexoSimulacionClientes"+i.toString(), visa, true
        );
    }

    var ReservacionesTable = document.getElementById('ReservacionesTable');
    var servicios = GetServicios("ServiciosSelectSimulacion");
    var CountClientes = document.getElementById('ListaDatosPasajeros').children.length;
    totales = MontosTotales(
        document.getElementById('MaletaSimulacion').value, document.getElementById('MaletaManoSimulacion').value, '',
        document.getElementById('VuelosHidden').value.split(" "), document.getElementById('MascotasSimulacion').value, "", false, [], false, servicios[1],
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
    var IdReservacion = ConfirmarId('ReservacionesTable');
    AddToReservacionesTable(
        ReservacionesTable, IdReservacion, document.getElementById('MaletaSimulacion').value,
        document.getElementById('MaletaManoSimulacion').value, totales[0], document.getElementById('VuelosHidden').value,
        totales[1].toString(), AsientoTable, document.getElementById('MascotasSimulacion').value, totales[2], ClientesFinal, servicios[0]

    )

    var IdReservacionSimulacion = document.getElementById('IdReservacionSimulacion');
    IdReservacionSimulacion.innerHTML = IdReservacion;

    var EndSimulacion = document.getElementById('EndSimulacion');
    EndSimulacion.classList.toggle('show');
}

function InitPago(){
    if (!ValidarMaletaMano('MaletaManoSimulacion')){
        alert('Carry-on bag exceeds maximum weight');
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
        CountClientes, "MaletasExtrasSimulacion", false
    );

    if(VuelosInfo.length > 1){
        CountClientes *= 2;
    }

    var items = [
        "<b>General Rate:</b> " + totales[6], "<b>Cost per ticket (x"+CountClientes+"):</b> " + totales[3],
        "<b>Cost per bag:</b> " + totales[4], "<b>Cost per carry-on bag:</b> " + totales[5],
        "<b>Cost for extra bags:</b> " + totales[7], "<b>Cost per pet:</b> " + totales[8], "<b>Cost per extra services:</b> " + ValorServicios.toString()
    ];
    AddItemToList(items, document.getElementById('DetallesPagoSimulacion'));

    var TotalPagoSimulacion = document.getElementById('TotalPagoSimulacion');
    TotalPagoSimulacion.innerHTML = totales[1].toString();
}

function InitReservaciones(){
    var PasajerosCount = document.getElementById('ListaDatosPasajeros').children.length;
    for (let i = 1; i <= PasajerosCount; i++) {
        var CedulaSimulacionClientes = document.getElementById('CedulaSimulacionClientes'+i.toString());
        if (!/^\d{1,8}$/.test(CedulaSimulacionClientes.value)) {
            alert('The Cedula must have between 1 and 8 numeric digits');
            return;
        }
        var TelefonoSimulacionClientes = document.getElementById('TelefonoSimulacionClientes'+i.toString());
        if (!/^\d{10}$/.test(TelefonoSimulacionClientes.value)) {
            alert('The phone number must be 10 numeric digits long');
            return;
        }
        var PasaporteSimulacionClientes = document.getElementById('PasaporteSimulacionClientes'+i.toString());
        if (!/^\d{1,9}$/.test(PasaporteSimulacionClientes.value)) {
            alert('The passport must have between 1 and 9 numeric digits');
            return;
        }
        var EmailSimulacionClientes = document.getElementById('EmailSimulacionClientes'+i.toString());
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(EmailSimulacionClientes.value)) {
            alert('The email is invalid');
            return;
        }
        var NombresSimulacionClientes = document.getElementById('NombresSimulacionClientes'+i.toString());
        if (!/^[a-zA-Z\s]{1,50}$/.test(NombresSimulacionClientes.value)) {
            alert('Name is invalid');
            return;
        }
        var ApellidosSimulacionClientes = document.getElementById('ApellidosSimulacionClientes'+i.toString());
        if (!/^[a-zA-Z\s]{1,50}$/.test(ApellidosSimulacionClientes.value)) {
            alert('Last name is invalid');
            return;
        }
        var vuelos = document.getElementById('VuelosHidden').value.split(" ");
        var visa = document.getElementById('VisaSimulacionClientes'+i.toString());
        if (visa != null) {
            for (let p = 0; p < vuelos.length; p++) {
                if (vuelos != "") {
                    var vueloValido = VerifyVisaVuelo(vuelos[p]);
                    if (vueloValido && !visa.checked) {
                        alert('The flight requires the passenger to have a visa');
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
    LoadSelect(document.getElementById('ServiciosSelectSimulacion'), document.getElementById('ServiciosTable'), 0, 2);

    var ConfirmarReservaciones = document.getElementById('ConfirmarReservaciones');
    ConfirmarReservaciones.addEventListener('click', InitPago);
}

function GetParesAsientos(asientosVuelos) {
    let agrupadosPorVuelo = {};
    let resultado = [];

    asientosVuelos.forEach(asientoVuelo => {
        if (asientoVuelo != '') {
            let [asiento, vuelo] = asientoVuelo.split('~');
            if (!agrupadosPorVuelo[vuelo]) {
                agrupadosPorVuelo[vuelo] = [];
            }
            agrupadosPorVuelo[vuelo].push(asiento);
        }
    });

    let vuelos = Object.keys(agrupadosPorVuelo);
    if (vuelos.length === 2) {
        for (let i = 0; i < agrupadosPorVuelo[vuelos[0]].length; i++) {
            resultado.push([agrupadosPorVuelo[vuelos[0]][i], agrupadosPorVuelo[vuelos[1]][i]]);
        }
    }

    return resultado;
}

function InitPasajeros(){
    var NeedVisa = false;
    var AsientosTemp = document.getElementById('AsientosSeleccionadosSimulacion').value.split(' ');
    var vuelos = [];
    var CountAsientos = 0;
    var AsientosPasageros = [];
    for (var i = 0; i < AsientosTemp.length; i++) {
        var asiento = AsientosTemp[i].split('~')[0];
        if (asiento == ''){
            continue;
        }
        vuelos.push(AsientosTemp[i].split('~')[1]);
        CountAsientos++;
        AsientosPasageros.push(asiento);
    }
    var VuelosTemp = vuelos;
    vuelos = vuelos.filter(
        (vuelo, indice, self) => self.indexOf(vuelo) === indice
    );
    if (vuelos.length < document.getElementById('SelectVueloSimulacion').children.length){
        alert('Please select seats for both flights');
        return;
    }
    NeedVisa = VerifyVisaVuelo(vuelos[0]);
    if (vuelos.length > 1){
        const LenghtVuelos1 = VuelosTemp.filter(vuelo => vuelo === vuelos[0]).length;
        const LenghtVuelos2 = VuelosTemp.filter(vuelo => vuelo === vuelos[1]).length;
        if (LenghtVuelos1 != LenghtVuelos2) {
            alert('The number of round-trip seats does not match');
            return;
        }
        CountAsientos = CountAsientos / 2;
        AsientosPasageros = GetParesAsientos(AsientosTemp);
        if (NeedVisa || VerifyVisaVuelo(vuelos[1])){
            NeedVisa = true;
        }
    }

    if (CountAsientos < 1) {
        alert('No seats selected');
        return;
    }

    var AsientosSimulacion = document.getElementById('AsientosSimulacion');
    AsientosSimulacion.style.display = "none";
    SetNavBar("", "", "active", "disabled", "disabled");

    console.log(AsientosPasageros);
    var ListaPasajeros = document.getElementById('ListaDatosPasajeros');
    for (let i = 1; i <= CountAsientos; i++) {
        ListaPasajeros.appendChild(AddPasajero(i, NeedVisa, AsientosPasageros));
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
            alert('There is more than one flight selected.');
            return;
        case "1":
            alert('No flight selected.');
            return;
        default:
            break;
    }
    
    VaciarElemento(document.getElementById('AccordionVuelos'));
    var ButtonSoloIda = document.getElementById('ConfirmarVuelos');
    ButtonSoloIda.innerHTML = "One-way flight only";
    var VueloVueltaButton = document.getElementById('VueloVueltaButton');
    VueloVueltaButton.style.display = "inline-block";
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

    var VuelosInfo = [];
    var vuelos = document.getElementById('VuelosTable');
    let VuelosHidden = document.getElementById('VuelosHidden').value.split(" ");
    var rows = vuelos.rows;
    for (let p = 0; p < VuelosHidden.length; p++) {
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[0].innerHTML === VuelosHidden[p] && VuelosHidden[p] != "") {
                VuelosInfo.push(rows[i]);
                break;
            }
        }
    }

    var select = document.getElementById('SelectVueloSimulacion');
    LoadSelect(select, VuelosInfo, 0, 3, 2, ' -> ', 4, ': ', VuelosInfo);

    AsOcupado('simulacion', "SelectVueloSimulacion", "AsientosSeleccionadosSimulacion");
    select.addEventListener('change', () => AsOcupado('simulacion', "SelectVueloSimulacion", "AsientosSeleccionadosSimulacion"));

    var ConfirmarAsientos = document.getElementById('ConfirmarAsientos');
    ConfirmarAsientos.addEventListener('click', InitPasajeros);
}

function SalirSimulacion(){
    document.getElementById('VuelosSimulacion').style.display = 'block';
    document.getElementById('AsientosSimulacion').style.display = 'none';
    document.getElementById('PasajerosSimulacion').style.display = 'none';
    document.getElementById('PagoSimulacion').style.display = 'none';
    document.getElementById('ReservacionesSimulacion').style.display = 'none';
    document.getElementById('AsientosSeleccionadosSimulacion').value = "";
    VaciarElemento(document.getElementById('ListaDatosPasajeros'));
    VaciarElemento(document.getElementById('SelectAsientosSimulacion'));
    VaciarElemento(document.getElementById('SelectVueloSimulacion'));
    VaciarElemento(document.getElementById('DetallesPagoSimulacion'));
    SetNavBar("active", "", "", "", "");
    var SimulacionClientes = document.getElementById('SimulacionClientes');
    SimulacionClientes.style.display = 'none';
    var app = document.getElementById('app');
    app.style.display = 'block';
    var EndSimulacion = document.getElementById('EndSimulacion');
    EndSimulacion.classList.remove('show');
    AppButtons(false);
}

function InitSimulacionClientes(){
    var entrar = document.getElementById('EntrarSimulacion');
    entrar.addEventListener('click', function() {
        var SimulacionClientes = document.getElementById('SimulacionClientes');
        SimulacionClientes.style.display = 'block';
        var app = document.getElementById('app');
        app.style.display = 'none';
        document.getElementById('VuelosHidden').setAttribute('value', '');
        AddVuelo();
        AppButtons();
    });
    var salir = document.getElementById('SalirSimulacion');
    salir.addEventListener('click', SalirSimulacion);
    var salir2 = document.getElementById('SalirSimulacionDos');
    salir2.addEventListener('click', SalirSimulacion);
    var ConfirmarVuelos = document.getElementById('ConfirmarVuelos');
    ConfirmarVuelos.addEventListener('click', InitAsientos)
    var VueloVueltaButton = document.getElementById('VueloVueltaButton');
    VueloVueltaButton.addEventListener('click', VuelosVuelta)
}

InitSimulacionClientes();
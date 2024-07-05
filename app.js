function AppButtons(disabled = true){
    var FlightsModuleButton = document.getElementById('FlightsModuleButton');
    var DiscountsModuleButton = document.getElementById('DiscountsModuleButton');
    var ServicesModuleButton = document.getElementById('ServicesModuleButton');
    var ClientsModuleButton = document.getElementById('ClientsModuleButton');
    var ParametersModuleButton = document.getElementById('ParametersModuleButton');
    if (disabled){
        FlightsModuleButton.disabled = true;
        DiscountsModuleButton.disabled = true;
        ServicesModuleButton.disabled = true;
        ClientsModuleButton.disabled = true;
        ParametersModuleButton.disabled = true;
    } else {
        FlightsModuleButton.disabled = false;
        DiscountsModuleButton.disabled = false;
        ServicesModuleButton.disabled = false;
        ClientsModuleButton.disabled = false;
        ParametersModuleButton.disabled = false;
    }
}

function SelectPaises() {
    var selects = document.getElementsByClassName('SelectPaises');
    for (let i = 0; i < selects.length; i++) {
        if(!selects[i].firstChild){
            ContriesJson.forEach(item => {
                var paisOption = document.createElement("option");
                paisOption.value = item.name;
                paisOption.text = item.name;
                selects[i].appendChild(paisOption);
            });
        }
    }
}

function CreateFila(item, ClassSimulacion = false){
    var fila = document.createElement("div");
    fila.classList.add('fila')
    fila.classList.add('d-flex', 'justify-content-center', 'align-items-center');
    fila.innerHTML = item.fila;
    item.asientos.forEach(asiento => {
        var AsientoButton = document.createElement('button');
        AsientoButton.classList.add('asiento');
        AsientoButton.classList.add('btn', 'btn-sm', 'btn-dark','p-3', 'rounded-5', 'm-1');
        AsientoButton.classList.add('disponible');
        if (ClassSimulacion){
            AsientoButton.classList.add('simulacion');
        }
        AsientoButton.id = asiento+item.fila;
        AsientoButton.innerHTML = '<span class="fw-bold">' + asiento + "</span>";
        fila.appendChild(AsientoButton);
    });
    return fila;
}

function InitAsientos(div = document.getElementById("asientos")) {
    AsientosJson.forEach(item => {
        div.appendChild(CreateFila(item));
    });
}

function InitModal(ModalName) {
    const buttons = document.getElementsByClassName(ModalName+'Button');
    var modal = document.getElementById(ModalName);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            modal.classList.toggle('show');
        });
    }
}

function ChangePage() {
    const launcher = document.getElementById("launcher");
    launcher.style.display = "none";
    const app = document.getElementById("app");
    app.style.display = "block";
    const EntrarSimulacion = document.getElementById('EntrarSimulacion');
    EntrarSimulacion.style.display = "block";
    const NavBarApp = document.getElementById('NavBarApp');
    NavBarApp.style.display = "block";
}

function ToggleAsiento() {
    var asientos = document.getElementsByClassName("asiento");
    for (var i = 0; i < asientos.length; i++) {
        if (!asientos[i].classList.contains('ocupado')){
            asientos[i].classList.add('disponible');
            asientos[i].classList.remove('seleccionado');
        }
    }
}

function SelectAsiento(ClassName = "asiento", VueloId = "vuelo", SeleccionadosId = "asiento"){
    var asientos = document.getElementsByClassName(ClassName);
    for (var i = 0; i < asientos.length; i++) {
        asientos[i].addEventListener('click', function() {
            var asiento = document.getElementById(SeleccionadosId);
            var vuelo = document.getElementById(VueloId);
            if (asiento.value.includes(this.id+ "~" + vuelo.value)) {
                this.classList.remove('seleccionado');
                this.classList.add('disponible');
                asiento.value = asiento.value.replace(this.id+ "~" + vuelo.value + " ", '');
                return;
            }
            if (!this.classList.contains('ocupado')){
                this.classList.add('seleccionado');
                this.classList.remove('disponible');
                asiento.value += this.id + "~" + vuelo.value + " ";
            }
        });
    }
}

function MaletaExtra(count, id){
    var maleta = document.createElement('input');
    maleta.setAttribute('type', 'number');
    maleta.classList.add('form-control', 'mb-1');
    maleta.setAttribute('min', '0');
    maleta.setAttribute('id', id  + count);
    return maleta;
}

function VaciarElemento(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function InitMaletasExtras(id = 'MaletasExtras'){
    var count = document.getElementById("CantidadMaletas");
    var MaletasDiv = document.getElementById(id); 
    VaciarElemento(MaletasDiv);
    for (var i = 1; i <= parseInt(count.value); i++){
        MaletasDiv.appendChild(MaletaExtra(i, id));
    }
    count.addEventListener('change', InitMaletasExtras);
}

function LoadSelect(select, table, ValueCell = 0, TextCell = 0, TextCell2 = null, conector = ' ', TextCell3 = null, conector2 = ' '){
    VaciarElemento(select);
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        var option = document.createElement('option');
        option.value = rows[i].cells[ValueCell].innerHTML;
        if (TextCell2 != null){
            if (TextCell3 != null){
                option.text = rows[i].cells[TextCell].innerHTML + conector + rows[i].cells[TextCell2].innerHTML + conector2 + rows[i].cells[TextCell3].innerHTML;
            } else {
                option.text = rows[i].cells[TextCell].innerHTML + conector + rows[i].cells[TextCell2].innerHTML;
            }
        } else {
            option.text = rows[i].cells[TextCell].innerHTML;
        }
        select.appendChild(option);
    }
}

function RegistrarVuelos(){
    var RegistrarVueloButton = document.getElementById('RegistrarVueloButton');
    RegistrarVueloButton.addEventListener('click', function() {
        var id = document.getElementById('IdVuelo');
        var IdValue = id.value.replace(" ", "");
        var VuelosTable = document.getElementById('VuelosTable');
        if (!VerifyId(IdValue, VuelosTable.rows)){
            alert('Existing ID');
            return;
        }
        if (IdValue == ''){
            alert('ID is required');
            return;
        }
        if (IdValue.includes('~')){
            alert('The ID cannot contain the character ~');
            return;
        }
        if (IdValue.includes(' ')){
            alert('The ID cannot contain spaces');
            return;
        }

        var tarifa = document.getElementById('TarifaVuelo');
        if (tarifa.value == ''){
            alert('Fare is required');
            return;
        }

        var destino = document.getElementById('DestinoVuelo');
        var origen = document.getElementById('OrigenVuelo');
        if (destino.value == origen.value){
            alert('The destination and origin cannot be the same');
            return;
        }

        var FechaHora = document.getElementById('FechaHoraVuelo');

        var visa = "No";
        if (document.getElementById('VisaVuelo').checked){
            visa = "Yes";
        }

        var row = VuelosTable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = IdValue;
        cell2.innerHTML = tarifa.value;
        cell3.innerHTML = destino.value;
        cell4.innerHTML = origen.value;
        cell5.innerHTML = FechaHora.value;
        cell6.innerHTML = visa;
        id.value = '';
        tarifa.value = '';
        destino.value = '';
        origen.value = '';
        FechaHora.value = '';
        LoadSelect(document.getElementById('vuelo'), VuelosTable, 0, 3, 2, ' -> ', 4, ': ');
    });
}

function RegistrarDescuentos(){
    var RegistrarDescuentosButton = document.getElementById('RegistrarDescuentoButton');
    RegistrarDescuentosButton.addEventListener('click', function() {
        var id = document.getElementById('IdDescuento');
        var DescuentosTable = document.getElementById('DescuentosTable');
        if (!VerifyId(id.value, DescuentosTable.rows)){
            alert('Existing ID');
            return;
        }
        if (id.value == ''){
            alert('ID is required');
            return;
        }
        if (id.value.includes(' ')){
            alert('The ID cannot contain spaces');
            return;
        }

        var PorcentajeDescuento = document.getElementById('PorcentajeDescuento');
        if (PorcentajeDescuento.value == ''){
            PorcentajeDescuento.value = "0";
        }

        var ValorDescuento = document.getElementById('ValorDescuento');
        if (ValorDescuento.value == ''){
            ValorDescuento.value = "0";
        }

        var DescripcionDescuento = document.getElementById('DescripcionDescuento');
        if (DescripcionDescuento.value == ''){
            alert('Description is required');
            return;
        }

        var row = DescuentosTable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = id.value;
        cell2.innerHTML = PorcentajeDescuento.value;
        cell3.innerHTML = ValorDescuento.value;
        cell4.innerHTML = DescripcionDescuento.value;
        id.value = '';
        PorcentajeDescuento.value = '0';
        ValorDescuento.value = '0';
        DescripcionDescuento.value = '';
        LoadSelect(document.getElementById('DescuentosSelect'), DescuentosTable, 0, 3);
    });
}

function RegistrarServicios(){
    var RegistrarServicioButton = document.getElementById('RegistrarServicioButton');
    RegistrarServicioButton.addEventListener('click', function() {
        var id = document.getElementById('IdServicio');
        var ServiciosTable = document.getElementById('ServiciosTable');
        if (!VerifyId(id.value, ServiciosTable.rows)){
            alert('Existing ID');
            return;
        }
        if (id.value == ''){
            alert('ID is required');
            return;
        }

        var TarifaServicio = document.getElementById('TarifaServicio');
        if (TarifaServicio.value == ''){
            alert('Fare is required');
            return;
        }

        var DescripcionServicio = document.getElementById('DescripcionServicio');
        if (DescripcionServicio.value == ''){
            alert('Description is required');
            return;
        }

        var row = ServiciosTable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = id.value;
        cell2.innerHTML = TarifaServicio.value;
        cell3.innerHTML = DescripcionServicio.value;
        id.value = '';
        TarifaServicio.value = '';
        DescripcionServicio.value = '';
        LoadSelect(document.getElementById('ServiciosSelect'), ServiciosTable, 0, 2);
    });
}

function SaveCliente(
    IdId = 'IdCliente', PasaporteId = 'pasaporte', CedulaId = 'cedula', NombresId = 'nombres',
    ApellidosId = 'apellidos', FechaNacimientoId = 'FechaNacimiento', TelefonoId = 'telefono', EmailId = 'email',
    NacionalidadId = 'nacionalidad', SexoId = 'sexo', VisaId = 'visa', IdString = false
){
    var pasaporte = document.getElementById(PasaporteId);

    var cedula = document.getElementById(CedulaId);
    if(cedula.value == ''){
        alert('Cedula is required');
        return;
    }

    var nombres = document.getElementById(NombresId);
    if (nombres.value == ''){
        alert('Names are required');
        return;
    }

    var apellidos = document.getElementById(ApellidosId);
    if (apellidos.value == ''){
        alert('Surnames are required');
        return;
    }

    var FechaNacimiento = document.getElementById(FechaNacimientoId);
    if (new Date(FechaNacimiento.value) > new Date()) {
        alert('The date of birth cannot be greater than the current date');
        return;
    }

    var telefono = document.getElementById(TelefonoId);
    var email = document.getElementById(EmailId);
    var nacionalidad = document.getElementById(NacionalidadId);
    var sexo = document.getElementById(SexoId);

    var ClientesTable = document.getElementById('ClientesTable');

    if (!IdString){
        var id = document.getElementById(IdId);
        if (!VerifyId(id.value, ClientesTable.rows)){
            alert('Existing ID');
            return;
        }
        if (id.value == ''){
            alert('ID is required');
            return;
        }
        if (id.value.includes(' ')){
            alert('The ID cannot contain spaces');
            return;
        }
    }

    var visa = "No";
    if (VisaId != ""){
        if (document.getElementById(VisaId).checked){
            visa = "Yes";
        }
    }

    var row = ClientesTable.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);
    var cell11 = row.insertCell(10);
    if (!IdString){
        cell1.innerHTML = id.value;
    } else {
        cell1.innerHTML = IdId;
    }
    cell2.innerHTML = pasaporte.value;
    cell3.innerHTML = cedula.value;
    cell4.innerHTML = nombres.value;
    cell5.innerHTML = apellidos.value;
    cell6.innerHTML = FechaNacimiento.value;
    cell7.innerHTML = telefono.value;
    cell8.innerHTML = email.value;
    cell9.innerHTML = sexo.value;
    cell10.innerHTML = nacionalidad.value;
    cell11.innerHTML = visa;
    if (!IdString){
        id.value = '';
    }
    pasaporte.value = '';
    cedula.value = '';
    nombres.value = '';
    apellidos.value = '';
    FechaNacimiento.value = '';
    telefono.value = '';
    email.value = '';
    sexo.value = '';
    nacionalidad.value = '';
    LoadSelect(document.getElementById('ClientesSelect'), ClientesTable, 0, 2, 3, ': ', 4, ' ');
}

function RegistrarClientes(){
    var RegistrarClientesButton = document.getElementById('RegistrarClientesButton');
    RegistrarClientesButton.addEventListener('click', () => SaveCliente());
}

function InitSelectClientes(){
    var ClientesTable = document.getElementById('ClientesTable')
    LoadSelect(document.getElementById('ClientesSelect'), ClientesTable, 0, 2, 3, ': ', 4, ' ');
}

function AsOcupado(ClassName = "asiento", VueloId = "vuelo", AsientoId = "asiento"){
    var asientos = document.getElementsByClassName(ClassName);
    var ReservacionesTable = document.getElementById('ReservacionesTable');
    var vuelo = document.getElementById(VueloId);
    var rows = ReservacionesTable.rows; 
    var asiento = document.getElementById(AsientoId);
    for (var i = 0; i < asientos.length; i++) {
        asientos[i].removeAttribute('disabled');
        asientos[i].classList.remove('seleccionado');
        asientos[i].classList.remove('ocupado');
        asientos[i].classList.remove('disponible');
        var ocupado = false;
        for (var t = 1; t < rows.length; t++) {
            var AsientosTable = rows[t].cells[6].innerHTML.split(' ');
            for (let p = 0; p < AsientosTable.length; p++) {
                if (AsientosTable[p] == asientos[i].id && rows[t].cells[4].innerHTML.includes(vuelo.value) == true && AsientosTable[p] != '') {
                    asientos[i].classList.add('ocupado');
                    asientos[i].setAttribute('disabled', 'disabled');
                    ocupado = true;
                    break;
                }
                
            }
        }
        if (ocupado == false) {
            if (asiento.value.includes(asientos[i].id+ "~" + vuelo.value)) {
                asientos[i].classList.add('seleccionado');
            } else {
                asientos[i].classList.add('disponible');
            }
        }
    }
}

function UpdateSpan(element, suma){
    ValorActual = parseFloat(element.innerHTML);
    ValorActual += suma;
    element.innerHTML = ValorActual.toString();
}

function VerifyDisponible(id){
    var ReservacionesTable = document.getElementById('ReservacionesTable');
    var rows = ReservacionesTable.rows;
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[6].innerHTML === id) {
            return false;
        }
    }
    return true;
}

function VerifyAsientoExistente(id){
    var asiento = document.getElementById(id);
    if (asiento != null){
        return true;
    }
    return false;
}
function VerifyId(id, rows){
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].innerHTML === id) {
            return false;
        }
    }
    return true;
}

function CalcDescuentos(descuento, tarifa){
    var DescuentosTable = document.getElementById('DescuentosTable');
    var rows = DescuentosTable.rows;
    var ValorDescuentos = 0.0;
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].innerHTML === descuento) {
            ValorDescuentos += -1*((parseFloat(rows[i].cells[1].innerHTML) * tarifa) / 100);
            ValorDescuentos += -1*(parseFloat(rows[i].cells[2].innerHTML));
            break;
        }
    }
    return ValorDescuentos;
}

function MontosTotales(maleta, MaletaMano, MaletaExtrasTable, vuelos, CantidadMascotas, descuento, substraer = false,
    descuentos = null, DescuentosValue = true, tarifa = 0.0, CountClientes = 1, IdMaletaExtra = 'MaletasExtras'
){
    var TarifaSobrepeso = parseFloat(document.getElementById('TarifaSobrepeso').value);
    var PesoMaximoMaleta = parseFloat(document.getElementById('PesoMaximoMaleta').value);

    var VuelosTable = document.getElementById('VuelosTable');
    var rows = VuelosTable.rows;
    var ValorVuelos = 0.0;
    vuelos.forEach(vuelo => {
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[0].innerHTML === vuelo && vuelo != '') {
                ValorVuelos += parseFloat(rows[i].cells[1].innerHTML);
                break;
            }
        }
    });
    ValorVuelos *= CountClientes
    tarifa += ValorVuelos;
    if (substraer){
        ValorVuelos *= -1;
    }
    UpdateSpan(document.getElementById('TotalTarifaVuelo'), ValorVuelos);

    var ValorMaleta = 0.0;
    if (maleta != ''){
        ValorMaleta += parseFloat(document.getElementById('TarifaMaleta').value);
        if (parseFloat(maleta) > PesoMaximoMaleta){
            ValorMaleta += (parseFloat(maleta)-PesoMaximoMaleta) * TarifaSobrepeso;
        }
    }
    tarifa += ValorMaleta;
    if (substraer){
        ValorMaleta *= -1;
    }
    UpdateSpan(document.getElementById('TotalTarifaMaleta'), ValorMaleta);

    var ValorMaletaMano = 0.0;
    if (MaletaMano != ''){
        ValorMaletaMano = parseFloat(document.getElementById('TarifaMaletaMano').value);
        tarifa += ValorMaletaMano;
        if (substraer){
            ValorMaletaMano *= -1;
        }
        UpdateSpan(document.getElementById('TotalTarifaMaletaMano'), ValorMaletaMano);
    }

    var ValorGeneral = parseFloat(document.getElementById('TarifaGeneral').value);
    ValorGeneral *= CountClientes;
    tarifa += ValorGeneral;
    if (substraer){
        ValorGeneral *= -1;
    }
    UpdateSpan(document.getElementById('TotalTarifaGeneral'), ValorGeneral);

    var MaletasExtras = "";
    var ValorMaletasExtras = 0.0;
    var TarifaMaletaExtra = parseFloat(document.getElementById('TarifaMaletaExtra').value);
    if (substraer){
        var PesosMaletasExtras = (MaletaExtrasTable).split(' ');
        for (var i = 0; i < PesosMaletasExtras.length; i++){
            if (PesosMaletasExtras[i] != ''){
                ValorMaletasExtras += TarifaMaletaExtra;
                if (parseFloat(PesosMaletasExtras[i]) > PesoMaximoMaleta){
                    ValorMaletasExtras += (parseFloat(PesosMaletasExtras[i])-PesoMaximoMaleta) * TarifaSobrepeso;
                }
            }
        }
        ValorMaletasExtras *= -1;
    } else {
        var CantidadMaletasExtras = document.getElementById('CantidadMaletas');
        for (var i = 1; i <= parseInt(CantidadMaletasExtras.value); i++){
            var MaletaExtra = document.getElementById(IdMaletaExtra + i.toString());
            if (MaletaExtra.value != ''){
                MaletasExtras += MaletaExtra.value + ' ';
                ValorMaletasExtras += TarifaMaletaExtra;
                if (parseFloat(MaletaExtra.value) > PesoMaximoMaleta){
                    ValorMaletasExtras += (parseFloat(MaletaExtra.value)-PesoMaximoMaleta) * TarifaSobrepeso;
                }
            }
            MaletaExtra.value = '';
        }
    }
    tarifa += ValorMaletasExtras;
    UpdateSpan(document.getElementById('TotalTarifaMaletasExtras'), ValorMaletasExtras);

    ValorMascotas = 0.0;
    if (CantidadMascotas != ''){
        ValorMascotas = parseFloat(CantidadMascotas) * parseFloat(document.getElementById('TarifaMascotas').value);
        tarifa += ValorMascotas;
        if (substraer){
            ValorMascotas *= -1;
        }
        UpdateSpan(document.getElementById('TotalTarifaMascotas'), ValorMascotas);
    }

    var DescuentoTable = "";
    var ValorDescuentos = 0.0;
    if (descuentos != null){
        if (DescuentosValue){
            var length = descuentos.options.length;
        } else {
            var length = descuentos.length;
        }
        for (let i = 0; i < length; i++) {
            if (DescuentosValue){
                var ValDescuento = descuentos.options[i].value;
                if (!descuentos.options[i].selected){
                    continue
                }
            } else {
                var ValDescuento = descuentos[i];
            }
            if (ValDescuento != ''){
                DescuentoTable += ValDescuento + ' ';
                ValorDescuentos += CalcDescuentos(ValDescuento, tarifa);
            }
        }
    } else {
        DescuentoTable = descuento.value;
        ValorDescuentos = CalcDescuentos(descuento.value, tarifa);
    }
    tarifa += ValorDescuentos;
    if (substraer){
        ValorDescuentos *= -1;
    }
    UpdateSpan(document.getElementById('TotalDescuentos'), ValorDescuentos);

    if (substraer){
        tarifa *= -1;
    }
    UpdateSpan(document.getElementById('total'), tarifa);

    return [MaletasExtras, tarifa, DescuentoTable, ValorVuelos, ValorMaleta, ValorMaletaMano, ValorGeneral, ValorMaletasExtras, ValorMascotas, ValorDescuentos];
}

function VerifyVisa(ClienteId, VueloId){
    var ClientesTable = document.getElementById('ClientesTable');
    var VuelosTable = document.getElementById('VuelosTable');

    var clienteValido = false;
    for (var i = 1; i < ClientesTable.rows.length; i++) {
        if (ClientesTable.rows[i].cells[0].textContent == ClienteId) {
            clienteValido = ClientesTable.rows[i].cells[10].innerHTML.toLowerCase() === 'si';
            break;
        }
    }

    var vueloValido = false;
    for (var j = 1; j < VuelosTable.rows.length; j++) {
        if (VuelosTable.rows[j].cells[0].textContent == VueloId) {
            vueloValido = VuelosTable.rows[j].cells[5].innerHTML.toLowerCase() === 'si';
            break;
        }
    }

    if (vueloValido == true && clienteValido == false){
        return false;
    }
    return true;
}

function ValidarMaletaMano(id = 'MaletaMano'){
    var MaletaMano = document.getElementById(id);
    var PesoMaximoMaletaMano = parseFloat(document.getElementById('PesoMaximoMaletaMano').value);
    if (MaletaMano.value != '' && parseFloat(MaletaMano.value) > PesoMaximoMaletaMano){
        return false;
    }
    return MaletaMano;
}

function GetServicios(id = 'ServiciosSelect'){
    var ServiciosTable = "";
    var ValorServicios = 0.0;
    var SelectServicios = document.getElementById(id);
    for (let i = 0; i < SelectServicios.options.length; i++) {
        if (!SelectServicios.options[i].selected){
            continue
        }
        ServiciosTable += SelectServicios.options[i].value + ' ';
        var TableServicios = document.getElementById('ServiciosTable');
        for (var j = 1; j < TableServicios.rows.length; j++) {
            if (TableServicios.rows[j].cells[0].innerHTML === SelectServicios.options[i].value) {
                ValorServicios += parseFloat(TableServicios.rows[j].cells[1].innerHTML);
                break;
            }
        }
    }
    return [ServiciosTable, ValorServicios];
}

function AddToReservacionesTable(
    ReservacionesTable, id, maleta, MaletaMano, MaletasExtras, VuelosTable, tarifa,
    AsientoTable, mascotas, DescuentoTable, ClientesFinal, ServiciosTable
){
    var row = ReservacionesTable.insertRow(-1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    var cell8 = row.insertCell(8);
    var cell9 = row.insertCell(9);
    var cell10 = row.insertCell(10);
    var cell11 = row.insertCell(11);
    cell0.innerHTML = id;
    cell1.innerHTML = maleta;
    cell2.innerHTML = MaletaMano;
    cell3.innerHTML = MaletasExtras;
    cell4.innerHTML = VuelosTable;
    cell5.innerHTML = tarifa;
    cell6.innerHTML = AsientoTable;
    cell7.innerHTML = mascotas;
    cell8.innerHTML = DescuentoTable;
    cell9.innerHTML = ClientesFinal;
    cell10.innerHTML = ServiciosTable;
    cell11.innerHTML = '<button class="CancelarReservacion btn btn-sm btn-warning rounded-5" idcancelacion="'+id+'">Cancel</button>';
    AsOcupado();
    CancelarReservacion();
}

function RegistrarReservaciones(){
    var RegistrarButton = document.getElementById('RegistrarButton');
    RegistrarButton.addEventListener('click', function() {
        var ID = document.getElementById('IdReservacion');
        var ReservacionesTable = document.getElementById('ReservacionesTable');
        if (!VerifyId(ID.value, ReservacionesTable.rows)){
            alert('Existing ID');
            return;
        }
        if (ID.value == ''){
            alert('ID is required');
            return;
        }
        if (ID.value.includes(' ')){
            alert('The ID cannot contain spaces');
            return;
        }

        var maleta = document.getElementById('maleta');
        var MaletaMano = ValidarMaletaMano();
        if (!MaletaMano){
            alert('Carry-on bag exceeds maximum weight');
            return;
        }
        
        var asientos = document.getElementById('asiento')
        var AsientosTemp = asientos.value.split(' ');
        var CountAsientos = 0;
        var AsientoTable = "";
        var vuelos = [];
        for (var i = 0; i < AsientosTemp.length; i++) {
            var AsientoText = AsientosTemp[i].split('~')[0];
            if (AsientoText == ''){
                continue;
            }
            if (!VerifyAsientoExistente(AsientoText)){
                alert('Non-existent seat');
                return;
            }
            if (!VerifyDisponible(AsientoText)){
                alert('Seat not available');
                return;
            }
            vuelos.push(AsientosTemp[i].split('~')[1]);
            AsientoTable += AsientoText + ' ';
            CountAsientos++;
        }
        
        var VuelosTemp = vuelos;
        vuelos = vuelos.filter(
            (vuelo, indice, self) => self.indexOf(vuelo) === indice
        );
        if (vuelos.length > 2){
            alert('You can only book two flights, one outbound and one return');
            return;
        }

        if (vuelos.length > 1){
            const LenghtVuelos1 = VuelosTemp.filter(vuelo => vuelo === vuelos[0]).length;
            const LenghtVuelos2 = VuelosTemp.filter(vuelo => vuelo === vuelos[1]).length;
            if (LenghtVuelos1 != LenghtVuelos2) {
                alert('The number of round-trip seats does not match');
                return;
            }
        }

        var descuento = document.getElementById('DescuentosSelect');
        var mascotas = document.getElementById('mascotas');
        var clientes = document.getElementById('ClientesSelect');
        
        var ClientesFinal = "";
        var VuelosTable = "";
        var CountClientes = 0;
        vuelos.forEach(vuelo => {
            CountClientes = 0;
            for (let i = 0; i < clientes.options.length; i++) {
                if (clientes.options[i].selected){
                    ClientesFinal += clientes.options[i].value + ' ';
                    if(!VerifyVisa(clientes.options[i].value, vuelo)){
                        alert('The flight requires the customer to have a visa');
                        return;
                    }
                    CountClientes++;
                }
            }
            VuelosTable += vuelo + ' ';
        });

        if (CountAsientos != CountClientes){
            alert('The number of seats does not match the number of customers');
            return;
        }

        var servicios = GetServicios();
        var ServiciosTable = servicios[0];
        var ValorServicios = servicios[1];

        totales = MontosTotales(maleta.value, MaletaMano.value, '', vuelos, mascotas.value, descuento.value, false, descuento, true, ValorServicios, CountClientes);
        var MaletasExtras = totales[0];
        var tarifa = totales[1].toString();
        var DescuentoTable = totales[2];

        AddToReservacionesTable(
            ReservacionesTable, ID.value, maleta.value, MaletaMano.value, MaletasExtras,
            VuelosTable, tarifa, AsientoTable, mascotas.value, DescuentoTable, ClientesFinal, ServiciosTable
        );
        ID.value = '';
        maleta.value = '';
        MaletaMano.value = '';
        asientos.value = '';
        mascotas.value = '0';
    });
}

function InitSelectVuelo(){
    var SelectVuelo = document.getElementById('vuelo');
    LoadSelect(SelectVuelo, document.getElementById('VuelosTable'), 0, 3, 2, ' -> ', 4, ': ');
    SelectVuelo.addEventListener('change', () => AsOcupado());
}

function SubstraerTotales(row){
    MontosTotales(row[1].innerHTML, row[2].innerHTML, row[3].innerHTML, row[4].innerHTML.split(' '), row[7].innerHTML, row[8].innerHTML, true, row[7].innerHTML.split(" "), false, 0, row[9].innerHTML.split(' ').length-1);
}

function CancelarReservacion(){
    var CancelarReservacion = document.getElementsByClassName('CancelarReservacion');
    for (var i = 0; i < CancelarReservacion.length; i++) {
        CancelarReservacion[i].addEventListener('click', function() {
            var ReservacionesTable = document.getElementById('ReservacionesTable');
            var rows = ReservacionesTable.rows;
            for (var t = 1; t < rows.length; t++) {
                if (rows[t].cells[0].innerHTML == this.getAttribute('idcancelacion')) {
                    SubstraerTotales(rows[t].cells);
                    ReservacionesTable.deleteRow(t);
                    break;
                }
            }
            AsOcupado();
        });
    }
}

function main() {
    const InitButton = document.getElementById("InitButton");
    InitButton.onclick = ChangePage;
    InitAsientos();
    InitModal('VuelosModal');
    InitModal('Descuentos');
    InitModal('Servicios');
    InitMaletasExtras();
    SelectAsiento();
    RegistrarVuelos();
    InitSelectVuelo();
    RegistrarReservaciones();
    CancelarReservacion();
    RegistrarDescuentos();
    RegistrarClientes();
    InitSelectClientes();
    RegistrarServicios();
    SelectPaises();
}

main();
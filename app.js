function SelectPaises() {
    var selects = document.getElementsByClassName('SelectPaises');
    for (let i = 0; i < selects.length; i++) {
        ContriesJson.forEach(item => {
            var paisOption = document.createElement("option");
            paisOption.value = item.code;
            paisOption.text = item.name;
            selects[i].appendChild(paisOption);
        });
        
    }
}

function InitAsientos(IdDiv) {
    var div = document.getElementById(IdDiv);
    AsientosJson.forEach(item => {
        var fila = document.createElement("div");
        fila.classList.add('fila');
        fila.innerHTML = item.fila;
        item.asientos.forEach(asiento => {
            var AsientoButton = document.createElement('button');
            AsientoButton.classList.add('asiento');
            AsientoButton.classList.add('disponible');
            AsientoButton.id = asiento+item.fila;
            AsientoButton.innerHTML = asiento;
            fila.appendChild(AsientoButton);
        });
        div.appendChild(fila);
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

function SelectAsiento(){
    var asientos = document.getElementsByClassName("asiento");
    for (var i = 0; i < asientos.length; i++) {
        asientos[i].addEventListener('click', function() {
            var asiento = document.getElementById("asiento");
            var vuelo = document.getElementById('vuelo');
            if (asiento.value.includes(this.id+ "-" + vuelo.value)) {
                this.classList.remove('seleccionado');
                this.classList.add('disponible');
                asiento.value = asiento.value.replace(this.id+" ", '');
                return;
            }
            if (!this.classList.contains('ocupado')){
                this.classList.add('seleccionado');
                this.classList.remove('disponible');
                asiento.value += this.id + "-" + vuelo.value + " ";
            }
        });
    }
}

function MaletaExtra(count){
    var maleta = document.createElement('input');
    maleta.setAttribute('type', 'number');
    maleta.setAttribute('min', '0');
    maleta.setAttribute('id', 'MaletaExtra'  + count);
    return maleta;
}

function InitMaletasExtras(){
    var count = document.getElementById('CantidadMaletas');
    var MaletasDiv = document.getElementById('MaletasExtras'); 
    while (MaletasDiv.firstChild) {
        MaletasDiv.removeChild(MaletasDiv.firstChild);
    }
    for (var i = 1; i <= parseInt(count.value); i++){
        MaletasDiv.appendChild(MaletaExtra(i));
        if (i < parseInt(count.value)){
            MaletasDiv.appendChild(document.createElement('br'));
        }
    }
    count.addEventListener('change', InitMaletasExtras);
}

function LoadSelect(select, table){
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        var option = document.createElement('option');
        option.value = rows[i].cells[0].innerHTML;
        option.text = rows[i].cells[0].innerHTML;
        select.appendChild(option);
    }
}

function RegistrarVuelos(){
    var RegistrarVueloButton = document.getElementById('RegistrarVueloButton');
    RegistrarVueloButton.addEventListener('click', function() {
        var id = document.getElementById('IdVuelo');
        var VuelosTable = document.getElementById('VuelosTable');
        if (!VerifyId(id.value, VuelosTable.rows)){
            alert('ID ya existente');
            return;
        }
        if (id.value == ''){
            alert('ID es requerido');
            return;
        }

        var tarifa = document.getElementById('TarifaVuelo');
        if (tarifa.value == ''){
            alert('Tarifa es requerida');
            return;
        }

        var destino = document.getElementById('DestinoVuelo');
        var origen = document.getElementById('OrigenVuelo');
        var FechaHora = document.getElementById('FechaHoraVuelo');

        var visa = "No";
        if (document.getElementById('VisaVuelo').checked){
            visa = "Si";
        }

        var row = VuelosTable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = id.value;
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
        LoadSelect(document.getElementById('vuelo'), VuelosTable);
    });
}

function RegistrarDescuentos(){
    var RegistrarDescuentosButton = document.getElementById('RegistrarDescuentoButton');
    RegistrarDescuentosButton.addEventListener('click', function() {
        var id = document.getElementById('IdDescuento');
        var DescuentosTable = document.getElementById('DescuentosTable');
        if (!VerifyId(id.value, DescuentosTable.rows)){
            alert('ID ya existente');
            return;
        }
        if (id.value == ''){
            alert('ID es requerido');
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
        LoadSelect(document.getElementById('DescuentosSelect'), DescuentosTable);
    });
}

function RegistrarServicios(){
    var RegistrarServicioButton = document.getElementById('RegistrarServicioButton');
    RegistrarServicioButton.addEventListener('click', function() {
        var id = document.getElementById('IdServicio');
        var ServiciosTable = document.getElementById('ServiciosTable');
        if (!VerifyId(id.value, ServiciosTable.rows)){
            alert('ID ya existente');
            return;
        }
        if (id.value == ''){
            alert('ID es requerido');
            return;
        }

        var TarifaServicio = document.getElementById('TarifaServicio');
        if (TarifaServicio.value == ''){
            alert('Tarifa es requerida');
            return;
        }

        var DescripcionServicio = document.getElementById('DescripcionServicio');

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
        LoadSelect(document.getElementById('ServiciosSelect'), ServiciosTable);
    });
}

function RegistrarClientes(){
    var RegistrarClientesButton = document.getElementById('RegistrarClientesButton');
    RegistrarClientesButton.addEventListener('click', function() {
        var id = document.getElementById('IdCliente');
        var pasaporte = document.getElementById('pasaporte');
        var cedula = document.getElementById('cedula');
        var nombres = document.getElementById('nombres');
        var apellidos = document.getElementById('apellidos');
        var FechaNacimiento = document.getElementById('FechaNacimiento');
        var telefono = document.getElementById('telefono');
        var email = document.getElementById('email');
        var nacionalidad = document.getElementById('nacionalidad');
        var sexo = document.getElementById('sexo');

        var ClientesTable = document.getElementById('ClientesTable');
        if (!VerifyId(id.value, ClientesTable.rows)){
            alert('ID ya existente');
            return;
        }
        if (id.value == ''){
            alert('ID es requerido');
            return;
        }

        var visa = "No";
        if (document.getElementById('visa').checked){
            visa = "Si";
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
        cell1.innerHTML = id.value;
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
        id.value = '';
        pasaporte.value = '';
        cedula.value = '';
        nombres.value = '';
        apellidos.value = '';
        FechaNacimiento.value = '';
        telefono.value = '';
        email.value = '';
        sexo.value = '';
        nacionalidad.value = '';
        LoadSelect(document.getElementById('ClientesSelect'), ClientesTable);
    });
}

function InitSelectClientes(){
    const ClientesTable = document.getElementById('ClientesTable')
    LoadSelect(document.getElementById('ClientesSelect'), ClientesTable);
}

function AsOcupado(){
    var asientos = document.getElementsByClassName("asiento");
    var ReservacionesTable = document.getElementById('ReservacionesTable');
    var vuelo = document.getElementById('vuelo');
    var rows = ReservacionesTable.rows; 
    var asiento = document.getElementById('asiento');
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
            if (asiento.value.includes(asientos[i].id+ "-" + vuelo.value)) {
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

function MontosTotales(maleta, MaletaMano, MaletaExtrasTable, vuelos, CantidadMascotas, descuento, substraer = false, descuentos = null, DescuentosValue = true, tarifa = 0.0){
    var TarifaSobrepeso = parseFloat(document.getElementById('TarifaSobrepeso').value);
    var PesoMaximoMaleta = parseFloat(document.getElementById('PesoMaximoMaleta').value);

    var VuelosTable = document.getElementById('VuelosTable');
    var rows = VuelosTable.rows;
    var ValorVuelos = 0.0;
    vuelos.forEach(vuelo => {
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[0].innerHTML === vuelo) {
                ValorVuelos += parseFloat(rows[i].cells[1].innerHTML);
                break;
            }
        }
    });
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

    if (MaletaMano != ''){
        var ValorMaletaMano = parseFloat(document.getElementById('TarifaMaletaMano').value);
        tarifa += ValorMaletaMano;
        if (substraer){
            ValorMaletaMano *= -1;
        }
        UpdateSpan(document.getElementById('TotalTarifaMaletaMano'), ValorMaletaMano);
    }

    var ValorGeneral = parseFloat(document.getElementById('TarifaGeneral').value);
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
            var MaletaExtra = document.getElementById('MaletaExtra' + i);
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

    if (CantidadMascotas != ''){
        var ValorMascotas = parseFloat(CantidadMascotas) * parseFloat(document.getElementById('TarifaMascotas').value);
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

    return [MaletasExtras, tarifa, DescuentoTable];
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

function RegistrarReservaciones(){
    var RegistrarButton = document.getElementById('RegistrarButton');
    RegistrarButton.addEventListener('click', function() {
        var ID = document.getElementById('IdReservacion');
        var ReservacionesTable = document.getElementById('ReservacionesTable');
        if (!VerifyId(ID.value, ReservacionesTable.rows)){
            alert('ID ya existente');
            return;
        }
        if (ID.value == ''){
            alert('ID es requerido');
            return;
        }

        var maleta = document.getElementById('maleta');

        var MaletaMano = document.getElementById('MaletaMano');
        var PesoMaximoMaletaMano = parseFloat(document.getElementById('PesoMaximoMaletaMano'));
        if (MaletaMano.value != '' && parseFloat(MaletaMano.value) > PesoMaximoMaletaMano){
            alert('Maleta de mano excede el peso maximo');
            return;
        }
        
        var asientos = document.getElementById('asiento')
        var AsientosTemp = asientos.value.split(' ');
        var CountAsientos = 0;
        var AsientoTable = "";
        var vuelos = [];
        for (var i = 0; i < AsientosTemp.length; i++) {
            var AsientoText = AsientosTemp[i].split('-')[0];
            if (AsientoText == ''){
                continue;
            }
            if (!VerifyAsientoExistente(AsientoText)){
                alert('Asiento no existente');
                return;
            }
            if (!VerifyDisponible(AsientoText)){
                alert('Asiento no disponible');
                return;
            }
            vuelos.push(AsientosTemp[i].split('-')[1]);
            AsientoTable += AsientoText + ' ';
            CountAsientos++;
        }
        vuelos = vuelos.filter(
            (vuelo, indice, self) => self.indexOf(vuelo) === indice
        );

        if (vuelos.length > 2){
            alert('Solo puede reservar dos vuelos, uno para ida y otro para vuelta');
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
                        alert('El vuelo requiere de que el cliente tenga visa');
                        return;
                    }
                    CountClientes++;
                }
            }
            VuelosTable += vuelo + ' ';
        });

        if (CountAsientos != CountClientes){
            alert('La cantidad de asientos no coincide con la cantidad de clientes');
            return;
        }

        var ServiciosTable = "";
        var ValorServicios = 0.0;
        var SelectServicios = document.getElementById('ServiciosSelect');
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

        totales = MontosTotales(maleta.value, MaletaMano.value, '', vuelos, mascotas.value, descuento.value, false, descuento, true, ValorServicios);
        var MaletasExtras = totales[0];
        var tarifa = totales[1];
        var DescuentoTable = totales[2];

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
        cell0.innerHTML = ID.value;
        cell1.innerHTML = maleta.value;
        cell2.innerHTML = MaletaMano.value;
        cell3.innerHTML = MaletasExtras;
        cell4.innerHTML = VuelosTable;
        cell5.innerHTML = tarifa.toString();
        cell6.innerHTML = AsientoTable;
        cell7.innerHTML = mascotas.value;
        cell8.innerHTML = DescuentoTable;
        cell9.innerHTML = ClientesFinal;
        cell10.innerHTML = ServiciosTable;
        cell11.innerHTML = '<button class="CancelarReservacion" idcancelacion="'+ID.value+'">Cancelar</button>';
        ID.value = '';
        maleta.value = '';
        MaletaMano.value = '';
        asientos.value = '';
        mascotas.value = '0';
        AsOcupado();
        CancelarReservacion();
    });
}

function InitSelectVuelo(){
    var SelectVuelo = document.getElementById('vuelo');
    LoadSelect(SelectVuelo, document.getElementById('VuelosTable'));
    SelectVuelo.addEventListener('change', AsOcupado);
}

function SubstraerTotales(row){
    MontosTotales(row[1].innerHTML, row[2].innerHTML, row[3].innerHTML, row[4].innerHTML.split(' '), row[7].innerHTML, row[8].innerHTML, true, row[7].innerHTML.split(" "), false);
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
    InitAsientos('asientos');
    InitModal('Parametros');
    InitModal('Reservaciones');
    InitModal('VuelosModal');
    InitModal('Descuentos');
    InitModal('Clientes');
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
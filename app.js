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
            ToggleAsiento();
            var asiento = document.getElementById("asiento");
            if (!this.classList.contains('ocupado')){
                this.classList.add('seleccionado');
                this.classList.remove('disponible');
                asiento.value = this.id;
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

function LoadSelectVuelo(SelectVuelo){
    while (SelectVuelo.firstChild) {
        SelectVuelo.removeChild(SelectVuelo.firstChild);
    }
    var VuelosTable = document.getElementById('VuelosTable');
    var rows = VuelosTable.rows;
    for (var i = 1; i < rows.length; i++) {
        var option = document.createElement('option');
        option.value = rows[i].cells[0].innerHTML;
        option.text = rows[i].cells[0].innerHTML;
        SelectVuelo.appendChild(option);
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

        var row = VuelosTable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = id.value;
        cell2.innerHTML = tarifa.value;
        cell3.innerHTML = destino.value;
        cell4.innerHTML = origen.value;
        cell5.innerHTML = FechaHora.value;
        id.value = '';
        tarifa.value = '';
        destino.value = '';
        origen.value = '';
        FechaHora.value = '';
        LoadSelectVuelo(document.getElementById('vuelo'));
    });
}

function AsOcupado(){
    var asientos = document.getElementsByClassName("asiento");
    var ReservacionesTable = document.getElementById('ReservacionesTable');
    var vuelo = document.getElementById('vuelo');
    var rows = ReservacionesTable.rows; 
    for (var i = 0; i < asientos.length; i++) {
        asientos[i].removeAttribute('disabled');
        asientos[i].classList.remove('seleccionado');
        asientos[i].classList.remove('ocupado');
        asientos[i].classList.remove('disponible');
        var ocupado = false;
        for (var t = 1; t < rows.length; t++) {
            if (rows[t].cells[13].innerHTML == asientos[i].id && rows[t].cells[11].innerHTML == vuelo.value) {
                asientos[i].classList.add('ocupado');
                asientos[i].setAttribute('disabled', 'disabled');
                ocupado = true;
                break;
            }
        }
        if (ocupado == false) {
            asientos[i].classList.add('disponible');
        }
    }
    var asiento = document.getElementById('asiento');
    asiento.value = '';
}

function UpdateSpan(element, suma){
    ValorActual = parseFloat(element.innerHTML);
    ValorActual += suma;
    element.innerHTML = ValorActual.toString();
}

function VerifyDisponible(id){
    var asiento = document.getElementById(id);
    if (asiento.classList.contains('disponible')){
        return true;
    }
    return false;
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

        var pasaporte = document.getElementById('pasaporte');
        var cedula = document.getElementById('cedula');
        var nombres = document.getElementById('nombres');
        var apellidos = document.getElementById('apellidos');
        var FechaNacimiento = document.getElementById('FechaNacimiento');
        var telefono = document.getElementById('telefono');
        var email = document.getElementById('email');
        var maleta = document.getElementById('maleta');

        var MaletaMano = document.getElementById('MaletaMano');
        var PesoMaximoMaletaMano = parseFloat(document.getElementById('PesoMaximoMaletaMano'));
        if (MaletaMano.value != '' && parseFloat(MaletaMano.value) > PesoMaximoMaletaMano){
            alert('Maleta de mano excede el peso maximo');
            return;
        }
        
        var asiento = document.getElementById('asiento');
        if (!VerifyAsientoExistente(asiento.value)){
            alert('Asiento no existente');
            return;
        }
        if (!VerifyDisponible(asiento.value)){
            alert('Asiento no disponible');
            return;
        }

        var vuelo = document.getElementById('vuelo');

        var tarifa = 0.0;
        var TarifaSobrepeso = parseFloat(document.getElementById('TarifaSobrepeso'));
        var PesoMaximoMaleta = parseFloat(document.getElementById('PesoMaximoMaleta'));

        var VuelosTable = document.getElementById('VuelosTable');
        var rows = VuelosTable.rows;
        var ValorVuelos = 0.0;
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[0].innerHTML === vuelo.value) {
                ValorVuelos += parseFloat(rows[i].cells[1].innerHTML);
                break;
            }
        }
        tarifa += ValorVuelos;
        UpdateSpan(document.getElementById('TotalTarifaVuelo'), ValorVuelos);

        var ValorMaleta = 0.0;
        if (maleta.value != ''){
            ValorMaleta += parseFloat(document.getElementById('TarifaMaleta').value);
            if (parseFloat(maleta.value) > PesoMaximoMaleta){
                ValorMaleta += (parseFloat(maleta.value)-PesoMaximoMaleta) * TarifaSobrepeso;
            }
        }
        tarifa += ValorMaleta;
        UpdateSpan(document.getElementById('TotalTarifaMaleta'), ValorMaleta);

        if (MaletaMano.value != ''){
            var ValorMaletaMano = parseFloat(document.getElementById('TarifaMaletaMano').value);
            tarifa += ValorMaletaMano;
            UpdateSpan(document.getElementById('TotalTarifaMaletaMano'), ValorMaletaMano);
        }

        var ValorGeneral = parseFloat(document.getElementById('TarifaGeneral').value);
        tarifa += ValorGeneral;
        UpdateSpan(document.getElementById('TotalTarifaGeneral'), ValorGeneral);

        var CantidadMaletasExtras = document.getElementById('CantidadMaletas');
        var MaletasExtras = "";
        var ValorMaletasExtras = 0.0;
        for (var i = 1; i <= parseInt(CantidadMaletasExtras.value); i++){
            var MaletaExtra = document.getElementById('MaletaExtra' + i);
            if (MaletaExtra.value != ''){
                MaletasExtras += MaletaExtra.value + ' ';
                ValorMaletasExtras += parseFloat(document.getElementById('TarifaMaletaExtra').value);
                if (parseFloat(MaletaExtra.value) > PesoMaximoMaleta){
                    ValorMaletasExtras += (parseFloat(MaletaExtra.value)-PesoMaximoMaleta) * TarifaSobrepeso;
                }
            }
            MaletaExtra.value = '';
        }
        tarifa += ValorMaletasExtras;
        UpdateSpan(document.getElementById('TotalTarifaMaletasExtras'), ValorMaletasExtras);

        var mascotas = document.getElementById('mascotas');
        var ValorMascotas = parseFloat(mascotas.value) * parseFloat(document.getElementById('TarifaMascotas').value);
        tarifa += ValorMascotas;
        UpdateSpan(document.getElementById('TotalTarifaMascotas'), ValorMascotas);

        UpdateSpan(document.getElementById('total'), tarifa);

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
        var cell12 = row.insertCell(12);
        var cell13 = row.insertCell(13);
        var cell14 = row.insertCell(14);
        var cell15 = row.insertCell(15);
        cell0.innerHTML = ID.value;
        cell1.innerHTML = pasaporte.value;
        cell2.innerHTML = cedula.value;
        cell3.innerHTML = nombres.value;
        cell4.innerHTML = apellidos.value;
        cell5.innerHTML = FechaNacimiento.value;
        cell6.innerHTML = telefono.value;
        cell7.innerHTML = email.value;
        cell8.innerHTML = maleta.value;
        cell9.innerHTML = MaletaMano.value;
        cell10.innerHTML = MaletasExtras;
        cell11.innerHTML = vuelo.value;
        cell12.innerHTML = tarifa.toString();
        cell13.innerHTML = asiento.value;
        cell14.innerHTML = mascotas.value;
        cell15.innerHTML = '<button class="CancelarReservacion" idcancelacion="'+ID.value+'">Cancelar</button>';
        ID.value = '';
        pasaporte.value = '';
        cedula.value = '';
        nombres.value = '';
        apellidos.value = '';
        FechaNacimiento.value = '';
        telefono.value = '';
        email.value = '';
        maleta.value = '';
        MaletaMano.value = '';
        asiento.value = '';
        mascotas.value = '0';
        AsOcupado();
        CancelarReservacion();
    });
}

function InitSelectVuelo(){
    var SelectVuelo = document.getElementById('vuelo');
    LoadSelectVuelo(SelectVuelo);
    SelectVuelo.addEventListener('change', AsOcupado);
}

function SubstraerTotales(row){
    var tarifa = 0.0;
    var TarifaSobrepeso = parseFloat(document.getElementById('TarifaSobrepeso'));
    var PesoMaximoMaleta = parseFloat(document.getElementById('PesoMaximoMaleta'));

    var VuelosTable = document.getElementById('VuelosTable');
    var rows = VuelosTable.rows;
    var ValorVuelos = 0.0;
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].innerHTML === row[11].innerHTML) {
            ValorVuelos += parseFloat(rows[i].cells[1].innerHTML);
            break;
        }
    }
    tarifa += ValorVuelos;
    UpdateSpan(document.getElementById('TotalTarifaVuelo'), -1*ValorVuelos);

    var ValorMaleta = 0.0;
    if (row[8].innerHTML != ''){
        ValorMaleta += parseFloat(document.getElementById('TarifaMaleta').value);
        if (parseFloat(row[8].innerHTML) > PesoMaximoMaleta){
            ValorMaleta += (parseFloat(row[8].innerHTML)-PesoMaximoMaleta) * TarifaSobrepeso;
        }
    }
    tarifa += ValorMaleta;
    UpdateSpan(document.getElementById('TotalTarifaMaleta'), -1*ValorMaleta);

    if (row[9].innerHTML != ''){
        var ValorMaletaMano = parseFloat(document.getElementById('TarifaMaletaMano').value);
        tarifa += ValorMaletaMano;
        UpdateSpan(document.getElementById('TotalTarifaMaletaMano'), -1*ValorMaletaMano);
    }

    var ValorGeneral = parseFloat(document.getElementById('TarifaGeneral').value);
    tarifa += ValorGeneral;
    UpdateSpan(document.getElementById('TotalTarifaGeneral'), -1*ValorGeneral);

    var PesosMaletasExtras = (row[10].innerHTML).split(' ');
    var MaletasExtras = "";
    var ValorMaletasExtras = 0.0;
    for (var i = 0; i < PesosMaletasExtras.length; i++){
        if (PesosMaletasExtras[i] != ''){
            MaletasExtras += PesosMaletasExtras[i] + ' ';
            ValorMaletasExtras += parseFloat(document.getElementById('TarifaMaletaExtra').value);
            if (parseFloat(PesosMaletasExtras[i]) > PesoMaximoMaleta){
                ValorMaletasExtras += (parseFloat(PesosMaletasExtras[i])-PesoMaximoMaleta) * TarifaSobrepeso;
            }
        }
    }
    tarifa += ValorMaletasExtras;
    UpdateSpan(document.getElementById('TotalTarifaMaletasExtras'), -1*ValorMaletasExtras);

    var ValorMascotas = parseFloat(row[14].innerHTML) * parseFloat(document.getElementById('TarifaMascotas').value);
    tarifa += ValorMascotas;
    UpdateSpan(document.getElementById('TotalTarifaMascotas'), -1*ValorMascotas);

    UpdateSpan(document.getElementById('total'), -1*tarifa);
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
    InitModal('Parametros');
    InitModal('Reservaciones');
    InitModal('VuelosModal');
    InitMaletasExtras();
    SelectAsiento();
    RegistrarVuelos();
    InitSelectVuelo();
    RegistrarReservaciones();
    CancelarReservacion();
}

main();
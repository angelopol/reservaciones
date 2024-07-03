# Objetivos de la aplicación #
- Reservaciones de un vuelo
- Index de las reservaciones
- Creacion de diferentes vuelos con diferentes asientos
- Vista de los asientos disponibles o no disponibles por vuelo
- Creacion de descuentos personalizados para las reservaciones

## Funciones de la aplicación ##
- Añadir, cancelar, modificar una reservación
- Añadir, eliminar, modificar un vuelo
- Añadir, eliminar, modificar un descuento
- Añadir, eliminar, modificar clientes
- Modificación de parametros generales de las reservaciones
- Posibilidad de ver el monto total del costo de las reservaciones desglosado por tarifas
- Posibilidad de reservar para varios pasajeros con varios asientos

## Cosas a tener en cuenta ##
- Cuando se añade una resevación el asiento seleccionado comienza a estar no disponible
- Cuando se cancela una reservación el asiento comienza a estar disponible y los montos totales se deben actualizar restando el monto de la reservación
- Si se modifica el asiento de una reservación el asiento anterior pasa a estar disponible y el nuevo asiento a estar no disponible
- Datos del cliente:
    * ID
    * Número de pasaporte o cédula si el pasaporte esta vencido
    * Nombres y apellidos
    * Fecha de nacimiento
    * Teléfono
    * Email
    * Nacionalidad
    * Sexo
    * Visa (Si/No)
- Datos de las reservaciones:
    * ID
    * Cliente
    * Cada reservación tendra en cuenta el identicador del vuelo
    * Descuentos, Se pueden escoger varios descuentos por reservación
    * Servicios, Se pueden escoger varios servicios por reservación
    * Servicio medico (Si/No) *
    * Ayuda con el equipaje (Si/No) *
    * Traductor (Si/No) *
    * Wifi (Si/No) *
- Datos del vuelo:
    * ID
    * Tarifa del vuelo
    * Destino del vuelo
    * Lugar de salida
    * Fecha y hora de salida
    * Tiempo de vuelo
    * Visa (Si/No)
- Datos del descuento:
    * ID
    * Porcentaje
    * Valor
    * Descripcion
    * Rango de edad (inicio-final) *
    * Nacionalidad *
- Datos del servicio:
    * ID
    * tarifa
    * Descripción

## Validaciones ##
- No pueden haber mas de un vuelo con el mismo ID y el ID es requerido
- No puede haber mas de una reservación con el mismo ID y el ID es requerido
- No puede haber mas de un descuento con el mismo ID y el ID es requerido
- No puede haber mas de un cliente con el mismo ID y el ID es requerido
- No puede haber mas de un servicio con el mismo ID y el ID es requerido
- Se debe validar que el asiento este disponible y el asiento es un input requerido
- Verificar que la maleta de mano no sobrepase el peso maximo establecido en los parametros generales
- La tarifa del vuelo es requerida
- La tarifa del servicio es requerida
- Si el vuelo requiere visa se debe validar que el cliente posea visa
- Validar asientos por edad de personas (niños no pueden estar cerca de las salidas de emergencias) *
- El origen y el destino de un vuelo no pueden ser el mismo *

## Parametros generales ##
- Tarifa sin maleta (general)
- Tarifa con maleta
- Peso de la maleta incluida en la tarifa
- Tarifa maleta de mano
- Peso del bolso o maleta de mano
- Tarifa de maleta extra
- Cantidad de maletas extras posibles
- Tarifa por sobrepeso de la maleta
- Tarifa por mascota
- Tarifa por servicio medico *
- Tarifa por servicio de ayuda con el equipaje *
- Tarifa por servicio de traductores *
- Tarifa por servicio de wifi *
- Tarifa por servicio de abordaje prioritario *

## Posibles nuevas funcionalidades ##
- Reservaciones de ida y vuelta *
- Pedir datos de pago para la reservacion *
- Seleccionar area del telefono *
- Tarifa por objetos valiosos dentro del equipaje con porcentajes (Servicio Declaracion Expresa de Valor) *

### Avianca ###
- Seleccion de cantidad de pasajeros, fechas de vuelo y paises de origen
- Seleccion de vuelo de ida
- Seleccion de vuelo de vuelta
- Registro de clientes
- Seleccion de cantidad de equipaje y servicios
- Seleccion de asientos
- Pago:
    * Datos de la tarjeta:
        + Nombre del titular
        + Numero de tarjeta
        + Fecha de expiracion
        + CVV
    * Datos de facturacion:
        + Correo electronico
        + Direccion de residencia
        + Ciudad
        + Pais
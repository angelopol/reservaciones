### Objetivos de la aplicación ###
- Reservaciones de un vuelo
- Index de las reservaciones
- Creacion de diferentes vuelos con diferentes asientos
- Vista de los asientos disponibles o no disponibles por vuelo

## Funciones de la aplicación ##
- Añadir, cancelar, modificar una reservación
- Añadir, eliminar, modificar un vuelo
- Modificación de parametros generales de las reservaciones
- Posibilidad de ver el monto total del costo de las reservaciones desglosado por tarifas

## Cosas a tener en cuenta ##
- Cuando se añade una resevación el asiento seleccionado comienza a estar no disponible
- Cuando se cancela una reservación el asiento comienza a estar disponible y los montos totales se deben actualizar restando el monto de la reservación
- Si se modifica el asiento de una reservación el asiento anterior pasa a estar disponible y el nuevo asiento a estar no disponible
- Datos del cliente: número de pasaporte o cédula si el pasaporte esta vencido, nombres y apellidos, fecha de nacimiento, teléfono, email
- Cada reservación tendra en cuenta el identicador del vuelo
- Datos del vuelo: ID, Tarifa del vuelo, destino del vuelo, lugar de salida, Fecha y hora de salida, tiempo de vuelo

## Validaciones ##
- No pueden haber mas de un vuelo con el mismo ID y el ID es requerido
- No puede haber mas de una reservación con el mismo ID y el ID es requerido
- Se debe validar que el asiento este disponible y el asiento es un input requerido
- Verificar que la maleta de mano no sobrepase el peso maximo establecido en los parametros generales
- La tarifa del vuelo es requerida

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
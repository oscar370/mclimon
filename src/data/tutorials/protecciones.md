# Protecciones

## Obtener Protecciones

---

Para adquirir un bloque de protección, utiliza el siguiente comando:

```
/ps get [nombreProtección]
```

Por ejemplo, si deseas obtener una protección de tamaño 64x64, ejecuta:

```
/ps get 64
```

El nombre de la protección define su tamaño y costo. Para ver todas las opciones disponibles, escribe:

```
/ps get
```

> Verás una lista con los nombres, precios y dimensiones de las protecciones.

## Colocar Protecciones

---

Una vez que tengas el bloque en tu inventario, colócalo en el suelo para declarar el área protegida. Al hacerlo:

- El área definida quedará automáticamente protegida.
- El costo de la protección se descontará de tu moneda en el servidor.

> Las dimensiones de la protección (por ejemplo, 64x64) se miden desde el bloque hacia las cuatro direcciones cardinales. Asegúrate de colocarlo correctamente.

## Gestionar Permisos

---

Puedes otorgar o revocar acceso a otros jugadores con estos comandos.

Otorgar permiso:

```
/ps add [nombreJugador]
```

Revocar permiso:

```
/ps remove [nombreJugador]
```

Ejemplo:

```
/ps add Steve
/ps remove Creeper
```

> Por defecto, ningún jugador tiene acceso a tus protecciones.

## Remover Protecciones

---

Si necesitas desproteger un área, utiliza:

```
/ps unclaim
```

Esto eliminará la protección activa en el lugar donde te encuentras.

## Mas Información

---

Para explorar comandos avanzados, como ver el límite de protecciones por jugador o configurar reglas personalizadas, visita la documentación oficial del plugin [aquí](https://espidev.gitbook.io/protectionstones/commands).

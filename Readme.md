# Proyecto Backend || :rocket:

Este proyecto se basa en el patron de diseño **MVC**

1. **M** El Modelo es la 'Entidad' hacia la BBDD
2. **V** La vista es quien hace la consulta
3. **C** Esta consulta llega al controlador, quien hace la conección hacia la BBDD, cuando la BBDD le responde,
   este se encarga de mandar la información hacia la vista

**Ejemplo:**

- Cliente hace click al boton de registro, este llega a la ruta, routes/users.route.js

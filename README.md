### GESTOR DE CALIFICACIONES ESCOLARES Y UNIVERSITARIAS.


- #### Objetivo General
Desarrollar un sistema integral de gestión de materias y calificaciones, que mejore y facilite los procesos académicos a los estudiantes.

##### CONFIGURACIÓN DE LA BASE DE DATOS SQL.
Inicializar la base de datos en MySql Workbench con los siguientes comandos:

DROP DATABASE IF EXISTS SCHOOL_GRADES_MANAGER;
CREATE DATABASE SCHOOL_GRADES_MANAGER;

Configurar el archivo **../config/config.json** con los datos de la intancia local de MySQL

   **"development"**: {
   
    "username": "root",  // "nombre del usuario"
    "password": "mysql",  // "Contraseña"
	 "database": "SCHOOL_GRADES_MANAGER", // Nombre de la BD*
    "host": "127.0.0.1" ,
    "dialect": "mysql", // Gestor de base de datos a utilizar*
    "operatorsAliases": 0
  }

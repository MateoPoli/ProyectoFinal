### GESTOR DE CALIFICACIONES ESCOLARES Y UNIVERSITARIAS.


- #### OBJETIVO GENERAL
Desarrollar un sistema integral de gestión de materias y calificaciones, que mejore y facilite los procesos académicos a los estudiantes.

---

- ### INICIAR SERVIDOR
    **Principal: server.js**
    
    **Comando :**  `<npm run dev>`
---

- ### CONFIGURACIÓN DE LA BASE DE DATOS SQL.
Inicializar la base de datos en MySql Workbench con los siguientes comandos:

 > "DROP DATABASE IF EXISTS SCHOOL_GRADES_MANAGER"
 
 > "CREATE DATABASE SCHOOL_GRADES_MANAGER"


Configurar el archivo **../config/config.json** con los datos de la intancia local de MySQL

   **"development"**: {
   
    "username": "root",  // "nombre del usuario"
    "password": "mysql",  // "Contraseña"
	 "database": "SCHOOL_GRADES_MANAGER", // Nombre de la BD*
    "host": "127.0.0.1" ,
    "dialect": "mysql", // Gestor de base de datos a utilizar*
    "operatorsAliases": 0
  }
  
  ##### Diagrama de clases BD.
  
  ![SCHOOL_GRADES_MANAGER_DIG](https://user-images.githubusercontent.com/70857130/102020951-76816d80-3d4a-11eb-952b-d26ccf263fc8.png)
  
  ---
- ### RUTAS

 ### Estudiantes

 `Route localhost: 3000/students/  `
 > "Crear un nuevo estudiante:  Route POST localhost: 3000/students/new"
   
   **Ejemplo:** {
    
    "idStudent": 1214748653,
    "name": "mateo presiga",
    "age": 18,
    "email": "mateo@presiga.com"
    
    } 
  
  > "Listar estudiantes:  Route GET localhost: 3000/students/all/"
  
  > "Buscar un estudiante:  Route GET localhost: 3000/students/find/:id"
  
  > "Eliminar un estudiante:  Route DELETE localhost: 3000/students/:id"
  
  > "Editar un estudiante:  Route DELETE localhost: 3000/students/edit"


 ### Cursos

 `Route localhost: 3000/course/  `
 > "Crear un nuevo curso:  Route POST localhost: 3000/course/new"
   
   **Ejemplo:** {
    
    "idCourse": "CAL12345678",
    "name": "Calculo",
    "professor": "pacho",
    "credits": 3,
    "idStudent": 1214748653
    
    } 
  
  > "Listar curso:  Route GET localhost: 3000/course/all/"
  
  > "Buscar un curso:  Route GET localhost: 3000/course/find/:id"
  
  > "Eliminar un curso:  Route DELETE localhost: 3000/course/:id"
  
  > "Editar un curso:  Route DELETE localhost: 3000/course/"
  
  
   ### Calificaciones
   
 `Route localhost: 3000/scoree/  `
 > "Crear un nueva nueva calificación:  Route POST localhost: 3000/score/new"
   
   **Ejemplo:** {
    
    "scoreOne": 4.3,
    "scoreTwo": 4.2,
    "scoreTree": 4.1,
    "scoreFour": 3,
    "idCourse": "CAL12345678"
    
    } 
  
  > "Listar cucalificación:  Route GET localhost: 3000/score/all/"
  
  > "Buscar un calificación:  Route GET localhost: 3000/score/find/:id"
  
  > "Eliminar un calificación:  Route DELETE localhost: 3000/score/:id"
  
  > "Editar un calificación:  Route DELETE localhost: 3000/score/"



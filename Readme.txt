						        API-CRUD-MASTER- README ROUTES 

En este proyecto se busca implementar los conceptos que se consultaron y se vieron en la clase sobre la creación de un crud (create,read,update and delete)

BASE DE DATOS

Inicializar la base de datos en MySql Workbench con los siguientes comandos:
              DROP DATABASE IF EXISTS SCHOOL_GRADES_MANAGER; // si existe la base de datos la elimina
              CREATE DATABASE best_todo_ever;  // Crea la base de datos

RUTAS

Route GET localhost: 3000/api/all -> Enlista todos los registros que se encuentran dentro del crud

Route GET localhost: 3000/api/find/:id-> Busca y encuentra en los registros que se encuentran dentro del crud el registro solicitado

Route POST localhost: 3000/api/new ->Crea un nuevo registro cumpliendo los parámetros establecidos

	Para la creación del nuevo registro
	Se crea un JSON que contenga 

	1)text: "cadena", 
	2)description: "cadena",
	3)version: "entero"

	1) Se valida que la longitud de la cadena sea de mínimo 2 y máximo 50 caracteres, luego con la expresion regular se valida que la cadena ingresada sea 	alfanumérica. En caso tal de que no obtenga una cadena porque no se escribió, aparece el mensaje de requerimiento del texto.

	2) Se valida que la longitud de la cadena sea de mínimo 2 y máximo 50 caracteres, luego con la expresion regular se valida que la cadena ingresada sea 	alfanumérica. En caso tal de que no obtenga una cadena porque no se escribió, aparece el mensaje de requerimiento del texto.

	3) Se valida que el entero exista, o sea, que haya sido escrito, en caso de que no se obtenga se muestra el mensaje de que este valor es requerido; cuando se 	ingresa el entero por medio de una expresión regular se valida que este valor entero ingresado sea un numero.

Route DELETE localhost: 3000/api/delete/:id -> Elimina el o los registros que se encuentran dentro del crud

Route PUT localhost: 3000/api/edit -> edita o actualiza los registros que ya se encuentran dentro del crud y envía un request en success cuandoo dicho procedimiento es exitoso


DATOS A CREAR
{
   text: "Los reyes", 
   description: "novela de humor colombiana",
   version: 2
}
{
   text: "Avengers", 
   description: "Pelicula de ciencia ficcion, super heroes",
   version: 1
}
{
   text: "Hasta el ultimo hombre", 
   description: "Pelicula belica , primera guerra mundial",
   version: 1
}
{
   text: "Fury", 
   description: "Pelicula belica , segunda guerra mundial",
   version: 1
}
{
   text: "Dark", 
   description: "Serie de ciencia ficcion, analisis mental",
   version: 7
}

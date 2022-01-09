# hyggeBackend

Backend de la plataforma de gestión de espacios Hygge
Nota: Una vez que haya algo en una carpeta se puede borrar el archivo .gitKeep

#

# INSTALLAR NPM!!

#

1. Clonear el repositorio para obtener la estrutura en carpetas.
2. Abrir en VSCode
3. npm install para instalar todos los paquetes de npm
4. Para iniciar nodemon: npm run dev
6. A la hora de trabajar CREAR UNA BRANCH NUEVA!!!!

#

# Pasos para forkear y crear pull requests

#

1. Clickar en el botón de fork en la parte superior derecha de la pantalla.
   Esto crea una copia del repo pero bajo tu usuario de GitHub, con una URL de este estilo:
   https://github.com/YourUserName/RepoName
2. Clonamos nuestro propio repositorio forkeado.
3. Una vez dentro de el, para trabajar, abrimos una branch con el siguiente comando:
   git checkout -b new_branch
4. Creamos una conexión remota con el repositorio original:
   git remote add upstream https://github.com/juanlu99/hyggeBackend
5. Una vez realizados los cambios en esta nueva rama:
   ->git add .
   ->git commit -m "Mensaje del Commit"
   ->git push -u origin new_branch
6. Una vez pusheados los cambios al repo, vamos a gitHub, nos aparecerá un botón "Compare & pull request", lo pulsamos.
7. Se abrirá una página donde podemos comentar un mensaje para la pull request, le damos a "create pull request".
8. Si hay que realizar cambios, se modifican y se hace el push de nuevo hasta que el merge se realice.

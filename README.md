# Aprende_git_app


#Comandos interesantes

# Entrar en modo git desde el directorio que queramos usar como checkout
git init

# Conocer el estado de nuestro repositorio local
git status

# Incluir todos los ficheros para su posterior subida
git add *

# Incluir un fichero determinado para su posterior subida
git add 'nombrefichero.formato'

# Borrar todos los ficheros
git rm *

# Borrar un fichero concreto
git rm 'nombredelfichero.formato'

# Para guardar los cambios en local
git commit -m 'mensaje del commit'

# Para subir los cambios del repositorio local al repositorio online
git push -u origin master

# Para actualizar el repositorio local con el repositorio online
git pull origin master

# Conocer el historial de cambios del repositorio
git log

# Realizar el checkout
git remote add origin direccioncheckout

# Cambiar de branch
git checkout nombrebranch

# Para actualizar un branch desde otro
git merge nombredeotrobranch
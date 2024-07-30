# Como crear una APK de android usando Expo

Primero instalamos el EAS ( Expo Aplication Service) que sirve para guardar nuestro proyecto en expo.
**npm install -g eas-cli**

Nos logueamos en EXPO 
**eas login**

Una vez que estamos loguados continuamos en la terminal del proyecto de React Native.


# Terminal proyecto

Una vez parados en la carpeta del proyecto ejecutamos:
**eas build:configure**

Nos permite configurar el proyecto y para que dispositivo usarlo.
Una vez que ejecutamos el codigo , veremos en la ventana del lado izquierod que nos creo un arvchivo:
**eas.json**

Entramos al archivos **eas.json**
y agregamos en la propiedad **preview** lo siguiente: 
**"android":{ "buildType":"apk" }**


## Empaquetando la APK

Volvemos a la terminal y ejecutamos el siguiente codigo:
**eas build -p android --profile preview**


## Utilizando la aplicación APK

Terminado el empaquetado **expo** nos proveerá una url para descargar la aplicación.

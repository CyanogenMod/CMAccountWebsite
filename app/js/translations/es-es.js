(function() {
  angular.module('cmaccount.l10n.es-es', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('es-es', {
      email: "Correo electrónico",
      password: "Contraseña",
      confirm_password: "Confirmar contraseña",
      logout: "Cerrar sesión",
      continue: "Continuar",
      cancel: "Cancelar",
      privacy_policy: "Política de privacidad",

      navbar: {
        about: 'Acerca de',
        download: 'Descargar',
        devices: 'Dispositivos',
        blog: 'Blog',
        forum: 'Foro',
        community: 'Comunidad',
        account: 'Cuenta'
      },

      register: {
        create: "Crear tu cuenta de CyanogenMod",
        register: "Registrar",
      },

      login: {
        title: "Entrar en tu cuenta de CyanogenMod",
        signin: "Entrar",
        reset_password: "Restablece tu contraseña",
        no_account: "¿No hay cuenta?",
      },

      password_reset: {
        title: "Restablece la contraseña de tu cuenta de CyanogenMod",
        reset_password: "Restablecer contraseña",
      },

      verify_email: {
        title: "Verifica tu dirección de correo electrónico",
        must_verify: "Debes verificar tu cuenta de correo electrónico antes de poder usar tu cuenta de CyanogenMod. Cuando te registres, te enviaremos un correo electrónico con un enlace que deberás seguir.",
        no_longer_valid: "El enlace que has seguido ya no es válido.",
      },

      learn_more: {
        learn_more: "Saber más",

        what_is_cmaccount: {
          title: "¿Qué es una cuenta de CyanogenMod?",
          text: "Una cuenta de CyanogenMod permite el acceso a servicios de valor añadido y funcionalidades extras para tu dispositivo CyanogenMod.",
        },

        do_i_need: {
          title: "¿Necesito una cuenta de CyanogenMod?",
          text: "La creación de una cuenta de CyanogenMod no es necesaria para ejecutar CyanogenMod en tu dispositivo. En cualquier caso, ciertas funcionalidades o servicios proporcionados por CyanogenMod, como por ejemplo \"Encuentra mi teléfono\" requieren de una cuenta de CyanogenMod para ser accesibles.",
        },

        personal_info: {
          title: "¿Qué información personal es requerida?",
          required: "La creación de una cuenta de CyanogenMod requiere algunos datos básicos entre los que se incluyen la dirección de correo electrónico.",
          usage: "CyanogenMod nunca venderá ni cederá tu información personal. Esta información será usada únicamente de acuerdo con nuestra",
        },

        secure: {
          title: "¿Es esto seguro?",
          communication: "Toda comunicación entre tu navegador o dispositivo y nuestros servidores utilizan cifrado SSL. Adicionalmente, nosotros nunca enviamos tu contraseña en texto plano a nuestros servidores.",
          priority: "Dada la naturaleza de las funcionalidades \"Encuentra mi teléfono\" y \"Borrado remoto\", la seguridad es nuestra mayor prioridad. No podrás localizar o borrar tu dispositivo sin haberte identificado con tu contraseña previamente. Todas las comunicaciones realizadas con tu dispositivo, incluyendo la información de localización, están cifradas y son inaccesibles para cualquier persona, colaborador o servidor de CyanogenMod.",
        },

        benefits: {
          title: "¿Qué me da una cuenta?",
          text: "Al crear una cuenta de CyanogenMod tendrás, como mínimo, acceso a \"Encuentra mi teléfono\" y \"Borrado remoto\" para tu dispositivo.",
        },
      },

      devices: {
        my_devices: "Mis dispositivos",

        cyanogenmod_version: "Versión CyanogenMod",
        android_version: "Versión Android",
        last_seen: "Visto por última vez",
        date_registered: "Fecha de registro",
        carrier: "Operador",

        locate: "Ubicación",
        locate_device: "Localizar dispositivo",

        remote_wipe: "Borrado remoto",
        remove_device: "Quitar dispositivo",
      },

      secure_message: {
        locate_device: "Localizar dispositivo",
        authentication_failure: "¡Fallo de autentificación!",
        invalid_password: "La contraseña que has introducido es incorrecta o la sesión ha expirado",

        enter_password: "Por favor, introduce tu contraseña para autenticarte con tu dispositivo.",
        wait_secure_channel: "Por favor, espera mientras se abre un canal seguro de comunicación con tu dispositivo.",
        wait_locate: "Por favor, espera mientras intentamos localizar tu dispositivo.",
        wait_wipe: "Por favor, espera mientras intentamos borrar tu dispositivo.",
        wipe_started: "Borrado iniciado satisfactoriamente.",
      },

      remove_device: {
        problem: "Ha habido un problema al eliminar este dispositivo de tu cuenta.",
        confirm: "¿Estás seguro que quieres eliminar este dispositivo?",
        warning_message: "Si eliminas este dispositivo de tu cuenta de CyanogenMod, ya no podrás utilizar las funcionalidades de localización ni borrado remoto de tu dispositivo.",
      },
    });
  }]);
}).call(this);


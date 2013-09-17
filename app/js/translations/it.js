// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.it', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('it', {
      // Generic
      email: "Email",
      password: "Password",
      confirm_password: "Conferma password",
      logout: "Log Out",
      continue: "Continua",
      cancel: "Cancella",
      terms_of_service: "Termini di Servizio",
      privacy_policy: "Politica sulla Privacy",
      alert_error: 'Errore!',

      // Top Navigation
      navbar: {
        about: 'Info su',
        download: 'Scarica',
        devices: 'Dispositivi',
        blog: 'Blog',
        forum: 'Forum',
        community: 'Community',
        account: 'Account'
      },

      // Register Partial
      register: {
        create: "Crea il tuo Account CyanogenMod",
        register: "Registrati",
      },

      // Login Partial
      login: {
        title: "Effettua il login al tuo Account CyanogenMod",
        signin: "Effettua il login",
        reset_password: "Reimposta la tua password",
        no_account: "Nessun account?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Reimposta la password del tuo Account CyanogenMod",
        reset_password: "Reimposta password",
      },

      // Email Verification Partial
      verify_email: {
        title: "Verifica il tuo indirizzo email",
        must_verify: "Devi verificare il tuo indirizzo email prima di utilizzare il tuo account CyanogenMod. Al momento della registrazione, ti abbiamo inviato una email con il link su cui cliccare.",
        no_longer_valid: "Il link cliccato non è più valido.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Informazioni",

        what_is_cmaccount: {
          title: "Che cos'è un Account CyanogenMod?",
          text: "Un Account CyanogenMod fornisce accesso a servizi a valore aggiunto e funzionalità per il tuo dispositivo mobile su cui è presente CyanogenMod.",
        },

        do_i_need: {
          title: "Ho bisogno di un Account CyanogenMod?",
          text: "La creazione di un Account CyanogenMod non è richiesta al fine di usare CyanogenMod sul tuo dispositivo. Alcune funzionalità o servizi forniti da CyanogenMod, come \"Trova il mio telefono\" richiedono un Account CyanogenMod per accedervi.",
        },

        personal_info: {
          title: "Quali informazioni personali sono richieste?",
          required: "La creazione di un Account CyanogenMod richiede solamente informazioni di base come il tuo indirizzo email.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod non venderà mai i tuoi dati personali. Queste informazioni saranno usate solamente in accordo con la nostra",
        },

        secure: {
          title: "È sicuro?",
          communication: "Tutte le comunicazioni tra il tuo browser o il tuo dispositivo e i nostri server sono criptate via SSL. In aggiunta, non invieremo mai la tua password in chiaro verso i nostri server.",
          priority: "Data la natura delle funzioni \"Trova il mio telefono\" e \"Cancellazione remota\", la sicurezza è la nostra prima priorità. Non puoi localizzare o cancellare da remoto il tuo dispositivo senza aver effettuato prima l'autenticazione usando la tua password. Tutte le comunicazioni con il tuo dispositivo, incluse le informazioni di localizzazione, sono cifrate e inaccessibili a qualsiasi server CyanogenMod, personale, o di partners.",
        },

        benefits: {
          title: "Cosa comporta avere un account?",
          text: "Creando un account CyanogenMod, avrai a disposizione, come minimo, l'accesso alle funzionalità \"Trova il mio telefono\" e \"Cancellazione remota\" per il tuo dispositivo.",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "I miei dispositivi",

        cyanogenmod_version: "Versione CyanogenMod",
        android_version: "Version Android",
        last_seen: "Ultima localizzazione",
        date_registered: "Data di registrazione",
        carrier: "Operatore telefonico",

        locate: "Localizza",
        locate_device: "Localizza dispositivo",

        remote_wipe: "Cancellazione remota",
        remove_device: "Rimuovi dispositivo",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Localizza dispositivo",
        authentication_failure: "Autenticazione fallita!",
        encryption_failure: "Si è verificato un problema nell'apertura di una connessione sicura con il tuo dispositivo. Riprova tra qualche minuto.",
        invalid_password: "La password da te inserita non è valida o la tua sessione è scaduta",

        enter_password: "Per favore, inserisci la tua password per collegarti al tuo dispositivo.",
        wait_secure_channel: "Per favore, attendi fino a quando stabiliamo una connessione sicura con il tuo dispositivo.",
        wait_locate: "Per favore, attendi fino a quando proviamo a localizzare il tuo dispositivo.",
        wait_wipe: "Per favore, attendi fino a quando proviamo a cancellare i dati da remoto dal tuo dispositivo.",
        wipe_started: "Cancellazione dati avviata con successo.",
      },
      
      // Remove Device Partial
      remove_device: {
        problem: "Si è verificato un problema durante la rimozione di questo dispositivo dal tuo account.",
        confirm: "Sei sicuro di voler rimuovere questo dispositivo?",
        warning_message: "Se rimuovi questo dispositivo dal tuo Account CyanogenMod, non avrai più la possibilita di usare funzionalità come la localizzazione o la cancellazione remota del tuo dispositivo.",
      },

      // Account Partial
      account: {
        title: "Il mio Account",
        alert_invalid: "La password attuale inserita non è corretta.",
        alert_success: "La tua password è stata cambiata.",
        change_password: "Cambia Password",
        current_password: "Password attuale",
        new_password: "Nuova Password",
        confirm_new_password: "Conferma la nuova Password",
        error_complexity: "La tua password deve essere lunga almeno otto (8) caratteri.",
        error_match: "Le due password non coincidono."
      },
    });
  }]);
}).call(this);

// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.en', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('en', {
      // Generic
      email: "E-Mail",
      password: "Passwort,
      confirm_password: "Passwort bestätigen",
      logout: "Abmelden",
      continue: "Weiter",
      cancel: "Abbrechen",
      terms_of_service: "Nutzungsbedingungen",
      privacy_policy: "Datenschutzerklärung",
      alert_error: 'Fehler!',

      // Top Navigation
      navbar: {
        about: 'Über',
        download: 'Download',
        devices: 'Geräte',
        blog: 'Blog',
        forum: 'Forum',
        community: 'Community',
        account: 'Konto'
      },

      // Register Partial
      register: {
        create: "CyanogenMod-Konto erstellen",
        register: "Registrieren",
      },

      // Login Partial
      login: {
        title: "An CyanogenMod-Konto anmelden",
        signin: "Anmelden",
        reset_password: "Passwort zurücksetzen",
        no_account: "Kein Konto?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Setzen Sie das Passwort für Ihr CyanogenMod-Konto zurück",
        reset_password: "Passwort zurücksetzen",
      },

      // Email Verification Partial
      verify_email: {
        title: "Bestätigen Ihrer E-Mail-Adresse",
        must_verify: "Sie müssen Ihre E-Mail-Adresse bestätigen, bevor Sie Ihren CyanogenMod-Konto nutzen können. Bitte folgen Sie dem Link in der E-Mail, welche wir Ihnen bei der Registrierung gesandt haben.",
        no_longer_valid: "Dieser Link ist nicht mehr gültig.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Mehr erfahren",

        what_is_cmaccount: {
          title: "Was ist ein CyanogenMod-Konto?",
          text: "Ein CyanogenMod-Konto bietet Ihnen Zugriff auf zusätzliche Funktionen für Ihre mobilen Geräte, auf denen CyanogenMod installiert ist.",
        },

        do_i_need: {
          title: "Benötige ich ein CyanogenMod-Konto?",
          text: "Das Anlegen eines CyanogenMod-Kontos ist nicht erforderlich um CyanogenMod auf Ihrem Gerät zu nutzen. Einige von Funktionen wie zum Beispiel \"Gerät lokalisieren\" benötigen ein CyanogenMod-Konto.",
        },

        personal_info: {
          title: "Welche persönlichen Daten werden benötigt?",
          required: "Um ein CyanogenMod-Konto anzulegen wird nur eine E-Mail-Adresse benötigt.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod wird Ihre persönlichen Daten niemals verkaufen. Ihre Daten werden nur in Übereinstimmung mit unserer Datenschutzbestimmung genutzt.",
        },

        secure: {
          title: "Ist das sicher?",
          communication: "Die gesamte Kommunikation zwischen Ihrem Browser oder Gerät und unseren Servern ist durch SSL-Verschlüsselung geschützt. Zusätzlich senden wir Ihr Passwort niemals in Klartext an unsere Server.",
          priority: "In Anbetracht des Charakters der Funktionen \"Gerät lokalisieren\" und \"Fernlöschen\" hat bei uns Sicherheit oberste Priorität. Sie können Ihr Gerät erst nach authentifizierung mit Ihrem Passwort lokalisieren oder fernlöschen. Die gesamte Kommunikation mit Ihrem Gerät inklusive der Standortdaten sind verschlüsselt und unzugänglich für CyanogenMod-Server, -Mitarbeitern oder -Partnern.",
        },

        benefits: {
          title: "Was bringt mir ein Konto?",
          text: "Mit einem CyanogenMod-Konto haben Sie zumindest Zugriff auf die Funktionen  \"Gerät lokalisieren\" und \"Fernlöschen\".",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "Meine Geräte",

        cyanogenmod_version: "CyanogenMod-Version",
        android_version: "Android-Version",
        last_seen: "Zuletzt gesehen",
        date_registered: "Registrierungsdatum",
        carrier: "Betreiber",

        locate: "Lokalisieren",
        locate_device: "Gerät lokalisieren",

        remote_wipe: "Fernlöschen",
        remove_device: "Gerät entfernen",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Gerät lokalisieren",
        authentication_failure: "Authentifizierungsfehler!",
        encryption_failure: "Beim Öffnen eines sicheren Kanals ist ein Problem aufgetreten. Bitte versuchen Sie es in ein paar Minuten erneut.",
        invalid_password: "Das eingegebene Passwort ist falsch oder Ihre Sitzung ist abgelaufen.",

        enter_password: "Bitte geben Sie Ihr Passwort ein, um sich gegenüber Ihrem Gerät zu authentifizieren.",
        wait_secure_channel: "Bitte warten Sie während ein sicherer Kanal zu Ihrem Gerät erstellt wird.",
        wait_locate: "Bitte warten Sie während dem Versuch Ihr Gerät zu lokalisieren.",
        wait_wipe: "Bitte warten Sie während dem Versuch Ihr Gerät zu fernlöschen.",
        wipe_started: "Fernlöschen erfolgreich gestartet.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "Beim Entfernen dieses Gerätes aus Ihrem Konto ist ein Problem aufgetreten.",
        confirm: "Sind Sie sicher, dass Sie dieses Gerät entfernen möchten?",
        warning_message: "Wenn Sie dieses Gerät aus Ihrem Konto entfernen können Sie Funktionen wie Lokalisierung und Fernlöschen nicht mehr nutzen.",
      },

      // Account Partial
      account: {
        title: "Mein Konto",
        alert_invalid: "Das von Ihnen eingegebene aktuelle Passwort ist falsch.",
        alert_success: "Ihr Passwort wurde erfolgreich geändert.",
        change_password: "Passwort ändern",
        current_password: "Aktuelles Passwort",
        new_password: "Neues Passwort",
        confirm_new_password: "Neues Passwort bestätigen",
        error_complexity: "Ihr Passwort muss mindestens acht (8) Zeichen lang sein.",
        error_match: "Die Passwörter stimmen nicht überein."
      },
    });
  }]);
}).call(this);

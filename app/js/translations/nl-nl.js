(function() {
  angular.module('cmaccount.l10n.nl-nl', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('nl-nl', {
      email: "E-mailadres",
      password: "Wachtwoord",
      confirm_password: "Wachtwoord bevestigen",
      logout: "Uitloggen",
      continue: "Doorgaan",
      cancel: "Annuleren",
      privacy_policy: "Privacybeleid",

      navbar: {
        about: 'Over',
        download: 'Downloaden',
        devices: 'Apparaten',
        blog: 'Blog',
        forum: 'Forum',
        community: 'Gemeenschap',
        account: 'Account'
      },

      register: {
        create: "Uw CyanogenMod-account aanmaken",
        register: "Registreren",
      },

      login: {
        title: "Inloggen op uw CyanogenMod-account",
        signin: "Inloggen",
        reset_password: "Wachtwoord herstellen",
        no_account: "Geen account?",
      },

      password_reset: {
        title: "Wachtwoord van uw CyanogenMod-account herstellen",
        reset_password: "Wachtwoord herstellen",
      },

      verify_email: {
        title: "Uw e-mailadres bevestigen",
        must_verify: "Voordat u uw CyanogenMod-account kunt gebruiken, dient u uw e-mailadres te bevestigen. Na uw registratie hebben wij een e-mail gestuurd met een link die u dient te openen.",
        no_longer_valid: "Deze link is niet meer geldig.",
      },

      learn_more: {
        learn_more: "Lees meer",

        what_is_cmaccount: {
          title: "Wat is een CyanogenMod-account?",
          text: "Een CyanogenMod-account biedt toegang tot extra diensten en functies voor uw apparaten die op CyanogenMod draaien.",
        },

        do_i_need: {
          title: "Heb ik een CyanogenMod-account nodig?",
          text: "Een CyanogenMod-account is niet vereist om CyanogenMod te gebruiken op uw apparaat. Bepaalde functies, zoals uw apparaat lokaliseren, vereisen wel een CyanogenMod-account.",
        },

        personal_info: {
          title: "Welke persoonlijke informatie is vereist?",
          required: "Het aanmaken van een CyanogenMod-account vereist slechts basisinformatie, inclusief uw e-mailadres.",
          usage: "CyanogenMod zal nooit uw persoonlijke informatie doorverkopen. Deze informatie zal worden gebruikt conform ons",
        },

        secure: {
          title: "Is het veilig?",
          communication: "Alle verbindingen tussen uw browser of apparaat en onze servers zijn versleuteld met SSL. Ook wordt uw wachtwoord nooit onversleuteld naar onze servers verzonden",
          priority: "Gezien de aard van het lokaliseren en op afstand wissen van uw apparaat, is beveiliging onze hoogste prioriteit. U kunt deze functies niet gebruiken zonder te authenticeren met uw wachtwoord. Alle verbindingen met uw apparaat, inclusief lokatie-informatie, is versleuteld en ontoegankelijk voor CyanogenMod-servers, -personeel of -partners.",
        },

        benefits: {
          title: "Wat zijn de voordelen van een account?",
          text: "Door een CyanogenMod-account aan te maken is het mogelijk om bepaalde functies te gebruiken, zoals het lokaliseren en op afstand wissen van uw apparaat.",
        },
      },

      devices: {
        my_devices: "Mijn apparaten",

        cyanogenmod_version: "CyanogenMod-versie",
        android_version: "Android-versie",
        last_seen: "Laatst gezien",
        date_registered: "Datum geregistreerd",
        carrier: "Provider",

        locate: "Lokaliseren",
        locate_device: "Apparaat lokaliseren",

        remote_wipe: "Wissen op afstand",
        remove_device: "Apparaat wissen op afstand",
      },

      secure_message: {
        locate_device: "Apparaat lokaliseren",
        authentication_failure: "Authenticatie mislukt",
        invalid_password: "Het ingevoerde wachtwoord is ongeldig of uw sessie is verlopen",

        enter_password: "Voer a.u.b. uw wachtwoord in om te authenticeren met uw apparaat.",
        wait_secure_channel: "Een ogenblik geduld a.u.b. Er wordt een beveiligde verbinding met uw apparaat tot stand gebracht.",
        wait_locate: "Een ogenblik geduld a.u.b. Er wordt geprobeerd uw apparaat te lokaliseren.",
        wait_wipe: "Een ogenblik geduld a.u.b. Er wordt geprobeerd uw apparaat te wissen.",
        wipe_started: "Wissen succesvol gestart",
      },

      remove_device: {
        problem: "Dit apparaat kan niet worden verwijderd van uw account.",
        confirm: "Weet u zeker dat u dit apparaat wilt verwijderen?",
        warning_message: "Indien u dit apparaat verwijdert van uw CyanogenMod-account, beschikt u niet meer over functies zoals het lokaliseren of op afstand wissen van uw apparaat.",
      },
    });
  }]);
}).call(this);

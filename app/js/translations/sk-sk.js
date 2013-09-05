// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.sk-sk', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('sk-sk', {
      // Generic
      email: "E-mail",
      password: "Heslo",
      confirm_password: "Potvrdenie hesla",
      logout: "Odhlásiť sa",
      continue: "Pokračovať",
      cancel: "Zrušiť",
      privacy_policy: "Zásady ochrany osobných údajov",

      // Top Navigation
      navbar: {
        about: 'O projekte',
        download: 'Prevziať',
        devices: 'Zariadenia',
        blog: 'Blog',
        forum: 'Fórum',
        community: 'Komunita',
        account: 'Účet'
      },

      // Register Partial
      register: {
        create: "Vytvorte si účet CyanogenMod",
        register: "Registrovať",
      },

      // Login Partial
      login: {
        title: "Prihláste sa k účtu CyanogenMod",
        signin: "Prihlásiť sa",
        reset_password: "Obnoviť heslo",
        no_account: "Žiadny účet?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Obnova hesla k Vášmu účtu CyanogenMod",
        reset_password: "Obnoviť heslo",
      },

      // Email Verification Partial
      verify_email: {
        title: "Overenie vašej e-mailovej adresy",
        must_verify: "Musíme overiť Vašu e-mailovú adresu, než budete môcť používať Váš účet CyanogenMod. Ak ste sa zaregistrovali, poslali sme Vám e-mail s odkazom, ktorý je potrebné nasledovať.",
        no_longer_valid: "Odkaz, ktorý ste nasledovali, už nie je platný.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Dozvedieť sa viac",

        what_is_cmaccount: {
          title: "Čo je účet CyanogenMod?",
          text: "Účet CyanogenMod poskytuje prístup k pridanej hodnote vo forme služieb a funkcií pre mobilné zariadenia so systémom CyanogenMod.",
        },

        do_i_need: {
          title: "Potrebujem účet CyanogenMod?",
          text: "Vytvorenie účtu CyanogenMod nie je nutné pre používanie systému CyanogenMod na Vašom zariadení. Niektoré funkcie alebo služby poskytované systémom CyanogenMod, akými sú \"Nájsť moje zariadenie\" a \"Vzdialené vymazanie údajov\", vyžadujú účet CyanogenMod pre prístup k nim.",
        },

        personal_info: {
          title: "Aké osobné údaje sú vyžadované?",
          required: "Vytvorenie účtu CyanogenMod vyžaduje iba základné informácie vrátane e-mailovej adresy.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod nikdy nebude predávať vaše osobné údaje. Tieto informácie budú použité iba v súlade s našimi",
        },

        secure: {
          title: "Je to bezpečné?",
          communication: "Všetka komunikácia medzi prehliadačom alebo zariadením a našími servermi je šifrovaná pomocou technológie SSL. Navyše, nikdy nebudeme odosielať heslo ako obyčajný text na naše serveri.",
          priority: "Vzhľadom na charakter funkcií \"Nájsť moje zariadenie\" a \"Vzdialené vymazanie údajov\", bezpečnosť je našou prioritou číslo jedna. Nemôžete nájsť alebo vymazať údaje v zariadení, predtým než vykonáte overovanie pomocou hesla. Všetka komunikácia s Vašim zariadením, vrátane informácií o jeho polohe, je šifrovaná a neprístupná na serveroch CyanogenMod žiadnym osobám ani partnerom.",
        },

        benefits: {
          title: "Prečo je dobré mať účet CyanogenMod?",
          text: "Vytvorením účtu CyanogenMod získate prístup k funkciám \"Nájsť moje zariadenie\" and \"Vzdialené vymazanie údajov\" pre Vaše zariadenie.",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "Moje zariadenia",

        cyanogenmod_version: "Verzia systému CyanogenMod",
        android_version: "Verzia systému Android",
        last_seen: "Naposledy videné",
        date_registered: "Dátum zaregistrovania",
        carrier: "Operátor",

        locate: "Poloha",
        locate_device: "Lokalizovať zariadenie",

        remote_wipe: "Vzdialené vymazanie údajov",
        remove_device: "Odstrániť zariadenie",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Lokalizovať zariadenie",
        authentication_failure: "Overenie zlyhalo!",
        invalid_password: "Zadané heslo je neplatné alebo Vaša relácia vypršala",

        enter_password: "Prosím zadajte Vaše heslo pre overenie so zariadením.",
        wait_secure_channel: "Prosím počkajte, kým otvoríme zabezpečený kanál k zariadeniu.",
        wait_locate: "Počkajte prosím, kým sa pokúsime lokalizovať zariadenie.",
        wait_wipe: "Počkajte prosím, kým sa pokúsime vymazať údaje v zariadení.",
        wipe_started: "Vymazávanie údajov úspešne začalo.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "Vyskytol sa problém pri odstraňovaní tohto zariadenia z Vášho účtu.",
        confirm: "Ste si istý, že chcete odstrániť toto zariadenie?",
        warning_message: "Ak odstránite toto zariadenie z Vášho účtu CyanogenMod, nebudete už môcť používať funkcie ako sú lokalizácia alebo vzdialené vymazanie údajov zariadenia.",
      },
    });
  }]);
}).call(this);

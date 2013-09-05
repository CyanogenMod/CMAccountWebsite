// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.cs', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('cs', {
      // Generic
      email: "Email",
      password: "Heslo",
      confirm_password: "Potvrdit heslo",
      logout: "Odhlásit",
      continue: "Pokračovat",
      cancel: "Zrušit",
      privacy_policy: "Zásady ochrany osobních údajů",

      // Top Navigation
      navbar: {
        about: 'O aplikaci',
        download: 'Ke stažení',
        devices: 'Zařízení',
        blog: 'Blog',
        forum: 'Fórum',
        community: 'Komunita',
        account: 'Účet'
      },

      // Register Partial
      register: {
        create: "Vytvořit účet CyanogenMod",
        register: "Registrovat",
      },

      // Login Partial
      login: {
        title: "Přihlásit se k účtu CyanogenMod",
        signin: "Přihlásit se",
        reset_password: "Obnovit heslo",
        no_account: "Bez účtu?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Obnovení heslo k účtu CyanogenMod",
        reset_password: "Obnovit heslo",
      },

      // Email Verification Partial
      verify_email: {
        title: "Ověření emailové adresy",
        must_verify: "Před používáním účtu CyanogenMod je potřeba ověřit Vaši emailovou adresu. Při zaregistrování Vám bude zaslán email, ve kterém se nachází ověřovací odkaz, na který je nutné kliknout a tím email ověřit.",
        no_longer_valid: "Tento odkaz již není platný.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Zjistit více",

        what_is_cmaccount: {
          title: "Co je účet CyanogenMod?",
          text: "Účet CyanogenMod umožňuje přistupovat ke službám a funkcím mobilních zařízení, na kterých je nainstalován CyanogenMod.",
        },

        do_i_need: {
          title: "Potřebuji účet CyanogenMod?",
          text: "Vytvoření účtu CyanogenMod není pro běh této ROM na zařízení. Některé funkce nebo služby, které CyanogenMod poskytuje, jako například \"Najdi můj telefon\" však aktivaci účtu CyanogenMod vyžadují.",
        },

        personal_info: {
          title: "Jaké jsou vyžadovány osobní informace?",
          required: "Vytvoření účtu CyanogenMod vyžaduje pouze základní informace obsahující emailovou adresu.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod se zavazuje, že nyní ani nikdy později nebude prodávat Vaše osobní informace. Tyto informace budou použity pouze v souladu s: ",
        },

        secure: {
          title: "Je to bezpečné?",
          communication: "Veškerá komunikace mezi prohlížečem nebo zařízením a naším serverem je šifrována technologií SSL. Dále, nikdy nebudou hesla v jejich čitelné podobě zasílány na náš server.",
          priority: "Vzhledem k povaze služeb \"Najdi můj telefon\" a \"Vzdalené vymazání\" je bezpečnost naší nejvyšší prioritou. Nelze získat polohu nebo provést vymazání zařízení bez ověření totožnosti použitím Vašeho hesla. Veškerá komunikace se zažízením, jako je získání polohy, je šifrována a není přístupná z jiných CyanogenMod serverů, dalším osobám nebo partnerům.",
        },

        benefits: {
          title: "Co získám aktivací účtu?",
          text: "Po aktivaci účtu CyanogenMod získáte minimálně přístup ke službám \"Najdi můj telefon\" a \"Vzdalené vymazání\" pro Vaše zařízení.",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "Mé zařízení",

        cyanogenmod_version: "Verze CyanogenMod",
        android_version: "Verze systému Android",
        last_seen: "Naposledy viděn",
        date_registered: "Datum registrace",
        carrier: "Operátor",

        locate: "Lokalizování",
        locate_device: "Lokalizovat zařízení",

        remote_wipe: "Vzdálené vyčištění",
        remove_device: "Odebrat zařízení",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Lokalizovat zařízení",
        authentication_failure: "Autentizace selhala!",
        invalid_password: "Zadané heslo je neplatné nebo webové sezení vypršelo",

        enter_password: "Prosím zadejte heslo pro připojení k zařízení.",
        wait_secure_channel: "Prosím vyčkejte - otevírá se zabezpečená kanál k zařízení.",
        wait_locate: "Prosím vyčkejte - provádí se lokalizace zařízení.",
        wait_wipe: "Prosím vyčkejte - zařízení se posílá příkaz k vyčištění.",
        wipe_started: "Vyčištění zařízení úspěšně spuštěno.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "Při odebírání zařízení z účtu došlo k potížím.",
        confirm: "Opravdu chcete odebrato toto zařízení?",
        warning_message: "Pokud odeberete zařízení z účtu CyanogenMod, nebude možné využívat pro toto zařízení služby lokalizace nebo vzdáleného vyčištění.",
      },
    });
  }]);
}).call(this);

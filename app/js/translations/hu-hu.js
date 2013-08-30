// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.hu-hu', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('hu-hu', {
      // Generic
      email: "E-mail cím",
      password: "Jelszó",
      confirm_password: "Jelszó megerősítése",
      logout: "Kijelentkezés",
      continue: "Folytatás",
      cancel: "Mégse",
      privacy_policy: "Adatvédelmi irányelv",

      // Top Navigation
      navbar: {
        about: 'Névjegy',
        download: 'Letöltés',
        devices: 'Eszközök',
        blog: 'Blog',
        forum: 'Fórum',
        community: 'Közösség',
        account: 'Fiók'
      },

      // Register Partial
      register: {
        create: "Hozza létre saját CyanogenMod fiókját",
        register: "Regisztráció",
      },

      // Login Partial
      login: {
        title: "Jelentkezzen be a CyanogenMod fiókjába",
        signin: "Bejelentkezés",
        reset_password: "Jelszó törlése",
        no_account: "Nincs még fiókja?",
      },

      // Password Reset Partial
      password_reset: {
        title: "CyanogenMod fiókhoz tartozó jelszó törlése",
        reset_password: "Jelszó törlése",
      },

      // Email Verification Partial
      verify_email: {
        title: "Ellenőrizze az e-mail fiókját",
        must_verify: "A CyanogenMod használatához előbb ellenőrizze az e-mail fiókját.  A regisztráció alkalmával küldtünk Önnek egy e-mailt, kérjük, kövesse a benne talált linket.",
        no_longer_valid: "A link már nem érvényes.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Tudjon meg többet",

        what_is_cmaccount: {
          title: "Mi is a CyanogenMod fiók?",
          text: "A CyanogenMod fiók értéknövelt szolgáltatásokat és funkciókat biztosít CyanogenMod-ot futtató készülékeken.",
        },

        do_i_need: {
          title: "Szükségem van a CyanogenMod fiókra?",
          text: "A készüléken a CyanogenMod futtatásához nincs szükség CyanogenMod fiókra. A CyanogenMod fiók csak bizonyos értéknövelt szolgáltatásokhoz és funkciókhoz szükséges, mint például a \'Készülék keresése\'.",
        },

        personal_info: {
          title: "Milyen személyes adatokra van szükség?",
          required: "A CyanogenMod fiók létrehozásához csak egy e-mail címre van szükség.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "A CyanogenMod csapat soha nem adja ki az Ön személyes adatait.  Tovább informáci itt olvasható: ",
        },

        secure: {
          title: "Biztonságos?",
          communication: "Az Ön böngészője vagy készüléke és a szervereink közötti kapcsolat SSL titkosítású.  A kommunikáció során jelszavakat soha nem küldjük titkosítatlanul.",
          priority: "A \'Készülék keresése\' és \'Távoli törlés\' funkcióknál azok jellege miatt a biztonság volt az elsődleges szempont. Jelszóhitelesítés nélkül ezek a funkciók nem használhatók. Az eszközzel történő teljes kommunikáció (beleértve a helymeghatározás adatait) titkosított és a CyanogenMod csapat, partnerei, valamint szerverei számára elérhetetlen módon van kezelve.",
        },

        benefits: {
          title: "Mit nyújt számomra a CyanogenMod fiók?",
          text: "A CyanogenMod fiók létrehozásával jelenleg a \'Készülék keresése\' és a \'Távoli törlés\' funkciók érhetőek el.",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "Saját eszközeim",

        cyanogenmod_version: "CyanogenMod verzió",
        android_version: "Android verzió",
        last_seen: "Legutolsó információ",
        date_registered: "Regisztráció dátuma",
        carrier: "Szolgáltató",

        locate: "Helymeghatározás",
        locate_device: "Eszköz helyzetének meghatározása",

        remote_wipe: "Távoli törlés",
        remove_device: "Távoli eszköz",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Eszköz helyzetének meghatározása",
        authentication_failure: "Sikertelen hitelesítés!",
        invalid_password: "A beírt jelszó hibás vagy lejárt az időkorlát",

        enter_password: "Írja be a jelszót a készülék hitelesítéséhez.",
        wait_secure_channel: "Várjon, amíg a biztonságos csatorna megnyílik a készülékéhez.",
        wait_locate: "Várjon, amíg megpróbáljuk megtalálni az eszközt.",
        wait_wipe: "Várjon, amíg megpróbáljuk törölni az eszközt.",
        wipe_started: "A törlés sikeresen elindult.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "Hiba történt a fiókhoz tartozó eszköz eltávolítása során.",
        confirm: "Biztos benne, hogy el kívánja távolítani a készüléket?",
        warning_message: "Ha eltávolítja az eszközt a CyanogenMod fiókjából, többé nem fogja tudni használni a helymeghatározás és távoli törlés funkcókat.",
      },
    });
  }]);
}).call(this);

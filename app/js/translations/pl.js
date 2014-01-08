(function() {
  angular.module('cmaccount.l10n.pl', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('pl', {
      // Generic
      email: "E-mail",
      password: "Hasło",
      confirm_password: "Potwierdź hasło",
      logout: "Wyloguj",
      continue: "Kontynuuj",
      cancel: "Anuluj",
      terms_of_service: "Warunki korzystania",
      privacy_policy: "Polityka prywatności",
      alert_error: 'Błąd!',

      // Top Navigation
      navbar: {
        about: 'O projekcie',
        download: 'Pobierz',
        devices: 'Urządzenia',
        blog: 'Blog',
        forum: 'Forum',
        community: 'Społeczność',
        account: 'Konto'
      },

      // Register Partial
      register: {
        create: "Utwórz konto CyanogenMod",
        register: "Zarejestruj",
      },

      // Login Partial
      login: {
        title: "Zaloguj do konta CyanogenMod",
        signin: "Zaloguj",
        reset_password: "Zresetuj hasło",
        no_account: "Nie posiadasz konta?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Zresetuj swoje hasło do konta CyanogenMod",
        reset_password: "Zresetuj hasło",
      },

      // Email Verification Partial
      verify_email: {
        title: "Zweryfikuj swój adres e-mail",
        must_verify: "Musisz zweryfikować swój adres e-mail zanim uzyskasz dostęp do konta CyanogenMod. Po zarejestrowaniu wysłaliśmy na podany adres e-mail link, który należy otworzyć.",
        no_longer_valid: "Link, który otworzyłeś jest już nieważny.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Dowiedz się więcej",

        what_is_cmaccount: {
          title: "Czym jest konto CyanogenMod?",
          text: "Konto CyanogenMod zapewnia urządzeniu z systemem CyanogenMod dostęp do dodatkowych usług oraz funkcjonalności.",
        },

        do_i_need: {
          title: "Czy potrzebuję konta CyanogenMod?",
          text: "Utworzenie konta CyanogenMod nie jest niezbędne do korzystania z systemu CyanogenMod na Twoim urządzeniu. Dostępu do niego wymagają jednak niektóre usługi świadczone przez CyanogenMod, jak chociażby zdalna lokalizacja urządzenia.",
        },

        personal_info: {
          title: "Jakie osobiste informacje są potrzebne?",
          required: "Utworzenie konta CyanogenMod wymaga jedynie podstawowych informacji, w tym adresu e-mail.",
          usage: "CyanogenMod nie będzie nigdy udostępniał Twoich osobistych danych. Będą one wykorzystywanie tylko zgodnie z naszą ",
        },

        secure: {
          title: "Czy to bezpieczne?",
          communication: "Komunikacja między Twoją przeglądarką lub urządzeniem a naszymi serwerami jest całkowicie szyfrowana za pomocą protokołu SSL. Ponadto nie będziemy nigdy wysyłać na serwery Twojego hasła w formie zwykłego tekstu.",
          priority: "Biorąc pod uwagę charakter usług \"Znajdź mój telefon\" i \"Zdalne czyszczenie pamięci\", bezpieczeństwo jest dla nas najwyższym priorytetem. Zlokalizowanie lub wyczyszczenie Twojego urządzenia wymaga uwierzytelnienia za pomocą hasła. Ponadto komunikacja z Twoim sprzętem, w tym informacje o lokalizacji, jest szyfrowana oraz nieodostępna dla serwerów, a także wszelkich pracowników i partnerów CyanogenMod.",
        },

        benefits: {
          title: "Co oznacza dla mnie posiadanie konta?",
          text: "Po utworzeniu konta CyanogenMod uzyskasz dostęp do przynajmniej takich funkcji, jak \"Znajdź mój telefon\" czy \"Zdalne czyszczenie pamięci\".",
        },
      },

      devices: {
        my_devices: "Moje urządzenia",

        cyanogenmod_version: "Wersja CyanogenMod",
        android_version: "Wersja Androida",
        last_seen: "Ostatnie logowanie",
        date_registered: "Data rejestracji",
        carrier: "Operator",

        locate: "Lokalizacja",
        locate_device: "Zlokalizuj urządzenie",

        remote_wipe: "Zdalnie wyczyść pamięć",
        remove_device: "Usuń urządzenie",
      },

      secure_message: {
        locate_device: "Lokalizacja urządzenia",
        authentication_failure: "Uwierzytelnienie nie powiodło się!",
        encryption_failure: "Wystąpił problem podczas otwierania bezpiecznego kanału do urządzenia. Prosimy spróbować ponownie za kilka minut.",
        invalid_password: "Wprowadzone hasło jest nieprawidłowe lub Twoja sesja wygasła",

        enter_password: "Proszę wpisać swoje hasło w celu uwierzytelnienia.",
        wait_secure_channel: "Trwa otwieranie bezpiecznego kanału dla urządzenia. Proszę czekać.",
        wait_locate: "Trwa lokalizowanie urządzenia. Proszę czekać.",
        wait_wipe: "Przygotowywanie do wyczyszczenia pamięci urządzenia. Proszę czekać.",
        wipe_started: "Czyszczenie pamięci zostało rozpoczęte.",
      },

      remove_device: {
        problem: "Wystąpił problem podczas usuwania tego urządzenia z konta.",
        confirm: "Czy na pewno chcesz usunąć to urządzenie?",
        warning_message: "Jeśli usuniesz to urządzenie z konta CyanogenMod, nie będzie możliwe korzystanie z takich funkcji jak lokalizowanie czy zdalne czyszczenie pamięci urządzenia.",
      },
    });
  }]);
}).call(this);

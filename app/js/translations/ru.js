// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.ru', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('ru', {
      // Generic
      email: "E-mail",
      password: "Пароль",
      confirm_password: "Подтвердите пароль",
      logout: "Выход",
      continue: "Продолжить",
      cancel: "Отмена",
      terms_of_service: "Условия предоставления сервиса",
      privacy_policy: "Политика безопасности",
      alert_error: 'Ошибка!',

      // Top Navigation
      navbar: {
        about: 'О проекте',
        download: 'Загрузки',
        devices: 'Устройства',
        blog: 'Блог',
        forum: 'Форум',
        community: 'Сообщество',
        account: 'Аккаунт'
      },

      // Register Partial
      register: {
        create: "Создать аккаунт CyanogenMod",
        register: "Регистрация",
      },

      // Login Partial
      login: {
        title: "Войти в аккаунт CyanogenMod",
        signin: "Вход",
        reset_password: "Сбросить пароль",
        no_account: "Нет аккаунта?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Сбросить пароль от аккаунта CyanogenMod",
        reset_password: "Сбросить пароль",
      },

      // Email Verification Partial
      verify_email: {
        title: "Подтвердите ваш e-mail",
        must_verify: "Вы должны подтвердить e-mail для использования аккаунта CyanogenMod. После регистрации мы отправили вам ссылку на e-mail, по которой необходимо перейти.",
        no_longer_valid: "Ссылка более недействительна.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Узнать больше",

        what_is_cmaccount: {
          title: "Что такое аккаунт CyanogenMod?",
          text: "Аккаунт CyanogenMod предоставляет доступ к дополнительным возможностям и сервисам вашего устройства с CyanogenMod.",
        },

        do_i_need: {
          title: "Нужен ли мне аккаунт CyanogenMod?",
          text: "Создание аккаунта CyanogenMod не является обязательным шагом. Некоторые функции или сервисы, такие как «Найти устройство» требуют наличия аккаунта CyanogenMod.",
        },

        personal_info: {
          title: "Какие персональные данные необходимы?",
          required: "Для создания аккаунта CyanogenMod требуется только базовая информация, включая адрес электронной почты.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod никому и никогда не будет передавать ваши персональные данные. ",
        },

        secure: {
          title: "Это безопасно?",
          communication: "Любое соединение между вашим браузером или устройством и нашими серверами шифруется, используя SSL. Кроме того, мы никогда не передаём пароль в открытом виде.",
          priority: "Безопасность — наш главный приоритет, учитывая функции «Найти устройство» или «Удалённый сброс». Вы не сможете найти или сбросить данные на устройстве без ввода установленного пароля. Соединение с вашим устройством, включая определение местоположения, шифруется и передаётся в недоступном для расшифровки виде для всех серверов, работников или партнёров CyanogenMod.",
        },

        benefits: {
          title: "Что даёт мне наличие аккаунта?",
          text: "Создав аккаунт CyanogenMod, вы, как минимум, получаете доступ к функциям «Найти устройство» и «Удалённый сброс».",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "Мои устройства",

        cyanogenmod_version: "Версия CyanogenMod",
        android_version: "Версия Android",
        last_seen: "Последнее соединение",
        date_registered: "Дата регистрации",
        carrier: "Оператор",

        locate: "Показать на карте",
        locate_device: "Показать местоположение устройства",

        remote_wipe: "Стереть данные",
        remove_device: "Удалить устройство",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Поиск устройства",
        authentication_failure: "Ошибка аутентификации!",
        encryption_failure: "Произошла ошибка при создании защищённого канала до вашего устройства. Пожалуйста, попробуйте через несколько минут.",
        invalid_password: "Вы ввели неправильный пароль или истекло время сессии.",

        enter_password: "Пожалуйста, введите пароль для соединения с устройством.",
        wait_secure_channel: "Пожалуйста, подождите, пока мы создадим защищённый канал до вашего устройства.",
        wait_locate: "Пожалуйста, подождите, пока мы определим местоположение вашего устройства.",
        wait_wipe: "Пожалуйста, подождите, пока мы выполним удаление данных на вашем устройстве.",
        wipe_started: "Начато удаление данных.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "Возникла проблема при удалении устройства из вашего аккаунта.",
        confirm: "Вы уверены, что хотите удалить это устройство?",
        warning_message: "При удалении устройства из аккаунта CyanogenMod, вы не сможете пользоваться такими функциями, как «Найти устройство» или «Удалённый сброс».",
      },

      // Account Partial
      account: {
        title: "Мой аккаунт",
        alert_invalid: "Вы ввели неправильный пароль.",
        alert_success: "Пароль успешно изменён.",
        change_password: "Изменить пароль",
        current_password: "Старый пароль",
        new_password: "Новый пароль",
        confirm_new_password: "Подтвердите пароль",
        error_complexity: "Пароль должен содержать минимум 8 символов.",
        error_match: "Введённые пароли не совпадают."
      },
    });
  }]);
}).call(this);

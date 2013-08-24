// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.zh-hk', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('zh-hk', {
      // Generic
      email: "電子郵件",
      password: "密碼",
      confirm_password: "確認密碼",
      logout: "登出",
      continue: "繼續",
      cancel: "取消",
      privacy_policy: "私隱政策",

      // Top Navigation
      navbar: {
        about: '關於',
        download: '下載',
        devices: '裝置',
        blog: '網誌',
        forum: '論壇',
        community: '社群',
        account: '帳戶'
      },

      // Register Partial
      register: {
        create: "建立您的 CyanogenMod 帳戶",
        register: "註冊",
      },

      // Login Partial
      login: {
        title: "登入至您的 CyanogenMod 帳戶",
        signin: "登入",
        reset_password: "重設您的密碼",
        no_account: "沒有帳戶?",
      },

      // Password Reset Partial
      password_reset: {
        title: "重設您的 CyanogenMod 帳戶密碼",
        reset_password: "重設密碼",
      },

      // Email Verification Partial
      verify_email: {
        title: "驗證您的電子郵件地址",
        must_verify: "您必須驗證您的電子郵件地址，然後才可以使用您的CyanogenMod 帳戶。我們會發送一封電子郵件，你必須通過連結驗證登記。",
        no_longer_valid: "您所使用的連結不再有效。",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "了解更多",

        what_is_cmaccount: {
          title: "什麼是 CyanogenMod 帳戶？",
          text: "CyanogenMod 帳戶為您的 CyanogenMod 移動裝置提供增值服務和功能。",
        },

        do_i_need: {
          title: "我需要CyanogenMod 帳戶嗎？",
          text: "建立 CyanogenMod 帳戶不需要使用您裝置上的CyanogenMod。CyanogenMod 提供的某些功能或服務，例如 \"定位我的手機\" 需要一個CyanogenMod 帳戶去存取。",
        },

        personal_info: {
          title: "需要什麼個人資料？",
          required: "建立 CyanogenMod 帳戶只需要您的一些基本資料，包括電子郵件地址。",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod 絕不會出售您的個人資料。我們會參照隱私政策僅把資料用於服務上，請詳閱",
        },

        secure: {
          title: "它安全嗎？",
          communication: "您的瀏覽器或裝置和我們的伺服器之間的所有通信都經 SSL 加密。此外，我們永遠不會用純文字形式把您的密碼發送到我們的伺服器。",
          priority: "鑑於 \“定位我的手機\” 和 \“遠端清除(Remote Wipe)\” 功能的性質，我們的首要任務是安全至上。若不先使用密碼進行身份驗證，你將不能定位或擦拭裝置。所有的裝置之間的通信，包括位置資訊，是加密和不可被 CyanogenMod 的任何伺服器，人員，或合作夥伴存取的。",
        },

        benefits: {
          title: "擁有有一個帳戶能為我帶來什麼?",
          text: "通過建立一個 CyanogenMod 帳戶，至少你將能夠為您的裝置存取 \“定位我的手機\” 和 \“遠端清除(Remote Wipe)\” 功能。",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "我的裝置",

        cyanogenmod_version: "CyanogenMod 版本",
        android_version: "Android 版本",
        last_seen: "上次上線時間",
        date_registered: "登記日期",
        carrier: "電信商",

        locate: "定位",
        locate_device: "裝置定位",

        remote_wipe: "遠端清除(Remote Wipe)",
        remove_device: "移除裝置",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "裝置定位",
        authentication_failure: "驗證失敗！",
        invalid_password: "您輸入的密碼無效或您的會話已過期",

        enter_password: "請輸入您的密碼以驗證您的裝置。",
        wait_secure_channel: "請稍候,我們正為您的裝置開啟一個安全通道。",
        wait_locate: "請稍候，我們正嘗試定位您的裝置。",
        wait_wipe: "請稍候，我們正嘗試清除(Wipe)您的裝置。",
        wipe_started: "清除(Wipe)成功啟動。",
      },

      // Remove Device Partial
      remove_device: {
        problem: "從您的帳戶中刪除此裝置時，發生問題。",
        confirm: "你確定要移除此裝置？",
        warning_message: "如果從 CyanogenMod 帳戶移除此裝置，你將不能夠再使用我們提供的功能，如定位或遠端清除(Remote Wipe)裝置。",
      },
    });
  }]);
}).call(this);


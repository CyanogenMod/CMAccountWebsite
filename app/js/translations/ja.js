// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.ja', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('ja', {
      // Generic
      email: "Eメールアドレス",
      password: "パスワード",
      confirm_password: "パスワードを確認",
      logout: "ログアウト",
      continue: "続ける",
      cancel: "キャンセル",
      terms_of_service: "利用規約",
      privacy_policy: "プライバシー ポリシー",
      alert_error: 'エラー！',

      // Top Navigation
      navbar: {
        about: 'アバウト',
        download: 'ダウンロード',
        devices: 'デバイス',
        blog: 'ブログ',
        forum: 'フォーラム',
        community: 'コミュニティ',
        account: 'アカウント'
      },

      // Register Partial
      register: {
        create: "CyanogenModアカウントを作成する",
        register: "登録",
      },

      // Login Partial
      login: {
        title: "CyanogenModアカウントにサインインする",
        signin: "サインイン",
        reset_password: "パスワードをリセットしてください",
        no_account: "アカウントを持っていませんか？",
      },

      // Password Reset Partial
      password_reset: {
        title: "CyanogenModアカウントのパスワードをリセットする",
        reset_password: "パスワードのリセット",
      },

      // Email Verification Partial
      verify_email: {
        title: "メールアドレスを確認",
        must_verify: "CyanogenModのアカウントを使用する前に、メールアドレスを確認する必要があります。あなたがサインアップしたときに、我々はサインアップ後に必要な手続きへのリンクを記載した電子メールを送信しました。",
        no_longer_valid: "あなたが開いたリンクはすでに無効になっています。",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "もっと",

        what_is_cmaccount: {
          title: "CyanogenModアカウントとは何ですか？",
          text: "CyanogenModアカウントはCyanogenModを実行しているモバイルデバイスのための付加価値サービスおよび機能へのアクセスを提供します。",
        },

        do_i_need: {
          title: "CyanogenModアカウントは必要ですか？",
          text: "CyanogenModアカウントの作成は、お使いのデバイスでCyanogenModを使用する上では必要はありません。CyanogenModが提供する \"私の電話を探す\"のような特定の機能にアクセスするために必要です。",
        },

        personal_info: {
          title: "どのような個人情報が必要ですか？",
          required: "CyanogenModアカウントの作成は、電子メールアドレスなどの基本的な情報を必要とします。",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenModは、個人情報を販売することは決してありません。この情報は、我々のみが使用します",
        },

        secure: {
          title: "安全ですか？",
          communication: "お使いのブラウザやデバイスと我々のサーバー間すべての通信はSSL暗号化されています。さらに、我々のサーバーに平文パスワードを送信することはありません。",
          priority: "\"私の電話を探す \"および\" リモートワイプ\" 機能の性質を考えると、セキュリティは私達の最優先事項です。最初にあなたのパスワードを使用して認証することなく、デバイスを見つけたり、ワイプすることは不可能です。位置情報を含むお使いのデバイスとのすべての通信は暗号化され、 CyanogenModサーバ、 関係者またはパートナーにアクセスできません。",
        },

        benefits: {
          title: "CyanogenModアカウントを取得すると何ができますか？",
          text: "CyanogenModアカウントを取得することにより、少なくとも \"私の電話を探す\" および\" リモートワイプ\" 機能を使用中のデバイスに提供します。",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "マイデバイス",

        cyanogenmod_version: "CyanogenModのバージョン",
        android_version: "Androidのバージョン",
        last_seen: "最終ログイン日",
        date_registered: "登録日",
        carrier: "通信事業者",

        locate: "所在の特定",
        locate_device: "デバイスを見つける",

        remote_wipe: "リモートワイプ",
        remove_device: "デバイスの削除",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "デバイスの所在を確認",
        authentication_failure: "認証に失敗しました！",
        encryption_failure: "お使いのデバイスへの安全な通信路を開く際に問題が発生しました。数分後にもう一度試してください。",
        invalid_password: "入力したパスワードが無効か、セッションが期限切れになりました",

        enter_password: "お使いのデバイスで認証を行うパスワードを入力してください。",
        wait_secure_channel: "お使いのデバイスに安全な通信路を開いています、お待ちください。",
        wait_locate: "お使いのデバイスの所在を確認しています、お待ちください。",
        wait_wipe: "お使いのデバイスのワイプを行います、お待ちください。",
        wipe_started: "ワイプを正常に開始しました。",
      },

      // Remove Device Partial
      remove_device: {
        problem: "アカウントからこのデバイスを削除する際に問題が発生しました。",
        confirm: "このデバイスを削除してもよろしいですか？",
        warning_message: "CyanogenModアカウントからこのデバイスを削除した場合、所在の特定やリモートワイプなどの機能を使用することができなくなります。",
      },

      // Account Partial
      account: {
        title: "マイアカウント",
        alert_invalid: "入力したパスワードが間違っています。",
        alert_success: "パスワードが正常に変更されました。",
        change_password: "パスワードの変更",
        current_password: "現在のパスワード",
        new_password: "新しいパスワード",
        confirm_new_password: "新しいパスワードを確認",
        error_complexity: "パスワードは8文字以上でなければなりません。",
        error_match: "入力したパスワードが一致しません。"
      },
    });
  }]);
}).call(this);

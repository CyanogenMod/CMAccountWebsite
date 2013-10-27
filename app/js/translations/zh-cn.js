// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.zh-cn', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('zh-cn', {
      // Generic
      email: "电子邮件",
      password: "密码",
      confirm_password: "确认密码",
      logout: "退出",
      continue: "继续",
      cancel: "取消",
      terms_of_service: "服务条款",
      privacy_policy: "隐私权政策",
      alert_error: '错误！',

      // Top Navigation
      navbar: {
        about: '关于',
        download: '下载',
        devices: '设备',
        blog: '博客',
        forum: '论坛',
        community: '社区',
        account: '账户'
      },

      // Register Partial
      register: {
        create: "创建您的 CyanogenMod 账户",
        register: "注册",
      },

      // Login Partial
      login: {
        title: "登录到您的 CyanogenMod 账户",
        signin: "登录",
        reset_password: "重置您的密码",
        no_account: "没有账户？",
      },

      // Password Reset Partial
      password_reset: {
        title: "重置您的 CyanogenMod 账户密码",
        reset_password: "重置密码",
      },

      // Email Verification Partial
      verify_email: {
        title: "验证您的电子邮件地址",
        must_verify: "您必须验证您的电子邮件地址，然后才可以使用您的 CyanogenMod 账户。当您注册后，我们会给您发送一封电子邮件，您必须按照其中的链接完成验证。",
        no_longer_valid: "您所打开的链接无效。",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "了解更多",

        what_is_cmaccount: {
          title: "什么是 CyanogenMod 账户？",
          text: "CyanogenMod 账户为您的 CyanogenMod 设备提供增值服务和功能。",
        },

        do_i_need: {
          title: "我需要CyanogenMod 账户吗？",
          text: "创建 CyanogenMod 账户不需要使用您设备上的 CyanogenMod。CyanogenMod 提供的某些功能或服务，例如 \"定位我的手机\" 需要一个 CyanogenMod 账户去存取。",
        },

        personal_info: {
          title: "需要什么个人资料？",
          required: "创建 CyanogenMod 账户只需要您的一些基本资料，包括电子邮件地址。",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod 绝不会出售您的个人资料。我们会参照隐私权政策仅把资料用于服务商，请详查",
        },

        secure: {
          title: "它安全吗？",
          communication: "您的浏览器或设备和我们服务器之间的所有通信都经过 SSL 加密。另外，我们永远不会用纯文本把您的密码发送到我们的服务器。",
          priority: "鉴于 \“定位我的手机\” 和 \远程 Wipe  ” 的功能性质，安全是我们的首要任务。若不先使用密码进行身份验证，您将不能定位或 Wipe 设备。所有的设备之间的通信，包括位置信息，是加密并且不能被 CyanogenMod 的任何服务器、人员或合作伙伴存取的。",
        },

        benefits: {
          title: "拥有一个账户能为我带来什么？",
          text: "通过创建一个 CyanogenMod 账户，至少您能够在您的设备上访问 \“ 定位我的手机\” 和 \远程 Wipe \” 功能。",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "我的设备",

        cyanogenmod_version: "CyanogenMod 版本",
        android_version: "Android 版本",
        last_seen: "上次登录时间",
        date_registered: "注册日期",
        carrier: "运营商",

        locate: "定位",
        locate_device: "设备定位",

        remote_wipe: "远程 Wipe",
        remove_device: "移除设备",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "设备定位",
        authentication_failure: "验证失败！",
        invalid_password: "您输入的密码无效或您的操作已超时",

        enter_password: "请输入您的密码以验证您的设备。",
        wait_secure_channel: "请稍候，我们正为您的设备开启一个安全通道。",
        wait_locate: "请稍候，我们正在尝试定位您的设备。",
        wait_wipe: "请稍候，我们正在尝试抹除您设备上的资料。",
        wipe_started: "Wipe 成功启动。",
      },

      // Remove Device Partial
      remove_device: {
        problem: "从您的账户移除此设备时发生问题。",
        confirm: "您确定要移除此设备？",
        warning_message: "如果从 CyanogenMod 账户移除此设备，您将不能继续使用我们提供的功能，如定位或远程 Wipe 设备。",
      },

      // Account Partial
      account: {
        title: "我的账户",
        alert_invalid: "您输入的当前密码不正确。",
        alert_success: "已成功更改您的密码。",
        change_password: "更改密码",
        current_password: "目前的密码",
        new_password: "新密码",
        confirm_new_password: "确认新密码",
        error_complexity: "您的密码必须至少是 8 位。",
        error_match: "您输入的密码不相符。"
      },
    });
  }]);
}).call(this);


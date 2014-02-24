// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.en', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('en', {
      // Generic
      email: "Email",
      password: "Password",
      confirm_password: "Confirm Password",
      logout: "Log Out",
      continue: "Continue",
      cancel: "Cancel",
      terms_of_service: "Terms of Service",
      privacy_policy: "Privacy Policy",
      alert_error: 'Error!',

      // Top Navigation
      navbar: {
        about: 'About',
        download: 'Download',
        devices: 'Devices',
        blog: 'Blog',
        forum: 'Forum',
        community: 'Community',
        account: 'Account'
      },

      // Register Partial
      register: {
        create: "Create your CyanogenMod Account",
        register: "Register",
      },

      // Login Partial
      login: {
        title: "Sign in to your CyanogenMod Account",
        signin: "Sign In",
        reset_password: "Reset Your Password",
        no_account: "No account?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Reset your CyanogenMod Account password",
        reset_password: "Reset Password",
      },

      // Email Verification Partial
      verify_email: {
        title: "Verify your email address",
        must_verify: "You must verify your email address before you can use your CyanogenMod Account.  When you signed up, we sent you an email with a link that you must follow.",
        no_longer_valid: "The link you followed is no longer valid.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Learn More",

        what_is_cmaccount: {
          title: "What is a CyanogenMod Account?",
          text: "A CyanogenMod Account provides access to value-add services and functionality for your mobile device running CyanogenMod.",
        },

        do_i_need: {
          title: "Do I need a CyanogenMod Account?",
          text: "Creation of a CyanogenMod Account is not required to use CyanogenMod on your device. Certain functionality or services provided by CyanogenMod, such as \"Find My Phone\" require a CyanogenMod Account to access.",
        },

        personal_info: {
          title: "What personal information is required?",
          required: "Creation of a CyanogenMod account requires only basic information including email address.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod will never sell your personal information. This information will be used only in accordance with our",
        },

        secure: {
          title: "Is it secure?",
          communication: "All communication between your browser or device and our servers is SSL encrypted. Additionally, we will never send your plaintext password to our servers.",
          priority: "Given the nature of the \"Find My Phone\" and \"Remote Wipe\" features, security is our number one priority. You cannot locate or wipe your device without first authenticating using your password. All communication with your device, including location information, is encrypted and inaccessible to any CyanogenMod servers, personnel, or partners.",
        },

        benefits: {
          title: "What does having an account get me?",
          text: "By establishing a CyanogenMod Account you will have, at minimum, access to \"Find My Phone\" and \"Remote Wipe\" capabilities for your device.",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "My Devices",

        cyanogenmod_version: "CyanogenMod Version",
        android_version: "Android Version",
        last_seen: "Last Seen",
        date_registered: "Date Registered",
        carrier: "Carrier",

        locate: "Locate",
        locate_device: "Locate Device",

        remote_wipe: "Remote Wipe",
        remove_device: "Remove Device",

        remote_ring: "Remote Ring",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Locate Device",
        authentication_failure: "Authentication Failure!",
        encryption_failure: "There was a problem opening a secure channel to your device. Please try again in a few minutes.",
        invalid_password: "The password you entered was invalid or your session has expired",

        enter_password: "Please enter your password to authenticate with your device.",
        wait_secure_channel: "Please wait while we open a secure channel to your device.",
        wait_locate: "Please wait while we attempt to locate your device.",
        wait_wipe: "Please wait while we attempt to wipe your device.",
        wipe_started: "Wipe successfully started.",
        wait_ring: "Please wait while we attempt to ring your device.",
        ring_started: "Ring successfully started.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "There was a problem while removing this device from your account.",
        confirm: "Are you sure you want to remove this device?",
        warning_message: "If you remove this device from your CyanogenMod Account, you will no longer be able to use features like locating or remote wiping your device.",
      },

      // Account Partial
      account: {
        title: "My Account",
        alert_invalid: "The current password you entered is incorrect.",
        alert_success: "Your password has been successfully changed.",
        change_password: "Change Password",
        current_password: "Current Password",
        new_password: "New Password",
        confirm_new_password: "Confirm New Password",
        error_complexity: "Your password must be at least eight (8) characters long.",
        error_match: "The passwords you entered do not match."
      },
    });
  }]);
}).call(this);

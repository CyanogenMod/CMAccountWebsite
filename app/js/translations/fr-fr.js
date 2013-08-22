// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.fr-fr', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('fr-fr', {
      // Generic
      email: "E-mail",
      password: "Mot de passe",
      confirm_password: "Confirmer le mot de passe",
      logout: "Déconnexion",
      continue: "Continuer",
      cancel: "Annuler",
      privacy_policy: "Politique de confidentialité",

      // Top Navigation
      navbar: {
        about: 'À propos',
        download: 'Télécharger',
        devices: 'Appareils',
        blog: 'Blog',
        forum: 'Forum',
        community: 'Communauté',
        account: 'Compte'
      },

      // Register Partial
      register: {
        create: "Créer votre compte CyanogenMod",
        register: "S'enregistrer",
      },

      // Login Partial
      login: {
        title: "Connexion à votre compte CyanogenMod",
        signin: "Connexion",
        reset_password: "Réinitialiser votre mot de passe",
        no_account: "Pas encore de compte ?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Réinitialisation du mot de passe de votre compte CyanogenMod",
        reset_password: "Réinitialiser votre mot de passe",
      },

      // Email Verification Partial
      verify_email: {
        title: "Vérification de votre adresse e-mail",
        must_verify: "Vous devez valider votre adresse e-mail avant de pouvoir utiliser un compte CyanogenMod. Suite à votre inscription, nous vous avons transmis un e-mail avec un lien à suivre.",
        no_longer_valid: "Le lien que vous avez utilisé n'est plus valide.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "En savoir plus",

        what_is_cmaccount: {
          title: "Qu'est-ce qu'un compte CyanogenMod ?",
          text: "Un compte CyanogenMod permet d'accéder à des services et des fonctionnalités avancés pour votre appareil fonctionnant sous CyanogenMod.",
        },

        do_i_need: {
          title: "Ai-je besoin d'un compte CyanogenMod ?",
          text: "La création d'un compte CyanogenMod est facultative et n'est pas requise pour utiliser votre appareil fonctionnant sous CyanogenMod. Certaines fonctionnalités ou services fournis par CyanogenMod, comme \"Localisation de l'appareil\", nécessitent néanmoins un compte CyanogenMod.",
        },

        personal_info: {
          title: "Quelles informations personnelles sont nécessaires ?",
          required: "La création d'un compte CyanogenMod nécessite des informations basiques comme l'adresse e-mail.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod ne revendra jamais vos informations personnelles. Ces informations seront seulement utilisées en accord avec notre", //Politique de confidentialité
        },

        secure: {
          title: "Est-ce sécurisé ?",
          communication: "Toutes les communications de votre navigateur ou votre appareil vers nos serveurs subissent un cryptage de type SSH. De plus, nous ne vous enverrons jamais votre mot de passe en clair depuis nos serveurs.",
          priority: "Étant donné la nature des fonctionnalités de \"Localisation de l'appareil\" et de l'\"Effacement à distance\", la sécurité est notre priorité numéro un. Il est impossible de localiser ou d'effacer un appareil sans être préalablement authentifié avec votre mot de passe. Toutes les communications avec votre appareil, informations de localisation incluses, sont cryptées et inaccessibles par aucun des serveurs CyanogenMod, personnels ou partenaires.",
        },

        benefits: {
          title: "Qu'est-ce que le compte CyanogenMod m'apporte ?",
          text: "En créant un compte CyanogenMod vous aurez, au minimum, accès aux fonctionnalités de \"Localisation d'appareil\" et d'\"Effacement à distance\".",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "Mes appareils",

        cyanogenmod_version: "Version de CyanogenMod",
        android_version: "Version d'Android",
        last_seen: "Dernier aperçu",
        date_registered: "Date d'enregistrement",
        carrier: "Opérateur",

        locate: "Position",
        locate_device: "Localiser l'appareil",

        remote_wipe: "Effacer à distance",
        remove_device: "Supprimer l'appareil",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Localiser l'appareil",
        authentication_failure: "Authentification échouée !",
        invalid_password: "Le mot de passe entré est invalide ou votre session a expiré.",

        enter_password: "Entrez votre mot de passe pour vous authentifier avec votre appareil.",
        wait_secure_channel: "Patientez pendant l'ouverture d'une connexion sécurisée avec votre appareil.",
        wait_locate: "Patientez pendant la localisation de votre appareil.",
        wait_wipe: "Patientez pendant l'effacement de votre appareil.",
        wipe_started: "Effacement initié avec succès.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "Un problème a été rencontré pendant la suppression de l'appareil de votre compte.",
        confirm: "Voulez-vous vraiment supprimer cet appareil ?",
        warning_message: "Si vous supprimez cet appareil de votre compte CyanogenMod, vous ne serez plus en mesure d'utiliser les fonctionnalités telles que la localisation ou l'effacement à distance de votre appareil.",
      },
    });
  }]);
}).call(this);

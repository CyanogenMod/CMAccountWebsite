// WARNING:  Translations are a work in progress.  This template may change significantly.
// TODO(ctso): Remove this warning when translations have stabilized.
// TODO(ctso): Translate form validation errors.

(function() {
  angular.module('cmaccount.l10n.el', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('el', {
      // Generic
      email: "Email",
      password: "Κωδικός",
      confirm_password: "Επιβεβαίωση κωδικού",
      logout: "Αποσύνδεση",
      continue: "Συνέχεια",
      cancel: "Ακύρωση",
      privacy_policy: "Πολιτική προστασίας προσωπικών δεδομένων",

      // Top Navigation
      navbar: {
        about: 'Σχετικά',
        download: 'Λήψεις',
        devices: 'Συσκευές',
        blog: 'Blog',
        forum: 'Forum',
        community: 'Κοινότητα',
        account: 'Λογαριασμός'
      },

      // Register Partial
      register: {
        create: "Δημιουργία λογαριασμού CyanogenMod",
        register: "Εγγραφή",
      },

      // Login Partial
      login: {
        title: "Σύνδεση στο λογαριασμό CyanogenMod",
        signin: "Σύνδεση",
        reset_password: "Επαναφορά κωδικού",
        no_account: "Δεν έχετε λογαριασμό;",
      },

      // Password Reset Partial
      password_reset: {
        title: "Επαναφορά κωδικού λογαριασμού CyanogenMod",
        reset_password: "Επαναφορά κωδικού",
      },

      // Email Verification Partial
      verify_email: {
        title: "Επιβεβαίωση διεύθυνσης email",
        must_verify: "Πρέπει να επαληθεύσετε τη διεύθυνση email σας για να μπορέσετε να χρησιμοποιήσετε το λογαριασμό CyanogenMod.",
        no_longer_valid: "Ο σύνδεσμος που ακολουθήσατε δεν ισχύει πλέον.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Μάθετε περισσότερα",

        what_is_cmaccount: {
          title: "Τι είναι ο λογαριασμός CyanogenMod;",
          text: "Ένας λογαριασμός CyanogenMod παρέχει πρόσβαση σε πρόσθετες υπηρεσίες και λειτουργίες για την φορητή συσκευή σας που τρέχει CyanogenMod.",
        },

        do_i_need: {
          title: "Χρειάζομαι έναν λογαριασμό CyanogenMod;",
          text: "Η δημιουργία ενός λογαριασμού CyanogenMod δεν είναι απαραίτητη για την χρήση του CyanogenMod στη συσκευή σας. Ορισμένες λειτουργίες ή υπηρεσίες που παρέχονται από το CyanogenMod, όπως \"Εύρεση του κινητού μου\" απαιτούν λογαριασμό CyanogenMod για να αποκτήσετε πρόσβαση.",
        },

        personal_info: {
          title: "Ποιες προσωπικές πληροφορίες απαιτούνται;",
          required: "Η δημιουργία ενός λογαριασμού CyanogenMod απαιτεί μόνο βασικές πληροφορίες συμπεριλαμβανομένης της διεύθυνσης email.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "Το CyanogenMod δεν θα πουλήσει ποτέ τα προσωπικά σας στοιχεία. Αυτές οι πληροφορίες θα χρησιμοποιηθούν μόνο σύμφωνα με την",
        },

        secure: {
          title: "Είναι ασφαλές;",
          communication: "Όλη η επικοινωνία μεταξύ του προγράμματος περιήγησης ή τη συσκευή σας και τους διακομιστές μας είναι κρυπτογραφημένη με SSL. Επιπλέον, ποτέ δεν θα στείλουμε τον κωδικό πρόσβασης σας σε μορφή απλού κειμένου στους διακομιστές μας.",
          priority: "Δεδομένης της φύσης των λειτουργιών \"Εύρεση του κινητού μου\" και \"Απομακρυσμένη επαναφορά\", η ασφάλεια είναι η πρώτη μας προτεραιότητα. Δεν μπορείτε να εντοπίσετε ή να επαναφέρετε τη συσκευή σας χωρίς πρώτα να επικυρώσετε με τον κωδικό σας. Όλη η επικοινωνία με τη συσκευή σας, συμπεριλαμβανομένων των πληροφοριών τοποθεσίας, είναι κρυπτογραφημένη και απρόσιτη από τους διακομιστές, το προσωπικό ή τους συνεργάτες του CyanogenMod.",
        },

        benefits: {
          title: "Σε τι με βοηθάει η δημιουργία ενός λογαριασμού;",
          text: "Δημιουργώντας έναν λογαριασμό CyanogenMod θα έχετε πρόσβαση, τουλάχιστον, στις λειτουργίες \"Εύρεση του κινητού μου\" και \"Απομακρυσμένη επαναφορά\" στη συσκευή σας.",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "Οι συσκευές μου",

        cyanogenmod_version: "Έκδοση CyanogenMod",
        android_version: "Έκδοση Android",
        last_seen: "Τελευταία εμφανίστηκε",
        date_registered: "Ημερομηνία καταχώρισης",
        carrier: "Πάροχος",

        locate: "Εντοπισμός",
        locate_device: "Εντοπισμός συσκευής",

        remote_wipe: "Απομακρυσμένη επαναφορά",
        remove_device: "Αφαίρεση συσκευής",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Εντοπισμός συσκευής",
        authentication_failure: "Αποτυχία ελέγχου ταυτότητας!",
        invalid_password: "Ο κωδικός πρόσβασης που εισάγατε δεν ήταν έγκυρος ή συνεδρία σας έχει λήξει",

        enter_password: "Παρακαλώ εισάγετε τον κωδικό πρόσβασης για τον έλεγχο ταυτότητας με τη συσκευή σας.",
        wait_secure_channel: "Παρακαλώ περιμένετε ενώ ανοίγουμε ένα ασφαλές κανάλι επικοινωνίας με τη συσκευή σας.",
        wait_locate: "Παρακαλώ περιμένετε ενώ προσπαθούμε να εντοπίσουμε τη συσκευή σας.",
        wait_wipe: "Παρακαλώ περιμένετε ενώ προσπαθούμε να επαναφέρουμε τη συσκευή σας.",
        wipe_started: "Η επαναφορά ξεκίνησε με επιτυχία.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "Υπήρξε ένα πρόβλημα κατά την αφαίρεση αυτής της συσκευής από το λογαριασμό σας.",
        confirm: "Είστε βέβαιοι ότι θέλετε να αφαιρέσετε αυτή τη συσκευή;",
        warning_message: "Αν αφαιρέσετε τη συσκευή από το λογαριασμό CyanogenMod σας, δεν θα είστε πλέον σε θέση να χρησιμοποιήσετε χαρακτηριστικά, όπως τον εντοπισμό ή την απομακρυσμένη επαναφορά της συσκευής σας.",
      },
    });
  }]);
}).call(this);

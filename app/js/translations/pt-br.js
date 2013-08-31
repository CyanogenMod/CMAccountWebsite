(function() {
  angular.module('cmaccount.l10n.pt-br', ['l10n']).config(['l10nProvider', function(l10n) {
    l10n.add('pt-br', {
      // Generic
      email: "Email",
      password: "Senha",
      confirm_password: "Confirmar Senha",
      logout: "Sair",
      continue: "Continuar",
      cancel: "Cancelar",
      privacy_policy: "Política de Privacidade",

      // Top Navigation
      navbar: {
        about: 'Sobre',
        download: 'Download',
        devices: 'Dispositivo',
        blog: 'Blog',
        forum: 'Fórum',
        community: 'Comunidade',
        account: 'Conta'
      },

      // Register Partial
      register: {
        create: "Criar conta CyanogenMod",
        register: "Registrar",
      },

      // Login Partial
      login: {
        title: "Entrar na sua conta CyanogenMod",
        signin: "Entrar",
        reset_password: "Redefinir sua senha",
        no_account: "Não tem conta?",
      },

      // Password Reset Partial
      password_reset: {
        title: "Redefinir sua senha da conta CyanogenMod",
        reset_password: "Redefinir sua senha",
      },

      // Email Verification Partial
      verify_email: {
        title: "Verificar seu endereço de email",
        must_verify: "Você precisa verificar seu endereço de email antes de usar sua conta CyanogenMod. Quando você registrou, enviamos um email a você com um link que você deve abrir.",
        no_longer_valid: "O link que você abriu não é mais válido.",
      },

      // Learn More Partial
      learn_more: {
        learn_more: "Saiba Mais",

        what_is_cmaccount: {
          title: "O que é uma conta CyanogenMod?",
          text: "Uma conta CyanogenMod oferece acesso a seviços de valor agregado e funcionalidade para o seu dispositivo móvel rodando CyanogenMod.",
        },

        do_i_need: {
          title: "Eu preciso de uma conta CyanogenMod?",
          text: "Não é preciso criar uma conta CyanogenMod para usar CyanogenMod em seu dispositivo. Algumas funcionalidades ou serviços providos por CyanogenMod, como \"Achar Meu Telefone\" requer uma conta CyanogenMod para acessar.",
        },

        personal_info: {
          title: "Qual informação pessoal é necessária?",
          required: "Para criar uma conta CyanogenMod requer somente informações básicas incluindo endereço de email.",
          // Note: This string ends with a link to "Privacy Policy"
          // TODO(ctso): Implement a way to safely embed html in the translations.
          usage: "CyanogenMod nunca irá vender suas informações pessoais. As informações serão usadas somente de acordo com o nosso",
        },

        secure: {
          title: "É seguro?",
          communication: "Todas as comunicações entre o navegador ou seu dispositivo com nossos servidores são criptografadas usando. Além disso, nós nunca iremos enviar a sua senha em texto legível para nossos servidores.",
          priority: "Dada a natureza dos recursos \"Achar Meu Telefone\" e \"Apagar Remotamente\", segurança é a nossa prioridade número um. Você não pode localizar ou apagar seu dispositivo sem primeiro autenticar usando sua senha. Todas as comunicações com seu dispositivo, incluindo informação de localização, são criptografadas e inacessível a qualquer servidor CyanogenMod, membros, ou parceiros.",
        },

        benefits: {
          title: "O que significa ter uma conta?",
          text: "Ao criar uma conta CyangenMod você terá, no mínimo, acesso às capacidades de \"Achar Meu Telefone\" e \"Apagar Remotamente\" para o seu dispositivo.",
        },
      },

      // Devices Partials
      devices: {
        my_devices: "Meus Dispositivos",

        cyanogenmod_version: "Versão CyanogenMod",
        android_version: "Versão Android",
        last_seen: "Última Atividade",
        date_registered: "Data Registrada",
        carrier: "Operadora",

        locate: "Localizar",
        locate_device: "Localizar Dipositivo",

        remote_wipe: "Apagar Remotamente",
        remove_device: "Remover Dispositivo",
      },

      // Secure Message Partials (find/wipe)
      secure_message: {
        locate_device: "Localizar Dispositivo",
        authentication_failure: "Falha na autenticação!",
        invalid_password: "A senha que voce inseriu é inválida ou sua sessão expirou",

        enter_password: "Favor insira sua senha para autenticar com o seu dispositivo.",
        wait_secure_channel: "Favor espere enquanto abrimos um canal seguro com o seu dispositivo.",
        wait_locate: "Favor espere enquanto tentamos localizar seu dispositivo.",
        wait_wipe: "Favor espere enquanto tentampos apagar seu dispositivo.",
        wipe_started: "Processo de apagar foi iniciado com sucesso.",
      },

      // Remove Device Partial
      remove_device: {
        problem: "Ocorreu um problema ao remover seu dispositivo de sua conta.",
        confirm: "Você tem certeza que quer remover este dispositivo?",
        warning_message: "Se você remover este dispositivo de sua conta CyanogenMod, você não será capaz de usar recursos no seu dispositivo de localização ou apagar remotamente.",
      },
    });
  }]);
}).call(this);
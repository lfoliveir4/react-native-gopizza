import { Alert } from "react-native";

export function getAuthErrorMessageFromErrorCode(code: string) {
  switch (code) {
    case "auth/invalid-email":
      return Alert.alert("E-mail inválido");

    case "auth/user-disabled":
      return Alert.alert("UsuÃ¡rio desabilitado");

    case "auth/user-not-found":
      return Alert.alert("E-mail nÃ£o cadastrado");

    case "auth/wrong-password":
      return Alert.alert("Senha incorreta");

    case "auth/network-request-failed":
      return Alert.alert(
        "Erro de rede, conexÃ£o interrompida ou host inacessÃ­vel."
      );

    case "auth/invalid-user-token":
      return Alert.alert("Ocorreu um erro. FaÃ§a login novamente.");

    case "auth/too-many-requests":
      return Alert.alert("Acesso bloqueado, tente novamente mais tarde.");

    case "auth/email-already-in-use":
      return Alert.alert("O e-mail correspondente já existe!");

    case "auth/weak-password":
      return Alert.alert("A senha nÃ£o Ã©️ forte o suficiente.");

    case "auth/unknown":
      return Alert.alert("Ocorreu um erro, tente novamente.");

    case 'auth/no-current-user':
      return Alert.alert("No user currently signed in.");

    default:
      return Alert.alert("Ocorreu um erro, tente novamente.");
  }
}

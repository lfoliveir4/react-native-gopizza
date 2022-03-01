import { Alert } from "react-native";

export function getStorageErrorMessageFromErrorCode(code: string) {
  switch (code) {
    case "storage/unknown":
      return Alert.alert("Ocorreu um erro desconhecido.");

    case "storage/object-not-found":
      return Alert.alert("Nenhum objeto na referência desejada.");

    case "storage/bucket-not-found":
      return Alert.alert("Nenhum intervalo configurado para o Cloud Storage.");

    case "storage/project-not-found":
      return Alert.alert("Nenhum projeto configurado para o Cloud Storage.");

    case "storage/quota-exceeded":
      return Alert.alert(
        "A cota do intervalo do Cloud Storage foi excedida. Se você estiver no nível gratuito, faça upgrade para um plano pago. Se você estiver em um plano pago, entre em contato com o suporte do Firebase."
      );

    case "auth/invalid-user-token":
      return Alert.alert("Ocorreu um erro. FaÃ§a login novamente.");

    case "storage/unauthenticated":
      return Alert.alert(
        "O usuário não está autenticado. Faça a autenticação e tente novamente."
      );

    case "storage/unauthorized":
      return Alert.alert(
        "O usuário não está autorizado a executar a ação desejada. Verifique suas regras de segurança para garantir que estejam corretas."
      );

    case "storage/retry-limit-exceeded":
      return Alert.alert(
        "O limite máximo de tempo em uma operação (upload, download, exclusão etc.) foi excedido. Envie novamente."
      );

    case "storage/invalid-checksum":
      return Alert.alert(
        "O arquivo no cliente não corresponde à soma de verificação do arquivo recebido pelo servidor. Envie novamente."
      );

    case "storage/canceled":
      return Alert.alert("O usuário cancelou a operação.");

    case "storage/invalid-event-name":
      return Alert.alert("storage/invalid-url");

    case "storage/invalid-argument":
      return Alert.alert(
        "O argumento transmitido a put() precisa ser matriz 'File', 'Blob' ou 'UInt8'. O argumento transmitido a putString() precisa ser uma string bruta 'Base64' ou 'Base64URL'."
      );

    case "storage/no-default-bucket":
      return Alert.alert(
        "Nenhum bucket foi definido na propriedade storageBucket da configuração."
      );

    case "storage/cannot-slice-blob":
      return Alert.alert(
        "Em geral, isso ocorre normalmente quando o arquivo local é alterado (excluído, salvo novamente etc.). Tente fazer o upload novamente após verificar que o arquivo não foi alterado."
      );

    case "storage/server-file-wrong-size":
      return Alert.alert(
        "O arquivo no cliente não corresponde ao tamanho do arquivo recebido pelo servidor. Envie novamente."
      );

    default:
      return Alert.alert("Ocorreu um erro, tente novamente.");
  }
}

export function FormataStringData(data) {
  if (!data.includes('/')) return data;
  const dia = data.split('/')[0];
  const mes = data.split('/')[1];
  const ano = data.split('/')[2];

  return `${ano}-${`0${mes}`.slice(-2)}-${`0${dia}`.slice(-2)}`;
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

export function FormataDataString(data) {
  const dia = data.split('-')[2];
  const mes = data.split('-')[1];
  const ano = data.split('-')[0];

  return `${`0${dia}`.slice(-2)}/${`0${mes}`.slice(-2)}/${ano}`;
}

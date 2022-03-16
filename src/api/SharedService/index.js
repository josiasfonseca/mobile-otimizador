import axios from 'axios';

export const getCep = async (cep) => {
    return await axios.get('https://viacep.com.br/ws/' + cep + '/json/',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => {
          return res.data
      })
      .catch(err => console.log(err))
  }

  
export const getCnpj = async (cnpj) => {
    return await axios.get('https://brasilapi.com.br/api/cnpj/v1/' + cnpj,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => {
          return res.data
      })
      .catch(err => console.log(err))
  }

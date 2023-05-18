import './style.css';
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/storage'

function ModalEdite({ setShowModalEdite, registro, dataFormatada }) {
  const [inputButtonColor, setInputButtonColor] = useState('#b9b9b9');
  const [outputButtonColor, setOutputButtonColor] = useState('#FF576B');
  const [categorias, setCategorias] = useState([])
  const datecc = new Date(dataFormatada);
  const dateString = datecc.toISOString().slice(0, 10)
  const [formEdite, setFormEdite] = useState({
    tipo: '',
    descricao: '',
    valor: '',
    data: '',
    categoria_id: ''
  })

  function handleChangeFormRegistro(event) {
    setFormEdite({ ...formEdite, [event.target.name]: event.target.value });
  }
  async function handleFormEdite(event) {
    event.preventDefault()

    try {
      const response = await api.put(`/transacao/${registro.id}`,
        {
          descricao: formEdite.descricao,
          valor: formEdite.valor,
          data: formEdite.data,
          categoria_id: formEdite.categoria_id,
          tipo: formEdite.tipo
        },
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        }
      );
      if (response.data.status === 200) {
        console.log('Registro Editado')
      }
      setShowModalEdite(false)


    } catch (error) {
      console.log(error);
      alert(error.response.data.mensagem)
    }

  }
  function centavosParaReais(valorEmCentavos) {
    const valorEmReais = valorEmCentavos / 100;
    return valorEmReais;
  }
  useEffect(() => {
    async function getCategorias() {
      try {
        const response = await api.get('/categoria', { headers: { Authorization: `Bearer ${getItem('token')}` } })
        setCategorias(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategorias()
  }, [])

  const valorEmCentavos = registro.valor
  const valorEmReais = centavosParaReais(valorEmCentavos)
  useEffect(() => {
    setFormEdite({
      tipo: registro.tipo,
      descricao: registro.descricao,
      valor: valorEmReais,
      data: dateString,
      categoria_id: registro.categoria_id,
    });
  }, [registro, valorEmReais, dateString]);

  function handleBtnInput() {
    setInputButtonColor('#3A9FF1');
    setOutputButtonColor('#b9b9b9');
    setFormEdite({ ...formEdite, tipo: 'entrada' })
  }

  function handleBtnOutput() {
    setOutputButtonColor('#FF576B');
    setInputButtonColor('#b9b9b9');
    setFormEdite({ ...formEdite, tipo: 'saida' })
  }
  return (
    <div className='container-modal'>
      <div className='modal'>
        <h1>Editar Registro</h1>
        <div className='close-modal-Edite' onClick={() => setShowModalEdite(false)}  >X</div>
        <div className='btn-state'>
          <button
            onClick={() => handleBtnInput()}
            className='btn-input'
            style={{ backgroundColor: inputButtonColor }}
          >
            Entrada
          </button>
          <button
            onClick={() => handleBtnOutput()}
            className='btn-output'
            style={{ backgroundColor: outputButtonColor }}
          >
            Saida
          </button>
        </div>

        <form className='form-modal' onSubmit={handleFormEdite} key={registro.id}>
          <span className='title-value'>Valor</span>
          <label htmlFor='valor'></label>
          <input
            type='number'
            name='valor'
            step="0.01"
            value={formEdite.valor}
            onChange={(event) => handleChangeFormRegistro(event)}
          >
          </input>

          <span className='title-categories'>Categorias</span>
          <label htmlFor='categoria_id'></label>
          <select
            name='categoria_id'
            value={formEdite.categoria_id}
            onChange={(event) => handleChangeFormRegistro(event)}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option value={categoria.id}>{categoria.descricao}</option>
            ))}
          </select>

          <span className='title-date'>Data</span>
          <label htmlFor='data'></label>
          <input
            className='input-date'
            type='date'
            name='data'
            value={formEdite.data}
            onChange={(event) => handleChangeFormRegistro(event)}
          >
          </input>

          <span className='title-description'>Descrição</span>
          <label htmlFor='descricao'></label>
          <input
            className='input-description'
            type='text'
            name='descricao'
            value={formEdite.descricao}
            onChange={(event) => handleChangeFormRegistro(event)}
          >
          </input>

          <button
            className='form-moda-btn'
          >Confirmar
          </button>

        </form>
      </div>
    </div>
  )
}

export default ModalEdite
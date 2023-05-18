import './style.css';
import api from '../../api/api';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage'


function ModalUpdate({ setShowModalAdd, setRegistroUsuario, registrousuario }) {
  const [inputButtonColor, setInputButtonColor] = useState('#b9b9b9');
  const [outputButtonColor, setOutputButtonColor] = useState('#FF576B');
  const localRegistro = [...registrousuario]
  const [categorias, setCategorias] = useState([])
  const [formAdd, setFormAdd] = useState({
    tipo: '',
    descricao: '',
    valor: '',
    data: '',
    categoria_id: ''
  })
  function handleChangeFormRegistro(event) {
    setFormAdd({ ...formAdd, [event.target.name]: event.target.value });
  }
  async function handleFormEdite(event) {
    event.preventDefault()
    try {

      const response = await api.post('/transacao/',
        {
          tipo: formAdd.tipo,
          descricao: formAdd.descricao,
          valor: formAdd.valor,
          data: formAdd.data,
          categoria_id: formAdd.categoria_id
        },
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        }
      );
      localRegistro.push(response.data)
      setRegistroUsuario(localRegistro)

      setShowModalAdd(false)
    } catch (error) {
      console.log(error);
      alert(error.response.data.mensagem)
    }
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
  function handleBtnInput() {
    setInputButtonColor('#3A9FF1');
    setOutputButtonColor('#b9b9b9');
    setFormAdd({ ...formAdd, tipo: 'entrada' })
  }

  function handleBtnOutput() {
    setOutputButtonColor('#FF576B');
    setInputButtonColor('#b9b9b9');
    setFormAdd({ ...formAdd, tipo: 'saida' })
  }
  return (
    <div className='container-modal'>
      <div className='modal'>
        <h1>Adicionar Registro</h1>
        <div className='close-modal-Update' onClick={() => setShowModalAdd(false)} >X</div>
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

        <form className='form-modal' onSubmit={handleFormEdite}>
          <span className='title-value'>Valor</span>
          <label htmlFor='valor'></label>
          <input
            type='number'
            name='valor'
            step="0.01"
            value={formAdd.valor}
            onChange={(event) => handleChangeFormRegistro(event)}
          >
          </input>

          <span className='title-categories'>Categorias</span>
          <label htmlFor='categoria_id'></label>
          <select
            name='categoria_id'
            value={formAdd.categoria_id}
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
            value={formAdd.data}
            onChange={(event) => handleChangeFormRegistro(event)}
          >
          </input>

          <span className='title-description'>Descrição</span>
          <label htmlFor='descricao'></label>
          <input
            className='input-description'
            type='text'
            name='descricao'
            value={formAdd.descricao}
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

export default ModalUpdate
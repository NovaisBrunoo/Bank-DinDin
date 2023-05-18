import './style.css'
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { getItem, setItem } from '../../utils/storage'


function ModalPerfil({ setShowModal }) {
  const [formPerfil, setFormPerfil] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''

  })
  function handleChangeForm(event) {
    setFormPerfil({ ...formPerfil, [event.target.name]: event.target.value });
  }

  function clerForm() {
    setFormPerfil(
      {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
      }
    )
  }
  async function handleFormPerfil(event) {
    event.preventDefault()
    try {
      if (!formPerfil.email || !formPerfil.senha || !formPerfil.nome) {
        console.log("Preencha todos os campos!");
        return;
      }
      if (formPerfil.senha !== formPerfil.confirmarSenha) {
        console.log('senha invalida')
        return
      }
      const response = await api.put('/usuario',
        {
          nome: formPerfil.nome,
          email: formPerfil.email,
          senha: formPerfil.senha
        },
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        });


      if (response.status === 204) {
        console.log('usuario cadastrado')
        clerForm();
      }
      setItem('userName', formPerfil.nome)
      setShowModal(false)

    } catch (error) {
      console.log(error);
      alert(error.response.data.mensagem)
    }
  }
  useEffect(() => {
    try {
      async function perfilUser() {
        const response = await api.get('/usuario',
          {
            headers: {
              Authorization: `Bearer ${getItem('token')}`
            }
          });
        setFormPerfil({
          nome: response.data.nome,
          email: response.data.email,
          senha: '',
          confirmarSenha: ''
        })
      }
      perfilUser();
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='container-modal'>
      <div className='modal-perfil'>
        <h1>Editar Perfil</h1>
        <div className='close-modal' onClick={() => setShowModal(false)} >X</div>

        <form className='form-modal' onSubmit={handleFormPerfil} >
          <span className='title-nome'>Nome</span>
          <label htmlFor='nome'></label>
          <input
            type='text'
            name='nome'
            value={formPerfil.nome}
            onChange={(e) => handleChangeForm(e)}
          >
          </input>

          <span className='title-email'>E-mail</span>
          <label htmlFor='email'></label>
          <input
            className='input-email'
            type='text'
            name='email'
            value={formPerfil.email}
            onChange={(e) => handleChangeForm(e)}
          >
          </input>

          <span className='title-senha'>Senha</span>
          <label htmlFor='senha'></label>
          <input
            className='input-senha'
            type='password'
            name='senha'
            value={formPerfil.senha}
            onChange={(e) => handleChangeForm(e)}
          >
          </input>

          <span className='title-confirmar'>Confirmar Senha</span>
          <label htmlFor='confirmarSenha'></label>
          <input
            className='input-confirmar'
            type='password'
            name='confirmarSenha'
            value={formPerfil.confirmarSenha}
            onChange={(e) => handleChangeForm(e)}
          >
          </input>

          <button
            onClick={() => console.log('Click entrada')}
            className='form-moda-btn-perfil'
          >Confirmar
          </button>

        </form>
      </div>
    </div>
  )
}

export default ModalPerfil
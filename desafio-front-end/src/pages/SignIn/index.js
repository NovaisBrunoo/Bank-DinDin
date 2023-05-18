import './style.css'
import Logo from '../../assets/LogoLogo.svg'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react';
import api from '../../api/api';

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })
  function handleChangeForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  function clerForm() {
    setForm(
      {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
      }
    )
  }
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      if (!form.email || !form.senha || !form.nome) {
        console.log("Preencha todos os campos!");
        return;
      }
      if (form.senha !== form.confirmarSenha) {
        console.log('senha invalida')
        return
      }

      const response = await api.post('/usuario', {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      });

      if (response.status === 201) {
        console.log('usuario cadastrado')
        clerForm();
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='container'>
      <div className='header'>
        <img src={Logo} alt='' />
      </div>
      <form className='Cadaster' onSubmit={handleSubmit}>
        <h1>Cadastrar-se</h1>

        <span className='name-span'>Nome</span>
        <label htmlFor='nome' />
        <input
          type='text'
          name='nome'
          value={form.nome}
          onChange={(e) => handleChangeForm(e)}
        />
        <span className='email-span'>E-mail</span>
        <label htmlFor='email' />
        <input
          type='text'
          name='email'
          value={form.email}
          onChange={(e) => handleChangeForm(e)}
        />
        <span className='password-span'>Senha</span>
        <label htmlFor='password' />
        <input
          type='password'
          name='senha'
          value={form.senha}
          onChange={(e) => handleChangeForm(e)}
        />

        <span className='confirmPassword'>Confirmar Senha</span>
        <label htmlFor='confirm-password' />
        <input
          type='password'
          name='confirmarSenha'
          value={form.confirmarSenha}
          onChange={(e) => handleChangeForm(e)}
        />

        <button className='register'>Cadastrar</button>
        <span className='registerLink'>Já tem <Link className='linkRegisterSpan' to='/' >cadastro?</Link> Clique aqui!</span>
      </form>

    </div >
  )
}

export default SignIn
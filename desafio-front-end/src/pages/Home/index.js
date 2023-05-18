import Logo from '../../assets/LogoLogo.svg'
import api from '../../api/api'

import './style.css';
import { setItem } from '../../utils/storage'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  function handleChangeForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  async function handleform(event) {
    event.preventDefault()
    try {
      if (!form.email || !form.password) {
        console.log("Preencha todos os campos!");
        return;
      }
      const response = await api.post('/login', {
        email: form.email,
        senha: form.password
      });
      const { token, usuario } = response.data;
      setItem('token', token);
      setItem('userName', usuario.nome)
      setItem('userId', usuario.id);
      navigate('/Main');
    } catch (error) {
      console.log(error.response.data.mensagem);
      alert(error.response.data.mensagem)

    }
  }

  return (
    <div className='container'>
      <div className='header'>
        <img src={Logo} alt='' />
      </div>

      <div className='container-left'>
        <div className='left-info'>
          <span className='info-title'>Controle suas <strong>finanças</strong>,
            sem planilha chata.</span>

          <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>

          <Link to='/SignIn'><button>Cadastrar-se</button></Link>
        </div>
      </div>
      <div className='container-right'>
        <form className='formHome' onSubmit={handleform}>
          <h1>Login</h1>
          <span className='email-input'>E-mail</span>
          <label htmlFor='email'></label>
          <input
            type='text'
            name='email'
            value={form.email}
            onChange={(event) => handleChangeForm(event)}
          />
          <span className='password-input'>Password</span>
          <label htmlFor='password'></label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={(event) => handleChangeForm(event)}
          />
          <button>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;

import './style.css'
import Logo from '../../assets/LogoLogo.svg'
import LogoVector from '../../assets/logo-vector.svg'
import singout from '../../assets/singout.svg'
import { getItem, clear } from '../../utils/storage'
import { useNavigate } from 'react-router-dom';


function Header({ showModal, setShowModal }) {
    const navigate = useNavigate();

    function handleSignOut() {
        clear()
        navigate('/');
    }
    function handleShowModal() {
        setShowModal(true)
    }
    return (
        <header>
            <img
                className='logo-header'
                src={Logo}
                alt=''
            />
            <div className='header-perfil' >
                <img
                    onClick={handleShowModal}
                    className='logo-vector'
                    src={LogoVector}
                    alt=''
                />
                <strong>{getItem('userName')}</strong>
                <img
                    onClick={handleSignOut}
                    className='singout'
                    src={singout}
                    alt=''
                />
            </div>
        </header>
    )
}

export default Header 
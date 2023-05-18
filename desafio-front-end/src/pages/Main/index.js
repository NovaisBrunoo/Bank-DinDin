import './style.css'
import Header from '../../Components/Header'
import LogoFilter from '../../assets/icons8-filtro-48 1.svg'
import { useEffect, useState } from 'react'
import ModalFilter from '../../Components/ModalFilter'
import ModalUpdate from '../../Components/ModalUpdate'
import ModalPerfil from '../../Components/ModalPerfil'
import TableTitle from '../../Components/TableTitle'
import api from '../../api/api'
import { getItem } from '../../utils/storage'

function Main() {
    const [showModalFilter, setShowModalFilter] = useState(false)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [registrousuario, setRegistroUsuario] = useState([]);

    const [resum, setResum] = useState([])
    function handleModal() {
        setShowModalFilter(!showModalFilter)
    }

    function hendleModalAdd() {
        setShowModalAdd(!showModalAdd)
    }
    useEffect(() => {
        try {
            async function TableTitle() {
                const response = await api.get('/transacao',
                    {
                        headers: {
                            Authorization: `Bearer ${getItem('token')}`
                        }
                    }
                )
                setRegistroUsuario(response.data)
            }
            TableTitle()
        }
        catch (error) {
            console.log(error)
        }

    }, [])
    useEffect(() => {
        async function handleResum() {
            try {
                const response = await api.get('/transacao/extrato',
                    {
                        headers: {
                            Authorization: `Bearer ${getItem('token')}`
                        }
                    }
                )
                setResum(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleResum()
    },)
    const entrada = resum.entrada / 100
    const saida = resum.saida / 100
    const resultado = entrada - saida

    return (
        <div className='container-main'>
            <Header showModal={showModal} setShowModal={setShowModal} />
            {showModal && <ModalPerfil setShowModal={setShowModal} />}
            <div className='container-hero'>
                <div className='filter'>
                    <img src={LogoFilter} alt='' />
                    <button onClick={() => handleModal()}>Filtrar</button>
                </div>
                {showModalFilter && <ModalFilter />}
                <TableTitle registrousuario={registrousuario} setRegistroUsuario={setRegistroUsuario} />
                {showModalAdd && <ModalUpdate key={getItem('token')} setShowModalAdd={setShowModalAdd} setRegistroUsuario={setRegistroUsuario} registrousuario={registrousuario} />}

                <div className='resume'>
                    <strong className='resume-title'>Resumo</strong>
                    <div className='resume-entry'>
                        <span className='entry'>Entrada</span>
                        <span className='value-entry'>R$ {entrada.toFixed(2)}</span>
                    </div>
                    <div className='resume-exit'>
                        <span className='exit'>Saida</span>
                        <span className='value-exite'>R$ {saida.toFixed(2)}</span>
                    </div>
                    <div className='line'></div>
                    <div className='saldo'>
                        <strong className='saldo-strong'>Saldo</strong>
                        <strong className='value-saldo'>R$ {resultado.toFixed(2)}</strong>
                    </div>
                </div>
                <button onClick={hendleModalAdd} className='add-registro'>Adicionar Registro</button>
            </div>
        </div>
    )
}

export default Main
import './style.css'
import editeIcon from '../../assets/icons8-editar 3.svg'
import removeIcon from '../../assets/icons8-lixo 1.svg'
import ModalDelite from '../ModalDelite'
import { useState } from 'react'
import ModalEdite from '../../Components/ModalEdite'
import { getItem } from '../../utils/storage'

function TitleBody({ registro, setRegistroUsuario, registrousuario }) {
    const [deliteModal, setDeliteModal] = useState(false)
    const [showModalEdite, setShowModalEdite] = useState(false)
    let data = new Date(registro.data);
    let diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    let dataFormatada = data.getDate().toString().padStart(2, '0') + '/' + (data.getMonth() + 1).toString().padStart(2, '0') + '/' + data.getFullYear()
    let diaDaSemana = diasDaSemana[data.getDay()]

    function handleModalDelite() {
        setDeliteModal(!deliteModal)
    }

    function handleModalEdite() {
        setShowModalEdite(!showModalEdite)
    }

    function centavosParaReais(valorEmCentavos) {
        const valorEmReais = valorEmCentavos / 100;
        return `R$ ${valorEmReais.toFixed(2)}`;
    }
    const valorEmCentavos = registro.valor
    const valorEmReais = centavosParaReais(valorEmCentavos)
    return (
        <>
            <table className='table-body'>
                {deliteModal && <ModalDelite registrousuario={registrousuario} setDeliteModal={setDeliteModal} setRegistroUsuario={setRegistroUsuario} registro={registro} />}

                <tbody>
                    <tr key={registro.id}>
                        <td>{dataFormatada}</td>
                        <td>{diaDaSemana}</td>
                        <td className='descricao'>{registro.descricao}</td>
                        <td className='categoria'>{registro.categoria_nome}</td>
                        <td className={'row-value ' + (registro.tipo === 'entrada' ? 'valor-entrada' : 'valor-saida')} >{valorEmReais}</td>
                        <td className='icon-table'>
                            <img onClick={() => handleModalEdite(setShowModalEdite)} src={editeIcon} alt='' />
                            <img onClick={handleModalDelite} src={removeIcon} alt='' />
                        </td>
                    </tr>
                </tbody>
            </table>
            {showModalEdite && <ModalEdite key={getItem('token')} setShowModalEdite={setShowModalEdite} registro={registro} valorEmReais={valorEmReais} setRegistroUsuario={setRegistroUsuario} dataFormatada={registro.data} />}
        </>

    )
}

export default TitleBody
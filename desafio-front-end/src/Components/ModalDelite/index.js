import './style.css'
import layout from '../../assets/Polygon 4.svg'
import { getItem } from '../../utils/storage'
import api from '../../api/api'


function ModalDelite({ setDeliteModal, registro }) {

    async function handleDelite() {
        try {
            await api.delete(`/transacao/${registro.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${getItem('token')}`
                    }
                }
            )

            setDeliteModal(false)
        } catch (error) {
            console.log('error')
        }
    }

    return (
        <div className='modal-delite'>
            <img src={layout} alt='' />
            <div className='modal-del'>
                <span>Apagar item?</span>
                <div className='btn-delite'>
                    <button className='btn-yes' onClick={handleDelite}>Sim</button>
                    <button className='btn-not' onClick={() => setDeliteModal(false)}>Não</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelite
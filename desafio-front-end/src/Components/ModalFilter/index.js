import './style.css'

function ModalFilter() {
    function teste(parms) {
        const button = document.querySelector(`.button${parms}`)

        if (button.style.backgroundColor === 'rgb(121, 120, 217)') {
            button.style.backgroundColor = '#FAFAFA'
            button.style.color = '#000000'
            return
        }
        button.style.backgroundColor = '#7978D9'
        button.style.color = '#ffffff'
    }

    const categorias = [{ id: 1, categoria: 'Alimentação' }, { id: 2, categoria: 'Assinaturas e Serviços' }, { id: 3, categoria: 'Casa' }, { id: 4, categoria: 'Mercado' }, { id: 5, categoria: 'Cuidados Pessoais' }, { id: 6, categoria: 'Educação' }, { id: 7, categoria: 'Família' }, { id: 8, categoria: 'Lazer' }, { id: 9, categoria: 'Pets' }, { id: 10, categoria: 'Presentes' }, { id: 11, categoria: 'Roupas' }, { id: 12, categoria: 'Saúde' }, { id: 13, categoria: 'Transporte' }, { id: 14, categoria: 'Salário' }, { id: 15, categoria: 'Vendas' }, { id: 16, categoria: 'Outras receitas' }, { id: 17, categoria: 'Outras despesas' }]
    return (
        <div className='modal-filter'>
            <span className='categores-title'>Categoria</span>
            <div className='categores'>
                {categorias.map((item, key) => (

                    <button style={{ backgroundColor: '#FAFAFA' }}
                        className={`button${key}`}
                        onClick={() => teste(key)}
                        key={item.id}
                    >
                        {item.categoria}
                        <strong className='strong-btn'> + </strong>
                    </button>
                ))}
            </div>
            <div className='btn-filter'>
                <button>Limpar Filtros</button>
                <button className='btn-apply'>Aplicar Filtros</button>

            </div>
        </div >
    )
}

export default ModalFilter
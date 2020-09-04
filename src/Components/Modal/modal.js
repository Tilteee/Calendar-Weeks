import React from 'react'
import './modal.css'
export default function Modal(show, handleClose, props, events, start, end){
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    const arrayL = show.events.length
    const editValue = e => {
        show.props.title = e.target.value;
        e.preventDefault();
        const form = new FormData();
        form.append('title', show.props.title);
        e.defaultValue= ''
        if(e.target.id === ''){
            e.defaultValue='Alterar Paciente'
            e.preventDefault();
            show.props.id = arrayL
            if(arrayL === show.events.length){
                show.events.push(show.props)
                console.log(show.events)
            }
            
        }
    }
    
    const novoAgendamento = e => {
        const novo = show.props
        novo.id = arrayL;
        show.events.push(novo)
    }
    return (
        
        <>
        {(show) && 
        <>
        
        <div type='reset' className='overlayModal' onClick={show.handleClose}></div>
        <div className={showHideClassName}>
            <section className='modal-main'>
                {console.log(show.events)}
                <input 
                    type='text'
                    id={show.props.id}
                    name='title'
                    defaultValue={show.props.title}
                    // placeholder={a.agendamento.paciente}
                    onChange={e => editValue(e)}
                    onFocus={"value=",''}
                    />
                <span>{show.props.id}</span><br/>
                <button type='reset' onClick={show.handleClose} onBlur={e => novoAgendamento(e)}>Novo Agendamento</button>
                {/* <span>{show.props[0].start}</span> */}
                <button className='button' type='reset' onClick={show.handleClose}>Alterar paciente</button>
            </section>
           
        </div>     
        </>
        }
       
        </>
    )
}
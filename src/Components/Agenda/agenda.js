import React from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import './agenda.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import tick from '../../Assets/tick.svg'
import fechar from '../..//Assets/fechar.svg'
import error from '../../Assets/error.svg'
import Modal from '../Modal/modal'
import 'moment/locale/pt-br'
import './agenda.css'
import moment from 'moment'



const EventWrapper = ({event, children}) => {
  const hourStart = moment(event.start).hour();
  const hourStop = moment(event.end).hour();
  const gridRowStart = hourStart + 1;

  return (
    <div
      style={{ width: '50% !important' }}
    >
      {children.props.children}
    </div>
  );
}

const customDayPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'block-day',
      style: {
       outline: '2x solid red !important',
      },
    }
  else return {}
}

const customEventPropGetter = event => {
  if (event.title === 'Paciente 4')
    return {
      className: 'event-drop',
    }
  else return {}
}
const icons = [
  {
    certo: tick
  },
  {
    falta: fechar
  },
  {
    falta2: error
  },
]

// const hourStart = moment(event.start).hour();
// const hourStop = moment(event.end).hour();
// const gridRowStart = hourStart+1;

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar)


// const diasBloqueados = [moment('2018-0-29'),moment('2018-0-28')]
// const ColoredDateCellWrapper = ({children, value}) =>
// 	React.cloneElement(Children.only(children), {
// 		style: {
// 			...children.style,
// 			backgroundColor: diasBloqueados.map(block => {
//       return (value >  block) && 'blue' || 'blue'
//       })
     
// 		},
// 	});
const events = [
  {
    id: 0,
    title: 'Pacientedsdasdsadasd',
    start: new Date(2020, 8, 1, 9, 0, 0),
    end: new Date(2020, 8, 1, 9, 15, 0),
    avaliacao: '123456',
    resourceId: 1,
    pagamento: 'ok',
    test: 'ddd',
  },
  {
    id: 1,
    title: 'Paciente 2',
    start: new Date(2020, 8, 2, 9, 0, 0),
    end: new Date(2020, 8, 2, 9, 15, 0),
    resourceId: 1,
    avaliacao: '123456',
    pagamento: 'ok',
    tratamento: 'nsei',
    procedimento: 'dasd',
    alertas: '',
    test: 'aaa',

  },
  {
    id: 2,
    title: 'Paciente 3',
    start: new Date(2020, 8, 6, 8, 30, 0),
    end: new Date(2020, 8, 6, 12, 30, 0),
    resourceId: 1,
    avaliacao: '123456',
    pagamento: 'nop',
    test: 'ddde',

  },
  {
    id: 10,
    title: 'Paciente 4',
    start: new Date(2018, 0, 30, 8, 0, 0),
    end: new Date(2018, 0, 30, 9, 0, 0),
    resourceId: 1,
    avaliacao: '123456',
    pagamento: 'ok',
    test: 'dada',
  },
  {
    id: 11,
    title: 'Paciente 5',
    start: new Date(2018, 0, 30, 8, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
    avaliacao: '123456',
    pagamento: 'ok',
  },
  {
    id: 12,
    title: 'Paciente 6',
    start: new Date(2018, 0, 30, 12,0 , 0),
    end: new Date(2018, 0, 30, 13, 0, 0),
    resourceId: 1,
    avaliacao: '123456',
    pagamento: 'ok',
  },
  {
    id: 13,
    title: 'Paciente 7',
    start: new Date(2018, 0, 30, 12,0, 0),
    end: new Date(2018, 0, 30, 12, 15, 0),
    resourceId: 2,
    avaliacao: '123456',
    pagamento: 'ok',
  },
  {
    id: 14,
    title: 'Paciente 8',
    start: new Date(2018, 0, 30, 14, 0, 0),
    end: new Date(2018, 0, 30, 15, 0, 0),
    resourceId: 4,
    avaliacao: '123456',
    pagamento: '',
  },
]
// const dentistas = ['Dentista 1', 'Dentista 2', 'Dentista 3', 'Dentista 4', 'Dentista 5', 'Dentista 6']
const resourceMap = [
  { resourceId: 1, resourceTitle: 'Dentista 1' },
]


moment.locale('pt-br',{
  week:{
    dow : 1
  }
});


class Dnd extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      show: false,
      events: events,
      start: '',
      end: '',
      paciente: {},
    }

    this.moveEvent = this.moveEvent.bind(this)
  }
  
  // componentWillUnmount() {
  //   // Cancela qualquer atualização pendente já que estamos desmontando o componente.
  //   this.show.cancel();
  // }

  moveEvent({ event, start, end, resourceId}) {
    const { events } = this.state
    const today = new Date();
    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end, resourceId}
    const nextEvents = [...events]

    console.log(nextEvents)
    if(customDayPropGetter(start).className === 'block-day'){
      alert('Dia bloqueado, agende em outra data!')
    }else if(start < today){
      console.log('Dia bloqueado')
    }
    else{
      console.log(today)
      console.log(events)
      const novo = [...events]
      nextEvents.splice(idx, 1, updatedEvent)
      this.setState({
        events: nextEvents,
      })
      console.log(updatedEvent)
  }
}
  
  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }
  showModal = () => {
    this.setState({show: true});
  }
  hideModal = () => {
    this.setState({show: false});
  }
  retornaPaciente = (e) =>{
    return this.paciente = e;
  }
  openEvent = e  => {
    this.paciente=e;
    this.showModal()
    return (      
      console.log(this.paciente)
    )
  }
  handleSelect = ({ start, end, resourceId, event }) => {
    const today = new Date()
    if(customDayPropGetter(start).className === 'block-day'){
      console.log('test')
    }else if (start < today){
      alert('Agende em uma data válida!')
    }else{
      this.paciente = {id: '', title: '', resourceId: '', start, end, resourceId};
      this.showModal();    
      console.log(this.paciente)
      event= this.paciente;
    }
    
  //   return ({
  //     if (customDayPropGetter(start).className === 'block-day'){
  //       console.log('oi')
  //     }else{ 
  //       const title = window.prompt('New Event name');
  //       const id = window.prompt('Id');     
  //       if(title){
  //         this.setState({
  //           events: [
  //             ...this.state.events,
  //             {
  //               id,
  //               title,
  //               start,
  //               end,
  //               resourceId,
  //             },
  //           ],
  //         })
  //   }
  // }
  //   // console.log(this.state.show)
  //   )
    
}
   
  changeStyle = ({event, value}) => 
   <div style={{backgroundColor: 'red'}}>

   </div>
  timeGutter = () => {
    return <p style={{fontSize: '11px'}}>Horários</p>
  }
  render() {
    const EventComponent = e => {
      return (
        <>
        {/* {this.state.paciente = e} */}
        <div className='testtt'>
          <span className='outrotest' onClick={() => alert(e.title)}>{e.title}</span>
        </div> 
          <div className='icons'>
          {
            icons.map((icon, index) => {
              if(e.event.pagamento === 'ok' && index == 0){
                return <img style={{width: '15px', height: '15px', bottom: 0}}src={icon.certo}/>
              }else if (e.event.test ==='ddd' && index ==1) {
                return <img style={{width: '15px', height: '15px', bottom: 0}}src={icon.falta}/>
              }else if (e.event.test ==='aaa' && index ==2) {
                return <img style={{width: '15px', height: '15px', bottom: 0}}src={icon.falta2}/>
              }
            }
            )
          } 
          </div>  
          </> 
      )
    }
    return (
      <>
      <button onClick={() =>console.log('test')}/>
      {(this.state.show === true) && <Modal props={this.paciente} events ={events} show={this.showModal} handleClose={this.hideModal}/>}
      <DragAndDropCalendar
      style={{width: '90%', height: '670px'}}
        selectable
        // culture='pt-br'
        localizer={localizer}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        onEventResize={this.resizeEvent}
        views={['day','week', 'agenda', 'month']}
        defaultView='week'
        timeslots={1}
        step={15}
        min={new Date(2020,9,2,8,0,0)}
        max={new Date(2030,10,0,19,0,0)}
        showMultiDayTimes={true}
        defaultDate={new Date()}
        components={{event: EventComponent, timeGutterHeader:  this.timeGutter}}
        onSelectSlot={this.handleSelect}
        slotPropGetter={customDayPropGetter}
        dayPropGetter={customDayPropGetter}
        onSelectEvent={this.openEvent}
        // eventPropGetter={customEventPropGetter}
        // slotGroupPropGetter={customDayPropGetter}
        // onEventDrop={this.changeStyle}
      />
      
      </>
    )
  }
}

export default Dnd

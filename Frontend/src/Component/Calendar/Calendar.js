import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import  './Calendar.css';


const Calendar = ({bookings,onSelectDate}) => {
    console.log(bookings)

  
    const events = bookings.map(booking => ({
       
        title: booking.description, 
        start: new Date(booking.bookingDate), 
        end: new Date(booking.bookingDate), 
        status: booking.status 
      }));
    const localizer = dayjsLocalizer(dayjs);

    const currentYear =dayjs().year();

    const handleNavigate = (newDate,view) => {
        console.log('handle navigate');
        const newYear = dayjs(newDate).year();

        if(newYear!==currentYear){
            console.log('year changed')
            return false;
        }
      
       return true;
    }

    const eventStyleGetter = (event)=>{
        let backgroundColor;
        switch(event.status){
            case 'pending':
                backgroundColor='yellow';
                break;
            case 'approved':
                backgroundColor='green';
                break;
            case 'cancelled':
                backgroundColor='red';
                break;
            case 'payment':
                backgroundColor='purple';
                break;
            case 'postponed':
                backgroundColor='grey';
                break;
        }

        const style = {
            backgroundColor: backgroundColor,
            color: 'black',

        };
        return {
            style: style
        };

    }

  
    
    return ( 
        <div>
            <BigCalendar
                
                localizer={localizer}
                onNavigate={handleNavigate}
                events={events}
                eventPropGetter={eventStyleGetter}
                onSelectSlot={({start})=>onSelectDate(start)}
                style={{height:500,margin:0,width:'100%'}}
             
            />
             <div className="legend">
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'yellow' }}></div>
                    <div className="legend-label">Pending</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'green' }}></div>
                    <div className="legend-label">Approved</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'red' }}></div>
                    <div className="legend-label">Cancelled</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'purple' }}></div>
                    <div className="legend-label">Payment</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'grey' }}></div>
                    <div className="legend-label">Postponed</div>
                </div>
            </div>

           

        </div>
     );
}
 
export default Calendar;
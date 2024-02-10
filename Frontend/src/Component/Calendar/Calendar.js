import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import  './Calendar.css';


const Calendar = () => {
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

    
    return ( 
        <div>
            <BigCalendar
                
                localizer={localizer}
                onNavigate={handleNavigate}
                events={[]}
                style={{height:500,margin:0,width:'100%'}}
             
            />

           

        </div>
     );
}
 
export default Calendar;
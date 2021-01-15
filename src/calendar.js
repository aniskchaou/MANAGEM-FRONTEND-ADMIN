


 
export function initCalendar(calendarEl) {
    console.log(calendarEl);
    
    document.addEventListener('DOMContentLoaded', function () {
        
      
        var calendar = new FullCalendar.Calendar(calendarEl, {
      
            // plugins to load
            plugins: ['dayGrid', 'timeGrid'], // plugins to load
      
            // header controls
            header: {
              left: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
              center: 'title',
              right: 'custom2 prevYear,prev,next,nextYear' 
            },
      
            // footer controls
            footer: {
              left: 'custom1,custom2',
              center: '',
              right: 'prev,next' 
            },
          
          // custom toolbar buttons
          customButtons: {
            custom1: {
              text: 'custom 1',
              click: function () {
                alert('clicked custom button 1!');
              } 
            },
      
            custom2: {
              text: 'custom 2',
              click: function () {
                alert('clicked custom button 2!');
              }
            } 
          } 
      });
      
        // render the calendar
        calendar.render();
      });
}

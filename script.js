//make var for things, work on moment or the thing for todays date. make columns or rows next add the things to them. figure out how to
//--- figure out how to save them to local storage. test everything.
//dont forget to triple check localstorage and if times are saved
//pop up to confirm didnt work dont forget to fix and check again
//test everything



    var displayPlanner =$('#display-planner');
    var timeofDayCounter= 9;
    var timeOfDay = ['9.00 am','10.00 am','11.00 am','12.00 pm','1.00 pm','2.00 pm','3.00 pm','4.00 pm','5.00 pm'];
    var savedTime = [];
    var timeofDayCount=timeOfDay.length;
    var displayDay =$('#currentDay');



console.log('test1')
console.log(displayDay)

    function showTodaysDate()
{
    timerInterval = setInterval(function() 
    {
        var today = moment();
        displayDay.text(today.format('MMMM Do YYYY, h:mm:ss a'));  
    }, 10);
}




console.log(moment)
console.log(showTodaysDate)

    function makeRows()
{
    var timeId=9;

    for(i=0;i<timeofDayCount;i++)
    {
        var rowDiv=$('<div>');
        var rowTextArea=$('<textarea>');
        var rowButton=$('<button>');
        var rowText=$('<p>');

        console.log('testtest')



        rowDiv.addClass("row justify-content-center time-block");
        rowText.addClass("col-3 col-md-2 hour");
        rowText.text(timeOfDay[i]);
        rowTextArea.addClass("col-6 col-md-9 description");
        rowTextArea.attr("id",timeId);
        rowButton.text("💾");
        rowButton.attr("time",timeId);
        rowButton.addClass("btn-sm custom-btn col-3 col-md-1 saveBtn ");

        rowDiv.append(rowText);
        rowDiv.append(rowTextArea);
        rowDiv.append(rowButton);

        displayPlanner.append(rowDiv);
        timeId++;
    }   
}




    function makeColorCode()
{
        timerInterval = setInterval(function() 
    {
            for(t=0;t<timeofDayCount;t++)
        {
            var colouredTextA =$("#"+timeofDayCounter);
            var timeForNow = moment();
            var timeForNow2=timeForNow.format("HH");
            var slotTime = moment(timeOfDay[t],"HH mm a");

            if(timeForNow2==timeofDayCounter)
            {
                colouredTextA.addClass("present");    
            }

            else
            {
                if(timeForNow.isAfter(slotTime))
                {
                    colouredTextA.addClass("past");
                }
    
                else
                {
                    colouredTextA.addClass("future");
                }
            }

            timeofDayCounter++;   
        }
    }, 100);
}





    function showTimesSaved()
{
    var ssavedTimesToday= [];
    ssavedTimesToday=JSON.parse(localStorage.getItem('apptList'));
   
   if(ssavedTimesToday!==null)
   {
      var i=ssavedTimesToday.length;
      for(j=0;j<i;j++)
      {
          var savedTimesText=ssavedTimesToday[j].split("-");
          var timeSlot =savedTimesText[0];
          var appt=savedTimesText[1];
          var savedTimesDisplayArea = $("#"+timeSlot);
          savedTimesDisplayArea.text(appt);
          savedTime.push(timeSlot);
      }
   }

   else
   { 
      return;
   }
}
console.log(showTimesSaved)
console.log('test???')




    function saveTimes(timeId,targetTextArea)
{
        var listOfSavedTimes =[];
        var ssavedTimesToday =JSON.parse(localStorage.getItem('apptList'));
    
    if(targetTextArea === "")
    {
         window.alert("⚠️ Your appointment is blank.\n Please enter your appointment details before saving.");      
    }

    else
    {
        if (ssavedTimesToday === null)
        {
            listOfSavedTimes.push(timeId+"-"+targetTextArea);
            savedTime.push(timeId);
            localStorage.setItem('apptList',JSON.stringify(listOfSavedTimes));
        }

        else
        {
            if(savedTime.includes(timeId))
            {
                var saveConfirm = window.confirm("You already saved a time here, do you still want to save another over it?");

                if(saveConfirm)
                {
                    var savedTimeLocation = savedTime.indexOf(timeId);
                    listOfSavedTimes=JSON.parse(localStorage.getItem('apptList'));
                    listOfSavedTimes[savedTimeLocation]= (timeId+"-"+targetTextArea);
                    localStorage.setItem('apptList',JSON.stringify(listOfSavedTimes));
                }

                else
                {
                    return;
                }
            }
            else
            {
                savedTime.push(timeId);
                listOfSavedTimes=JSON.parse(localStorage.getItem('apptList'));
                listOfSavedTimes.push(timeId+"-"+targetTextArea)
                localStorage.setItem('apptList',JSON.stringify(listOfSavedTimes));
            }
            
        }
    }
}





    function init()
{
        showTodaysDate();

        makeRows();

        showTimesSaved();

        makeColorCode();

}

    displayPlanner.on('click','button',function(event){
        event.preventDefault();
        var timeId = $(event.target).attr('time');
        var targetTextArea =$(event.target).siblings().eq(1).val().trim();
    
            saveTimes(timeId,targetTextArea); 

});


console.log('finaltest?')
init();
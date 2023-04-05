
setInterval(function(){
    $('#current-date-time').text(dayjs().format('MMM DD, YYYY [at] hh:mm:ss A'));
},1000);
for (let i = 0; i < localStorage.length; i++) {
    var index = localStorage.key(i);
    var project = JSON.parse(localStorage.getItem(index))
    var oldRow = $('<tr>');
    
    
    oldRow.attr("id","row-"+i)    
    oldRow.append($('<td>').text(i+1))
    oldRow.append($('<td>').text(project.name));
    oldRow.append($('<td>').text(project.type))
    oldRow.append($('<td>').text(project.date))

    oldRow.append($('<td><button type="button" class="btn-close" id="close-button" aria-label="Close" data-rowid ='+(i+1)+'></button></td>'))  

    if(dayjs().isBefore(project.date)){
        oldRow.css({
            "background-color":"green"
        })
    }else if(dayjs().isSame(project.date,'day')){
        oldRow.css({
            "background-color":"red"
        })
    }else if(dayjs().isAfter(project.date)){
        oldRow.css({
            "background-color":"gray"
        })
    }   

    $('#table-body').append(oldRow);

    
}
var rowCount = 0;
console.log('home')

$('#addBtn').on("click", function () {
    var data = {
        name : $('#project-name').val(),
        type : $('#project-type').val(),
        date : $('#datepicker').val()

    }
    localStorage.setItem(rowCount,JSON.stringify(data))
    var retrievedData = JSON.parse(localStorage.getItem(rowCount))
    var newRow = $('<tr>');
    
    newRow.attr("id","row-"+(rowCount+1))    
    newRow.append($('<td>').text(rowCount+1))
    newRow.append($('<td>').text(retrievedData.name));
    newRow.append($('<td>').text(retrievedData.type))
    newRow.append($('<td>').text(retrievedData.date))

    newRow.append($('<td><button type="button" class="btn-close" id="close-button" aria-label="Close" data-rowid ='+(rowCount+1)+'></button></td>'))   
    
    
    if(dayjs().isBefore(retrievedData.date)){
        newRow.css({
            "background-color":"green"
        })
    }else if(dayjs().isSame(retrievedData.date,'day')){
        newRow.css({
            "background-color":"red"
        })
    }else if(dayjs().isAfter(retrievedData.date)){
        newRow.css({
            "background-color":"gray"
        })
    }   

    $('#table-body').append(newRow);
    
    $('#project-name').val("")
    $('#project-type').val("");
    $('#datepicker').val(""); 
    rowCount++;
    if(localStorage.length == 0){
        rowCount = 0;
    }
});


 $('#table-body').on("click",'#close-button',function(){
    

    var rowID = $(this).data("rowid")
    $('#row-'+rowID).remove()
    localStorage.removeItem(rowID-1)

})
console.log(dayjs().format('DD MM YYYY'))
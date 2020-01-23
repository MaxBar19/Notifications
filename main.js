const data = ["АА5555ВА", "АА5588ВА", "АА5555НА"]
let option = '';


function makeDropdownFromData(data){
  for (var i=0;i<data.length;i++){
    option += '<option value="'+ data[i] + '">' + data[i] + '</option>';
  }
  $('#dropdownData').append(option);
}

function makeListFromData(transport, repeat, duration){
  $('#transportData').append('<div class="notificationValue"><div>' + transport +'</div><div>'+ repeat +'</div><div>' + duration + '</div></div>')
}




$(document).ready(function () {
    
  makeDropdownFromData(data);

  $(".checkbox").click(function(){
    $(this).toggleClass('checked')
  });

  $("input.cmn-toggle-round").click(function(){
    $(this).css("background-color","#cdebfb");
  })
  $("input.cmn-toggle-round:checked + label:after").click(function(){
    $(this).style("margin-left: 25px;background-color: #44b6f6;");
  })

  $(document).on('click', '#addTransport',function(event){

    let transport = $('#dropdownData').val();
    let repeat = $('#inputText').val();
    let duration = $('#duration').val();
    
    makeListFromData(transport, repeat, duration);
  })

  $(document).on('click', '.removeData', function(){
    $(this).parent().remove();
  })

});

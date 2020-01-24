const data = ["АА5555ВА", "АА5588ВА", "АА5555НА"];
let option = ''

const providers = [

  {
    items: [],
    getItems() { return this.items; },
    onAdd() {
      this.items.push({
        transport: $('.dropdownData').val(),
        repeat: $('.inputText').val(),
        duration: $('.duration').val()
      })
    },
    onRemove(i){
      this.items.splice(i, 1);
    }
  },

  {
    items: [],
    getItems() { return this.items; },
    onAdd() {
      this.items.push({
        transport: $('.dropdownData').val(),
        repeat: $('.inputText').val(),
        duration: $('.duration').val()
      })
    },
    onRemove(i){
      this.items.splice(i, 1);
    }
  },

  {
    items: [],
    getItems() { return this.items; },
    onAdd() {
      this.items.push({
        transport: $('.dropdownData').val(),
        repeat: $('.inputText').val(),
        duration: $('.duration').val()
      })
    },
  },


]

let id;

function redraw() {
  const list = $('#my-modal .transportData');

  list.empty();

  $.each(providers[id].getItems(), function (i, item) {

    $('<div/>').append(
      `<div class="notificationValue">  
          <div class="inline"><img src="front-bus-copy.png"><span>${item.transport}</span></div>

          <div class="inline"><img src="group-13.png"><span>${item.repeat}</span><span>повторювань</span></div>
          
          <div class="inline"><img src="clock-circular-outline-3.png"><span>протягом</span><span>${item.duration}</span></div>
          
          <div class="removeData inline" data-index=${i}><img style="float:right;" src="shape-copy.png"></div>
        </div>`).appendTo(list);
  });
}


function makeDropdownFromData(data) {
  for (var i = 0; i < data.length; i++) {
    option += '<option value="' + data[i] + '">' + data[i] + '</option>';
  }
  $('.dropdownData').append(option);
}

function takeDataCallList() {

  let transport = $('.dropdownData').val();
  let repeat = $('.inputText').val();
  let duration = $('.duration').val();

  makeListFromData(transport, repeat, duration);
}

$(document).ready(function () {

  makeDropdownFromData(data);

  $(document).on('click', '[data-action=show-modal]', function () {
    id = Number($(this).data('modal-id'));
  
    redraw();
  
    $('#my-modal').modal('show');
  });

  $(document).on('click', '#my-modal .addTransport', function () {
    providers[id].onAdd()
  
    redraw();
    $('.inputText').val('');
  });

  $(document).on('click', '.removeData', function () {
    providers[id].onRemove()
    
    redraw();
  })

  $(".checkbox").click(function () {
    $(this).toggleClass('checked')
  });

  $("input.cmn-toggle-round").click(function () {
    $(this).css("background-color", "#cdebfb");
  })
  $("input.cmn-toggle-round:checked + label:after").click(function () {
    $(this).style("margin-left: 25px;background-color: #44b6f6;");
  })

});

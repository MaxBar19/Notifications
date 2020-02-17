let data = ''
let option = ''

const equality = {
  THREE_OURS: "3 годин",
  SIX_OURS: "6 годин",
  TWELWE_OURS: "зміни",
}

function getToken() {}

const providers = [
  {
    getItems() {
      return fetch('https://api-pcounter-dev.gemicle.com/notificationSettings/reboot/getAllByCarrier?ObjectId=carrierId&carrierId=5e2addd8934e920001f45cdf', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 53589f4e-cd45-4382-acbf-b2a5372a88ba',
        }
      })
        .then(response => response.json())
    },
    onAdd() {
      return fetch('https://api-pcounter-dev.gemicle.com/notificationSettings/reboot/save?ObjectId=carrierId&carrierId=5e2addd8934e920001f45cdf', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 53589f4e-cd45-4382-acbf-b2a5372a88ba',
        },
        body: JSON.stringify({
          "transportId": $('.dropdownData').val(),
          "carrierId": "5e2addd8934e920001f45cdf",
          "count": $('.inputText').val(),
          "period": $('.duration').val(),
          "lastSendTime": "16-02-2020 13:51:44"
        })
      })
    },
    onRemove(transport) {
      return fetch('https://api-pcounter-dev.gemicle.com/notificationSettings/reboot/' + transport + '/delete', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 53589f4e-cd45-4382-acbf-b2a5372a88ba',
        }
      })
    }
  },

  {
    items: [],
    getItems() { return Promise.resolve(this.items) },
    onAdd() {
      this.items.push({
        transportId: $('.dropdownData').val(),
        carrierId: "5e2addd8934e920001f45cdf",
        count: $('.inputText').val(),
        period: $('.duration').val()
      })
      return Promise.resolve(undefined)
    },
    onRemove(i) {
      this.items = this.items.filter(item => item.transportId != i)
      return Promise.resolve(undefined)
    }
  },

  {
    items: [],
    getItems() { return Promise.resolve(this.items) },
    onAdd() {
      this.items.push({
        transportId: $('.dropdownData').val(),
        carrierId: "5e2addd8934e920001f45cdf",
        count: $('.inputText').val(),
        period: $('.duration').val()
      })
      return Promise.resolve(undefined)

    },
    onRemove(i) {
      this.items = this.items.filter(item => item.transportId != i)
      return Promise.resolve(undefined)
    }
  }
]

let id;

function getTransportData() {
  fetch('https://api-pcounter-dev.gemicle.com/transportId/carrier?carrierId=5e2addd8934e920001f45cdf', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 53589f4e-cd45-4382-acbf-b2a5372a88ba',
    }
  })
    .then(response => response.json())
    .then(json => {
      data = json;
      makeDropdownFromData(data);
    });
}

async function redraw() {
  const list = $('#my-modal .transportData');

  list.empty();

  $.each(await providers[id].getItems(), function (i, item) {

    $('<div/>').append(
      `<div class="notificationValue">  
          <div class="inline"><img src="front-bus-copy.png"><span>${item.transportId}</span></div>

          <div class="inline"><img src="group-13.png"><span>${item.count}</span><span>повторювань</span></div>
          
          <div class="inline"><img src="clock-circular-outline-3.png"><span>протягом</span><span>${item.period}</span></div>
          
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

  getTransportData();

  $(document).on('click', '[data-action=show-modal]', async function () {
    id = Number($(this).data('modal-id'));

    await redraw();

    $('#my-modal').modal('show');
  });

  $(document).on('click', '#my-modal .addTransport', async function () {

    if ($('.inputText').val() != '') {
      await providers[id].onAdd()
      await redraw();
      $('.inputText').val('');
    }
    else {
      console.log('Error')
    }
  });

  $(document).on('click', '.removeData', async function () {
    await providers[id].onRemove($(this).parent().children().first().text())

    await redraw();
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

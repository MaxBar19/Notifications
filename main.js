
$(document).ready(function () {
  $(".checkbox").click(function(){
    $(this).toggleClass('checked')
  });

  $("input.cmn-toggle-round").click(function(){
    $(this).css("background-color","#cdebfb");
  })
  $("input.cmn-toggle-round:checked + label:after").click(function(){
    $(this).style("margin-left: 25px;background-color: #44b6f6;");
  })
});

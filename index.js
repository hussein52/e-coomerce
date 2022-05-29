


var totalpriceforproduct, totalpriceforproduct2;
//$(document).ready(function() {
    $( document ).ready(function() {
    //$(function(){
  
    /*
    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').onclick(function() {
        alert('اضيف المنتج الى عربة الشراء');
    });
*/
    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة" + new Date().getFullYear());
    

    $('.product-option input[type="radio"]').change(function() {
         $(this).parents('.product-option').siblings().removeClass('active');
         $(this).parents('.product-option').addClass('active');
    });


    //عندما تتغير كمية المنتج
    //$('#quantity').change(function() {
        $('.data-product-quantity').on("change",function() {

        //alert('qty')

        //اجلب الكمية الجديدة
        var newQuantity= $(this).val();

        //ابحث عن السطر الذي يحتوي معلومات هذا المنتج
        var parent = $(this).parents('[data-product-info]');
       
        //اجلب سعر القطعة الوحاده من معلومات المنتج
        var priceperunit = parent.attr('data-product-price');
      
        //السعر الاجمالي للمنتج هو سعر القطعة مضروبا بعددها
          totalpriceforproduct = newQuantity * priceperunit;

        //عين السعر الجديد ضمن خلية السعر الاجمالي للمنتج في هذا السطر
        parent.find('.total-price-for-product').text(totalpriceforproduct + '$');

        //حدث السعر الاجمالي لكل المنتجات
        calculateTotalPrice();

    });

    $('.data-product-quantity2').on("change",function() {

        

        //اجلب الكمية الجديدة
        var newQuantity= $(this).val();

        //ابحث عن السطر الذي يحتوي معلومات هذا المنتج
        var parent = $(this).parents('[data-product-info]');

        //اجلب سعر القطعة الوحاده من معلومات المنتج
        var priceperunit = parent.attr('data-product-price');

        //السعر الاجمالي للمنتج هو سعر القطعة مضروبا بعددها
          totalpriceforproduct2 = newQuantity * priceperunit;

        //عين السعر الجديد ضمن خلية السعر الاجمالي للمنتج في هذا السطر
        parent.find('.total-price-for-product2').text(totalpriceforproduct2 + '$');

        //حدث السعر الاجمالي لكل المنتجات
        calculateTotalPrice();

    });

    $('[data-remove-from-cart]').click(function(){
       $(this).parents('[data-product-info]').remove();
       //اعد حساب السعر الاجمالي بعد حذف احد المنتجات
       calculateTotalPrice();
       
    });
    function calculateTotalPrice() {
       
     //نشىء متغيرا لحفظ السعر الاجمالس
     var totalpriceforallproducts = 0;

     //لكل سطر يمثل معلومات المنتج في الصفحة
     $('[data-product-info]').each(function() {
       
        //اجلب سعر القطهة الواحده من الخاصية الموافقة
        var priceperunit = $(this).attr('data-product-price');

        //اجلب كمية المنتج من حقل اختيار الكمية
        var quantity = $(this).find('[data-product-quantity]').val();

       // var totalpriceforproduct = priceperunit * quantity;

        //أضف السعر الاجمالي لهذا المنتج الى السعر الاجمالي لكل المنتجات واحفظ القيمة في المتغير نفسة
        totalpriceforallproducts = totalpriceforproduct + (totalpriceforproduct2);

        $('#total-price-for-all-products').text(totalpriceforallproducts);
     });

     //حدث السعر الاجمالي لكل المنتجات في الصفحة
     $('#totsl-price-for-all-products').text(totalpriceforallproducts + '$');
    }


    var citiesByCountry = {
        sa: ['الرياض','جدة','القصيم'],
        eg: ['القاهرة','الإسكندرية','شرم الشيخ'],
        jo: ['عمان','الزرقاء','الكرك'],
        sy: ['دمشق','حلب','حماه']

    };
    //عندما يتغير البلد
    $('#form-checkout select[name= "country"]').onchange(function() {
        //اجلب رمز البلد
        var country = $(this).val();
        //اجلب مدن هذا البلد من المصفوفة
       var cities = citiesByCountry[country];

       //فرغ قائمة المدن
       $('#form=checkout select[name="city"]').empty();

       //اضافة خيار اختر مدينة
       $('#form-checkout select[name="city"]').append(
           '<option disabled selected value="">اختر المدينة</option>'
       );
       
        //اضف المدن الى قائمة المدن
        cities.forEach(function(city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout-select[name="city"]').append(newOption);

        });

    });
    //عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').onchange(function() {
        //اجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivery') {
            //اذا كانت عند الاستلام فعطل حقول بطاقة الائتمان
            $('#credit-card-info input').prop('disabled', true);

        } else {
            //والا ففعلها
            $('#credit-card-info input').prop('disabled', false);            
        }

        //بدل معلومات بطاقة الائتمان بين الظهور والاخفاء
        $('#credit-card-info').toggle();

        
    
    });

    //مكون البحث حسب السعر
    $("#price-range").slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: function(event, ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);

        }
    });

});
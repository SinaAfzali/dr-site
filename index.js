persianNumbers = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
englishNumbers = ['0','1','2','3','4','5','6','7','8','9'];
var myDate = [];
var Year = 0;
var Month = 0;
var Day = 0;


var Hour_selected = 0;

var Minute_selected = 0;

var setDate = function(){
    let today = new Date().toLocaleDateString('fa-IR');
    var check = new Date().getHours().toLocaleString('fa-IR');
    var index = -1;
    var number = '';
    for(var x = 0; x < today.length;x++){
        if(today[x] === '/'){
            index++;
            if(index === 2 && check === '۲۳'){
                number = (parseInt(number) + 1).toString()
            }
            myDate[index] = number;
            number = '';
        }else{
            for(var y = 0;y<persianNumbers.length;y++){
                if(today[x] === persianNumbers[y]){
                    number += englishNumbers[y];
                    break;
                }
            }
            if(x === today.length - 1){
            index++;
            myDate[index] = number;
            number = '';
            }
        }
    }
}

setDate();
Day = parseInt(myDate[2]);
Month = parseInt(myDate[1]);
Year = parseInt(myDate[0]);

var setSelects = function(year,month,day){
    const days = document.getElementById('select-day');
    const months = document.getElementById('select-month');
    const years = document.getElementById('select-year');
    days.innerHTML = '';
    months.innerHTML = '';
    years.innerHTML = '';
    years.innerHTML = '<option style="font-size:1vw;"  id="'+Encryption(year.toString())+'">'+year+'</option>';
    if(month === 12 && day > 22){
        years.innerHTML = '<option style="font-size:1vw;"  id="'+Encryption((year+1).toString())+'">'+(year+1)+'</option>';
    }
    for(var x = month;x<13;x++){
        months.innerHTML += '<option style="font-size:1vw;"  id="'+Encryption(x.toString())+'">'+x+'</option>';
    }
    var dd = 30;
    if(month<7)dd=31;
    if(month === 12 && year % 4 !== 3)dd = 29;
    for(var x = day;x<=dd;x++){
        days.innerHTML += '<option style="font-size:1vw;" id="'+Encryption(x.toString())+'">'+x+'</option>';
    }
}






var getNameOf = function(year,month,day){
    setDate();
    const weekdayNames = ["سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه","شنبه", "یکشنبه", "دوشنبه"];
    var days = 0;
    if(year > 1402){
        for(var i = 1402;i<year;i++){
            if(i % 4 === 3){
                days += 366;
            }else{
                days += 365;
            }
        }
    }
    for(var i = 1;i < month;i++){
        if(i < 7){
            days += 31;
        }else if(i < 12 || (i === 12 && year % 4 === 3)){
            days += 30;
        }else{
            days += 29;
        }
    }
    days += day - 1;


    var months = ["فروردین", "اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];

    var string = weekdayNames[days % 7] + ' ' + day + ' ' + months[month-1] + ' ' + year ; 

    return string;
}


function selected(key,value){
    value = parseInt(Decoding(value));
    if(key === 'day'){
        Day = value;
    }
    else if(key === 'month'){
        Month = value;
        var myValue = parseInt(Decoding(document.getElementById('select-day').selectedOptions[0].id));
        var days = document.getElementById('select-day');
            days.innerHTML = '';
            var dd = 30;
            if(Month<7)dd=31;
            if(Month === 12 && Year % 4 !== 3)dd = 29;
        if(Month > parseInt(myDate[1])){
            for(var x = 1;x<=dd;x++){
                  days.innerHTML += '<option style="font-size:1vw;" id="'+Encryption(x.toString())+'">'+x+'</option>';
             }
             document.getElementById('select-day').value = myValue;
        }else{
            for(var x = parseInt(myDate[2]);x<=dd;x++){
                days.innerHTML += '<option style="font-size:1vw;" id="'+Encryption(x.toString())+'">'+x+'</option>';
           }
           document.getElementById('select-day').value = parseInt(myDate[2]);
        }
        
        if(Month>6 && Day > 30){
            document.getElementById('select-day').value = 1;
            Day = 1;
        }
        if(Month === 12 && Year%4 !== 3 && Day === 30){
            document.getElementById('select-day').value = 1;
            Day = 1;
        }
    }
    var custom_receive = document.getElementById('custom_receive');
    custom_receive.innerHTML = '';
    custom_receive.innerHTML = 'نوبت انتخابی شما  : ' + 
                            getNameOf(Year,Month,Day);

    setTime();
    Hour_selected = 0;
    Minute_selected = 0;
    document.querySelector('.hand-icon1').style.backgroundColor = 'rgb(59, 130, 246)';
}




class Code{
    constructor(key,value,id){
        this.key = key;
        this.value = value;
        this.id = id;
    }
}

var records = [];





var setTime = function(){
    var times = document.getElementById('dr-times');
    times.innerHTML = '';
    var h = 16;
    for(var x = 0;x<19;x++){
        var m = x * 10;
        if(m % 60 === 0){
            h += 1;
        }
        m %= 60;
        var z = m.toString();
        if(m===0){
            z = '00';
        }
        var myDiv = document.createElement('div');
        myDiv.innerHTML = h + ' : ' + z;
        myDiv.style.padding = '10% 0 10% 0'
        myDiv.style.backgroundColor = 'blue';
        myDiv.style.margin = '1%';
        myDiv.style.textAlign = 'center';
        myDiv.style.fontWeight = 'bold';
        myDiv.style.color = 'white';
        myDiv.style.borderRadius = '0.5rem';
        myDiv.id = Encryption(myDiv.innerHTML);
        myDiv.className = 'time'+x;
        myDiv.onclick = myClick;
        myDiv.style.cursor = 'pointer';
        function myClick() {
            for(var x=0;x<19;x++){
                var divSelected = document.querySelector('.time'+x);
                divSelected.style.backgroundColor = 'blue';
            }
            this.style.backgroundColor = 'darkorange';
            var s  = Decoding(this.id);
            var myTime = s[5] + s[6] + ' : ' + s[0] + s[1];
            Hour_selected = parseInt(s[0]+s[1]);
            Minute_selected = parseInt(s[5]+s[6]);
            custom_receive.innerHTML = 'نوبت انتخابی شما  : ' + 
                                        getNameOf(Year,Month,Day) + ' ساعت ' + myTime;

           document.querySelector('.hand-icon1').style.backgroundColor = 'blue';
        }
        times.appendChild(myDiv);
    }
}


var Encryption = function(str){
    var myId = '';
    const n = Math.floor(Math.random() * 120);
    myId += records[n];
    for(var x=0;x<str.length;x++){
       if(str[x] === ' '){
        const n = Math.floor(Math.random() * 10) + 100;
        myId += records[n];
       }else if(str[x] === ':'){
        const n = Math.floor(Math.random() * 10) + 110;
        myId += records[n];
       }else{
        const n = Math.floor(Math.random() * 10) + (10 * parseInt(str[x]));
        myId += records[n];
       }
    }
    const f = Math.floor(Math.random() * 30);
    for(var i = 0;i < f; i++){
        const u = Math.floor(Math.random() * 3);
        if(u === 0){
            const char = String.fromCharCode(65 +  Math.floor(Math.random() * 26));
            myId += char;
        }else if(u === 1){
            const char = String.fromCharCode(97 +  Math.floor(Math.random() * 26));
            myId += char;
        }else{
            const num = Math.floor(Math.random() * 10);
            myId += num;
        }
    }
    myId += ((103 + f) * 3) - 17;
    return myId;
}

var Decoding = function(str){
    var s = str[str.length-3]+str[str.length-2]+str[str.length-1];
    var n = parseInt(s);
    n = ((n + 17) / 3)%100;
    var code = '';
    var six = '';
    for(var i = 6 ; i < str.length - n;i++){
        six += str[i];
        if(six.length === 6){
            for(var j = 0 ; j < records.length; j++){
                if(six === records[j]){
                    if(j < 100){
                        code += parseInt(j / 10);
                    }else if(j < 110){
                        code += ' ';
                    }else{
                        code += ':';
                    }
                    break;
                }
            }
            six = '';
        }
    }
    return code;
}



  const request = indexedDB.open('myDatabase', 1);
  request.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction('codes', 'readonly');
  const objectStore = transaction.objectStore('codes');
 

  objectStore.openCursor().onsuccess = function(event) {
    const cursor = event.target.result;

    if (cursor) {
      records.push(cursor.value.value);
      cursor.continue();
    } else {
      console.log('تمام رکوردها با موفقیت خوانده شدند');
      Start_function();
    }
  };

  transaction.oncomplete = function(event) {
    db.close();
  };
};

request.onerror = function(event) {
  console.error('خطا در ایجاد پایگاه داده', event.target.error);
};



var Start_function = function(){
    setSelects(parseInt(myDate[0]),parseInt(myDate[1]),parseInt(myDate[2]));
    setTime();

    var receive_nearly = document.getElementById('receive_nearly');
    receive_nearly.innerHTML = '';
    receive_nearly.innerHTML = 'دریافت زودترین نوبت : ' + 
                                getNameOf(parseInt(myDate[0]),parseInt(myDate[1]),parseInt(myDate[2]));

                                
    var custom_receive = document.getElementById('custom_receive');
    custom_receive.innerHTML = '';
    custom_receive.innerHTML = 'نوبت انتخابی شما  : ' + 
                                getNameOf(Year,Month,Day);
                                

}
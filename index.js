
persianNumbers = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
englishNumbers = ['0','1','2','3','4','5','6','7','8','9'];
var myDate = [];
var Year = 0;
var Month = 0;
var Day = 0;




function generateRandomString() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  var length = 6;
  var randomString = '';

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}


class Code{
    constructor(key,value,id){
        this.key = key;
        this.value = value;
        this.id = id;
    }
}




var request = window.indexedDB.open("myDatabase", 1);

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("codes", { keyPath: "id" });
  objectStore.createIndex("keyIndex", "key", { unique: false });
};

for(var i=0;i<120;i++){
    
var code = new Code(parseInt(i%10),generateRandomString(), i);

var request = window.indexedDB.open("myDatabase", 1);
request.onsuccess = function(event) {
  var db = event.target.result;
  var transaction = db.transaction(["codes"], "readwrite");
  var objectStore = transaction.objectStore("codes");

  var request = objectStore.add(code);

  request.onsuccess = function(event) {
    console.log("code added successfully");
  };

  request.onerror = function(event) {
    console.log("Error adding code");
  };
};

}















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



var readCodes = function(){
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
}



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
                                
                                fetch('https://api.ipify.org/?format=json')
                                .then(response => response.json())
                                .then(data => console.log(data.ip));
}





function test11(value,x){
var text1 = document.getElementById('text'+x)
text1.innerHTML = value;
var test = document.getElementById('test'+x);
test.innerHTML = '';
var s = '140'+(x%2+1)+'/0'+(x%9+1)+'/'+(x%21+10);
var a = '';
for(var x=0;x<s.length;x++){
    if(s[x] === '/'){
        a += '/';
    }else{
        var n = parseInt(s[x]);
        a += persianNumbers[n];
    }
}
test.innerHTML = a;
}
var names = ['کمال محمدی','مرتضی اصغری','فاطمه امینی','هلیا','سعید'];
const colors = ["#800000", "#8B4513", "#A0522D", "#A52A2A", "#B22222", "#CD5C5C", "#D2691E", "#D2B48C",
 "#DC143C", "#FF4500", "#FF6347", "#FF7F50", "#FF8C69", "#FFA07A", "#FFA500"];
var comments = ['ار لیفت با نخ پیش ایشون نتیجه رضایت بخشی داشت. دکتر با حوصله و وقتی ک میذاره به آدم آرامش میده. رفتار محترمانه ایشون و کادر هم خیلی موثر بوده. تو مراجعات بعدی هم پیگیری خوبی داشتن. در کل به دیگران توصیه می کنم برای لیفت با نخ به دیگران توصیه می کنم. چون نتیجه کار واقعا خوب بود. کیفیت نخ اوریجینال هم عااااالی بود. محیط خوبی هم بود. درسته ک نوبت دکتر هر هفته نمی تونیم بگیریم اما ارزش انتظار کشیدن را داره. بنظرم دکتر شاهوردی به خاطر اینکه متد های به روز دنیا را دنبال می کنه تو کارش موفقه. واقعا دانش پزشک در کنار مهارت و اخلاق و پیگیری بیمار بسیار قابل احترام هست. من که خیلی ازشون تشکر می کنم',
'پوسته ریزی سر منو دکتر با یه داروی ترکیبی طی دو هفته درمان کرد. منطقه ما گرم و شرجی هست و پزشک های زیادی واسه این مشکل مراجعه داشتم. اذیت بودم. خب خدا رو شکر از اینکه اومدم تهران و درمان شدم واقعا راصی ام. دکتر شاه وردی همین ک با یه داروی ترکیبی بعد این همه مراجعه به پزشک های دیگه منو درمان کرد به دیگران توصیه می کنم، اما خب مشخصه این همه کامنت بیمارها هم نشون میده ک عملکرد و تشخیص خیلی خوبی داره. من به بقیه توصیه می کنم به خصوص جنوبی های خونگرم.',
'دخترم و پسرم هر دو جوش های ریزی از بچگی روی صورت و بازو داشتن. همیشه نگران بودم و گاهی بهتر و گاهی بدتر می شدند. پسرم 9 ساله شده بود و می گفتن حساسیت هست. تا اینکه یکی از دوستان دکتر شاه وردی را بهم معرفی کرد. ایشون تشخیص دادند ک ناشی از خشکی پوست بوده و تنها نکات مراقبت پوست خشک را دادند و گفتند تا سنین نوجوانی معمولا برطرف میشه. خدا رو شکر که با ایشون اشنا شدیم و با تشخیص صحیح بعد این همه مدت شرایط ما خوب شد.',
'قای دکتر فوق العاده ان.باسواد،با اخلاق،حرفه ای… من تزریق فیلر انجام دادم تو کلینیک اوان وناحیه چانه عفونت کرد…اونقدر وحشتناک بود که درمان هیچ دکتری جواب نمیداد.تنها دکتری که واقعا دلسوز و صبور و متخصص بودن و کمکم کردن عفونت کنترل شه دکتر شاهوردی عزیز بودن … درمان من کامل نشده هنوز ولی خداروشکر که ایشونو تونستم پیدا کنم…',
'برای برداشتن ضایعات پوستی مثل خال گوشتی مراجعه کردم. نگران بودم. اما ایشون با متانت نام علمی و روند درمان با لیزر را برام تشریح کرد. خیلی استرس داشتم اما دیدم چقدر سریع و با آرامش انجام شد. در مراجعات بعدی هم خودشون ب یاد داشتن ک تا کنون چه داروهایی داشت که خب این نشان از تمرکز پزشک بر بیمارها هست.']

for(var x=1;x<100;x++){
var body = document.getElementById('body');
var five = Math.floor(Math.random() * 5);
var name_user = names[five];
var title = name_user[0];
var color_title = colors[Math.floor(Math.random() * 15)];
var text = comments[five];

var content = ' <div id="comment1" style="background-color: white;width: 44%;margin-right: 6%;padding: 0.5% 0 0.5% 0;'+
'display: grid;grid-template-columns: repeat(1,1fr);border-top: 1px solid rgba(0, 0, 0, 0.2);">'+
'<div>'+
 '   <div style="float: right; background-color: '+color_title+';border-radius: 100%;font-size: 1vw;'+
  '  text-align: center;font-weight: 400;color: white;padding: 2% 3% 2% 3%;margin-right:2%;">'+
   title+
   ' </div>'+
   ' <div style="float: right;margin: 0.5% 1% 0 0;">'+
   '<div style="font-size: 0.8vw;font-weight: 800;">'+
    name_user+
    '</div>'+
    '<div style="font-size: 0.8vw;" id="test'+x+'">'+
     '   1402/07/03'+
    '</div>'+
    '</div>'+
    '<div style="font-size:0.7vw;border-radius:0.5rem;background-color:rgb(235,235,240);;float:right;'+
    'font-weight:600;color:rgba(0,0,0,0.5);margin:0.5% 1% 0 0;padding:0.5% 1% 0.5% 1%;">'+
    'ویزیت شده'+
    '</div>'+
    '<a href="https://t.me/share/url?url=[127.0.0.1]&text='+text+'" target="_blank">'+
    '<img src="./images/more.png" alt="" style="float: left;width: 2.5%;margin: 1% 0 0 1%;cursor: pointer;">'+
    '</a>'+
'</div>'+

'<div id="text'+x+'" style="background-color: white;width: 88%;padding: 1%;font-size: 0.9vw;margin:2% 3% 0 0;"></div>'+
'</div>'

body.innerHTML += content;
test11(comments[five],x)
}

readCodes();

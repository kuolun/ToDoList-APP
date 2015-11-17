window.onload = init;

function init() {
    // var enter = document.getElementById("textinput");
    //按下enter後觸發
    // enter.onkeydown = createList;
    $('#textinput').keydown(createList);


    // 如果localStorage裡面有東西，就取出顯示在畫面上
    var ListArray = getListArray();
    for (var i = 0; i < ListArray.length; i++) {
        var key = ListArray[i];
        var value = JSON.parse(localStorage[key]);
        addListToDOM(key, value);
    }

}

function getListArray() {
    //取得存放list的那個array(key為listArray)
    var listArray = localStorage.getItem("listArray");
    //如果不存在就建立一個空array進去
    if (!listArray) {
        listArray = [];
        localStorage.setItem("listArray", JSON.stringify(listArray));
    } else {
        listArray = JSON.parse(listArray);
    }
    return listArray;
}

//建立事項
function createList(e) {
    console.log("in");
    if (e.keyCode == 13) {
        //1.存到localstorage去
        //取輸入內容
        var value = document.getElementById("textinput").value;


        //取建立時間
        var currentDate = new Date();
        //以時間當key
        var key = "list_" + currentDate.getTime();
        // json物件
        var list = {
            "value": value,
        };

        //json物件要轉成文字才能存在ls裡
        localStorage.setItem(key, JSON.stringify(list));

        //抓出現有的keys array,加入一把新的key
        var listArray = getListArray();
        listArray.push(key);

        //更新localStorage的listArray
        localStorage.setItem("listArray", JSON.stringify(listArray));

        //2.在畫面上顯示出來
        addListToDOM(key, list);
    }
}



function addListToDOM(key, listObj) {
    //取得<ul>
    var lists = document.getElementById('lists');
    //建立<li>
    var list = document.createElement('li');
    //設定li的id
    list.setAttribute("id", key);



    //建立label及input
    var label = document.createElement('label');
    var input = document.createElement('input');


    // 設定input的type及class為checkbox
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "checkbox");

    // 讓label show出內容
    label.innerHTML = listObj.value;

    // input掛到label下，label掛到li下,li掛到ul下

    label.appendChild(input);
    list.appendChild(label);
    lists.appendChild(list);

    //重整畫面
    $('.checkbox').checkboxradio();
    $('.checkbox').checkboxradio("refresh");

    //增加delete事件
    // list.onclick = deleteList;
    $('li').click = deleteList;

}

function deleteList(e) {

    //因被點到的會是label
    //所以要回上2層取li的id
    var key = e.target.parentNode.parentNode.id;


    //取出存放list key的array
    var listArray = getListArray();
    if (listArray) {
        for (var i = 0; i < listArray.length; i++) {
            // console.log(listArray[i]);
            if (key == listArray[i]) {
                // 把array中該筆記錄刪除
                listArray.splice(i, 1);
            }
        }
        // 根據點到的li id去localStorage remove該筆
        localStorage.removeItem(key);
        //把更新完的array存回localStorage
        localStorage.setItem("listArray", JSON.stringify(listArray));
        //移除畫面的list
        removeListFromDOM(key);
    }

}

function removeListFromDOM(key) {
    var item = document.getElementById(key);
    item.parentNode.removeChild(item);
}

function clearListNotes() {

}

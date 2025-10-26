let data = [ 
  ];
const url = "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

const ticketCardArea = document.querySelector('.ticketCard-area'); 
const regionSearch = document.querySelector(".regionSearch"); 
const addTicketBtn = document.querySelector(".addTicket-Btn"); 
const searchResultText = document.querySelector("#searchResult-text");
const cantFindArea = document.querySelector(".cantFind-area");

//初始載入
function render(dataList) {
  let str = ""; 
  dataList.forEach(item => {
    str += `
      <li class="ticketCard">
        <div class="ticketCard-img">
          <img src="${item.imgUrl}" alt="${item.name}">
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="ticketCard-info">
            <p>剩下最後 <span>${item.group}</span> 組</p>
            <p>TWD <span>$${item.price}</span></p>
          </div>
        </div>
      </li>
    `;
  }); 
  ticketCardArea.innerHTML = str ; 

  let totalObj = {}; 
  data.forEach(function(item,index) {
    if(totalObj[item.area] ==undefined){
      totalObj[item.area] = 1 ; 
    } else {
      totalObj[item.area] += 1 ; 
    }
  })
}

//建立圖表
let chart; //全域變數，供更新使用

function renderChart(dataList) {
  const totalObj = {}; 
  dataList.forEach(item => {
    if(totalObj[item.area] === undefined) {
      totalObj[item.area] = 1 ; 
    } else {
      totalObj[item.area] += 1 ; 
    }
  });

  //轉換成C3可用的格式
  const newData = Object.keys(totalObj).map(area => [area,totalObj[area]]);

  //若第一次呼叫，建立圖表

  if(!chart) {
    chart = c3.generate({
      bindto: "#chart",
      data: {
        columns: newData,
        type: "donut",
      },
      donut: {
        title: "地區分布"
      }
    });
  } else {
    chart.load({
      columns: newData
    });
  }
}


//監聽篩選下拉選單
regionSearch.addEventListener("change",function(e) {
  const selected = e.target.value ; 
  if(selected === "全部地區" || selected === "") {
    render(data); 
    searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料` ; 
    return; 
  }
  const filterData = data.filter(item => item.area === selected); 
  render(filterData); 
  searchResultText.textContent = `本次搜尋共${filterData.length}筆資料`; 
  //若無資料則顯示提示文字
  if(filterData.length ===0) {
    cantFindArea.innerHTML = `
      <h3>查無此關鍵字資料</h3>
      <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/no_found.png?raw=true" alt="">
    `;
    cantFindArea.style.display = "block"; 
  } else {
    cantFindArea.style.display = "none"; 
  }
});
//監聽新增套票按鈕
addTicketBtn.addEventListener('click',function(e) {
  const name = document.querySelector("#ticketName").value.trim();
  const imgUrl = document.querySelector("#ticketImgUrl").value.trim();
  const area = document.querySelector("#ticketRegion").value ; 
  const description = document.querySelector("#ticketDescription").value.trim(); 
  const group = document.querySelector("#ticketNum").value; 
  const price = document.querySelector("#ticketPrice").value; 
  const rate = document.querySelector("#ticketRate").value; 
  
  if(!name || !imgUrl || !area || !price || !group || !rate) {
    alert("請完整填寫所有欄位");
    return;
  }
  const newTicket = {
    name,
    imgUrl,
    area,
    description,
    group,
    price,
    rate
  };
  
  data.push(newTicket);
  render(data);
  renderChart(data); //新增後更新圖表
  
  document.querySelector(".addTicket-form").reset();
  
  //重設篩選選單為全部地區
  regionSearch.value = ""; 

  //更新搜尋結果筆數
  searchResultText.textContent = `本次搜尋共${data.length}筆資料`; 

  //隱藏查無資料提示
  const cantFindArea = document.querySelector(".canFind-area"); 
  cantFindArea.style.display = "none"; 
  
  //重製表單
  document.querySelector(".addTicket-form").reset();

  
});

async function getData() {
  try{
  const res = await axios.get(url); 
  data = res.data.data ; 
  render(data); 
  renderChart(data); //初始化後載入圖表
  } catch(error) {
     console.log("發生錯誤"); 
  }
 
}

// function getData() {
//   axios.get(url)
//   .then(function(res) {
//    data = res.data.data;
//    render(data); 
//   })
//   .catch(function() {
//     console.log("發生錯誤"); 
//   }); 
// }
getData();



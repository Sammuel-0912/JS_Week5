let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];
const ticketCardArea = document.querySelector('.ticketCard-area'); 
const regionSearch = document.querySelector(".regionSearch"); 
const addTicketBtn = document.querySelector(".addTicket-Btn"); 

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
}
render(data); 

//監聽篩選下拉選單
regionSearch.addEventListener("change",function(e) {
  const selected = e.target.value ; 
  if(selected === "全部地區" || selected === "") {
    render(data); 
    return; 
  }
  const filterData = data.filter(item => item.area === selected); 
  render(filterData); 
  
  //若無資料則顯示提示文字
  if(filterData.length ===0) {
    ticketCardArea.innerHTML = `<p class="noResult">查無此地區套票</p>`;
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
  
  //重製表單
  document.querySelector(".addTicket-form").reset();
});
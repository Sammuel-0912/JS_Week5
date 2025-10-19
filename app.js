let data = [
   
  ];
const url = "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

const ticketCardArea = document.querySelector('.ticketCard-area'); 
const regionSearch = document.querySelector(".regionSearch"); 
const addTicketBtn = document.querySelector(".addTicket-Btn"); 
const searchResultText = document.querySelector("#searchResult-text");

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

  // ✅ 更新搜尋結果文字
  // searchResultText.textContent = `本次搜尋共 ${ticketData.length} 筆資料`;

}
// render(data); 

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

async function getData() {
  const res = await axios.get(url); 
  data = res.data.data ; 
  render(data); 
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
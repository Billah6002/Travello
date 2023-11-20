let tot_price = 0;
let cards = [];
let prices = [];
let pics = [];

function getReciept(name, price, q){
    let new_name, location, cost, quantity =q;
    if(name==1){
        new_name = "7 Day Family Package";
        location = "Mahasthangarh with food and hotels cost";
        tot_price = price;
    }
    else if(name == 2){
        new_name = "3 Day Couple Trip";
        location = "Taj Mahal package with all cost covered";
        tot_price = price;
    }
    else{
        new_name = "Tickets";
        location = "By Bus";
        prices = JSON.parse(localStorage.prices);
        
        tot_price = 0;
        quantity = 0;
        for(const c of prices){
            // console.log(c);
            quantity += 1;
            tot_price += c;
        }
        
    }
    const props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Invoice",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "https://i.ibb.co/dtX0j5d/logo.png",
            type: 'PNG', 
            width: 53.33,
            height: 26.66,
            margin: {
                top: 0, 
                left: 0 
            }
        },
        stamp: {
            inAllPages: true, 
            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            type: 'JPG', 
            width: 20, 
            height: 20,
            margin: {
                top: 0,
                left: 0
            }
        },
        business: {
            name: "Travello",
            address: "Albania, Tirane ish-Dogana, Durres 2001",
            phone: "(+355) 069 11 11 111",
            email: "travello@travel.com",
            email_1: "travel52@gmail.com",
            website: "https://billah6002.github.io/Travello/",
        },
        contact: {
            label: "Invoice issued for:",
            name: "Alpha Centaro",
            address: "Albania, Tirane, Astir",
            phone: "(+355) 069 22 22 222",
            email: `alpha@gmail.com`,
            otherInfo: "payment by: bKash",
        },
        invoice: {
            label: "Invoice #: ",
            num: 1,
            invDate: "Payment Date: 01/01/2023 18:12",
            invGenDate: "Invoice Date: 02/02/2023 10:17",
            headerBorder: false,
            tableBodyBorder: false,
            header: [
              {
                title: "#", 
                style: { 
                  width: 10 
                } 
              }, 
              { 
                title: "Title",
                style: {
                  width: 30
                } 
              }, 
              { 
                title: "Description",
                style: {
                  width: 80
                } 
              }, 
              { title: "Price"},
              { title: "Quantity"},
              { title: "Unit"},
              { title: "Total"}
            ],
            table: Array.from(Array(1), (item, index)=>([
                index + 1,
                `${new_name}`,
                `${location}`,
                tot_price,
                quantity,
                "1",
                tot_price
            ])),
            additionalRows: [{
                col1: 'Total:',
                col2: '145,250.50',
                col3: 'ALL',
                style: {
                    fontSize: 14 //optional, default 12
                }
            },
            {
                col1: 'VAT:',
                col2: '20',
                col3: '%',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            {
                col1: 'SubTotal:',
                col2: '116,199.90',
                col3: 'ALL',
                style: {
                    fontSize: 10 //optional, default 12
                }
            }],
            invDescLabel: "Invoice Note",
            invDesc: "Thank you for choosing Travello. We appreciate your business. Have a safe and pleasant journey! If you have any questions or need assistance, feel free to reach out to our team at 01890330463\nSafe travels!",
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };
    var pdfObject = jsPDFInvoiceTemplate.default(props);
}


function add(card, price, pic){
    const cc = card;
    tot_price += price;
    const storedNames = localStorage.names;
    if(storedNames == undefined){
        cards.push(cc);
        prices.push(price);
        pics.push(pic);
        localStorage.removeItem("names");
        localStorage.removeItem("prices");
        localStorage.removeItem("pics");
        localStorage.setItem("names", JSON.stringify(cards));
        localStorage.setItem("prices", JSON.stringify(prices));
        localStorage.setItem("pics", JSON.stringify(pics));


    }
    else{
        cards = JSON.parse(localStorage.names);
        cards.push(cc);
        prices.push(price);
        pics.push(pic);
        localStorage.setItem("names", JSON.stringify(cards));
        localStorage.setItem("prices", JSON.stringify(prices));
        localStorage.setItem("pics", JSON.stringify(pics));
    }

}
let cnt = 39;
function loadCart(){
    cards = JSON.parse(localStorage.names);
    prices = JSON.parse(localStorage.prices);
    pics = JSON.parse(localStorage.pics);
    const par = document.getElementById('cart');
    par.innerHTML = "";
    const v1 = Math.min(cards.length, Math.min(pics.length, prices.length));
    for(let i=0; i<v1; i++){
        const cc = cards[i];
        const pp = prices[i];
        const div = document.createElement('div');
        div.className = "card bg-base-100 shadow-xl";
        div.innerHTML = `
        
        <figure class="px-10 pt-10">
        <img src="./res/bus${pics[i]}.jpeg" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${cc}</h2>
        <p>${pp}$</p>
        <div class="card-actions">
            <!-- Open the modal using ID.showModal() method -->
            <button class="btn btn-primary bg-orange-600" onclick="my_modal_${cnt}.showModal(), add('${cc}', ${pp}, ${pics[i]})">Add to Cart</button>
            <dialog id="my_modal_${cnt}" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Added to Cart</h3>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>
        </div>
        </div>
    
        `
        cnt += 1;
        par.appendChild(div);
    }
}
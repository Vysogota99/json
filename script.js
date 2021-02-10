let jsonString  = `{
                        "displayedName": {
                            "displayedName": {
                                "value": [
                                    "Профиль маячковый ПВХ 10 мм L3м"
                                ],
                                "description": "Полное наименование товара для клиента"
                                }
                            },
                        "stock": {
                            "stocks": {
                                    "34": {
                                    "2": "35",
                                    "3": "42",
                                    "4": "58",
                                    "5": "57",
                                    "6": "112",
                                    "20": "51",
                                    "22": "78",
                                    "26": "34",
                                    "32": "22",
                                    "35": "358",
                                    "40": "28",
                                    "43": "68",
                                    "45": "58",
                                    "49": "31",
                                    "51": "29",
                                    "56": "42",
                                    "62": "26",
                                    "64": "0",
                                    "65": "57",
                                    "86": "15",
                                    "114": "41",
                                    "117": "46",
                                    "143": "46",
                                    "162": "4",
                                    "171": "0",
                                    "176": "12"
                                }
                            }
                        }
                    }
`

const stocks = JSON.parse(jsonString);

const stocksName = stocks["displayedName"]["displayedName"]["value"][0]

let getShopsWithStocks = stocks => {
    let result = [];
    
    for(reg in stocks) {
        for(shopID in stocks[reg]) {
                if(stocks[reg][shopID] > 0) {
                    result.push(shopID);
                }
            }
    }

    return result;
}

let getMaxStockQuantityInRegion = (data, region) => {
    let shops = data[region]
    let result = {
        "quantity": 0,
        "id": 0, 
        toString() {
            return "номер магазина - " + this.id + " количество - " + this.quantity;
        },
    }

    if(shops !== undefined) {

        for(id in shops) {
            if(shops[id] > result.quantity) {
                result.quantity = shops[id]
                result.id = id
            }
        }

    }

    return result
}

const shopsWithStocks = getShopsWithStocks(stocks["stock"]["stocks"])
const maxQuantity = getMaxStockQuantityInRegion(stocks["stock"]["stocks"], 34)
console.log("1. получить название товара: " + stocksName);
console.log("2. получить массив номеров магазинов, в которых есть товары в наличии: " + shopsWithStocks)
console.log("3. найти максимальное количество товара в регионе, вернуть это количество и номер магазина: " + maxQuantity)

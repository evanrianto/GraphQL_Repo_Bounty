const { RESTDataSource } = require("apollo-datasource-rest");

//Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

//Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.etherscan.io/api";
    }

    async etherBalanceByAddress(api_key) {
        return this.get(
            "",
            //Insert API Endpoint - For Get Ether Balance for a Single Address
            {
                module: "account",
                action: "balance",
                address: eth_address,
                tag: "latest",
                apikey: api_key,
            }
        );
    }

    async totalSupplyOfEther(api_key) {
        return this.get(
            "",
            //Insert API Endpoint - For Get Total Supply of Ether
            {
                module: "stats",
                action: "ethsupply",
                apikey: api_key,
            }
        );
    }
}

module.exports = EtherDataSource;

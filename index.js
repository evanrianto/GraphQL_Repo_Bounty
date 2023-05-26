const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

const resolvers = {
    Query: {
        getEthByAddress: (root, _args, { dataSources }) =>
            dataSources.ethDataSource.etherBalanceByAddress(
                process.env.ETHERSCAN_API
            ),
        getTotalSupplyEth: (root, _args, { dataSources }) =>
            dataSources.ethDataSource.totalSupplyOfEther(
                process.env.ETHERSCAN_API
            ),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        ethDataSource: new EtherDataSource(),
    }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

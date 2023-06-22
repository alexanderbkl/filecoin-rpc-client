import { HttpJsonRpcConnector, LotusClient, MnemonicWalletProvider, WsJsonRpcConnector } from 'filecoin.js';

(async () => {
    let connector;
    try {
        connector = new HttpJsonRpcConnector({ url: 'https://filecoin-calibration.chainstacklabs.com/rpc/v1' });
    } catch (err) {
        console.log("Error creating connector: ", err);
        return;
    }
    const lotusClient = new LotusClient(connector);

    const hdWalletMnemonic = 'debris place cheese great layer true special state tree resource dutch engine';
    const hdDerivationPath = `m/44'/461'/0'/0/0`;

    const walletProvider = new MnemonicWalletProvider(
        lotusClient,
        hdWalletMnemonic,
        hdDerivationPath
    );
    const myAddress = await walletProvider.getDefaultAddress();
    console.log(myAddress);

    try {
        const balance = await lotusClient.wallet.balance(myAddress);
        console.log(balance);
    } catch (err) {
        console.log(err);
    }

    try {
        const ask = await lotusClient.client.queryAsk('12D3KooWQtcfpAhnu89D3YkyA1ZVXmDBmCLwA62LEfHinfLcHzoL', 't017840');
        console.log(ask);
    } catch (err) {
        console.log("Error querying ask: ", err);
    }

    //import file from ./test.txt
    const fs = require('fs');
    const file = fs.readFileSync('./test.txt');
    const fileBuffer = Buffer.from(file);

    //import file to lotus
    const importRes = await lotusClient.client.import({
        Path: './test.txt',
        IsCAR: false,
    });

})();
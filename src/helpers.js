import arweave from './arweave-config';

const checkPendingTransactions = (callback) => {
    const pending_txids = JSON.parse(sessionStorage.getItem('pending_txids'));
    const pending_doc_ids = [];

    for(let i in pending_txids) {
        const txid = pending_txids[i];
        
        arweave.transactions.get(txid).then(transaction => {
            // do nothing if this is not returned as pending
            
        }).catch(error => {
            if(error.type == "TX_PENDING") {
                pending_doc_ids.push(txid);
            }
        }).finally(() => {
            sessionStorage.setItem('pending_txids', JSON.stringify(pending_doc_ids));

            callback(pending_doc_ids.length);
        });
    }
}

export default checkPendingTransactions;
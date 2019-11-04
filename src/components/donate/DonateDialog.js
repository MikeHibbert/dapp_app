import React, { Component } from 'react';
import arweave from '../../arweave-config';
import { ToastContainer, toast } from 'react-toastify';

class DonateDialog extends Component {
    state = {
        show_style: null,
        classes: "modal fade bs-example-modal-sm",
        balance: 0,
        amount: 0
    }

    show() {
        this.setState({show_style: {display: "block", paddingRight: "15px"}, classes: "modal fade bs-example-modal-sm in"});
    }

    hide() {
        this.setState({show_style: null, classes: "modal fade bs-example-modal-sm"});
    }

    componentDidMount() {
        const wallet_address = sessionStorage.getItem('AR_Wallet', null);
        this.loadWallet(wallet_address);
    }

    loadWallet(wallet_address) {
        const that = this;
    
        if(wallet_address) {
            arweave.wallets.getBalance(wallet_address).then((balance) => {
                let ar = arweave.ar.winstonToAr(balance);
    
                const state = {balance: parseFloat(ar)};
    
                that.setState(state);
            });   
        }     
      }

    componentDidUpdate(prevProps) {
        
        if(this.props.show !== undefined && this.props.show !== prevProps.show) {
            if(this.props.show) {
                this.show();
            } else {
                this.hide();
            }
        } 
    }

    async donate() {
        if(this.state.amount <= 0) {
            toast("Please send a positive amount.", { type: toast.TYPE.ERROR });
            return; 
        }

        if(this.state.amount > this.state.balance) {
            toast("You do not have enough AR in your wallet to cover the donation", { type: toast.TYPE.ERROR });
            return;
        }

        debugger;

        const jwk = JSON.parse(sessionStorage.getItem('AR_jwk', null));  
        const wallet_address = await arweave.wallets.ownerToAddress(this.props.document.owner);

        let transaction = arweave.createTransaction({
            target: wallet_address,
            quantity: arweave.ar.arToWinston(this.state.amount)
        }, jwk);

        toast("Your donation was sent.", { type: toast.TYPE.SUCCESS });

        this.props.close();
    }

    onChange(event) {
        const amount = parseFloat(event.target.value);

        this.setState({amount: amount});
    }

    render() {
        return (
            <>
            <div className={this.state.classes} tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={this.state.show_style}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">

                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" onClick={this.props.close()} aria-label="Close"><span >&times;</span></button>
                            <h4 className="modal-title" id="mySmallModalLabel">Donate to publisher</h4>
                        </div>

                        <div className="modal-body">
                            <p><strong>Current Balance: </strong>{this.state.balance}</p>
                            <fieldset>
                                <label>Amount to donate:</label>
                                <input type="number" name="amount" className="form-control" onChange={(e) => {this.onChange(e)}} />
                            </fieldset>

                            <button className="btn btn-success pull-right" onClick={this.donate.bind(this)}>Donate</button>
                            <button className="btn btn-danger pull-right" onClick={this.props.close()}>Cancel</button>
                            <div className="clearfix"></div>
                        </div>

                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default DonateDialog;
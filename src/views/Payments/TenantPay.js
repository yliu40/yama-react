import React, {Component} from 'react';
import TenantPayFirst from "views/Payments/TenantPayFirst.js";
import HorizontalLabelPositionBelowStepper from "views/Payments/HorizontalLabelPositionBelowStepper.js";
import TenantPayHistory from "views/Payments/TenantPayHistory.js";

class TenantPay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username : "apple",
            balance: 3600,
            amount: 3000,
            isShowBalance: true,
            isShowHistory: false
        }
        this.triggerIsPayState = this.triggerIsPayState.bind(this);
        this.triggerIsHistoryState = this.triggerIsHistoryState.bind(this);
    }

    triggerIsPayState = () => {
        this.setState({
            ...this.state,
            isShowBalance: false,
            isShowHistory: false
        })
    }

    triggerIsHistoryState = () => {
        this.setState({
            ...this.state,
            isShowHistory: true,
            isShowBalance: false,
        })
    }

    render() {

        return (
            <div>
                {this.state.isShowBalance  && !this.state.isShowHistory && <TenantPayFirst isSB={this.triggerIsPayState}
                                                                                           isSH={this.triggerIsHistoryState}
                                                                                           username={this.state.username}
                                                                                           balance={this.state.balance}
                                                                                           amount={this.state.amount}
                />}

                {!this.state.isShowBalance && !this.state.isShowHistory  && <HorizontalLabelPositionBelowStepper balance={this.state.balance}
                                                                                                                 amount={this.state.amount}/>}

                {this.state.isShowHistory && <TenantPayHistory username={this.state.username}/>}
            </div>
        );
    }
}

export default TenantPay;

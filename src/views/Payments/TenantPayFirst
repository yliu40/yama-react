import React, {Component} from 'react';
import GridContainer from "../../components/Grid/GridContainer"
import Card from "../../components/Card/Card"
import CardBody from "../../components/Card/CardBody"
import GridItem from "../../components/Grid/GridItem"
import Button from "components/CustomButtons/Button.js";

class TenantPayFirst extends Component {
    state = {
        username: this.props.username,
        balance: this.props.balance,
        amount: this.props.amount,
        address: "222 5th ne"
    }

    componentDidMount() {
        // Simple POST request with a JSON body using fetch
        fetch('http://localhost:3000/admin/tenantPayHistory')
            .then(response => response.json())
            .then(data => this.setState({ username: data.username,
                balance:data.balance, address:data.address}));
    }

    render() {
        console.log(this.state.balance);
        return (
            <div>
                <GridContainer>
                    <Card>
                        <CardBody>
                            <GridContainer direction="column">
                                <GridItem >
                                    <div className = "userAddress">
                                        Property Address: {this.state.address}
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <div className="payBlock">
                                        <h2>Your Current Balance</h2>
                                        <div className = "payContainer">
                                            <div className = "payColumn1">$ {this.state.balance}</div>
                                            <Button
                                                color="primary"
                                                onClick={this.props.isSB}
                                            >Pay Now</Button>
                                        </div>
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Button onClick={this.props.isSH}>Payment History</Button>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card >
                </GridContainer>

            </div>
        );
    }
}

export default TenantPayFirst;

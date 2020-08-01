import React, {Component} from 'react';
import Select from 'react-select';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

class OfficeCheckPay extends Component {

    state = {
        username: "apple",
        aptNo: [{label:251, value:1}, {label:252, value:2}],
        chosenAptNo: 251,
        paymentManagerHistory :
            [
                ["2020-03-12", "$1,200"],
                ["2020-02-8", "$1,200"]
            ]
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Select options={ this.state.aptNo } />
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardBody>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Date", "Paid Amount"]}
                                    tableData={this.state.paymentManagerHistory}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
export default OfficeCheckPay;

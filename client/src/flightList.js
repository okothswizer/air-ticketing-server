import React from "react";
import axios from "axios";
import flight from "./flight";
import loading from "./loading";
import Error from "./Error";
class flightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flightpayment: [],
                        loading: false,
                        error: false
                      };
                  }
            
                componentDidMount() {
                  this.fetchflightpayment();
                 }
            
                 fetchflightpayment() {
                     this.setState({ loading: true, error: false });
            
                     axios
                     .get("/api/flightpayment")
                         .then(response => {
                             this.setState({
                                 fligtpayment: response.data,
                                 loading: false,
                                 error: false
                             });
                         })
                         .catch(error => {
                             this.setState({
                                 flightpayment: [],
                                 loading: false,
                                 error: true
                             });
                         });
                 }
            
                  render() {
                      const{flightpayment,loading,error}= this.state;

                      if (loading) {

                      }
                      if (error) {
                          return<Error />;
                      }
                      
                          return (
                          <div className="mvls-container">
                              <div className="mvls-flight-list">
                                  {flightpayment.map(m => (
                                      <flight key={m.id} flightpayment={m} />
                                  ))}
                              </div>
                          </div>
                      );
                  }
              }
            
              export default flightList
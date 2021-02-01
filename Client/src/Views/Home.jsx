import Axios from 'axios';
import { Component } from 'react'
import { Card } from "react-bootstrap";

export default class HomeJobs extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      category: [],
      wcategory: [],
    };
  }

  WorksGet = () => {
    Axios
      .get("http://localhost:3001/Works")
      .then((response) => {
        this.setState({ works: (response.data) })
      })
      .catch((error) => {
        console.log(`There was an error: ${error}`);
      });
  }

  WorksCategory = () => {
    Axios
      .get("http://localhost:3001/Works/Categorias")
      .then((response) => {
        this.setState({ wcategory: (response.data),
        })
      })
      .catch((error) => {
        console.log(`There was an error: ${error}`);
      });
  }


  Category = () => {
    Axios
      .get("http://localhost:3001/Works/TipoCategorias")
      .then((response) => {
        this.setState({ category: (response.data) })
      })
      .catch((error) => {
        console.log(`There was an error: ${error}`);
      });
  }

  renderWorks() {
    return (
      <div className="App">

        {this.state.works.map((vall) => {
          return <Card key={vall.Work_ID}>
            <Card.Header>{vall.WorkType}</Card.Header>
            <Card.Body>{vall.Location}</Card.Body>
            <Card.Body>{vall.Position}</Card.Body>
            <Card.Body>{vall.Publish_Date}</Card.Body>
            <br />
            <br />
          </Card>

        })}
      </div>
    );
  }

  renderCategorias() {
    return (
      <div className="App">
        {this.state.wcategory.map((val) => {
          return <Card key={val.Work_ID}>
            <Card.Header>{val.WorkType}</Card.Header>
            <Card.Body>{val.Location}</Card.Body>
            <Card.Body>{val.Position}</Card.Body>
            <br />
            <br />
          </Card>

        })}


      </div>
    );
  }

  componentDidMount() {

    this.WorksGet();
    this.WorksCategory();
    this.Category();
  }
  render() {
    return (
        <div>
       
      {this.renderWorks()}
      
        </div>
    );

    
  }
  
}

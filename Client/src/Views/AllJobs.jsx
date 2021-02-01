import Axios from 'axios';

import { PureComponent } from 'react'
import { Card, ThemeProvider } from "react-bootstrap";
import ReactPaginate from 'react-paginate'
export default class AllJobs extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            works: [],
            category: [],
            wcategory: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 1,
            currentPage: 0
            
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    WorksCategory = () => {
        Axios
          .get("http://localhost:3001/Works/Categorias")
          .then((response) => {
            this.setState({ wcategory: (response.data)
                
            })
            const data = response.data
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData :response.data,
                wcategory:slice
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

      handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };
      loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			wcategory:slice
		})
	
    }

      renderCategorias() {
        return (
          <div className="App card-group text-center p-5 ml-5 ">
            {this.state.wcategory.map((val, i) => {
              return <Card className="w-25 bg-light mb-3"   key={val.Work_ID}>
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
        this.Category();
        this.WorksCategory();
    }

    render() {
        return (
            <div>
                <div className="container"> All Jobs
                        <select name="Categoria" className="Form-control" >

                        {this.state.category.map(e => (
                            <option key={e.Category_ID} value={e.Category_Name}>{e.Category_Name}</option>

                        ))}
                    </select>
                    
                </div>
                <div>
                      {this.renderCategorias()}      
                </div>

                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
             </div>
             

        );
    }
}   

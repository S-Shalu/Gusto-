import React, { Component } from "react";
import '../../Style/Filter.css'
import QueryString from "query-string";
import axios from "axios";


class Filter extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: [],
            pagecount: [],
            locations:[],
            mealtype:undefined,
            location:undefined,
            sort:undefined,
            cuisine:[],
            lcost:undefined,
            hcost:undefined,
            page:undefined

            
        }
    }

    
    componentDidMount() {
        const qs = QueryString.parse(this.props.location.search)
        const { mealtype,location} = qs


        const filterobj = {
            mealtype: mealtype,
            location:location
        }
        axios({
            url: 'http://localhost:7001/filter',
            headers: { 'content-type': 'application/json' },
            method: 'POST',
            data: filterobj
        }).then(res => {
            this.setState({ restaurant: res.data.restaurants,
                 pagecount: res.data.pageCount,
                 mealtype,location})
        }).catch()


        axios({
            url: "http://localhost:7001/locations",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }).then(
            res => {
              this.setState({ locations: res.data.Restaurant })
            }
          ).catch()
    }


    handleLocationChange=(event)=>{
        const location=event.target.value;
        const{mealtype, cuisine, page, sort, lcost, hcost }=this.state

        const filterobj = {
            mealtype,
            location,
            sort,
            lcost,
            hcost,
            page,
            cuisine
        }
        axios({
            url: 'http://localhost:7001/filter',
            headers: { 'content-type': 'application/json'},
            method: 'POST',
            data: filterobj
        }).then(res => {
            this.setState({ restaurant: res.data.restaurants, pagecount: res.data.pageCount,location })
        }).catch()

        
        this.props.history.push(`/filter?mealtype=${mealtype}&locationf=${location}&sort=${sort}`)

    }

    handleSortChange=(sort1)=>{
       
        const{mealtype,location,lcost,hcost}=this.state

        const filterobj={
            mealtype: mealtype,
            location:location,
            sort:sort1,
            lcost,
            hcost

        }

        axios(
            {
                url: 'http://localhost:7001/filter',
                headers: { 'content-type': 'application/json' },
                method: 'POST',
                data: filterobj  
            }
        ).then(res=>{
            this.setState({ restaurant: res.data.restaurants, pagecount: res.data.pageCount,sort:sort1})
        }).catch()

        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort1}&lcost=${lcost}&hcost=${hcost}`)
    }


    handleCostChange=(lcost,hcost)=>{
        const{mealtype,location,sort,page,cuisine,}=this.state

        const filterobj={
            mealtype: mealtype,
            location:location,
            sort,
            lcost,
            hcost,
            page,
            cuisine:cuisine.length > 0 ? cuisine : undefined

        }

        axios(
            {
                url: 'http://localhost:7001/filter',
                headers: { 'content-type': 'application/json' },
                method: 'POST',
                data: filterobj  
            }
        ).then(res=>{
            this.setState({ restaurant: res.data.restaurants,
                 pagecount: res.data.pageCount,
                 lcost,hcost})
        }).catch()

        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort}&lcost=${lcost}&hcost=${hcost}`)

    }

    handleCuisineChange=(cuisineId)=>{
        const { mealtype, location, cuisine, page, sort, lcost, hcost } = this.state;
        
        const index = cuisine.indexOf(cuisineId);
        if (index >= 0) {
            cuisine.splice(index, 1);
        }
        else {
            cuisine.push(cuisineId);
        }

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'http://localhost:7001/filter',
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurant: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    cuisine
                })
            })
            .catch( err => console.log(err))

            

    }

    handleNavigate=(res_Id)=>{

        this.props.history.push(`/details?res_Id=${res_Id}`)
    }
   

    handlePageChange=(page)=>{
        const{mealtype,location,lcost,hcost,sort}=this.state

        const filterobj={
            mealtype: mealtype,
            location:location,
            sort,
            lcost,
            hcost,
            page

        }

        axios(
            {
                url: 'http://localhost:7001/filter',
                headers: { 'content-type': 'application/json' },
                method: 'POST',
                data: filterobj  
            }
        ).then(res=>{
            this.setState({ restaurant: res.data.restaurants, pagecount: res.data.pageCount,page})
        }).catch()

        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort}&lcost=${lcost}&hcost=${hcost}&page=${page}`)
    }



    render() {
        const { restaurant,pagecount,locations } = this.state
        return (
            <>
            <div class="filter_box">
                
                
                <div className="bf_places">
                    Breakfast places in {restaurant.name}
                </div>
                <div className="ffilter_box row">
                    <div className="col-lg-3 col-md-3 col-sm-3">
                        <div className="ffilter"> Filters</div>
                        <br />
                        <div className="fSelect_location">Select location</div>

                        <select className="fselect" onChange={this.handleLocationChange}>
                        <option value="0">Select</option>
                            {locations.map((item,index)=>{
                               return <option key={index} value={item.location_id}>{item.name}</option>
                            })}
                            
                        </select> <br />


                        <div className="fcuisine">Cuisine</div>

                        <div className="fcheck_box">
                        <input type="checkbox" name="cuisine" onChange={()=>this.handleCuisineChange(1)} />  <label >North Indian</label><br />
                        <input type="checkbox" name="cuisine" onChange={()=>this.handleCuisineChange(2)}/>  <label > SouthIndian </label><br />
                        <input type="checkbox" name="cuisine" onChange={()=>this.handleCuisineChange(3)}/>  <label > Chinese  </label><br />
                        <input type="checkbox"  name="cuisine"onChange={()=>this.handleCuisineChange(4)}/>  <label > Fast Food </label><br />
                        <input type="checkbox" name="cuisine" onChange={()=>this.handleCuisineChange(5)}/>   <label > Street Food </label>
                        </div>

                        <div className="fcost_for_two" > Cost for two</div>

                        <div className="fradio_button">
                            <input type="radio" className=" radio_box" name="cost" onChange={()=>this.handleCostChange(1,500)} /><label >Less than Rs 500</label><br />
                            <input type="radio" className="radio_box" name="cost" onChange={()=>this.handleCostChange(500,1000)}/><label >Rs 500 to Rs 1000</label><br />
                            <input type="radio" className="radio_box" name="cost"onChange={()=>this.handleCostChange(1000,1500)} /><label >Rs 1000 to Rs 1500</label><br />
                            <input type="radio" className="radio_box" name="cost" onChange={()=>this.handleCostChange(1500,2000)}/><label > Rs 1500 to Rs 2000</label><br />
                            <input type="radio" className="radio_box" name="cost" onChange={()=>this.handleCostChange(2000)}/><label > Rs 2000 above</label><br />
                            <input type="radio" className="radio_box" name="cost" onChange={()=>this.handleCostChange(1,50000)}/><label >All</label>

                        </div>

                        <div className="fsort"> Sort</div>

                        <div className="fradio_button_sort">
                            <input type="radio" name="sort_box" onChange={()=>this.handleSortChange(1)}/><label >Price low to high</label><br />
                            <input type="radio" name="sort_box" onChange={()=>this.handleSortChange(-1)} /><label >Price high to low</label><br />
                        </div>
                    </div>

                </div>






                <div className="row" style={{ display: "inline-block" }}>
                    {restaurant&& restaurant.length>0 ? restaurant.map((item) => {
                        return (
                            <div className="fdetails"  >

                                <div className="fupper col-lg-8 col-md-8 col-sm-8" onClick={()=>this.handleNavigate(item._id)}>
                                    <div className="fimage_div"> <img src="../../../Assets/filterimage.png" className="fimage" /></div>

                                    <div className="fcontainer">
                                        <div className="fbig_chill">{item.name}</div>
                                        <div className="ffort">{item.locality}</div>
                                        <div className="faddress"> {`${item.locality},${item.city}`}</div>
                                    </div>
                                    <div className="fline"></div>

                                    <div className="fcuisine_box">
                                        CUISINE: <br />
                                        COST FOR TWO:
                                    </div>

                                    <div className="fbakery">
                                        {item.cuisine.map(m => `${m.name},`)}<br />
                                        {item.min_price}
                                    </div>

                                </div>

                            </div>
                        )


                    }):<div><h1>No Records found</h1></div>   }
                </div>

                
                    <div class="pagination">
                        <span class="page">&#8592;</span>
                        {pagecount.map((page,index)=>{
                            return<button onClick={()=>this.handlePageChange(page)} class="page">{page}</button>
                        })}
                        
                        <span class="page">&#8594;</span>
                    </div>

















            </div>
            </>


        )
    }
}


export default Filter



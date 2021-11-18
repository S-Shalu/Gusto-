import axios from 'axios';
import React, { Component } from 'react'
import Header from './Header'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '80%',
        'background-color': 'gainsboro'

    },
};




class Wallpaper extends Component {


    constructor() {
        super();
        this.state = {
            restaurantList: [],
            searchText: undefined,
            suggestions: []
        }
    }
    handleLocationchange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('loc', locationId)

        axios({
            url:`https://z-clone-be.herokuapp.com/${locationId}`,
            headers:{'Content-type':'application/json'},
            method:'GET'
        }).then(res=>{
                this.setState({restaurantList:res.data.body})
        }).catch()

    }


  


//try
handleInputChange = (event) => {
    const { restaurantList } = this.state;
    const searchText = event.target.value;

    let searchRestaurants = [];
    if (searchText) {
        searchRestaurants = restaurantList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    }

    this.setState({ suggestions: searchRestaurants, searchText });
}

selectedText = (resObj) => {
    this.props.history.push(`/details?restaurant=${resObj._id}`);
}

renderSuggestions = () => {
    const { suggestions, searchText } = this.state;

    if (suggestions.length == 0 && searchText == "") {
        return <ul >
            <li>No Search Results Found</li>
        </ul>
    }
    else{
    return (
        <ul >
            {
                suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
            }
        </ul>
    );
}
}





    render() {

        const { locationData } = this.props;
        const{suggestions}=this.state;
        return (
            <div>
               

                <img src="../../Assets/pic1.png" class="container-fluid wallpaper" alt="oops pic not available" />

                <div class=" box  container-fluid ">
                    <div class="row">
                        <div class="logo col-lg-12 col-md-12 col-sm-12">
                            <b>e!</b>
                        </div>
                    </div>

                    <div class="row">
                        <div class="Best_resturants ">Find the best restaurants, cafés, and bars</div>
                    </div>

                    <div class="row ">
                        <div class="col-sm-12 col-lg-12 col-md-12 check  ">
                            <select className="selection" onChange={this.handleLocationchange}>
                                <option value="0">Select</option>
                                {locationData.map((item, index) => {
                                    return <option key={index + 1} value={item.location_id}>{`${item.name},${item.city},${item.location_id}`} </option>
                                })

                                }
                            </select>

                            <i class="fas fa-search pos"></i>
                            <input type="text" placeholder="Search for resturants" class="input_type" style={{ width: "200px" }} onChange={this.handleInputChange} />
                                {this.renderSuggestions()}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



export default Wallpaper

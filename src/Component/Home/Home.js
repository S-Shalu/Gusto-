import React from 'react'
import '../../Style/Home.css'
import Wallpaper from '../Wallpaper'
import QuickSearch from '../QuickSearch'
import axios from 'axios'



class home extends React.Component {
  constructor() {
    super();
    this.state = {
      'locations': [],
      'mealtypes':[]
    }
  }
  componentDidMount() {
    sessionStorage.clear()
    axios({
      url: "https://z-clone-be.herokuapp.com/locations",
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(
      res => {
        this.setState({ locations: res.data.Restaurant })
      }
    ).catch()


    axios({
      url:"https://z-clone-be.herokuapp.com/mealtypes",
      method:'GET',
      headers:{"Content-Type":'application/json'}
    }).then(
      res=>{
        this.setState({mealtypes : res.data.body})
      }
    ).catch()


  }
  render() {
    const{locations,mealtypes}=this.state
    
    return (
      <>
        <Wallpaper locationData={locations}/>
        
        <QuickSearch mealtypeData={mealtypes} />
      </>
    )
  }
}

export default home
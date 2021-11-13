import React from "react";
import { withRouter } from "react-router-dom";

class QuickSearchItem extends React.Component{

  handlenavigate=(mealTypeId)=>{
    const  location =sessionStorage.getItem('loc')
    
    if(location)
      this.props.history.push(`/filter?mealtype=${mealTypeId}&location=${location}`)
      else
      this.props.history.push(`/filter?mealtype=${mealTypeId}`)

    
    
   
  }
    render(){
      const {QsItemData}=this.props
        return(
            <>
            
              


                <div key={QsItemData._id}  class="col-lg-4 col-md-6 col-sm-12  item" onClick={()=>this.handlenavigate(QsItemData.meal_type)}  >
                
                <div style={{display: "inline-block", width: "50%"}}>
                  <img src={QsItemData.image} style={{width: "100%", height: "160px"}}/>
                </div>
                <div class="second_half">
                  <div class="Breakfast">{QsItemData.name}</div>
                  <div class="Start"> {QsItemData.content}</div>
                </div>
           
        </div>

              
            
            </>
        )
    }
}

export default withRouter(QuickSearchItem)
import React, { Component } from 'react'

import QuickSearchItem from './QuickSearchItem'



class QuickSearch extends Component {

    render() {
        const { mealtypeData } = this.props;
        return (
            <div>
                <div class="container-fluid">
                    <div class="Quick-Searches" >
                        Quick Searchers
                    </div>
                    <div class="Discover">
                        Discover restaurants by type of meal
                    </div>

                </div>







                <div class="container-fluid">
                    <div class=" row blocks">

                        {mealtypeData.map((item,index) => { return <QuickSearchItem  QsItemData={item}/> })}

                    </div>
                </div>


            </div>
        )
    }
}



export default QuickSearch
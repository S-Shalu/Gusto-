import React from 'react';
import '../Style/Details.css'
import queryString from "query-string";
import axios from "axios";
import Modal from "react-modal";


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


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


class Details extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurant: {},
            menu: [],
            restaurant_Id: undefined,
            menuModalIsOpen: false,
            galleryModalIsOpen: false,
            formModalIsOpen:false,
            total:undefined,
            name:undefined,
            email:undefined,
            contact_number:undefined,
            address:undefined,
            check:{}

        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search)
        const { res_Id } = qs;



        axios({
            url: ` https://peaceful-headland-73196.herokuapp.com/resturantByResId/${res_Id}`,
            headers: { 'content-type': 'application/json' },
            method: 'GET',

        }).then(res => {
            this.setState({ restaurant: res.data.res_details, restaurant_Id: res_Id })
        }).catch()

    }


    handleOrder = () => {
        const { restaurant_Id, menuModalIsOpen } = this.state

        axios({
            url: ` https://peaceful-headland-73196.herokuapp.com/menuItemsByResId/${restaurant_Id}`,
            headers: { 'content-type': 'application/json' },
            method: 'GET',

        }).then(res => {
            this.setState({ menu: res.data.menu, menuModalIsOpen: true })
        }).catch()
    }


    handleItemQuantity=(index,operation)=>{
        const items=[...this.state.menu]
        let total1=0;
        const item=items[index]

        if(operation=='add')
        item.qty+=1;
        else
        item.qty-=1;

        items[index]=item;

        items.map(item=>{
            total1+=item.qty*item.price
        })

        this.setState({total:total1,menu:items})
        console.log(total1,"total");

    }


    handleGalleryModal = () => {
        this.setState({ galleryModalIsOpen: true })
    }
    handleFormModal=()=>{
        this.setState({formModalIsOpen:true})
    }

 
    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {
        return fetch(" https://peaceful-headland-73196.herokuapp.com/payment", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(`err${"this is very bad"}`))




        
    }

    Payments = () => {
        const { total, email } = this.state;
        console.log(email,"checking email")

        const paymentObj = {
            amount: total,
            email:email
        };

        this.getData(paymentObj).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            this.post(information)
        })
    }












    handleCloseModal = (state, value) => {

        this.setState({ [state]: value })
    }

    handleInputChange=(event,state)=>{
        this.setState({[state]:event.target.value})
    }


    render() {
        const { restaurant, menuModalIsOpen, menu, galleryModalIsOpen,formModalIsOpen,total,email } = this.state

        return (

            <div>
                
                <div>
                    <img src='../../Assets/filterimage.png' alt="No Image, Sorry for the Inconvinience" style={{ width: "100%", height: "350px" }} />

                    <button className="button" onClick={this.handleGalleryModal}>Click to see Image Gallery</button>
                </div>
                <div className="heading">{restaurant.name}</div>
                <button className="btn-order" onClick={this.handleOrder}>Place Online Order</button>

                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" checked />
                        <label for="tab-1">Overview</label>

                        <div className="content">
                            <div className="about">About this place</div>
                            <div className="head">Cuisine</div>
                            <div className="value">{restaurant && restaurant.cuisine && restaurant.cuisine.map((item) => `${item.name}, `)}</div>
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377;{restaurant.min_price}  for two people(approx)</div>
                        </div>
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" />
                        <label for="tab-2">Contact</label>
                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">{restaurant.contact_number}</div>
                            <div className="head">{restaurant.name}</div>
                            <div className="value">`{restaurant.city},{restaurant.locality}`</div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={menuModalIsOpen}
                    style={customStyles}>
                    <div>
                        <div style={{ float: 'right' }} className="fas fa-times" onClick={() => this.handleCloseModal('menuModalIsOpen', false)}></div>
                        <div >
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <h3 className="item-total">SubTotal:{total} </h3>
                            <button className="btn btn-danger order-button"onClick={
                               
                                ()=>{this.handleCloseModal('menuModalIsOpen',false)
                                this.handleCloseModal('formModalIsOpen',true)}
                               
                            } > Pay Now</button>

                            {menu.map((item,index) => {

                                return (

                                    <div style={{ width: '44rem', marginTop: '40px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                        <div className="card" style={{ width: '43rem', margin: 'auto' }}>
                                            <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>



                                                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>

                                                    <span className="card-body">
                                                        <h5 className="item-name">{item.name}</h5>
                                                        <h5 className="item-price">&#8377;{item.price}</h5>
                                                        <p className="item-descp">{item.description}</p>
                                                    </span>
                                                </div>

                                                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                    <img className="card-img-center title-img" src={`./${item.image}`} style={{
                                                        height: '90px',
                                                        width: '90px',
                                                        borderRadius: '20px',
                                                        marginTop: '10px',
                                                        marginLeft: '35px'
                                                    }} />

                                                    {item.qty==0?<div>
                                                        <button className="add-button" onClick={()=>this.handleItemQuantity(index,'add')}>Add</button>
                                                    </div>: 
                                                    
                                                    <div className="add-number">
                                                        <button style={{'border-radius':'20px'}} onClick={()=>this.handleItemQuantity(index,'subtract')}>-</button>
                                                        <span style={{ backgroundColor: 'white','font-size':'18px'}}>{item.qty}</span>
                                                        <button style={{'border-radius':'20px'}} onClick={()=>this.handleItemQuantity(index,'add')} >+</button>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>
                                
                            </div>
                        </div>
                    </div>
                </Modal>




                <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles}>
                    
                        <div className="fas fa-times cross " onClick={() => this.handleCloseModal('galleryModalIsOpen', false)}></div>

                        <div>
                        <Carousel>
                            
                            {restaurant && restaurant.thumb && restaurant.thumb.map((image) => {
                                return <div>
                                    <img src={`../${image}`} height="400px" />
                                </div>
                            })}
                        </Carousel>
                        </div>


                    

                </Modal>

                <Modal
                    isOpen={formModalIsOpen}
                    style={customStyles}>
                         <div style={{ float: 'right' }} className="fas fa-times" onClick={() => this.handleCloseModal('formModalIsOpen', false)}></div>
                        <div style={{width:'300px'}}>
                        <h3>{restaurant.name}</h3>
                        <label className="form-label">name</label> <input type="text" placeholder="Enter your name" className="form-control" onChange={(event)=>this.handleInputChange(event,'name')}/><br/>
                     
                        <label className="form-label">email</label> <input type="text"  placeholder="Enter your email" className="form-control" onChange={(event)=>this.handleInputChange(event,'email')}/><br/>
                       
                        <label className="form-label">contact number</label> <input type="tel" placeholder="Enter your contact number" className="form-control" onChange={(event)=>this.handleInputChange(event,'contact_number')}/><br/>
                        <label className="form-label">address</label> <textarea  placeholder="Enter your address" className="form-control" onChange={(event)=>this.handleInputChange(event,'address')}/>
                        </div>
                        <div>

                        <button   onClick={this.Payments} className="btn btn-danger  " style={{float:'right','margin-top':'10px'}}>Proceed </button>
                        </div>

                        
                        
                    </Modal>





            </div>

        )
    }
}

export default Details
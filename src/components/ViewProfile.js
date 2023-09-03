import React, { useContext } from 'react'
import useWindowSize from './useWindowSize'
import authContext from '../context'

const ViewProfile = () => {
    const size = useWindowSize()
    const { user } = useContext(authContext)


    return (
        <div className="authorpostbox">
            <div className="card" style={{
                color: "black",
                fontSize: "1.4rem",
                fontWeight: "650",
                border: "0",
                padding: "15px 40px",


            }}>
                <div className="card-block" >
                    <div className="row">
                        <h5 className="col-7" >Username</h5>
                        <h5 className="col-5" style={{
                            color: "#2691d9",

                        }} >{user?.name || ""}</h5>
                    </div>
                    {size.width <= 900 ?
                        <div className="row pt-3">
                            <h5 className="col-sm-12">Email</h5>
                            <h5 className="col-sm-12" style={{
                                color: "#2691d9",

                            }}>{user?.email || ""}</h5>
                        </div>
                        :
                        <div className="row pt-3">
                            <h5 className="col-7">Email</h5>
                            <h5 className="col-5" style={{
                                color: "#2691d9",

                            }}>{user?.email || ""}</h5>
                        </div>
                    }

                    <div className="row pt-3">
                        <h5 className="col-7">Phone Number</h5>
                        <h5 className="col-5" style={{
                            color: "#2691d9",

                        }}>{user?.phoneNumber || ""}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile
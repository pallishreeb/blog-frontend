import React from 'react'
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
const Slider = ({ mostViewedPosts }) => {

    const contentStyle = {
        color: '#fff',
        lineHeight: '160px',
        height: "400px",
        textAlign: 'center',
        // background: '#364d79',
        background: '#000',
        position: "relative",

    };

    const defaultImg = "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
    return (
        <Carousel autoplay effect="scrollx">
            {mostViewedPosts?.length > 0 && mostViewedPosts.map(item => (
                <div>
                    <div style={contentStyle}>
                        {/* <div className="row justify-content-center">
                      <div className="col-md-12"> */}
                        <Link to={`/post/${item._id}`}>
                        <img
                            style={{
                                opacity: "0.7",

                            }}
                            src={item.images[0] || defaultImg}
                            alt="thumbnsil-imsgr" className="d-block w-100 img"
                        />
                        </Link>

                        {/* </div>
                  </div> */}
                        <div style={{
                            position: "absolute",
                            zIndex: "999",
                            top: "31%",
                            color: " #fff",
                            margin: "0 auto",
                            left: "5%",
                            Right: "0",
                            textAlign: "center",
                            width: "40%",
                            padding: "0",
                            lineHeight: "1",
                            justifyContent: "center",
                            opacity: "2"
                        }}>
                            <p style={{
                                fontSize: "2.5rem",
                                fontWeight: "700"
                            }}>
                                {item.title}
                            </p>




                        </div>
                    </div>

                </div>
            ))}




        </Carousel>
    )
}

export default Slider
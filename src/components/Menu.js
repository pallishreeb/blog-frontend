import React, { useEffect, useState } from 'react'
import { Dropdown, Space,Menu as Menu1,MenuItemProps } from 'antd';
import { allCategories } from '../networkCalls/categories';
import { Link } from 'react-router-dom';
import { usePostApi } from '../context/PostProvider';


const Menu = () => {

    const [categories, setCategories] = useState([]);
    const { state, dispatch } = usePostApi()
    useEffect(() => {
        allCategories().then((res) => {
            setCategories(res)
            console.log("categories", res)
        }).catch((err) => {
            console.log("Error in fetch catgory", err)
        })
        
    }, [])
  

    const menu = () => 
       (
            <Menu1>
                {
                    categories?.length > 0 && categories?.map(category =>(

                        <Link to={`/post/category/${category._id}`} onClick={() =>{ 
                            dispatch({
                                type: "CLEAR_FILTERS"
                            })
                            dispatch({
                            type: "FILTER_POSTS_BY_CATEGORY",
                            payload: category._id
                        })
                        } }>
                            <Menu1.Item key={category._id}>{category.categoryName}</Menu1.Item>

                        </Link>
                      
                    ))
                }
            </Menu1>
        )
    return (
        <Space class="nav justify-content-center"
            style={{
                color: "#2691d9",
                gap: "40px",
                marginTop:"1rem"


            }}
        >
            <Dropdown
            overlay={menu}
               
                arrow={{
                    pointAtCenter: true,
                }}
                class="nav-item"
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Categories
                        <i className='fa fa-arrow-down' />
                    </Space>
                </a>
            </Dropdown>
       
              
        </Space>

    )
}

export default Menu
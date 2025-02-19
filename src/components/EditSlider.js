import UserName from "./userName";
import imgIcon from "../images/Group 429.svg";
import "../css/EditSlider.css";
import { useNavigate } from "react-router-dom";
import imgProduct from "../images/61GsnUB4HuL 2 (2).png";
import { useState } from "react";
import Swal from "sweetalert2";
//import { sliderID } from "./sliderID";
import { token } from "./token";
import { useEffect } from "react";

function EditSlider() {

       const handleDelete = () => {
        Swal.fire({
            title: "Delete Slider",
            text: "Are You Sure You want to delete Slider 1",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            customClass: {
                popup: "my-Popup",
                title: "my-title",
                confirmButton: "my-delete",
                cancelButton: "my-cancel",
            }
        })
        
    }

    const [title, setTitle] = useState("Title");

    const [description, setDescription] = useState("Description . . . ");

    const navigate = useNavigate();

    const handlNavigate = () => {
        navigate("/Slider");
    }

    const fetchData = async () => {
      await  fetch(`https://united-hanger-2025.up.railway.app/api/slider/2`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <div className="EditSlider-Departament">
            <div className="heading-EditSlider">
                <div className="col-image">
                    <img onClick={handlNavigate} src={imgIcon} alt="imgIcon" />
                    <p>Edit Slider</p>
                </div>
                <div className="col-UserName">
                    <UserName/>
                </div>
            </div>
            <div className="col-product-Edit">
                <div className="col-image-product">
                    <img src={imgProduct} alt="imgProduct"/>
                </div>
                <div className="content-product-Edit">
                    <div className="col-title">
                        <p>Title</p>
                        <input
                            onFocus={() => {
                                setTitle("")
                            }}
                            onBlur={() => {
                                setTitle("Title")
                            }}
                            type="text" placeholder={title} />
                    </div>
                    <div className="col-description">
                        <p>Description</p>
                        <input
                            onFocus={() => {
                                setDescription("")
                            }}
                            onBlur={() => {
                                setDescription("Description . . . ")
                            }}
                            type="text" placeholder={description} />
                    </div>
                </div>
            </div>
            <div className="col-Delete-Edit">
                <button onClick={handleDelete} className="delete">Delete</button>
                <button className="Edit">Edit</button>
            </div>
       </div> 
    )
}
export default EditSlider;
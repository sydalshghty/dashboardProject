import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgReturn from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/addNewMaterial.css";
import { refreshAccessToken } from "./TokenContext"; // تأكد من أن refreshAccessToken موجود في ملف token.js

function AddNewMaterial() {
  const [namePlaceholder, setNamePlaceholder] = useState("Name");
  const [nameMaterial, setNameMaterial] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/RowMaterial");
  };

  // دالة لإضافة المادة الجديدة
  const AddNewMaterial = async () => {
    const formData = new FormData();
    formData.append("name", nameMaterial);

    // محاولة لتحديث التوكن إذا كان منتهيًا
    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found, please login again.");
      navigate("/login");
      return;
    }

    const response = await fetch("https://united-hanger-2025.up.railway.app/api/materials/new", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    // التحقق من حالة التوكن
    if (response.status === 401) { // التوكن منتهي الصلاحية
      console.warn("Access token expired, refreshing...");
      accessToken = await refreshAccessToken(); // حاول تحديث التوكن
      if (!accessToken) {
        console.error("Failed to refresh token, please login again.");
        navigate("/login");
        return;
      }

      // إذا تم تحديث التوكن بنجاح، أعد إرسال الطلب مع التوكن الجديد
      const retryResponse = await fetch("https://united-hanger-2025.up.railway.app/api/materials/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await retryResponse.json();
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <div className="Add-New-Material-Departament">
      <div className="heading-AddNewMaterial">
        <div className="col-material">
          <img onClick={handleNavigate} src={imgReturn} alt="imgReturn" />
          <p>Add New Material</p>
        </div>
        <div className="col-userName">
          <UserName />
        </div>
      </div>
      <div className="col-input-material">
        <p>Name</p>
        <input
          onFocus={() => {
            setNamePlaceholder("");
          }}
          onBlur={() => {
            setNamePlaceholder("Name");
          }}
          onChange={(e) => {
            setNameMaterial(e.target.value);
          }}
          type="text"
          placeholder={namePlaceholder}
          name="Name-Material"
        />
      </div>
      <div className="Cancel-And-Delete">
        <button className="cancel">Cancel</button>
        <button
          className="submit"
          onClick={() => {
            AddNewMaterial();
            handleNavigate();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddNewMaterial;

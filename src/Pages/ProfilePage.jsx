import React, { useContext, useEffect, useState } from "react";
import doctor from "../assets/doctor.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { dbObject, experienceList } from "../Helper/Constants";
import Select from "react-select";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";

function ProfilePage() {
  const { _id, setAlert, user } = useContext(Context);
  const [imagePreview, setImagePreview] = useState(null);
  const [graduationDate, setgraduationDate] = useState("");

  const [loading, setloading] = useState(false);
  const [roleList, setroleList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [dropdownData, setDropdownData] = useState({
    gender: "Select Gender",
    role: 0,
    subRole: "Select Sub-Role",
    state: "0",
    experience: "0",
  });

  const [isDropdownOpen, setDropdownOpen] = useState({
    gender: false,
    role: false,
    subRole: false,
    state: false,
    experience: false,
  });

  const [textField, setTextField] = useState({
    bio: user != null ? user.bio : "",
    firstName: user != null ? user.firstName : "",
    lastName: user != null ? user.lastName : "",
    dob: user != null ? user.dob : "",
    role: user != null ? user.roleTitle : "",
    subRole: user != null ? user.subRole : "",
    city: user != null ? user.city : "",
    address: user != null ? user.address : "",
    email: user != null ? user.email : "",
    phone: user != null ? user.phone : "",
    post: JSON.parse(user !== null ? user?.post : "[]"),
    employmentType: JSON.parse(user !== null ? user?.employmentType : "[]"),
    specialization: JSON.parse(user !== null ? user?.specialization : "[]"),
    workSetting: JSON.parse(user !== null ? user?.workSetting : "[]"),
    graduationType: JSON.parse(user !== null ? user?.graduationType : "[]"),
    // graduationDate: user != null ? user.graduationDate : "",
  });

  useEffect(() => {
    setTextField({
      bio: user != null ? user.bio : "",
      firstName: user != null ? user.firstName : "",
      lastName: user != null ? user.lastName : "",
      dob: user != null ? user.dob : "",
      role: user != null ? user.roleTitle : "",
      subRole: user != null ? user.subRole : "",
      city: user != null ? user.city : "",
      address: user != null ? user.address : "",
      email: user != null ? user.email : "",
      phone: user != null ? user.phone : "",
      post: JSON.parse(user !== null ? user?.post : "[]"),
      employmentType: JSON.parse(user !== null ? user?.employmentType : "[]"),
      specialization: JSON.parse(user !== null ? user?.specialization : "[]"),
      workSetting: JSON.parse(user !== null ? user?.workSetting : "[]"),
      graduationType: JSON.parse(user !== null ? user?.graduationType : "[]"),
    });
    setgraduationDate(user != null ? user.graduationDate : "");
    setImagePreview(user?.image ?? null);
    setDropdownData({
      gender: user?.gender,
      role: user?.roleId,
      experience: user?.experience,
      state: user?.state,
      subRole: user?.subRole,
    });
  }, [user]);

  const handleDropdownChange = (dropdownName, value) => {
    setDropdownOpen((prevValues) => ({
      ...prevValues,
      [dropdownName]: value,
    }));
  };

  const handleDropdownData = (dropdownName, value) => {
    setDropdownData((prevValues) => ({
      ...prevValues,
      [dropdownName]: value,
    }));
    // if (dropdownName === "role") {
    //   handleDropdownData("subRole", "Choose Sub Role");
    //   if (roleList[value].subRoles !== "NULL") {
    //     setSubRoleList(JSON.parse(roleList[value].subRoles));
    //   } else {
    //     setSubRoleList([]);
    //   }
    //   let temp = [];
    //   setselectedPostList([]);
    //   if (roleList[value].posts !== "NULL") {
    //     const parsedPosts = JSON.parse(roleList[value].posts);
    //     temp = parsedPosts.map((data) => ({ label: data, value: data }));
    //     setpostList(temp);
    //   } else {
    //     setpostList([]);
    //   }

    //   if (roleList[value].employmentType !== "NULL") {
    //     const parsedEmplo = JSON.parse(roleList[value].employmentType);
    //     temp = parsedEmplo.map((data) => ({ label: data, value: data }));
    //     setemploymentTypeList(temp);
    //   } else {
    //     setemploymentTypeList([]);
    //   }

    //   if (roleList[value].specialization !== "NULL") {
    //     const parsedSpeci = JSON.parse(roleList[value].specialization);
    //     temp = parsedSpeci.map((data) => ({ label: data, value: data }));
    //     setspeciList(temp);
    //   } else {
    //     setspeciList([]);
    //   }

    //   if (roleList[value].workSetting !== "NULL") {
    //     const parsedWork = JSON.parse(roleList[value].workSetting);
    //     temp = parsedWork.map((data) => ({ label: data, value: data }));
    //     setworkSettingList(temp);
    //   } else {
    //     setworkSettingList([]);
    //   }
    //   if (roleList[value].graduationType !== "NULL") {
    //     const parsedWork = JSON.parse(roleList[value].graduationType);
    //     temp = parsedWork.map((data) => ({ label: data, value: data }));
    //     setgraduationTypeList(temp);
    //   } else {
    //     setgraduationTypeList([]);
    //   }
    // }
  };

  const handleInputChange = (e) => {
    setTextField({
      ...textField, // Preserve existing values
      [e.target.name]: e.target.value,
    });
  };

  // ---------------functions----------------->

  useEffect(() => {
    fetchRole();
    fetchState();
  }, []);

  const handleClick = () => {
    document.getElementById("imageInput").click();
  };
  async function uploadImage() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("mediaFile", _id("imageInput").files[0]);
      const response = await dbObject.post("/users/update-dp.php", formData);
      setLoading(false);
      setAlert({
        content: response.data.message,
        isDanger: response.data.error,
      });
    } catch (error) {
      setloading(false);
      setAlert({
        content: "Sorry for inconvenience! Please try again.",
        isDanger: true,
      });
    }
  }
  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      uploadImage();
    }
  };

  async function fetchRole() {
    const response = await dbObject.get("/role/fetch-roles.php");
    if (!response.data.error) {
      setroleList(response.data.response);
    }
  }

  async function fetchState() {
    const response = await dbObject.get("/states/fetch-states.php");
    if (!response.data.error) {
      setStateList(response.data.response);
    }
  }

  async function updateProfile() {
    try {
      setloading(true);
      const formData = new FormData();

      formData.append("bio", _id("bio").value);
      formData.append("firstName", _id("firstName").value);
      formData.append("lastName", _id("lastName").value);
      formData.append("dob", _id("dob").value);
      formData.append("experience", dropdownData.experience);
      formData.append("gender", dropdownData.gender);
      formData.append("subRole", dropdownData.subRole);
      formData.append("specialization", user?.specialization);
      formData.append("post", user?.post);
      formData.append("phone", phone);
      formData.append("email", _id("email").value);
      formData.append("address", _id("address").value);
      formData.append("city", _id("city").value);
      formData.append("state", dropdownData.state);
      formData.append("roleId", roleList[dropdownData.role]?.id);
      formData.append("employmentType", user?.employmentType);
      formData.append("workSetting", user?.workSetting);
      formData.append("graduationType", user?.graduationType);
      formData.append("graduationDate", graduationDate);
      formData.append("fcmToken", "");

      const response = await dbObject.post(
        "/users/update-profile.php",
        formData
      );

      setAlert({
        content: response.data.message,
        isDanger: response.data.error,
      });

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  return (
    <Scaffold isLoading={loading || user === null}>
      <div className="pt-20 md:pb-10 text-black">
        <div className="items-start bg-[#f8f8f8] p-2 rounded-[20px] mx-5 md:w-[70%] md:mx-auto">
          <div className="bg-white rounded-[20px] p-10 items-center ">
            <h1 className="text-[20px] mb-4">Update Profile</h1>

            <input
              id="imageInput"
              className="hidden"
              type="file"
              accept=".jpeg, .jpg, .png, .webp"
              onChange={handleImageChange}
            />

            <button
              onClick={handleClick}
              className="bg-gray-100 h-[100px] w-[100px] rounded-full mb-10"
            >
              <img
                id="imagePreview"
                src={imagePreview ?? user?.image}
                className="h-full object-cover rounded-full"
              />
            </button>

            <form
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                updateProfile();
              }}
            >
              {/* Bio */}
              <div className="relative z-0 w-full mb-6 group">
                <textarea
                  type="text"
                  name="bio"
                  id="bio"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  value={textField.bio}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label
                  htmlFor="bio"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Bio
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                {/* Firstmname */}
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                    value={textField.firstName}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <label
                    htmlFor="firstName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>

                {/* Lastname */}
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={textField.lastName}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <label
                    htmlFor="lastName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  value={textField.dob}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label
                  htmlFor="dob"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  DOB
                </label>
              </div>

              {/* Gender Drop */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Select Gender</p>
                <div className="w-full mb-6">
                  <button
                    onClick={() => {
                      handleDropdownChange("gender", !isDropdownOpen.gender);
                    }}
                    id="genderDropdownBtn"
                    className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                    type="button"
                  >
                    {dropdownData.gender === "M"
                      ? "Male"
                      : dropdownData.gender === "F"
                      ? "Female"
                      : "Others"}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="genderDropdown"
                    name="genderDropdown"
                    className={`${
                      isDropdownOpen.gender ? "absolute" : "hidden"
                    } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                  >
                    <ul
                      className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                      aria-labelledby="dropdownSearchButton"
                    >
                      <li>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("gender", "M");
                            handleDropdownChange("gender", false);
                          }}
                        >
                          Male
                        </div>
                      </li>
                      <li>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("gender", "F");
                            handleDropdownChange("gender", false);
                          }}
                        >
                          Female
                        </div>
                      </li>
                      <li>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("gender", "O");
                            handleDropdownChange("gender", false);
                          }}
                        >
                          Others
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Role text field */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  readOnly
                  value={textField.role}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label
                  htmlFor="role"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Role
                </label>
              </div>

              {/* Sub Role Dropdown */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="subRole"
                  id="subRole"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  readOnly
                  value={textField.subRole}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label
                  htmlFor="subRole"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Sub-Role
                </label>
              </div>

              {/* Multi-select Post */}
              <MultiSelectedData
                label="Selected Post"
                dataList={textField?.post}
              />

              {/* Multi-select Emplo */}
              <MultiSelectedData
                label="Selected Employement Type"
                dataList={textField?.employmentType}
              />

              {/* Multi-select Speci */}
              <MultiSelectedData
                label="Selected Specialization"
                dataList={textField?.specialization}
              />

              {/* Multi-select work */}
              <MultiSelectedData
                label="Selected Work Setting"
                dataList={textField?.workSetting}
              />

              {/* Multi-select grad */}
              <MultiSelectedData
                label="Selected Graduation Type"
                dataList={textField?.graduationType}
              />
              {/* Graduation years */}
              {textField.role === "Student" ? (
                <div className="relative z-0 w-full mb-6 mt-6 group">
                  <input
                    type="text"
                    name="graduationDate"
                    id="graduationDate"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                    value={graduationDate}
                    onChange={(e) => {
                      // handleInputChange(e);
                      setgraduationDate(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="graduationDate"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Graduation Date
                  </label>
                </div>
              ) : (
                <></>
              )}

              {/* experience Dropdown */}
              <p className="text-sm text-gray-500 mb-2 mt-6">
                Select Experience
              </p>
              <div className="relative z-2 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange(
                      "experience",
                      !isDropdownOpen.experience
                    );
                  }}
                  id="experienceDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  type="button"
                >
                  {dropdownData.experience}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="experienceDropdown"
                  name="experienceDropdown"
                  className={`${
                    isDropdownOpen.experience ? "absolute" : "hidden"
                  } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                >
                  <ul
                    className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {experienceList.map((data, index) => (
                      <li key={index}>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("experience", data);
                            handleDropdownChange("experience", false);
                          }}
                        >
                          {data}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={textField.city}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label
                  htmlFor="city"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  City
                </label>
              </div>

              {/* state Dropdown */}
              <p className="text-sm text-gray-500 mb-2 mt-6">Select State</p>
              <div className="relative z-2 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange("state", !isDropdownOpen.state);
                  }}
                  id="stateDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  type="button"
                >
                  {dropdownData.state}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="stateDropdown"
                  name="stateDropdown"
                  className={`${
                    isDropdownOpen.state ? "absolute" : "hidden"
                  } z-10 bg-white rounded-lg shadow w-[100%] light:bg-gray-700 pt-5 max-h-[200px] overflow-y-auto`}
                >
                  <ul
                    className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {stateList.map((data, index) => (
                      <li key={index}>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("state", data.stateName);
                            handleDropdownChange("state", false);
                          }}
                        >
                          {data.stateName}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 mt-6 group">
                <textarea
                  type="text"
                  name="address"
                  id="address"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  value={textField.address}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label
                  htmlFor="address"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  readOnly
                  value={textField.email}
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  E-mail
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  maxLength={10}
                  name="phone"
                  id="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  readOnly
                  value={textField.phone}
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone
                </label>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export default ProfilePage;

function MultiOptionsPill({ label }) {
  return (
    <div className="bg-gray-600 text-sm text-white px-3 py-2 rounded-full">
      {label}
    </div>
  );
}

function MultiSelectedData({ label, dataList }) {
  return (
    <div className={`${dataList.length === 0 ? "hidden" : ""} mb-5`}>
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex flex-wrap md:mt-2 mt-2 gap-2">
        {dataList.map((data, index) => (
          <div key={index}>
            <MultiOptionsPill label={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

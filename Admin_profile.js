// import React, { useState, useEffect, useRef } from "react";
// import "./Admin_profile.css";

// const Admin_profile = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedDetails, setEditedDetails] = useState({});

//   useEffect(() => {
//     const userId = "ab32b4fc-e176-408a-8b16-843480daf1bc";
//     const storedProfileImage = localStorage.getItem("profileImage");

//     fetch(
//       `https://gym-management-2.onrender.com/accounts/admin_register?id=${userId}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setUserDetails(data);
//         setEditedDetails(data);
//         setProfileImage(storedProfileImage || "profile.png");
//       })
//       .catch((error) => {
//         console.error("Error fetching user details:", error);
//       });
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setProfileImage(base64String);
//         localStorage.setItem("profileImage", base64String);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setEditedDetails({ ...userDetails });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedDetails({ ...editedDetails, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(
//         `https://gym-management-2.onrender.com/accounts/admin_register?id=${userDetails.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(editedDetails),
//         }
//       );

//       if (response.ok) {
//         setUserDetails(editedDetails);
//         setIsEditing(false);
//       } else {
//         console.error("Failed to update user details");
//       }
//     } catch (error) {
//       console.error("Error updating user details:", error);
//     }
//   };

//   if (!userDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <Header />
//       <ProfileSection
//         userDetails={userDetails}
//         profileImage={profileImage}
//         handleImageChange={handleImageChange}
//       />
//       <InfoSection
//         userDetails={isEditing ? editedDetails : userDetails}
//         isEditing={isEditing}
//         handleEditToggle={handleEditToggle}
//         handleInputChange={handleInputChange}
//         handleSave={handleSave}
//       />
//     </div>
//   );
// };
import React, { useState, useEffect, useRef } from "react";
import "./Admin_profile.css";

const Admin_profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (!storedUserData) {
      console.error("User data not found in local storage");
      return;
    }

    try {
      const userData = JSON.parse(storedUserData);
      const userId = userData.user_id;

      if (!userId) {
        console.error("User ID not found in stored user data");
        return;
      }

      fetch(
        `https://gym-management-2.onrender.com/accounts/admin_register?id=${userId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUserDetails(data);
          setEditedDetails(data);
          setProfileImage(storedProfileImage || "profile.png");
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
        localStorage.setItem("profileImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedDetails({ ...userDetails });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        console.error("User data not found in local storage");
        return;
      }

      const userData = JSON.parse(storedUserData);
      const userId = userData.user_id;

      if (!userId) {
        console.error("User ID not found in stored user data");
        return;
      }

      const response = await fetch(
        `https://gym-management-2.onrender.com/accounts/admin_register?id=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedDetails),
        }
      );

      if (response.ok) {
        setUserDetails(editedDetails);
        setIsEditing(false);
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, ...editedDetails })
        );
      } else {
        console.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <ProfileSection
        userDetails={userDetails}
        profileImage={profileImage}
        handleImageChange={handleImageChange}
      />
      <InfoSection
        userDetails={isEditing ? editedDetails : userDetails}
        isEditing={isEditing}
        handleEditToggle={handleEditToggle}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
    </div>
  );
};

// ... (rest of the components remain the same)

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="logo">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img src="logo2.png" alt="My Image" />
      </div>
      <nav className={menuOpen ? "nav-open" : ""}>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          {/* <li>
            <Link to="/shop">Shop</Link>
          </li> */}
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">Plans</a>
          </li>
          <li>
            <a href="#">Testimonials</a>
          </li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

const ProfileSection = ({ userDetails, profileImage, handleImageChange }) => {
  const fileInputRef = useRef(null);

  const handleEditProfilePicture = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="profile-section">
      <div className="profile-picture">
        <img
          src={profileImage || "profile.png"}
          alt="Profile"
          className="profile-img"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <button className="edit-profile-btn" onClick={handleEditProfilePicture}>
        Edit Profile Picture
      </button>
      <div className="profile-info">
        <h3>
          {userDetails.first_name} {userDetails.last_name}
        </h3>
        <p>{userDetails.email}</p>
      </div>
    </section>
  );
};

const InfoSection = ({
  userDetails,
  isEditing,
  handleEditToggle,
  handleInputChange,
  handleSave,
}) => (
  <section className="info-section">
    <InfoBox
      title="ADMIN INFORMATION"
      fields={userFields(userDetails)}
      isEditing={isEditing}
      handleEditToggle={handleEditToggle}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
    />
  </section>
);

const InfoBox = ({
  title,
  fields,
  isEditing,
  handleEditToggle,
  handleInputChange,
  handleSave,
}) => (
  <div className="info-box">
    <h2>{title} :</h2>
    <div className="info-grid">
      {fields.map(
        (
          {
            label,
            name,
            value,
            type,
            maxLength,
            minLength,
            readOnly,
            nullable,
            enumValues,
          },
          index
        ) => (
          <div className="info-item" key={index}>
            <label>{label}</label>
            {enumValues ? (
              <select
                name={name}
                value={value}
                onChange={handleInputChange}
                disabled={!isEditing || readOnly}
              >
                {enumValues.map((enumValue) => (
                  <option key={enumValue} value={enumValue}>
                    {enumValue}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
                maxLength={maxLength}
                minLength={minLength}
                readOnly={!isEditing || readOnly}
                required={!nullable}
              />
            )}
          </div>
        )
      )}
    </div>
    <div className="edit-actions">
      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEditToggle}>Edit</button>
      )}
    </div>
  </div>
);

const userFields = (userDetails) => [
  {
    label: "Username",
    name: "username",
    value: userDetails.username,
    type: "text",
    readOnly: true,
  },
  {
    label: "First Name",
    name: "first_name",
    value: userDetails.first_name,
    type: "text",
    maxLength: 50,
    minLength: 1,
  },
  {
    label: "Last Name",
    name: "last_name",
    value: userDetails.last_name,
    type: "text",
    maxLength: 50,
    minLength: 1,
  },
  {
    label: "Email",
    name: "email",
    value: userDetails.email,
    type: "email",
    maxLength: 100,
    minLength: 5,
  },
  {
    label: "Phone Number",
    name: "phone_number",
    value: userDetails.phone_number,
    type: "text",
    maxLength: 15,
    minLength: 10,
  },
  {
    label: "Country",
    name: "country",
    value: userDetails.country,
    type: "text",
    maxLength: 50,
  },
  {
    label: "Gym_Name",
    name: "gym_name",
    value: userDetails.gym_name,
    type: "text",
    maxLength: 50,
  },
  {
    label: "Gym_Address",
    name: "gym_address",
    value: userDetails.gym_address,
    type: "text",
    maxLength: 50,
  },
  {
    label: "Gym_Phone_Number",
    name: "gym_phone_number",
    value: userDetails.gym_phone_number,
    type: "text",
    maxLength: 50,
  },
];

export default Admin_profile;

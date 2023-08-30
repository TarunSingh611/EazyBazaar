import { useState, useEffect } from "react";
import styles from "./adminAdd.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import { toast } from "react-toastify";
import { verifyToken } from "../../api/apiVerifyToken";

function AddProduct() {
  const [data, setData] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken()
      .then((res) => {
        if (res.result === 0) {
          navigate("/login");
        }
        if (res == 1) {
          if (res.user.isSeller === 1) {
            setData(res.user);
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("REQUIRED FIELD EMPTY");

      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("Category", category);
    formData.append("Stock", stock);
    formData.append("ImageFile", image);
    formData.append("Img", image.name);

    fetch("https://localhost:3000/adminAdd", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 0) {
          toast.error("REQUIRED FIELD EMPTY");
        } else if (data.result === 1) {
          toast.error("No file uploaded");
        } else if (data.result === 2) {
          toast.success("Upload Successful");
          resetForm();
        } else if (data.result === -1) {
          toast.error("coding");
        } else {
          toast.error("Error");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };

  const validateForm = () => {
    if (!image) {
      toast.error("No image uploaded");
      return false;
    }

    const fileSize = image.size; // Size in bytes
    const fileType = image.type; // File type

    const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 250 * 1024; // 250 KB

    if (fileSize > maxSize) {
      toast.error("Image size exceeds the allowed limit of 250KB.");
      return false;
    }

    if (!allowedExtensions.includes(fileType)) {
      toast.error(
        "Invalid image type. Only JPEG, JPG, and PNG files are allowed."
      );
      return false;
    }

    if (!/^\d+(\.\d{2})?$/.test(price)) {
      toast.error(
        "Invalid price format. Price should be a decimal number with two decimal places."
      );
      return false;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(stock)) {
      toast.error(
        "Invalid stock format. Stock should be an integer or decimal number."
      );
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setStock("");
    setImage(null);
  };

  return (
    <>
      {data && <Header user={data} />}

      <div className={styles.container}>
        <h1 className={styles.title}>WELCOME ADMIN</h1>
        <div className={styles.formContainer}>
          <form
            id="uploadForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />

            <label className={styles.label} htmlFor="desc">
              Description:
            </label>
            <textarea
              className={styles.inputField}
              id="desc"
              name="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <br />

            <label className={styles.label} htmlFor="price">
              Price:
            </label>
            <input
              className={styles.inputField}
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              pattern="\d+(\.\d{1,2})?"
              title="Please enter a valid decimal number (up to 2 decimal places)"
            />
            <div className={styles.error} id="priceError"></div>
            <br />

            <label className={styles.label} htmlFor="cat">
              Category:
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="cat"
              name="cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <br />

            <label className={styles.label} htmlFor="stock">
              Stock:
            </label>
            <input
              className={styles.inputField}
              type="number"
              id="stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <div className={styles.error} id="stockError"></div>
            <br />

            <label className={styles.label} htmlFor="pfp">
              Product Image:
            </label>
            <input
              className={styles.fileField}
              type="file"
              id="pfp"
              name="pfp"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className={styles.error} id="imageError"></div>
            <br />

            <button className={styles.submitButton} type="submit">
              ADD PRODUCT
            </button>
          </form>
        </div>
      </div>
      <a href="/admin">
        <div className={styles.addProd}>&#8634;</div>
      </a>
    </>
  );
}

export default AddProduct;

import React from "react";
import { useState, useEffect } from "react";
import Link from "../components/Link/Link.";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const [input, setInput] = useState("");
  const [urls, setUrls] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [formData, setFormData] = useState([]);
  const [urlEndPoint, setUrlEndPoint] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(false);
  const [schemaType, setSchemaType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [checkboxes, setCheckboxes] = useState({
    Product: { checked: false, disabled: false },
    Arcticle: { checked: false, disabled: false },
    Organiztion: { checked: false, disabled: false },
    FAQ: { checked: false, disabled: false },
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const fileContent = await readFileContent(file);
        const foundUrls = findUrlsInText(fileContent);
        setUrls(foundUrls);
        console.log(urls);
        setInputArray(foundUrls);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        resolve(content);
      };

      reader.onerror = (event) => {
        reject(new Error("Error reading the file."));
      };

      reader.readAsText(file);
    });
  };

  const findUrlsInText = (text) => {
    // Improved URL regex pattern
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*[^,\s]/gi;
    const matches = text.match(urlRegex);
    return matches || [];
  };

  //  Add URL
  const handleAddInput = () => {
    if (input.trim() !== "") {
      setInputArray([...inputArray, input]);
      setInput(""); // Clear the input field
    }
  };

  //  Remove URL
  const handleRemoveUrl = (index) => {
    if (index >= 0 && index < inputArray.length) {
      const updatedURL = [...inputArray];
      updatedURL.splice(index, 1);
      setInputArray(updatedURL);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCheckboxChange = (checkboxName) => {
    // Toggle the checked state for the selected checkbox
    setCheckboxes((prevCheckboxes) => ({
      ...Object.keys(prevCheckboxes).reduce((newCheckboxes, key) => {
        newCheckboxes[key] = {
          checked: key === checkboxName ? !prevCheckboxes[key].checked : false,
          disabled:
            key !== checkboxName ? prevCheckboxes[checkboxName].checked : false,
        };
        return newCheckboxes;
      }, {}),
    }));

    // Call different URL end points based on the selected checkbox
    if (checkboxName === "Product" && checkboxes.Product.checked) {
      setUrlEndPoint("findProductSchema");
    } else if (checkboxName === "Arcticle" && checkboxes.Arcticle.checked) {
      setUrlEndPoint("findArticleSchema");
    } else if (
      checkboxName === "Organiztion" &&
      checkboxes.Organiztion.checked
    ) {
      setUrlEndPoint("findOrganiztionSchema");
    } else if (checkboxName === "FAQ" && checkboxes.FAQ.checked) {
      setUrlEndPoint("findFAQSchema");
    }
  };

  function areAllCheckboxesFalse(checkboxes) {
    for (const checkboxName in checkboxes) {
      if (
        checkboxes.hasOwnProperty(checkboxName) &&
        checkboxes[checkboxName].checked
      ) {
        return false; // Return false as soon as we find a checked checkbox
      }
    }
    return true; // If no checked checkboxes are found, return true
  }

  // Submit Form
  const handelSubmit = async (event) => {
    event.preventDefault();

    const allCheckboxesFalse = areAllCheckboxesFalse(checkboxes);
    const url = `${import.meta.env.VITE_APP_API_URL}/${urlEndPoint}`;

    if (allCheckboxesFalse === true || inputArray.length === 0) {
      return setIsModalOpen(true);
    }
    setIsLoading(true);

    try {
      // Make the POST request
      const response = await axios.post(url, { url: inputArray });

      const { data } = response.data;

      // Handle the success response
      console.log("POST request successful:", response.data);

      if (data.URL_ListArray_WithOut__Shcema.length === 0) {
        setTitle(true);
      }

      setFormData(data.URL_ListArray_WithOut__Shcema);
      setSchemaType(data.schemaType);
      setIsLoading(false);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error making POST request:", error);
    }
  };

  useEffect(() => {
    // Check for checkbox changes and update urlEndPoint accordingly
    if (checkboxes.Product.checked) {
      setUrlEndPoint("findProductSchema");
    } else if (checkboxes.Arcticle.checked) {
      setUrlEndPoint("findArticleSchema");
    } else if (checkboxes.Organiztion.checked) {
      setUrlEndPoint("findOrganiztionSchema");
    } else if (checkboxes.FAQ.checked) {
      setUrlEndPoint("findFAQSchema");
    }
  }, [checkboxes]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className=' px-2 bg-primary-100 py-10 min-h-[100vh]'>
      <h1 className=' basis-10 py-2 px-2 font-montserrat text-sm font-bold'>
        Choose Schema Type To Check :
      </h1>
      <div className='flex flex-wrap gap-3 p-2 it'>
        {Object.keys(checkboxes).map((key) => (
          <div key={key} className='flex items-center gap-2'>
            <input
              key={key}
              className='checkbox checkbox-error'
              type='checkbox'
              checked={checkboxes[key].checked}
              disabled={checkboxes[key].disabled}
              onChange={() => handleCheckboxChange(key)}
            />

            <span className='label-text'>{key}</span>
          </div>
        ))}
      </div>
      <h1 className=' basis-10 py-2 px-2 font-montserrat text-sm font-bold'>
        Enter URL Bellow:
      </h1>
      <div className=''>
        <div className='flex gap-3'>
          <input
            className='p-2'
            type='text'
            placeholder='Enter URL'
            value={input}
            onChange={handleInputChange}
          />

          <button
            onClick={handleAddInput}
            className=' btn btn-error rounded-md text-white'
          >
            Add URL
          </button>
        </div>
      </div>
      <h1 className=' text-center mt-3 mb-3 text-lg font-poppins font-semibold'>
        URL LIST:
      </h1>
      <div className='flex flex-col gap-6'>
        {inputArray.map((item, index) => (
          <Link
            key={index}
            handleRemoveUrl={handleRemoveUrl}
            item={item}
            index={index}
          />
        ))}
      </div>
      <h1 className=' basis-10 py-2 px-2 font-montserrat text-sm font-bold'>
        Upload CSV file with Urls to scan:
      </h1>
      <input
        type='file'
        accept='.txt, .pdf, .docx'
        onChange={handleFileUpload}
      />

      <form
        onSubmit={handelSubmit}
        className=' text-center mt-12 p-2'
        action=''
        value
      >
        <button
          onClick={() => setTitle(false)}
          className='btn btn-outline btn-error text-white mt-2'
        >
          Check Schema
        </button>
      </form>

      {isModalOpen && (
        <div className='modal modal-open'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>
              YOU FORGOT TO CHOOSE SCHEMA TYPE OR ADDING URL TO THE LIST 🙈
            </h3>
            <p className='py-4'>
              PLEASE SELECT SCHEMA TYPE AND ADD URL TO CHECK
            </p>
            <div className='modal-action '>
              <button
                onClick={() => setIsModalOpen(false)}
                className='btn btn-outline btn-error'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className='mt-3 mb-3 text-lg font-poppins font-semibold'>Reulsts:</h1>

      {formData.length > 0 && (
        <>
          <h2 className='mt-3 mb-3 text-lg font-poppins font-semibold'>
            THIS URL DONT HAVE {schemaType} SCHEMA :
          </h2>
          {formData.map((url) => (
            <p className="p-2" key={url}>{url}</p>
          ))}
        </>
      )}
      {title && (
        <h2 className='mt-3 mb-3 text-lg font-poppins font-semibold'>
          ALL URLs HAVE {schemaType} SCHEMA
        </h2>
      )}
    </div>
  );
};

export default HomePage;

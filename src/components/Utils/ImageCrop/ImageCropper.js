import React, { useState, createRef, useEffect } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useUserDetail } from "../../../Contexts/UserContext";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export const ImageCropper = () => {
  const { ImageUpload, setUploading, isUploading, isUploaded } =
    useUserDetail();

    const toast=useToast()
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState(null);
  const [load, setLoad] = useState(false);
  const cropperRef = createRef();

  const onChange = (e) => {
    e.preventDefault();
    setLoad(true);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const url = dataURItoBlob(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      );
      setCropData(URL.createObjectURL(url));
      toast({
        description: "Cropped Succesfully!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  const uploadimage = () => {
    setUploading(true);
    ImageUpload(cropData);
  };

  useEffect(() => {
    console.log(cropData);
  }, [cropData]);

  return (
    <div>
      <div className="w-100 flex flex-col justify-center items-center">
        {!load ? (
          <div className="my-2">
            <input id="upload" type="file" onChange={onChange} hidden />
            <label
              className="bg-faded-blue text-white px-3 rounded-lg
            py-2"
              htmlFor="upload">
              Upload File
            </label>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Cropper
              ref={cropperRef}
              style={{ height: 300, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
            <button
              className="bg-faded-blue text-white px-3 rounded-lg
            py-2 mt-4"
              onClick={getCropData}>
              Crop Image
            </button>

            {!isUploaded ? (
              <button
                className="bg-faded-blue text-white px-3 rounded-lg w-100
            py-2 mt-4"
                onClick={uploadimage}>
                {isUploading ? <Spinner /> : "Submit"}
              </button>
            ) : (
              <button
                className="bg-faded-blue text-white px-3 rounded-lg w-100
            py-2 mt-4 flex justify-center items-center"
                disabled>
                {isUploaded && <CheckBadgeIcon style={{width:"20px",height:"20px"}} />}
              </button>
            )}
          </div>
        )}
        ̥
      </div>
    </div>
  );
};

export default ImageCropper;

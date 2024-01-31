import react, { useRef } from "react";
import { TfiGallery } from "react-icons/tfi";
import ProductImagePopup from "../../components/ProductImagePopup";
import { MutableRefObject, useState } from "react";

const NewItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const myRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleImageDialog = () => {
    return setIsOpen(!isOpen);
  };

  const openfileExplorer = () => {
    myRef.current?.click();
  };

  return (
    <div>
      <div className="w-[100px] h-[100px] rounded-full items-center justify-center flex bg-gray-100">
        <TfiGallery
          size={60}
          className="text-gray-50"
          onClick={() => {
            handleImageDialog();
            openfileExplorer();
          }}
        />
      </div>
      <ProductImagePopup
        isOpen={isOpen}
        myRef={myRef}
        setIsOpen={handleImageDialog}
      />
      <div
        className={`${
          isOpen ? "bottom-0" : "bottom-full"
        } h-screen w-screen fixed bg-black/20 backdrop-blur-lg left-0 z-0`}
        onClick={handleImageDialog}
      />
    </div>
  );
};

export default NewItem;

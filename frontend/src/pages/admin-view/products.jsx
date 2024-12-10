import { BadgePlus, CircleX } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { addProductFormElements } from "../../config";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, editProduct, fetchAllProducts } from "../../store/admin/productSlice";
import ProductTile from "../../components/admin-view/products-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts = () => {
  const productList = useSelector((state) => state.adminProduct.productList);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();
  const [currentItemId, setCurrentItemId] = useState("");

  const handleOnDelete = (id) => {
    console.log(id);
    
    dispatch(deleteProduct({id:id})).then(
      (data) => {
        
        if (data?.payload?.success) {
          setFormData(initialFormData);
          dispatch(fetchAllProducts());
          setToastMessage(data.payload.message);
          setTimeout(() => setToastMessage(""), 3000); 
        }
      }
    );
    
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentItemId ==='') {
      dispatch(addProduct({ ...formData, image: uploadedImageUrl })).then(
        (data) => {
          if (data?.payload?.success) {
            setImageFile(null);
            setFormData(initialFormData);
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
  
            setToastMessage(data.payload.message);
            setTimeout(() => setToastMessage(""), 3000); 
          }
        }
      );
    } else{
      dispatch(editProduct({id:currentItemId,formData:formData})).then(
        (data) => {
          if (data?.payload?.success) {
            setImageFile(null);
            setFormData(initialFormData);
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setToastMessage(data.payload.message);
            setTimeout(() => setToastMessage(""), 3000); 
          }
        }
      );
      
    }
  };

  return (
    <Fragment >
      {toastMessage && (
        <div className="fixed bottom-5 right-5 w-52 h-15 bg-green-500 text-white p-3 rounded shadow-lg transition-opacity duration-300">
          {toastMessage}
        </div>
      )}

      <div className="mb-5 w-full flex justify-end">
        <button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-black text-white p-3 rounded hover:bg-gray-800 transition duration-200"
        >
          Add New Product
        </button>
      </div>
      <div className="flex flex-wrap justify-center lg:ml-64">
        {productList && productList.length > 0
          ? productList.map((product) => {
              return (
                <ProductTile
                  product={product}
                  setCurrentItemId={setCurrentItemId}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setFormData={setFormData}
                  formData = {formData}
                  onDelete={handleOnDelete}
                />
              );
            })
          : ""}
      </div>

      {openCreateProductsDialog && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={() => {
            setOpenCreateProductsDialog(false);
            setFormData(initialFormData);
            setCurrentItemId('')
          }}
        />
      )}

      <aside
        className={`fixed overflow-y-auto z-20 right-0 top-0 w-96 h-full border-l bg-background p-6 transition-transform transform ${
          openCreateProductsDialog ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex cursor-pointer items-center gap-2">
            <BadgePlus size={30} />
            <h1 className="text-2xl font-extrabold">{currentItemId === "" ? "Add New Product" : "Edit Product"}</h1>
          </div>
          <CircleX
            className="cursor-pointer"
            onClick={() => setOpenCreateProductsDialog(false)}
            size={24}
          />
        </div>
        <form className="mt-4" onSubmit={onSubmit}>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            url={uploadedImageUrl}
            setUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentItemId !== ""}
          />

          {addProductFormElements.map(
            ({ label, name, componentType, type, placeholder, options }) => {
              switch (componentType) {
                case "input":
                  return (
                    <div key={name} className="mb-3">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor={name}
                      >
                        {label}
                      </label>
                      <input
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={onChange}
                        className="border rounded-md p-2 w-full"
                      />
                    </div>
                  );

                case "textarea":
                  return (
                    <div key={name} className="mb-3">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor={name}
                      >
                        {label}
                      </label>
                      <textarea
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={onChange}
                        className="border rounded-md p-2 w-full"
                      />
                    </div>
                  );

                case "select":
                  return (
                    <div key={name} className="mb-3">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor={name}
                      >
                        {label}
                      </label>
                      <select
                        id={name}
                        name={name}
                        value={formData[name]}
                        onChange={onChange}
                        className="border rounded-md p-2 w-full cursor-pointer"
                      >
                        <option value="">Select {label}</option>
                        {options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );

                default:
                  return null;
              }
            }
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 w-full"
          >
            {currentItemId === "" ? "Create Product" : "Edit Product"}
          </button>
        </form>
      </aside>
    </Fragment>
  );
};

export default AdminProducts;

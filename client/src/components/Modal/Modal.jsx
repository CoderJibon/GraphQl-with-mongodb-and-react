function Modal({ title = "Create a Team", children, open, onHide }) {
  if (!open) {
    return null;
  }

  return (
    <div className="w-screen h-screen z-10 fixed bg-opacity-50 bg-black flex top-0 right-0 left-0 items-center mx-auto justify-center ">
      <div className="w-[500px] bg-white p-5 rounded-md">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button
            onClick={() => onHide(false)}
            className=" bg-red-400 w-8 h-8 text-white rounded-md"
          >
            x
          </button>
        </div>
        <hr className="mb-3 mt-2" />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;

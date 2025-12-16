import { useState, useEffect } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [carddata, setCarddata] = useState([]);
  const [id, setId] = useState(null);
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setCarddata(data);
  }, []);

  // Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("users")) || [];
    const maxId = data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;
    const date = new Date();
    const newData = [
      ...data,
      { id: maxId + 1, createdAt: date, title, description, checked: false },
    ];
    localStorage.setItem("users", JSON.stringify(newData));
    setCarddata(newData);
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const handleCheck = (id) => {
    const updated = carddata.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCarddata(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    const filtered = data.filter((e) => e.id !== id);
    localStorage.setItem("users", JSON.stringify(filtered));
    setCarddata(filtered);
  };

  const handleEdit = (id) => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    const item = data.find((e) => e.id === id);
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setId(item.id);
      setOpen(true);
      setBtn(true);
    } else {
      alert("Data not found");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = carddata.map((item) =>
      item.id === id ? { ...item, title, description } : item
    );
    setCarddata(updatedData);
    localStorage.setItem("users", JSON.stringify(updatedData));
    setTitle("");
    setDescription("");
    setOpen(false);
    setBtn(false);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 min-h-screen h-auto">
      {/* Navbar */}
      <header>
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 gap-4">
              {/* Logo */}
              <h1 className="text-2xl text-teal-600 font-bold text-center md:text-left hover:text-teal-700 hover:scale-110 transition-all duration-300">
                TodoList
              </h1>

              {/* Menu */}
              <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <li className="text-[#23979b] font-bold hover:text-teal-700 hover:scale-110">Home</li>
                <li className="text-[#23979b] font-bold hover:text-teal-700 hover:scale-110">About</li>
                <li className="text-[#23979b] font-bold hover:text-teal-700 hover:scale-110">Contact</li>
              </ul>

              {/* Button */}
              <div className="flex justify-center md:justify-end">
                <button className="bg-teal-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-teal-600 hover:scale-105 hover:shadow-xl">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex justify-center items-center flex-col h-auto w-full p-10">
        {/* Button to open modal */}
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:scale-105 transition-transform duration-300"
        >
          Open Modal
        </button>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add Details</h2>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />
              <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded mb-3 h-24"
              ></textarea>
              <div className="flex justify-end gap-3">
                <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                  Cancel
                </button>
                {btn ? (
                  <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                    Update
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="mx-4 my-5 p-4 flex flex-wrap justify-center gap-5 overflow-y-scroll scrollbar-hide">
          {carddata.map((e, i) => (
            <div
              key={e.id}
              className="max-w-sm h-[280px] bg-[#F9FAFB] shadow-md rounded-xl p-6 flex flex-col gap-3 border border-gray-300 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="flex justify-between gap-3 items-center">
                <div className="flex items-center font-bold">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 border-4 border-black rounded text-gray-700"
                    checked={e.checked}
                    onChange={() => handleCheck(e.id)}
                  />
                  <p>checked</p>
                </div>
                <div className="h-6 w-6 border border-black rounded-full flex justify-center items-center">
                  <p>{i + 1}</p>
                </div>
                <p className="text-[#2563EB] font-medium text-sm">
                  {new Date(e.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="w-full h-[140px] overflow-y-scroll">
                <h2 className="text-gray-900 font-semibold text-lg mb-2 break-words">
                  {e.title}
                </h2>
                <p
                  className={`text-gray-600 text-sm leading-relaxed break-words ${
                    e.checked ? "line-through opacity-50" : ""
                  }`}
                >
                  {e.description}
                </p>
              </div>

              <div className="flex justify-between">
                {!e.checked && (
                  <button onClick={() => handleEdit(e.id)} className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(e.id)} className="text-rose-600 hover:text-rose-800">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

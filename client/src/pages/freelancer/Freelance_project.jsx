import React from "react";

const Freelance_projects = () =>{
    return(
        <div className="container mx-auto px-4 py-8">
    <main>
        <h2 className="text-3xl font-semibold mb-6 ">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            <div className="bg-gray-600 p-6 rounded-lg shadow-md ">
                <h3 className="text-xl font-semibold mb-3">Name</h3>
                <p className="text-gray-600 mb-4">description</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-indigo-700">
                    View Dashboard
                </button>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Name</h3>
                <p className="text-gray-600 mb-4">description</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-indigo-700">
                    View Dashboard
                </button>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Name</h3>
                <p className="text-gray-600 mb-4">description</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-indigo-700">
                    View Dashboard
                </button>
            </div>
        </div>
    </main>
</div>

    )
}

export default Freelance_projects;

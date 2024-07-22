import { CiStickyNote } from "react-icons/ci";

const Classes = () => {
  return (
    <div className="px-10 text-slate-700">
    <h1 className="text-lg">Your Class</h1>
    <div className="flex flex-col justify-center items-center mt-36 gap-10">
      <p className="text-lg"> There are no classes to display</p>
      <CiStickyNote className="text-sky-600" size={100} />
    </div>
  </div>
  )
}

export default Classes
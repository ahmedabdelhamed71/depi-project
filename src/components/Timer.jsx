import { MdAccessTime } from "react-icons/md";

function Timer({ timeLeft }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 border rounded-lg px-4 py-2 bg-white">
      <MdAccessTime size={18} />
      <span className="font-medium">
        {minutes}:{seconds}
      </span>
    </div>
  );
}

export default Timer; 

export default function Header() {
  return (
    <header className="top-0 right-0 left-0 flex fixed h-16 lg:h-20 bg-gray-100 border-b border-gray-200 px-5 justify-between items-center z-99">
      <div className="header-icons flex">
        <a href="#">
          <img
            src="icon-paraverse.svg"
            alt="Paraverse Icon"
            className="h-8 border-r border-gray-200 pr-4"
          />
        </a>
        <a href="#" className="flex items-center pl-4 overflow">
          <h1 className="text-xl lg:text-3xl font-bold text-(--green) text-nowrap">
            Feedback Logs
          </h1>
        </a>
      </div>
      <div className="navbar flex items-center gap-4">
        <div className="search-container hidden overflow-hidden lg:flex border border-[#cccccc] rounded-lg h-12 w-100">
          <input
            type="text"
            placeholder="Filter by keyword..."
            className="search rounded-lg px-4 w-full flex-1 items-center"
          />
        </div>
        <button className="hidden lg:block bg-(--green) text-white h-12 overflow-hidden px-4 rounded-lg">
          + Add Ticket
        </button>
        <img src="avatar-default.svg" alt="Profile Icon" className="h-8" />
      </div>
    </header>
  );
}

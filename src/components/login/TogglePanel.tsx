interface Props {
  setActive: (v: boolean) => void;
}

export function TogglePanel({ setActive }: Props) {
  return (
    <section
      className="
      absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-50
      transition-all duration-700 ease-in-out
      rounded-[150px_0_0_100px]
      group-[.active]:-translate-x-full
      group-[.active]:rounded-[0_150px_100px_0]
    "
    >
      <div
        className="
        relative -left-full w-[200%] h-full text-white
        bg-linear-to-r from-[#5c6bc0] to-[#512da8]
        transition-all duration-700 ease-in-out
        group-[.active]:translate-x-1/2
      "
      >
        {/* LEFT */}
        <div
          className="
          absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center
          -translate-x-full
          transition-all duration-700
          group-[.active]:translate-x-0
        "
        >
          <h1 className="text-2xl font-bold">Welcome!</h1>
          <p className="text-sm my-4">
            Enter your personal details to use all site features
          </p>
          <button
            onClick={() => setActive(false)}
            className="border border-white px-10 py-3 rounded-lg text-xs uppercase font-semibold"
          >
            Sign In
          </button>
        </div>

        {/* RIGHT */}
        <div className="absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center">
          <h1 className="text-2xl font-bold">Hello, Friend!</h1>
          <p className="text-sm my-4">
            Register with your personal details
          </p>
          <button
            onClick={() => setActive(true)}
            className="border border-white px-10 py-3 rounded-lg text-xs uppercase font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
}

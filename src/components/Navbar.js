export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold">TECHNOLYTICS (TeCS)</h1>
      <ul className="flex gap-6">
        <li className="cursor-pointer hover:text-blue-400">Home</li>
        <li className="cursor-pointer hover:text-blue-400">Services</li>
        <li className="cursor-pointer hover:text-blue-400">About</li>
        <li className="cursor-pointer hover:text-blue-400">Contact</li>
      </ul>
    </nav>
  );
}

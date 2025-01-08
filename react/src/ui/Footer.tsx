export default function Footer() {
  return (
    <footer className="bg-stone-50 shadow dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <img src="logo.png" className="w-40" />
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-700 sm:mb-0 dark:text-gray-400">
            <li>
              <a className="me-4 hover:underline md:me-6">About</a>
            </li>
            <li>
              <a className="me-4 hover:underline md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a className="me-4 hover:underline md:me-6">Licensing</a>
            </li>
            <li>
              <a className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://kakushops.com/" className="hover:underline">
            Kakuritsu95
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

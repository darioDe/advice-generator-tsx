import { FaGithub } from 'react-icons/fa';

// Footer component
const Footer: React.FC = () => {
  return (
     // Footer container with fixed position at the bottom
    <footer className="flex justify-end items-end bg-gray-800 text-gray-300 p-4">
      <p className="text-sm">Created by Ruben Dario Duarte</p>
      <a href="https://github.com/dariode" target="_blank" rel="noopener noreferrer" className="flex items-center">
        <FaGithub className="mx-2" />
      </a>
    </footer>
  );
};

export default Footer;








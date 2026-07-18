export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-8 text-center text-gray-500 font-mono text-sm">
      <p>
        &copy; {new Date().getFullYear()} Designed & Built with <span className="text-primary">{'<3'}</span>
      </p>
    </footer>
  );
}
